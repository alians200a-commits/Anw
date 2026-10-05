import { useState, type ReactNode } from 'react';
import {
  ArrowRight, ChevronDown, ChevronLeft
} from 'lucide-react';
import { FlaticonEducationIcon, type EducationIconName } from './ui/FlaticonEducationIcon';

type Section = 'intro' | 'study' | 'team' | 'skills' | 'prep' | 'career';
type Track = 'college' | 'institute';
type Topic = { title: string; text: string; english?: string };

const sections: Array<{
  id: Section;
  title: string;
  description: string;
  icon: EducationIconName;
}> = [
  { id: 'intro', title: 'عن الاختصاص', description: 'التعريف والمهام السريرية', icon: 'intro' },
  { id: 'study', title: 'الدراسة بالعراق', description: 'الكلية والمعهد والمراحل', icon: 'study' },
  { id: 'team', title: 'كوادر التخدير', description: 'الأدوار والمسؤوليات', icon: 'team' },
  { id: 'skills', title: 'تقني وفني متميز', description: 'المهارات وبناء الثقة', icon: 'skills' },
  { id: 'prep', title: 'التحضير للتخدير', description: 'قبل العملية وداخل الصالة', icon: 'prep' },
  { id: 'career', title: 'بعد التخرج', description: 'العمل والتطور المهني', icon: 'career' }
];

const college: Array<{ title: string; sub: string; courses: string[] }> = [
  { title: 'المرحلة الأولى', sub: 'التأسيس الطبي', courses: ['التشريح', 'علم وظائف الأعضاء (الفسلجة)', 'علوم الحياة', 'الكيمياء السريرية', 'الفيزياء الطبية', 'الحاسوب', 'السلوك المهني', 'حقوق الإنسان'] },
  { title: 'المرحلة الثانية', sub: 'بداية المواد التخصصية', courses: ['التخدير وأجهزة التخدير', 'الطب الباطني', 'أسس الجراحة', 'الفسيولوجيا التطبيقية', 'علم الأدوية', 'المصطلحات الطبية', 'الإحصاء'] },
  { title: 'المرحلة الثالثة', sub: 'التدريب والتخصص', courses: ['التخدير وأجهزة التخدير', 'الطب الباطني', 'أسس الجراحة', 'العناية المركزة', 'الحاسوب'] },
  { title: 'المرحلة الرابعة', sub: 'المواد السريرية ومشروع التخرج', courses: ['التخدير وأجهزة التخدير', 'الطب الباطني والجراحي', 'العناية المركزة', 'التمريض', 'أخلاقيات المهنة', 'مشروع التخرج'] }
];
const institute: typeof college = [
  { title: 'المرحلة الأولى', sub: 'العلوم الطبية الأساسية', courses: ['التشريح', 'علم وظائف الأعضاء (الفسلجة)', 'الفيزياء الطبية', 'الكيمياء الحياتية / السريرية', 'الأحياء المجهرية', 'أجهزة التخدير', 'اللغة الإنكليزية والمصطلحات الطبية'] },
  { title: 'المرحلة الثانية', sub: 'التخصص والتطبيق السريري', courses: ['التخدير', 'علم الأدوية', 'أسس الجراحة', 'العناية المركزة', 'الأمراض الانتقالية والسريرية', 'التطبيق العملي'] }
];
const duties: Topic[] = [
  { title: 'تحضير المريض للتخدير', text: 'مراجعة المعلومات اللازمة من ملف المريض وتاريخه المرضي، وتركيب الكانيولا، وتجهيز الأدوية والسوائل الوريدية وإعطاؤها وفق الأوامر الطبية والصلاحيات المعتمدة.' },
  { title: 'إجراء مهام التخدير', text: 'العمل مع طبيب التخدير خلال المراحل المختلفة، وأداء الإجراءات السريرية المكلّفين بها المتعلقة بمجرى الهواء والتهوية والتخدير العام أو الناحي، وفق التدريب والصلاحيات والإشراف المطلوب.' },
  { title: 'المراقبة السريرية', text: 'يقوم التقني والفني بمراقبة المريض ومتابعة علاماته الحيوية وأجهزة التخدير والتنفس الاصطناعي، ورصد التغيرات وإبلاغ طبيب التخدير بها.' },
  { title: 'الإنعاش والطوارئ', text: 'أداء المهام المكلّفين بها خلال الإنعاش القلبي الرئوي والطوارئ بالتنسيق مع بقية أعضاء الفريق.' },
  { title: 'الرعاية خلال الإفاقة', text: 'مراقبة حالة المريض خلال الإفاقة ومتابعة علاماته الحيوية والمساعدة في نقله وتسليمه للكادر المسؤول.' },
  { title: 'أجهزة التخدير', text: 'فحص عربة التخدير وأجهزة التنفس والمراقبة وتشغيلها ضمن الصلاحيات، والتأكد من جاهزية المعدات والإبلاغ عن الأعطال.' }
];
const team: Topic[] = [
  { title: 'طبيب التخدير', english: 'Anesthesiologist', text: 'يتولى التقييم الطبي، وتحديد خطة التخدير والأدوية المناسبة، وإدارة الحالة واتخاذ القرارات العلاجية.' },
  { title: 'تقني التخدير', english: 'Anesthesia Technologist', text: 'يقوم بالمهام السريرية والفنية، ومراقبة المريض، والعمل مع طبيب التخدير أثناء الإجراءات، والإنعاش والرعاية خلال الإفاقة وفق صلاحياته.' },
  { title: 'فني التخدير / مساعد المخدر', english: 'Anesthesia Technician', text: 'يؤدي المهام السريرية والفنية المتعلقة بالتخدير، ويعمل مع طبيب التخدير وبقية أعضاء الفريق وفق تأهيله وتدريبه وصلاحياته.' },
  { title: 'كوادر تمريض العمليات والإفاقة والعناية المركزة', text: 'تسهم في متابعة المريض وتقديم الرعاية المستمرة خلال مراحل العلاج المختلفة.' }
];
const skills: Topic[] = [
  { title: 'تركيب الكانيولا', english: 'IV Cannulation', text: 'تعلّم تركيب الكانيولا وتثبيتها وإجراءات التعقيم والتعرّف على المضاعفات، مع الممارسة تحت إشراف مناسب.' },
  { title: 'أدوية التخدير وجرعاتها', english: 'Drug Dosage', text: 'اعرف الأسماء والتركيزات والاستعمالات والتأثيرات الجانبية. لا تعتمد على الحفظ وحده؛ تحقّق من الأوامر الطبية والجرعات والحسابات قبل الإعطاء.' },
  { title: 'عربة التخدير والأجهزة', text: 'تعرّف على أجزاء العربة ودوائر التنفس والغازات وأجهزة المراقبة، وكيفية فحص الجاهزية والإبلاغ عن الأعطال.' },
  { title: 'مجرى الهواء والتهوية', english: 'Airway', text: 'تعلّم أدوات مجرى الهواء واستخداماتها، واكتسب المهارات الإضافية بالتدريب والإشراف وفق الصلاحيات.' },
  { title: 'المراقبة والتواصل', text: 'تابع تغيرات حالة المريض بدقة، وأبلغ طبيب التخدير مبكرًا عن أي تغير مهم، ولا تتردد في طلب المساعدة.' }
];
const before: Topic[] = [
  { title: 'ملف المريض', text: 'هوية المريض وعمره ووزنه والعملية المقررة والوثائق المطلوبة.' },
  { title: 'التاريخ المرضي', text: 'الأمراض والأدوية والحساسية والتجارب السابقة مع التخدير، وإبلاغ الطبيب بالمعلومات المؤثرة.' },
  { title: 'الفحوصات', text: 'مراجعة التحاليل والفحوصات الشعاعية المطلوبة للحالة.' },
  { title: 'السوائل الوريدية', text: 'مراجعة الوصول الوريدي والسوائل المطلوبة وفق الخطة المعتمدة.' },
  { title: 'مدة الصيام', text: 'توثيق مدة الصيام وإبلاغ الطبيب عند عدم الالتزام بها.' },
  { title: 'العلامات الحيوية', text: 'الضغط والنبض ومعدل التنفس والحرارة وتشبع الأوكسجين عند القياس.' },
  { title: 'غازات الدم الشرياني | ABG', text: 'تُراجع عند الحاجة بحسب حالة المريض، وليست مطلوبة روتينيًا للجميع.' },
  { title: 'الدم الاحتياطي', text: 'التأكد من توفيره وفحوصات التوافق عند توقع الحاجة إلى نقل الدم.' }
];
const during: Topic[] = [
  { title: 'عربة التخدير', text: 'فحص الجهاز ودائرة التنفس وفق تعليماته وقائمة الفحص المعتمدة.' },
  { title: 'الغازات الطبية', text: 'فحص مصادر الأوكسجين الأساسية والاحتياطية سواء كانت مركزية أو أسطوانات.' },
  { title: 'معدات مجرى الهواء', text: 'ETT وLMA وقناع الوجه ودائرة التنفس والمعدات المناسبة للحالة.' },
  { title: 'جهاز الشفط | Suction', text: 'التأكد من عمل جهاز الشفط وجاهزية ملحقاته.' },
  { title: 'المراقبة | Monitor', text: 'فحص أجهزة المراقبة والإنذارات، مثل ECG وNIBP وSpO₂ وEtCO₂ وفق الحالة.' },
  { title: 'أدوية التخدير', text: 'مراجعة الأسماء والتركيزات والصلاحية وسلامة العبوات والتوسيم الصحيح.' },
  { title: 'مستلزمات التخدير الناحي', text: 'تجهيز الإبر والأدوية والمستلزمات المعقمة عندما تتطلبها خطة التخدير.' },
  { title: 'التهوية المساعدة', text: 'التحقق من وسائل التهوية اليدوية والاحتياطية المناسبة.' },
  { title: 'الكهرباء والطوارئ', text: 'التحقق من الكهرباء الأساسية والاحتياطية وجاهزية معدات الطوارئ.' }
];
const grades = [
  ['تقني طبي تخدير متدرب', 'السابعة'],
  ['تقني طبي تخدير', 'السادسة'],
  ['تقني طبي تخدير أقدم', 'الخامسة'],
  ['معاون رئيس تقني طبي تخدير', 'الرابعة'],
  ['رئيس تقني طبي تخدير', 'الثالثة'],
  ['رئيس تقني طبي تخدير أقدم', 'الثانية'],
  ['رئيس تقني طبي تخدير أقدم أول', 'الأولى']
];

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-[20px] border border-[#DCE5EA] bg-white p-4 shadow-[0_6px_18px_rgba(16,45,79,0.045)] sm:p-5">
    <h3 className="mb-3 text-[15px] font-black text-[#183149]">{title}</h3>
    <div className="space-y-3 text-[13px] leading-[1.95] text-[#526675]">{children}</div>
  </section>;
}

function TopicCards({ topics }: { topics: Topic[] }) {
  return <div className="grid gap-2 sm:grid-cols-2">
    {topics.map((item, i) => <article key={item.title} className="min-w-0 rounded-[16px] border border-[#DFE7EC] bg-[linear-gradient(145deg,#FFFFFF,#F8FAFB)] p-3.5">
      <div className="flex items-start gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[9px] bg-[#EEF3F8] text-[11px] font-black text-[#2F69A8]">{String(i + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <h4 className="text-[13px] font-black leading-6 text-[#183149]">{item.title}</h4>
          {item.english ? <div lang="en" dir="ltr" className="mt-0.5 text-left text-[11px] font-bold text-[#688095]">{item.english}</div> : null}
        </div>
      </div>
      <p className="mt-2.5 text-[12px] leading-[1.95] text-[#526675]">{item.text}</p>
    </article>)}
  </div>;
}

function Disclosure({ title, sub, children, defaultOpen = false }: { title: string; sub?: string; children: ReactNode; defaultOpen?: boolean }) {
  return <details open={defaultOpen ? true : undefined} className="group overflow-hidden rounded-[16px] border border-[#DCE5EA] bg-white shadow-[0_3px_11px_rgba(10,32,55,0.025)] open:border-[#C6D6E2]">
    <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-3.5 py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D9A441] [&::-webkit-details-marker]:hidden">
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#183149]">{title}</span>
        {sub ? <span className="mt-0.5 block text-[11px] font-semibold text-[#7B8C98]">{sub}</span> : null}
      </span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#EEF3F8] text-[#315672]">
        <ChevronDown size={17} className="transition-transform duration-200 group-open:rotate-180" />
      </span>
    </summary>
    <div className="border-t border-[#E5EBF0] bg-[#FAFCFD] px-3.5 pb-3.5 pt-3 text-[12px] leading-[1.95] text-[#526675]">{children}</div>
  </details>;
}

function CoursePanel({ years }: { years: typeof college }) {
  return <div className="space-y-2">
    {years.map((year, i) => <Disclosure key={year.title} title={year.title} sub={year.sub} defaultOpen={i === 0}>
      <ul className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {year.courses.map(course => <li key={course} className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9A441]" />{course}
        </li>)}
      </ul>
    </Disclosure>)}
  </div>;
}

function Study({ track, onTrack }: { track: Track; onTrack: (t: Track) => void }) {
  return <div className="space-y-3">
    <div role="tablist" aria-label="المسار الدراسي" className="grid grid-cols-2 gap-1.5 rounded-[17px] border border-[#DCE5EA] bg-[#F2F6F8] p-1.5">
      <button type="button" role="tab" aria-selected={track === 'college'} onClick={() => onTrack('college')} className={'min-h-12 rounded-[12px] px-2 text-[12px] font-black leading-5 focus-visible:outline focus-visible:outline-[#D9A441] ' + (track === 'college' ? 'bg-white text-[#173A63] shadow-[0_3px_10px_rgba(10,32,55,0.08)]' : 'text-[#667B8C]')}>الكلية التقنية الطبية</button>
      <button type="button" role="tab" aria-selected={track === 'institute'} onClick={() => onTrack('institute')} className={'min-h-12 rounded-[12px] px-2 text-[12px] font-black leading-5 focus-visible:outline focus-visible:outline-[#D9A441] ' + (track === 'institute' ? 'bg-white text-[#173A63] shadow-[0_3px_10px_rgba(10,32,55,0.08)]' : 'text-[#667B8C]')}>المعهد التقني / معهد الصحة العالي</button>
    </div>
    <Panel title={track === 'college' ? 'الكلية التقنية الطبية' : 'المعهد التقني الطبي أو معهد الصحة العالي'}>
      <span className="inline-block rounded-full border border-[#E8DDBD] bg-[#FBF5E7] px-3 py-1 text-[11px] font-black text-[#8A6426]">{track === 'college' ? 'أربع سنوات · بكالوريوس' : 'سنتان · دبلوم'}</span>
      <p>{track === 'college' ? 'قسم التخدير والعناية المركزة. المسمى الوظيفي: تقني طبي تخدير.' : 'المسمى الوظيفي: فني تخدير / مساعد مخدر. تتبع المعاهد التقنية وزارة التعليم العالي، بينما تتبع معاهد الصحة العالي وزارة الصحة.'}</p>
    </Panel>
    <Panel title="المواد الدراسية">
      <CoursePanel key={track} years={track === 'college' ? college : institute} />
      <div className="mt-4 border-t border-[#E5EBF0] pt-3">
        <h4 className="text-[12px] font-black text-[#183149]">{track === 'college' ? 'مواد إضافية حسب الجامعة أو الكلية' : 'مواد عامة قد تُضاف حسب المعهد'}</h4>
        <p className="mt-1.5">{track === 'college' ? 'اللغة العربية، وجرائم حزب البعث.' : 'حقوق الإنسان، والديمقراطية، واللغة العربية.'}</p>
        {track === 'college' ? <p className="mt-2 text-[11px] text-[#7B8C98]">قد تُدرَّس أخلاقيات المهنة في المرحلة الأولى بدلًا من الرابعة، بحسب الجامعة أو الكلية.</p> : null}
      </div>
    </Panel>
    <Panel title="التدريب الصيفي">
      <p>{track === 'college' ? 'يُجرى بعد اجتياز المرحلة الثانية، ويتكرر بعد اجتياز المرحلة الثالثة؛ وتتراوح مدته بين شهر وشهرين خلال العطلة الصيفية.' : 'يُجرى بعد اجتياز المرحلة الأولى، خلال العطلة الصيفية السابقة للمرحلة الثانية، ومدته من شهر إلى شهرين.'}</p>
    </Panel>
    <Panel title="شروط التقديم والقبول">
      <TopicCards topics={[
        { title: 'الكلية والمعهد التقني', text: 'القبول وفق المعدل والقبول المركزي ورغبات الطالب، ويمكن التقديم في مختلف المحافظات وفق الضوابط السنوية.' },
        { title: 'معهد الصحة العالي', text: 'التقديم لأبناء المحافظة حصرًا وفق الرقعة الجغرافية المحددة لكل معهد.' },
        { title: 'القبول الموازي', text: 'تُحدد شروطه ومعدلاته كل سنة، ولا يُعتمد فرق درجات ثابت.' }
      ]} />
      <p className="text-[11px] text-[#7B8C98]">قد تتغير الخطط الدراسية وضوابط القبول؛ يُراجع إعلان المؤسسة ودليل القبول للسنة المعنية.</p>
    </Panel>
  </div>;
}

function Intro() {
  return <div className="space-y-3">
    <Panel title="ما هو قسم تقنيات التخدير؟">
      <p>قسم تقنيات التخدير من الأقسام الطبية التقنية التي تُعنى بإعداد كوادر مؤهلة للعمل في صالات العمليات ووحدات الإفاقة والعناية المركزة. يجمع الاختصاص بين العلوم الطبية والدراسة العملية، ويؤهل خريجيه للقيام بالمهام السريرية والفنية المتعلقة برعاية المريض قبل العملية وأثناءها وبعدها.</p>
    </Panel>
    <Panel title="التقني والفني في مجال التخدير">
      <TopicCards topics={[
        { title: 'تقني تخدير', english: 'Anesthesia Technologist', text: 'خريج الكلية التقنية الطبية (قسم التخدير والعناية المركزة)، ومدة دراسته أربع سنوات، ويحصل على البكالوريوس في تقنيات التخدير والعناية المركزة.' },
        { title: 'فني تخدير / مساعد مخدر', english: 'Anesthesia Technician', text: 'خريج المعهد التقني الطبي أو معهد الصحة العالي، ومدة دراسته سنتان، ويحصل على الدبلوم في تقنيات التخدير والعناية المركزة.' }
      ]} />
    </Panel>
    <Panel title="المهام السريرية والفنية">
      <TopicCards topics={duties} />
      <p className="text-[11px] text-[#7B8C98]">تُحدَّد المهام الدقيقة بحسب المؤهل والتدريب والصلاحيات والتعليمات المعتمدة.</p>
    </Panel>
  </div>;
}

function Team() {
  return <div className="space-y-3">
    <Panel title="كوادر التخدير ومسؤولياتهم">
      <p>تقوم الرعاية التخديرية على التعاون بين الطبيب والتقني والفني وكوادر التمريض. لكل عضو دور محدد، ويُعد التواصل الواضح بين أعضاء الفريق أساسًا لسلامة المريض.</p>
      <TopicCards topics={team} />
    </Panel>
    <Panel title="العمل ضمن فريق واحد">
      <p>لا يقتصر دور التقني والفني على تجهيز المعدات؛ فهما يقومان بالمراقبة السريرية ويؤديان المهام والإجراءات المكلّفين بها. تُبنى ثقة الفريق على الكفاءة والانضباط واحترام المسؤوليات المهنية.</p>
    </Panel>
  </div>;
}

function Skills() {
  return <div className="space-y-3">
    <Panel title="المهارات الأساسية">
      <p>بداية العمل فرصة لتطوير المهارات العملية وفهم الأدوية والمعدات والتعلم من الخبرة السريرية. هذه أولويات مفيدة لكل تقني وفني تخدير:</p>
      <div className="grid grid-cols-2 gap-2" aria-label="مجالات التميز السريري">
        <div className="flex min-w-0 items-center gap-2 rounded-[15px] border border-[#DCE5EA] bg-[#F8FAFB] p-2.5">
          <FlaticonEducationIcon name="tools" size={42} />
          <div className="min-w-0">
            <h4 className="text-[12px] font-black leading-5 text-[#183149]">الأدوات الطبية</h4>
            <p className="text-[10px] leading-4 text-[#607889]">التجهيز والفحص والاستخدام الآمن</p>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 rounded-[15px] border border-[#DCE5EA] bg-[#F8FAFB] p-2.5">
          <FlaticonEducationIcon name="clinicalSkill" size={42} />
          <div className="min-w-0">
            <h4 className="text-[12px] font-black leading-5 text-[#183149]">المهارات السريرية</h4>
            <p className="text-[10px] leading-4 text-[#607889]">الممارسة تحت الإشراف والتعامل مع الحالات</p>
          </div>
        </div>
      </div>
      <TopicCards topics={skills} />
    </Panel>
    <Panel title="كيف تتطور في اختصاصك؟">
      <ul className="list-inside list-disc space-y-2">
        {['لا تكتفِ بالملخصات؛ اقرأ المراجع المعتمدة.', 'استفد من التدريب العملي وخبرات الزملاء.', 'طوّر معرفتك بالأدوية والمعدات والإجراءات.', 'اسأل عند عدم وضوح أي خطوة، والتزم بأخلاقيات المهنة وسلامة المريض.'].map(x => <li key={x}>{x}</li>)}
      </ul>
    </Panel>
  </div>;
}

function Prep() {
  return <div className="space-y-3">
    <div className="rounded-[17px] border border-[#E9DBB9] bg-[#FFF9EE] p-3.5 text-[12px] leading-6 text-[#71582D]">محتوى تعليمي لفهم التحضير قبل التخدير، وليس قائمة فحص سريرية رسمية أو بديلًا عن تقييم طبيب التخدير وبروتوكولات المستشفى.</div>
    <Panel title="الخطوة الأولى: التقييم والتحضير قبل العملية">
      <p>تُراجع حالة المريض قبل التخدير، مع التمييز بين المتطلبات الأساسية والفحوصات المطلوبة بحسب الحالة.</p>
      <div className="space-y-2">{before.map(x => <Disclosure key={x.title} title={x.title}><p>{x.text}</p></Disclosure>)}</div>
    </Panel>
    <Panel title="الخطوة الثانية: تجهيز صالة العمليات">
      <p>التأكد من جاهزية عربة التخدير والمعدات والأدوية اللازمة للعمل.</p>
      <div className="space-y-2">{during.map(x => <Disclosure key={x.title} title={x.title}><p>{x.text}</p></Disclosure>)}</div>
    </Panel>
  </div>;
}

function Career() {
  return <div className="space-y-3">
    <Panel title="المسميات الوظيفية">
      <div className="divide-y divide-[#E5EBF0] overflow-hidden rounded-[15px] border border-[#E5EBF0]">
        {[['الكلية التقنية الطبية', 'تقني طبي تخدير'], ['المعهد التقني الطبي', 'فني تخدير / مساعد مخدر'], ['معهد الصحة العالي', 'فني تخدير / مساعد مخدر']].map(([name,job]) => <div key={name} className="flex flex-wrap items-center justify-between gap-1.5 p-3"><b className="text-[#183149]">{name}</b><span>{job}</span></div>)}
      </div>
    </Panel>
    <Panel title="مجالات العمل والتعيين">
      <h4 className="font-black text-[#183149]">مجالات العمل</h4>
      <p>صالات العمليات ووحدات الإفاقة والعناية المركزة والمؤسسات الصحية الحكومية والأهلية، بحسب المؤهل والتكليف والصلاحيات المهنية.</p>
      <h4 className="font-black text-[#183149]">التعيين المركزي</h4>
      <p>يشمل خريجي الجهات الثلاث وفق قانون تدرج ذوي المهن الطبية والصحية رقم (6) لسنة 2000 وتعديلاته، وبحسب الإجراءات والضوابط النافذة. لا يعني ذلك صدور أمر التعيين فور التخرج.</p>
      <h4 className="font-black text-[#183149]">الراتب والمخصصات</h4>
      <p>تختلف بحسب الدرجة الوظيفية والشهادة والخدمة والمخصصات المستحقة؛ ولا يُعتمد مبلغ ثابت لجميع الخريجين.</p>
    </Panel>
    <Panel title="التدرج الوظيفي">
      <p>يُعرض التدرج الوظيفي وفق وصف وزارة الصحة، مع شروط الخبرة والتأهيل والترقية المعمول بها، ومن دون الإيحاء بأن الترقية تلقائية.</p>
      <div className="divide-y divide-[#E5EBF0] overflow-hidden rounded-[15px] border border-[#E5EBF0]">
        {grades.map(([name,grade]) => <div key={name} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5"><b className="text-[12px] text-[#183149]">{name}</b><span className="rounded-lg bg-[#EEF3F8] px-2 py-0.5 text-[11px] font-bold text-[#315672]">الدرجة {grade}</span></div>)}
      </div>
    </Panel>
    <Panel title="الدراسات العليا والأسئلة الشائعة">
      <p>وفق المعلومات المقدمة لهذه الصفحة، برامج الدراسات العليا في تقنيات التخدير غير متوفرة حاليًا داخل العراق، ويمكن إكمالها خارج العراق مع استيفاء شروط القبول والاعتراف بالشهادة.</p>
      <Disclosure title="هل يصبح خريج تقنيات التخدير طبيب تخدير بعد الماجستير أو الدكتوراه؟" defaultOpen>
        <p><b className="text-[#183149]">لا.</b> طبيب التخدير خريج الطب العام، الذي تستغرق دراسته في العراق ست سنوات، ثم يكمل التدريب وبرنامج الاختصاص الطبي. أما الحاصل على الدكتوراه في تقنيات التخدير والعناية المركزة، فيحمل لقب «دكتور» الأكاديمي بحسب تخصص شهادته، ولا يصبح طبيب تخدير ولا يكتسب صلاحيات الاختصاص الطبي.</p>
      </Disclosure>
      <Disclosure title="ما فائدة الشهادة العليا؟">
        <p>قد يستفيد موظف وزارة الصحة من الشهادة العليا في وضعه الوظيفي والفروقات أو المخصصات عند استيفاء شروط الوزارة والاعتراف بالشهادة. ويستطيع الحاصل على الماجستير أو الدكتوراه التقديم للتدريس في الجامعات والكليات الأهلية، أو لفرص التعيين بوزارة التعليم العالي، وقد يتولى مناصب أكاديمية وإدارية مثل مقرر القسم أو رئيسه وفق الشروط المطلوبة.</p>
      </Disclosure>
    </Panel>
  </div>;
}

export function EducationScreen({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<Section | null>(null);
  const [track, setTrack] = useState<Track>('college');
  const selected = sections.find(x => x.id === active);

  const navigate = (next: Section | null) => {
    setActive(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return <div className="space-y-4" dir="rtl">
    <button type="button" onClick={active ? () => navigate(null) : onBack}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DCE5EA] bg-white px-4 text-[12px] font-black text-[#173A63] outline-none active:bg-[#EEF3F8] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55">
      <ArrowRight size={17} aria-hidden="true" />{active ? 'عالم التخدير' : 'العودة إلى الرئيسية'}
    </button>

    <header className="overflow-hidden rounded-[26px] border border-[#DCE5EA] bg-[linear-gradient(135deg,#FFFFFF_0%,#F2F6F9_58%,#F8F2E5_100%)] shadow-[0_12px_30px_rgba(16,45,79,0.07)]">
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full border border-[#D9A441]/20 bg-white/80 px-3 py-1 text-[10px] font-black text-[#9A7122]">دليلي | مملكة التخدير</span>
          <h1 className="mt-2 text-xl font-black text-[#183149] sm:text-2xl">{selected?.title ?? 'عالم التخدير'}</h1>
          <p className="mt-1 text-[12px] font-semibold leading-6 text-[#5F7280]">{selected?.description ?? 'من أول يوم بالدراسة إلى العمل ضمن فريق التخدير'}</p>
        </div>
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] border border-[#D7E2E9] bg-white/90 text-[#315672] shadow-[0_8px_20px_rgba(24,49,73,0.08)]">
          <FlaticonEducationIcon name={selected?.icon ?? 'intro'} size={48} />
        </span>
      </div>
    </header>

    {active ? <>
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav className="flex min-w-max gap-2" aria-label="أقسام عالم التخدير">
          {sections.map(x => <button key={x.id} type="button" onClick={() => navigate(x.id)}
            aria-current={active === x.id ? 'page' : undefined}
            className={'min-h-10 rounded-full border px-3 text-[11px] font-black outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ' + (active === x.id ? 'border-[#173A63] bg-[#173A63] text-white' : 'border-[#DCE5EA] bg-white text-[#526675] active:bg-[#EEF3F8]')}>{x.title}</button>)}
        </nav>
      </div>
      {active === 'intro' ? <Intro /> : active === 'study' ? <Study track={track} onTrack={setTrack} /> : active === 'team' ? <Team /> : active === 'skills' ? <Skills /> : active === 'prep' ? <Prep /> : <Career />}
    </> : <section className="grid grid-cols-2 gap-2.5 sm:gap-3" aria-label="أقسام عالم التخدير">
      {sections.map(x => <button key={x.id} type="button" onClick={() => navigate(x.id)}
        className="group relative flex min-h-[154px] min-w-0 flex-col items-start rounded-[20px] border border-[#DCE5EA] bg-white p-3.5 text-right shadow-[0_7px_19px_rgba(16,45,79,0.05)] outline-none transition-colors hover:border-[#B6C9D8] hover:bg-[#FBFCFD] active:bg-[#F3F7FA] focus-visible:ring-2 focus-visible:ring-[#D9A441] sm:min-h-[170px] sm:p-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[15px] border border-[#E4EBF0] bg-white"><FlaticonEducationIcon name={x.icon} size={44}/></span>
        <h2 className="mt-3 text-[13px] font-black leading-6 text-[#183149] sm:text-[15px]">{x.title}</h2>
        <p className="mt-0.5 text-[11px] font-semibold leading-5 text-[#7A8995]">{x.description}</p>
        <ChevronLeft size={16} className="absolute bottom-3 left-3 text-[#9BAAB5]" aria-hidden="true" />
      </button>)}
    </section>}
  </div>;
}
