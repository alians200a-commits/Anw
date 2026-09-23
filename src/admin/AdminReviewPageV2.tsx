import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Eye, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';
import type { AnesthesiaDrug } from '../data/drugs';
import type { DrugDetail } from '../data/drugDetails';
import type { AnesthesiaEquipment } from '../data/equipment';
import type { IntravenousFluid } from '../data/fluids';
import type { ContentMediaItem } from '../types/contentMedia';
import { DrugDetailSheet } from '../components/DrugDetailSheet';
import { EquipmentSheet } from '../components/EquipmentDirectory';
import { FluidSheet } from '../components/FluidsDirectory';
import { supabase } from '../lib/supabase';

type AdminRole='owner'|'admin'|'editor'|'reviewer';
type Kind='drug'|'equipment'|'fluid';
type Profile={id:string;email:string;role:AdminRole;is_active:boolean};
type Row={id:string;content_type:string;slug:string;title_ar:string|null;title_en:string|null;status:'review';version:number;payload:unknown;updated_at:string};
type Preview=
 |{kind:'drug';drug:AnesthesiaDrug;details:DrugDetail;media:ContentMediaItem[]}
 |{kind:'equipment';equipment:AnesthesiaEquipment;media:ContentMediaItem[]}
 |{kind:'fluid';fluid:IntravenousFluid;media:ContentMediaItem[]};

const TYPE_LABEL:Record<Kind,string>={drug:'دواء',equipment:'جهاز / أداة',fluid:'سائل وريدي'};
function isRecord(v:unknown):v is Record<string,unknown>{return typeof v==='object'&&v!==null&&!Array.isArray(v);}
function mediaOf(p:Record<string,unknown>){return Array.isArray(p.media)?p.media as ContentMediaItem[]:[];}
function parse(row:Row):Preview|null{
 if(!isRecord(row.payload))return null;const p=row.payload;
 if(row.content_type==='drug'&&isRecord(p.drug)&&isRecord(p.details)){
  const d=p.drug;const x=p.details;
  if(typeof d.id==='string'&&typeof d.en==='string'&&typeof d.ar==='string'&&typeof d.category==='string'&&typeof d.categoryAr==='string'&&Array.isArray(d.classes)&&typeof d.short==='string'&&Array.isArray(d.tags)&&typeof x.feature==='string'&&Array.isArray(x.uses)&&Array.isArray(x.contraindications)&&Array.isArray(x.warnings)&&Array.isArray(x.adverseEffects)) return {kind:'drug',drug:d as unknown as AnesthesiaDrug,details:x as unknown as DrugDetail,media:mediaOf(p)};
 }
 if(row.content_type==='equipment'&&isRecord(p.equipment)){
  const e=p.equipment;
  if(typeof e.id==='string'&&typeof e.nameAr==='string'&&typeof e.nameEn==='string'&&typeof e.category==='string'&&typeof e.categoryAr==='string'&&Array.isArray(e.sourcePages)&&typeof e.summary==='string'&&Array.isArray(e.purpose)&&Array.isArray(e.keyPoints)&&Array.isArray(e.tags)) return {kind:'equipment',equipment:e as unknown as AnesthesiaEquipment,media:mediaOf(p)};
 }
 if(row.content_type==='fluid'&&isRecord(p.fluid)){
  const f=p.fluid;
  if(typeof f.id==='string'&&typeof f.nameAr==='string'&&typeof f.nameEn==='string'&&typeof f.category==='string'&&typeof f.categoryAr==='string'&&Array.isArray(f.sourcePages)&&typeof f.composition==='string'&&Array.isArray(f.role)&&Array.isArray(f.cautions)&&Array.isArray(f.tags)) return {kind:'fluid',fluid:f as unknown as IntravenousFluid,media:mediaOf(p)};
 }
 return null;
}

export default function AdminReviewPageV2(){
 const[ready,setReady]=useState(false);const[profile,setProfile]=useState<Profile|null>(null);const[items,setItems]=useState<Row[]>([]);const[selected,setSelected]=useState<Row|null>(null);const[busyId,setBusyId]=useState<string|null>(null);const[error,setError]=useState('');const[notice,setNotice]=useState('');
 const load=useCallback(async()=>{setError('');const{data:{session}}=await supabase.auth.getSession();if(!session){window.location.replace('/admin');return;}const{data:pd,error:pe}=await supabase.from('admin_profiles').select('id,email,role,is_active').eq('id',session.user.id).maybeSingle();if(pe||!pd?.is_active){setError('هذا الحساب لا يملك صلاحية مراجعة محتوى دليلي.');setReady(true);return;}const typed=pd as Profile;if(!['owner','admin','reviewer'].includes(typed.role)){setError('صفحة المراجعة متاحة للمراجع أو المدير أو المالك فقط.');setReady(true);return;}setProfile(typed);const{data,error:listError}=await supabase.from('content_items').select('id,content_type,slug,title_ar,title_en,status,version,payload,updated_at').eq('status','review').in('content_type',['drug','equipment','fluid']).order('updated_at',{ascending:true});if(listError)setError(listError.message);else setItems((data??[]) as Row[]);setReady(true);},[]);
 useEffect(()=>{void load();},[load]);
 const decide=async(item:Row,status:'approved'|'rejected')=>{setBusyId(item.id);setError('');setNotice('');try{const{data,error:updateError}=await supabase.from('content_items').update({status}).eq('id',item.id).eq('status','review').eq('version',item.version).select('id,status,version');if(updateError)throw updateError;if(!data||data.length!==1)throw new Error('هذا العنصر تغيّر من مستخدم آخر. حدّث القائمة ثم أعد المحاولة.');setSelected(null);setNotice(status==='approved'?'تم اعتماد المحتوى وإرساله للمرحلة التالية.':'تم إرجاع المحتوى للمحرر للتعديل.');await load();}catch(caught){setError(caught instanceof Error?caught.message:'تعذر حفظ قرار المراجعة.');}finally{setBusyId(null);}};
 const preview=useMemo(()=>selected?parse(selected):null,[selected]);
 if(!ready)return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري تحميل قائمة المراجعة…</div>;
 return <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#eef3f8] px-3 py-4 text-[#24313f] sm:px-6 sm:py-6"><div className="mx-auto max-w-5xl space-y-4"><header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#07182c] p-4 text-white shadow-xl sm:rounded-3xl sm:p-5"><a href="/admin" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-black"><ArrowRight size={17}/> لوحة الإدارة</a><div className="min-w-0 text-right"><p className="text-xs font-bold text-[#d9a441]">دليلي — مملكة التخدير</p><h1 className="mt-1 text-lg font-black sm:text-xl">مراجعة المحتوى</h1>{profile&&<p className="mt-1 truncate text-xs text-white/55" dir="ltr">{profile.email}</p>}</div></header>{error&&<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">{error}</div>}{notice&&<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-800">{notice}</div>}<section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-6"><div className="mb-4 flex items-center justify-between gap-3"><button type="button" onClick={()=>void load()} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#d9e6f2] bg-[#f8fbfd] px-3 py-2 text-xs font-black text-[#173a63]"><RefreshCw size={15}/> تحديث</button><div><h2 className="font-black text-[#0a2037]">بانتظار المراجعة</h2><p className="mt-1 text-xs text-slate-500">{items.length} عنصر</p></div></div>{items.length===0?<div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] p-8 text-center"><ShieldCheck className="mx-auto mb-3 text-emerald-600" size={30}/><p className="font-bold text-slate-500">ماكو محتوى بانتظار المراجعة حاليًا.</p></div>:<div className="space-y-3">{items.map((item)=>{const parsed=parse(item);const kind=item.content_type as Kind;return <article key={item.id} className="rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3.5 sm:p-4"><div className="flex min-w-0 items-start justify-between gap-3"><span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-[#173a63] ring-1 ring-[#d9e6f2]">{TYPE_LABEL[kind]??item.content_type}</span><div className="min-w-0 flex-1 text-right"><div className="break-words font-black text-[#0a2037]">{item.title_ar||item.title_en||item.slug}</div><div className="mt-1 truncate text-xs text-slate-500" dir="ltr">{item.title_en||item.slug} · v{item.version}</div></div></div><div className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-200/70 pt-3 sm:flex sm:flex-wrap"><button type="button" disabled={!parsed} onClick={()=>setSelected(item)} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#173a63] ring-1 ring-[#d9e6f2] disabled:opacity-40"><Eye size={15}/> معاينة</button><button type="button" disabled={busyId===item.id} onClick={()=>void decide(item,'approved')} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white disabled:opacity-50"><CheckCircle2 size={15}/> اعتماد</button><button type="button" disabled={busyId===item.id} onClick={()=>void decide(item,'rejected')} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200 disabled:opacity-50"><RotateCcw size={15}/> إرجاع للتعديل</button></div></article>;})}</div>}</section></div>{selected&&preview?.kind==='drug'&&<DrugDetailSheet drug={preview.drug} detail={preview.details} media={preview.media} onClose={()=>setSelected(null)}/>} {selected&&preview?.kind==='equipment'&&<EquipmentSheet item={preview.equipment} media={preview.media} onClose={()=>setSelected(null)}/>} {selected&&preview?.kind==='fluid'&&<FluidSheet item={preview.fluid} media={preview.media} onClose={()=>setSelected(null)}/>}</div>;
}
