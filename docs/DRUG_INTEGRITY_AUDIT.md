# Drug Integrity Audit — دليلي | مملكة التخدير

آخر تحديث: 2026-09-22

## النتيجة النهائية

**Drug Integrity Review: CLOSED — 63/63**

كل سجل دواء أصبح داخل Reviewed lock في `tools/drug_integrity_audit.ts`.

الحالة الموثقة من آخر Verify:
- Core completeness: 63/63
- Reviewed drugs: 63/63
- Onset/duration coverage: 63/63
- Clinical-note coverage: 63/63
- Drug Integrity Audit: PASS

## طبقات التدقيق الإلزامية

لكل دواء تم تدقيق:
1. الهوية والتصنيف.
2. Feature / mechanism.
3. Route(s).
4. Dose أو concentration reference.
5. Onset / duration.
6. Uses.
7. Contraindications.
8. Warnings.
9. Adverse effects.
10. Clinical note عند الحاجة.
11. تطابق التصنيف مع طريق الإعطاء.
12. العرض العربي/الإنكليزي وترتيب بطاقات التفاصيل.

## الدفعات المغلقة

- Batch 1: IV induction + inhalational anesthetics — 11
- Batch 2: Benzodiazepines + opioids — 8
- Batch 3: Neuromuscular blockers + reversal — 10
- Batch 4: Local anesthetic + antiemetic + adjunct — 10
- Batch 5: Cardiovascular + vasopressor — 13
- Batch 6: Emergency / respiratory / metabolic / steroid — 11

المجموع: **63/63**

## أمثلة على أخطاء أو فجوات اكتشفتها الجولة

- إزالة المقارنة المضللة في بطاقة Propofol وتثبيت هويته كعامل تخدير وريدي.
- إكمال onset/duration الذي كان ناقصًا في عدد كبير من السجلات.
- تحويل التصحيحات السريرية المهمة إلى clinicalNote مرئية بدل بقائها مخفية في البيانات.
- تشديد تحذيرات QT/arrhythmia لبعض الأدوية.
- تصحيح سياقات RSI/anaphylaxis/neuromuscular reversal وLAST ذات الصلة بالأدوية.
- عدم معاملة Calcium chloride وCalcium gluconate على أنهما متكافئان gram-for-gram.
- الإبقاء على Ranitidine بصياغة توضح الفرق بين المرجع التاريخي والمنتج الحديث.
- إغلاق Mivacurium وPancuronium بعد تحقق منفصل بدل تمريرهما بالتخمين.

## Automated hard gate

`tools/drug_integrity_audit.ts` يفشل إذا وجد:
- سجل DrugDetail مفقود أو orphan.
- Feature / mechanism / routes / dose / uses / contraindications / warnings / adverse effects ناقصة.
- تصنيف IV بلا IV route.
- تصنيف inhalational بلا inhalational route.
- تعارض واضح بين route والـfeature.
- أي reviewed drug بلا onset/duration.
- أي reviewed drug بلا clinicalNote.

## UI contract

ترتيب بطاقة الدواء:
Key feature → Clinical note → Uses → Mechanism → Routes → Reference doses → Onset & duration → Contraindications → Warnings → Adverse effects → Trade names.

العربي أولًا، والإنكليزي LTR مستقل. بيانات المصادر تبقى داخلية ولا تُعرض للمستخدم.

## ما بعد الإغلاق

أي تعديل مستقبلي على دواء من الـ63 يجب أن يمر:
TypeScript → Content Audit → Drug Integrity Audit → App Integrity Audit → Term Integrity Audit → Build.

لا يُعاد فتح الجولة إلا إذا فشل Gate، ظهر تعارض جديد مع مصدر حديث، أو أضيف دواء جديد.
