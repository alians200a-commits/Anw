import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const ignoredDirs = new Set(['node_modules', 'dist', 'build', 'coverage', '.git']);
const textExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.html', '.css', '.sql', '.yml', '.yaml', '.md', '.env', '.txt']);
const findings = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function report(file, line, message) {
  findings.push(`${path.relative(root, file)}:${line} — ${message}`);
}

const self = path.resolve(root, 'tools/security_audit.mjs');
for (const file of walk(root)) {
  if (path.resolve(file) === self) continue;
  const base = path.basename(file);
  const ext = path.extname(file).toLowerCase();
  if (!textExtensions.has(ext) && !base.startsWith('.env')) continue;
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    const n = index + 1;
    if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(line)) report(file, n, 'مفتاح خاص موجود داخل المستودع');
    if (/sb_secret_[A-Za-z0-9_-]{12,}/.test(line)) report(file, n, 'Supabase secret key موجود داخل المستودع');
    if (/service[_-]?role\s*[:=]\s*["'][^"']{12,}["']/i.test(line)) report(file, n, 'Service-role credential محتمل');
    if (/dangerouslySetInnerHTML\s*=/.test(line)) report(file, n, 'استخدام dangerouslySetInnerHTML يحتاج مراجعة XSS');
    if (/\.innerHTML\s*=/.test(line)) report(file, n, 'تعيين innerHTML مباشر يحتاج مراجعة XSS');
    if (/\beval\s*\(/.test(line) || /new\s+Function\s*\(/.test(line)) report(file, n, 'تنفيذ JavaScript ديناميكي غير مسموح');
    const isSecurityFixture = path.relative(root, file).startsWith(`tools${path.sep}tests${path.sep}`);
    if (/javascript\s*:/i.test(line) && !isSecurityFixture && !/security|audit|pattern|regex/i.test(line)) report(file, n, 'رابط javascript: محتمل');
  });
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
for (const group of ['dependencies', 'devDependencies']) {
  for (const [name, version] of Object.entries(packageJson[group] ?? {})) {
    if (/^[~^*]|\bx\b/i.test(version) || version === 'latest') findings.push(`package.json — ${name} غير مثبت على إصدار محدد (${version})`);
  }
}

for (const envName of ['.env', '.env.local', '.env.production', '.env.development']) {
  if (fs.existsSync(path.join(root, envName))) findings.push(`${envName} — ملف بيئة حقيقي موجود داخل حزمة المصدر؛ لا ترفعه إلى Git`);
}

if (findings.length) {
  console.error('\nSecurity audit FAILED:\n');
  findings.forEach((f) => console.error(`- ${f}`));
  process.exit(1);
}

console.log('Security audit passed: no forbidden secrets or obvious dynamic-code/XSS patterns were found, and package versions are pinned.');
