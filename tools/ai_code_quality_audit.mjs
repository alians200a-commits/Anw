import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const requireText = (file, pattern, message) => {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  if (!pattern.test(text)) failures.push(`${file}: ${message}`);
};

// AI-generated code must fail closed around the most important boundaries.
requireText('src/admin/adminTypes.ts', /export type AdminRole = 'owner' \| 'admin';/, 'admin roles must remain owner/admin only');
requireText('src/main.tsx', /<AppErrorBoundary>/, 'root error boundary is required');
requireText('src/lib/supabase.ts', /sb_secret_/, 'browser client must reject Supabase secret keys');
requireText('src/lib/supabase.ts', /service\[_-\]\?role/, 'browser client must reject service-role keys');

for (const file of [
  'src/data/publishedDrugContent.ts',
  'src/data/publishedEquipmentContent.ts',
  'src/data/publishedFluidContent.ts',
]) {
  requireText(file, /reportRuntimeIssue/, 'published-content fallback must not fail silently');
  requireText(file, /schemaVersion !== 1/, 'published payloads must be schema-version checked');
  requireText(file, /isSafePublishedMediaUrl/, 'published media URLs must be allow-listed');
}

const adminTypes = fs.readFileSync(path.join(root, 'src/admin/adminTypes.ts'), 'utf8');
if (/['"](?:editor|reviewer)['"]/.test(adminTypes)) failures.push('src/admin/adminTypes.ts: legacy account roles reintroduced');

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
for (const group of ['dependencies', 'devDependencies']) {
  for (const [name, version] of Object.entries(packageJson[group] ?? {})) {
    if (/^[~^*]|\bx\b/i.test(version) || version === 'latest') failures.push(`package.json: ${name} is not exactly pinned (${version})`);
  }
}

if (failures.length) {
  console.error('\nAI-code production audit FAILED:\n');
  failures.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log('AI-code production audit passed: critical boundaries, diagnostics, payload validation, and exact package versions are present.');
