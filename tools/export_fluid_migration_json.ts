import { mkdir, writeFile } from 'node:fs/promises';
import { INTRAVENOUS_FLUIDS } from '../src/data/fluids';

const duplicateIds = INTRAVENOUS_FLUIDS.map((item) => item.id).filter((id,index,all)=>all.indexOf(id)!==index);
if (duplicateIds.length > 0) throw new Error(`Duplicate fluid ids: ${[...new Set(duplicateIds)].join(', ')}`);

const invalid = INTRAVENOUS_FLUIDS.filter((item)=>!item.id||!item.nameAr||!item.nameEn||!item.composition||!Array.isArray(item.role)||!Array.isArray(item.cautions)).map((item)=>item.id||'(missing-id)');
if (invalid.length > 0) throw new Error(`Invalid fluid records: ${invalid.join(', ')}`);

const rows = INTRAVENOUS_FLUIDS.map((fluid)=>({
  content_type:'fluid',
  slug:fluid.id,
  title_ar:fluid.nameAr,
  title_en:fluid.nameEn,
  status:'draft',
  payload:{schemaVersion:1,fluid,media:[]},
}));

await mkdir('migration',{recursive:true});
await writeFile('migration/fluids-export.json',`${JSON.stringify({schemaVersion:1,count:rows.length,rows},null,2)}\n`,'utf8');
console.log(`Exported ${rows.length} fluid records.`);
