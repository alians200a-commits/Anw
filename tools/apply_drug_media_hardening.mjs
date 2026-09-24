import fs from 'node:fs';

const file = 'src/admin/DrugEditorV2.tsx';
let text = fs.readFileSync(file, 'utf8');

function replaceExact(oldValue, newValue, label) {
  if (!text.includes(oldValue)) throw new Error(`Patch anchor missing: ${label}`);
  text = text.replace(oldValue, newValue);
}

function replaceRegex(pattern, replacement, label) {
  const matches = [...text.matchAll(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'))];
  if (matches.length !== 1) throw new Error(`Patch anchor ${label} matched ${matches.length} times`);
  text = text.replace(pattern, replacement);
}

replaceExact(
  "import { ChangeEvent, useMemo, useRef, useState } from 'react';",
  "import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';",
  'react useEffect import',
);

replaceExact(
  "import { supabase } from '../lib/supabase';\nimport type {\n",
  "import { supabase } from '../lib/supabase';\nimport type { AdminRole } from './adminTypes';\nimport { cleanupPromotedDraftMedia, hydrateAdminMedia, promoteMediaForPublish, removeAdminMedia, rollbackPromotedPublicMedia, uploadDraftMedia } from '../lib/contentMediaStorage';\nimport type {\n",
  'media storage imports',
);

replaceExact(
  "type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';\n",
  '',
  'legacy admin role type',
);

replaceExact(
  "  const [notice, setNotice] = useState('');\n\n  const canEdit = role === 'owner' || role === 'admin' || role === 'editor';\n  const canPublish = role === 'owner' || role === 'admin';\n",
  "  const [notice, setNotice] = useState('');\n\n  useEffect(() => {\n    let active = true;\n    void hydrateAdminMedia(seed.media).then((hydrated) => { if (active) setMedia(hydrated); });\n    return () => { active = false; };\n  }, [seed]);\n\n  const canEdit = role === 'owner' || role === 'admin';\n  const canPublish = canEdit;\n",
  'role and hydration block',
);

replaceExact(
  "  const buildPayload = (): DrugPayload => ({",
  "  const buildPayload = (mediaOverride: ContentMediaItem[] = media): DrugPayload => ({",
  'build payload signature',
);
replaceExact(
  "    media: media.map((item, index) => ({ ...item, order: index })),\n  });",
  "    media: mediaOverride.map((item, index) => ({ ...item, order: index })),\n  });",
  'payload media override',
);

const persistBlock = `  const persist = async (targetStatus: ContentStatus) => {
    if (!canEdit) return;
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    let rollbackPublicPaths: string[] = [];
    try {
      let payloadMedia = media;
      let cleanupDraftPaths: string[] = [];
      if (targetStatus === 'published') {
        const promoted = await promoteMediaForPublish(media, profileId, 'drug', drug.id.trim());
        payloadMedia = promoted.media;
        cleanupDraftPaths = promoted.draftPathsToCleanup;
        rollbackPublicPaths = promoted.publicPathsToRollback;
      }
      const payload = buildPayload(payloadMedia);
      const baseRecord = {
        content_type: 'drug',
        slug: payload.drug.id,
        title_ar: payload.drug.ar,
        title_en: payload.drug.en,
        payload,
      };
      let currentId = rowId;
      if (!currentId) {
        const { data, error: insertError } = await supabase.from('content_items').insert({ ...baseRecord, status: targetStatus }).select('id,status').single();
        if (insertError) throw insertError;
        currentId = data.id as string;
        setRowId(currentId);
        setStatus(data.status as ContentStatus);
      } else {
        const { error: updateError } = await supabase.from('content_items').update({ ...baseRecord, status: targetStatus }).eq('id', currentId);
        if (updateError) throw updateError;
        setStatus(targetStatus);
      }
      if (targetStatus === 'published') {
        setMedia(payloadMedia);
        await cleanupPromotedDraftMedia(cleanupDraftPaths);
        rollbackPublicPaths = [];
      }
      setNotice(targetStatus === 'published' ? 'تم حفظ الدواء ونشره.' : targetStatus === 'review' ? 'تم حفظ الدواء وإرساله للمراجعة.' : 'تم حفظ المسودة.');
      await onSaved();
    } catch (caught) {
      await rollbackPromotedPublicMedia(rollbackPublicPaths);
      setError(caught instanceof Error ? caught.message : 'تعذر حفظ الدواء.');
    } finally {
      setBusy(false);
    }
  };
`;
replaceRegex(/  const persist = async \(targetStatus: ContentStatus\) => \{[\s\S]*?\n  \};\n\n(?=  const uploadImages)/, persistBlock + '\n', 'persist function');

const uploadBlock = `  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    setNotice('');
    try {
      const uploaded: ContentMediaItem[] = [];
      const hasCover = media.some((item) => item.placement === 'cover' && !item.hidden);
      for (const file of files) {
        const folder = drug.id.trim() && /^[a-z0-9][a-z0-9-]*$/.test(drug.id.trim()) ? drug.id.trim() : \`draft-\${draftUploadKey.current}\`;
        uploaded.push(await uploadDraftMedia({
          file,
          profileId,
          contentType: 'drug',
          folder,
          alt: drug.ar.trim() || drug.en.trim() || file.name,
          placement: !hasCover && uploaded.length === 0 ? 'cover' : 'gallery',
          order: media.length + uploaded.length,
        }));
      }
      setMedia((current) => [...current, ...uploaded]);
      setNotice(\`تم رفع \${uploaded.length} صورة وظهرت بالمعاينة مباشرة. احفظ المسودة لتثبيت بياناتها.\`);
      setPreviewOpen(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر رفع الصور.');
    } finally {
      setUploading(false);
    }
  };
`;
replaceRegex(/  const uploadImages = async \(event: ChangeEvent<HTMLInputElement>\) => \{[\s\S]*?\n  \};\n\n(?=  const updateMedia)/, uploadBlock + '\n', 'upload function');

const deleteBlock = `  const deleteMedia = async (item: ContentMediaItem) => {
    setError('');
    try {
      await removeAdminMedia(item);
      setMedia((current) => current.filter((mediaItem) => mediaItem.id !== item.id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر حذف الصورة.');
    }
  };
`;
replaceRegex(/  const deleteMedia = async \(item: ContentMediaItem\) => \{[\s\S]*?\n  \};\n\n(?=  const toggleClass)/, deleteBlock + '\n', 'delete media function');

if (text.includes("role === 'editor'") || text.includes("role === 'reviewer'")) {
  throw new Error('Legacy editor/reviewer authorization remains in DrugEditorV2');
}
if (!text.includes("from '../lib/contentMediaStorage'")) throw new Error('Media storage hardening import missing');

fs.writeFileSync(file, text);
console.log('DrugEditorV2 hardening patch applied.');
