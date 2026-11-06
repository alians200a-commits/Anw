from pathlib import Path
from PIL import Image, ImageFont, ImageDraw
import numpy as np
import json, html, re, hashlib
import pymupdf as fitz

BASE=Path(__file__).resolve().parent
PKG=BASE/'deliver'/'Chemistry-Editorial-Proof'
for sub in ('Links','Docs'):
    (PKG/sub).mkdir(parents=True,exist_ok=True)
MM=72/25.4
COLORS={
    'Paper':{'rgb':'#f9f7f2','cmyk':[2,2,5,0]},
    'White':{'rgb':'#ffffff','cmyk':[0,0,0,0]},
    'Ink':{'rgb':'#172b3b','cmyk':[80,60,42,58]},
    'Navy':{'rgb':'#173e58','cmyk':[93,65,39,32]},
    'Copper':{'rgb':'#b47a33','cmyk':[19,47,85,12]},
    'CopperDark':{'rgb':'#81521f','cmyk':[28,57,91,33]},
    'BlueTint':{'rgb':'#e9f0f3','cmyk':[8,3,2,0]},
    'GoldTint':{'rgb':'#f3e8d6','cmyk':[3,7,16,0]},
    'Muted':{'rgb':'#536775','cmyk':[57,36,30,22]},
    'Rule':{'rgb':'#cbd5d8','cmyk':[18,8,9,0]},
    'Red':{'rgb':'#973f37','cmyk':[22,79,74,23]},
    'RedTint':{'rgb':'#f7eeea','cmyk':[1,7,7,0]},
}
STYLES={}
def style(key,size,leading,weight='Regular',color='Ink',align='right',direction='rtl'):
    STYLES[key]=dict(font='Cairo',size=size,leading=leading,weight=weight,color=color,align=align,direction=direction)
style('Masthead',11,15,'Bold','Navy')
style('Micro',9,12,'SemiBold','Muted')
style('MicroWhite',9,12,'SemiBold','White')
style('MicroCopper',9,12,'Bold','CopperDark')
style('ChapterNumber',34,40,'Black','Copper',align='left',direction='ltr')
style('CoverTitle',44,56,'Black','Navy')
style('Intro',14.5,21,'Regular','Ink')
style('ChapterCode',18,24,'Bold','CopperDark','left','ltr')
style('LessonTitle',32,40,'Black','Navy')
style('LessonSub',14.5,20,'Medium','Muted')
style('Body',14.5,20,'Regular','Ink')
style('Question',15.5,22,'Bold','Red')
style('QuestionSmall',14.5,20,'Bold','Red')
style('Symbol',24,30,'Bold','Navy','center','ltr')
style('SymbolCopper',24,30,'Bold','CopperDark','center','ltr')
style('ElementName',11,15,'SemiBold','Navy','center')
style('Class',9.5,13,'Bold','Muted','center')
style('ClassCopper',9.5,13,'Bold','CopperDark','center')
style('Index',11,14,'Bold','Navy','center','ltr')
style('IndexWhite',11,14,'Bold','White','center','ltr')
style('IndexRed',11,14,'Bold','Red','center','ltr')
style('Oxidation',37,44,'Black','CopperDark','center','ltr')
style('Caption',11.5,16,'Regular','Ink','center')
style('PropertyLabel',14.5,20,'Bold','Navy','center')
style('Footer',9,12,'SemiBold','Muted')
style('FooterNo',10,12,'Bold','Navy','left','ltr')
style('FooterWhite',9,12,'SemiBold','White')
style('FooterWhiteNo',10,12,'Bold','White','left','ltr')
PAGES=[]
def newpage(n):
    p={'name':str(n),'items':[]};PAGES.append(p);return p

def add(p,t,name,layer='shapes',**kw):
    p['items'].append(dict(type=t,name=name,layer=layer,**kw))

def rect(p,name,x,y,w,h,fill=None,stroke=None,sw=0,r=0,layer='shapes'):
    add(p,'rect',name,layer,x=x,y=y,w=w,h=h,fill=fill,stroke=stroke,stroke_width=sw,radius=r)

def ellipse(p,name,x,y,w,h,fill=None,stroke=None,sw=0,layer='shapes'):
    add(p,'ellipse',name,layer,x=x,y=y,w=w,h=h,fill=fill,stroke=stroke,stroke_width=sw)

def line(p,name,x1,y1,x2,y2,color='Rule',sw=.5,layer='shapes'):
    add(p,'line',name,layer,x1=x1,y1=y1,x2=x2,y2=y2,stroke=color,stroke_width=sw)

def text(p,name,x,y,w,h,content,s='Body',layer='text',runs=None):
    kw=dict(x=x,y=y,w=w,h=h,text=content,style=s)
    if runs:kw['runs']=runs
    add(p,'text',name,layer,**kw)

def image(p,name,x,y,w,h,file):add(p,'image',name,'images',x=x,y=y,w=w,h=h,file=file)

def signature(p,x,y,color='Copper'):
    line(p,'signature-rail',x,y+1,x+14,y+1,color,.75,'furniture')
    for j in range(3):ellipse(p,'signature-electron-'+str(j),x+16+j*3,y,1.5,1.5,color,layer='furniture')

def footer(p,num,dark=False):
    s='FooterWhite' if dark else 'Footer';sn='FooterWhiteNo' if dark else 'FooterNo'
    if dark:
        rect(p,'footer-cover-background',135,279,85,28,'Navy',layer='furniture')
        line(p,'footer-rule',145,282,195,282,'Copper',.75,'furniture')
        text(p,'footer-name',155,285,40,7,'الكيمياء / الفصل الثالث',s,'furniture')
        text(p,'footer-number',143,285,8,6,f'{num:02d}',sn,'furniture')
    else:
        line(p,'footer-rule',15,284,195,284,'Rule',.5,'furniture')
        text(p,'footer-name',100,287,95,6,'الكيمياء / الفصل الثالث',s,'furniture')
        text(p,'footer-number',15,287,15,6,f'{num:02d}',sn,'furniture')
        signature(p,42,289)

# A new composition from the supplied illustration; no generated subject matter.
src=Image.open(BASE/'previous/Kimya3-Ch3-Package/Links/cover.jpg').convert('RGB')
# The crop removes unused sky while keeping the face, hands, ingots and furnace intact.
w=2400;h=round(w*229/230)
# Include bleed: frame spans -10..220 mm horizontally, 78..307 vertically.
crop=src.crop((0,340,2048,3072))
scale=max(w/crop.width,h/crop.height)
crop=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.LANCZOS)
crop=crop.crop((0,0,w,h))
a=np.asarray(crop,dtype=np.float32)
paper=np.array([249,247,242],dtype=np.float32)
fade=np.clip(np.arange(h)/(h*.13),0,1)**1.6
a=paper[None,None,:]*(1-fade[:,None,None])+a*fade[:,None,None]
cover=Image.fromarray(np.uint8(np.clip(a,0,255)))
cover.convert('CMYK').save(PKG/'Links/cover-editorial.jpg',quality=96,dpi=(265,265))
cover.save(BASE/'cover-composite.jpg',quality=92)

p=newpage(1)
rect(p,'warm-paper',-10,-10,230,317,'Paper',layer='background')
image(p,'cover-scene',-10,78,230,229,'Links/cover-editorial.jpg')
text(p,'chapter-number',15,8,34,23,'03','ChapterNumber')
text(p,'chapter-label',52,17,34,7,'الفصل الثالث','MicroCopper')
text(p,'publication',103,13,92,10,'كيمياء الثالث المتوسط','Masthead')
signature(p,168,27)
line(p,'masthead-rule',15,32,195,32,'Rule',.5)
text(p,'chapter-title',15,35,180,27,'عناصر الزمرة الثالثة','CoverTitle')
text(p,'group-code',15,64,31,13,'IIIA','ChapterCode')
line(p,'intro-rule',48,65,48,83,'Copper',1)
intro='وضعت هذه العناصر في الزمرة الثالثة لأن غلافها الأخير يحتوي على ( 3 إلكترونات ).'
text(p,'source-intro',55,63,140,23,intro,'Intro')
footer(p,1,True)

p=newpage(2)
rect(p,'warm-paper',-10,-10,230,317,'Paper',layer='background')
text(p,'running-head',112,10,83,7,'الفصل الثالث / عناصر الزمرة الثالثة','Micro')
text(p,'section-code',15,9,28,12,'IIIA','ChapterCode')
text(p,'lesson-title',15,22,180,23,'الصفات العامة','LessonTitle')
text(p,'lesson-subtitle',75,41,120,11,'لعناصر الزمرة الثالثة','LessonSub')
signature(p,15,46)

# Five-column classification rail, read from right to left.
rect(p,'element-field',15,56,180,44,'BlueTint',r=4)
rect(p,'boron-field',159,56,36,44,'GoldTint',r=4)
text(p,'metals-label',15,58,144,7,'فلزات','Class')
text(p,'metalloid-label',159,58,36,7,'شبه فلز','ClassCopper')
line(p,'metals-bracket',23,66,151,66,'Navy',.75)
line(p,'metals-bracket-right',151,66,151,68,'Navy',.75)
line(p,'metals-bracket-left',23,66,23,68,'Navy',.75)
elements=[('B','بورون'),('Al','المنيوم'),('Ga','كاليوم'),('In','انديوم'),('Ti','ثاليوم')]
for i,(symbol,name) in enumerate(elements):
    x=159-i*36
    text(p,'element-symbol-'+symbol,x,68,36,16,symbol,'SymbolCopper' if i==0 else 'Symbol')
    text(p,'element-name-'+symbol,x,84,36,10,name,'ElementName')
    if i>1:line(p,'element-divider-'+symbol,x+36,73,x+36,92,'Rule',.5)
text(p,'property-1-index',186,103,9,8,'1','Index')
text(p,'property-1',15,102,167,11,'كلها فلزات عدا البورون فهو شبه فلز.','Body')
line(p,'property-divider',15,115,195,115,'Rule',.5)

# An editorial why/answer treatment, not a repeated question card.
ellipse(p,'why-1-index-disc',187,119,8,8,'RedTint')
text(p,'why-1-index',187,120,8,7,'2','IndexRed')
q1='علل / طاقة تأينها أقل من طاقة تأين الزمرة الثانية ؟'
text(p,'why-1-question',15,118,168,12,q1,'Question')
a1='ج/ لأن عناصرها تحتوي على الكترون واحد في الغلاف الثانوي ( P ) بعد غلاف ( S ) مشبع أما عناصر الزمرة الثالثة فيكون غلافها الخارجي هو الثانوي المشبع ns².'
text(p,'why-1-answer',23,131,172,32,a1,'Body')
line(p,'why-1-accent',17,133,17,157,'Red',1)

rect(p,'why-2-tint',15,168,180,34,'RedTint',r=4)
rect(p,'why-2-edge',193,173,2,24,'Red')
q2='علل/ في الزمرة الواحدة كلما اتجهنا من الأعلى الى الأسفل تقل طاقة التأين؟'
text(p,'why-2-question',48,171,139,19,q2,'QuestionSmall')
text(p,'why-2-answer',48,191,139,9,'ج/ بسبب كبر حجومها الذرية.','Body')
# A downward direction cue is a diagram, not an invented quantitative scale.
line(p,'direction-arrow-stem',30,175,30,192,'Red',1)
line(p,'direction-arrow-left',30,192,27,188,'Red',1)
line(p,'direction-arrow-right',30,192,33,188,'Red',1)

text(p,'oxidation-figure',17,205,37,23,'+3','Oxidation')
line(p,'oxidation-rule',59,208,59,228,'Copper',1)
text(p,'property-3-index',186,207,9,8,'3','Index')
p3='الحالة التأكسدية المتوقعة لعناصر هذه الزمرة هي ( +3 ) وحالات تأكسدية أخرى.'
text(p,'property-3',66,206,117,25,p3,'Body')

line(p,'lower-divider',15,234,195,234,'Rule',.5)
text(p,'property-4-index',186,238,9,8,'4','Index')
p4='تمتاز بزيادة الصفة القاعدية لأكاسيدها وهيدروكسيداتها كلما اتجهنا من الأعلى الى الأسفل.'
text(p,'property-4',15,237,168,18,p4,'Body')
for i,(content,emph) in enumerate([
    ('المحاليل المائية لأكاسيد','البورون حامضية.'),
    ('المحاليل المائية لأكاسيد','الألمنيوم امفوتيرية.'),
    ('وبقية الزمرة','قاعدية.')]):
    x=137-i*61
    text(p,'solution-base-'+str(i),x,256,58,9,content,'Caption')
    text(p,'solution-kind-'+str(i),x,264,58,10,emph,'PropertyLabel')
    line(p,'solution-underline-'+str(i),x+6,275,x+52,275,'Copper' if i==0 else 'Navy',1)
footer(p,2)

LAYOUT={'width':210,'height':297,'bleed':10,'colors':COLORS,'styles':STYLES,'pages':PAGES}
(BASE/'layout.json').write_text(json.dumps(LAYOUT,ensure_ascii=False,indent=2))


def rgb(key):
    if key is None:return None
    h=COLORS[key]['rgb'];return tuple(int(h[j:j+2],16)/255 for j in (1,3,5))

def rectpt(e):return fitz.Rect(e['x']*MM,e['y']*MM,(e['x']+e['w'])*MM,(e['y']+e['h'])*MM)

def content_html(e):
    if e.get('runs'):
        chunks=[]
        for run in e['runs']:
            txt=html.escape(run['text']);pos=run.get('position','normal')
            if pos in ('sup','sub'):txt=f'<{pos}>{txt}</{pos}>'
            if run.get('direction'):txt=f'<span dir="{run["direction"]}">{txt}</span>'
            chunks.append(txt)
        return ''.join(chunks)
    s=html.escape(e['text']).replace('\n','<br>')
    # Isolate Latin science inside Arabic without changing its characters.
    s=re.sub(r'ns²','\u2066ns<sup>2</sup>\u2069',s)
    s=re.sub(r'\( P \)','\u2066( P )\u2069',s)
    s=re.sub(r'\( S \)','\u2066( S )\u2069',s)
    s=re.sub(r'\( \+3 \)','\u2066( +3 )\u2069',s)
    return s

FONT_CSS='\n'.join('@font-face {font-family: "Cairo'+w+'";src:url("Cairo-'+w+'.ttf");}' for w in ['Regular','Medium','SemiBold','Bold','ExtraBold','Black'])
ORDER={'background':0,'images':1,'shapes':2,'text':3,'labels':4,'furniture':5}

def render_pdf():
    doc=fitz.open();report=[]
    for pdata in PAGES:
        pg=doc.new_page(width=210*MM,height=297*MM)
        for e in sorted(pdata['items'],key=lambda e:ORDER[e['layer']]):
            t=e['type']
            if t=='rect':
                r=rectpt(e);rad=e.get('radius',0)
                pg.draw_rect(r,color=rgb(e['stroke']),fill=rgb(e['fill']),width=e['stroke_width'],radius=min(rad/min(e['w'],e['h']),.5) if rad else None)
            elif t=='ellipse':pg.draw_oval(rectpt(e),color=rgb(e['stroke']),fill=rgb(e['fill']),width=e['stroke_width'])
            elif t=='line':pg.draw_line(fitz.Point(e['x1']*MM,e['y1']*MM),fitz.Point(e['x2']*MM,e['y2']*MM),color=rgb(e['stroke']),width=e['stroke_width'])
            elif t=='image':pg.insert_image(rectpt(e),filename=str(PKG/e['file']))
            elif t=='text':
                s=STYLES[e['style']]
                css=FONT_CSS+f'body {{margin:0;padding:0;font-family:"Cairo{s["weight"]}";font-size:{s["size"]}pt;line-height:{s["leading"]}pt;color:{COLORS[s["color"]]["rgb"]};text-align:{s["align"]};}} p {{margin:0;padding:0;}} sup {{font-size:65%;line-height:0;}}'
                htmltext=f'<p dir="{s["direction"]}" style="text-align:{s["align"]};">{content_html(e)}</p>'
                spare,scale=pg.insert_htmlbox(rectpt(e),htmltext,css=css,archive=fitz.Archive(str(BASE/'fonts')),scale_low=1)
                report.append({'page':pdata['name'],'name':e['name'],'spare_pt':round(spare,3),'scale':round(scale,3),'font_pt':s['size']})
                if spare<0:print('OVERFLOW',pdata['name'],e['name'],e['w'],e['h'],e['text'])
    doc.set_metadata({'title':'الفصل الثالث — نموذج الهوية التحريرية الجديدة','author':'','subject':'معاينة تصميم من صفحتين؛ ليست تصديراً من InDesign','creator':'Shared layout / PyMuPDF preview','keywords':'Arabic chemistry editorial proof'})
    doc.save(PKG/'Chemistry-Editorial-Preview.pdf',garbage=4,deflate=True)
    for i,pg in enumerate(doc):
        pg.get_pixmap(matrix=fitz.Matrix(1.7,1.7)).save(str(BASE/f'page-{i+1}.png'))
    doc.close()
    (BASE/'text-fit-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    imgs=[Image.open(BASE/'page-2.png'),Image.open(BASE/'page-1.png')]
    sheet=Image.new('RGB',(imgs[0].width*2+24,imgs[0].height+24),'#d5dce0')
    for j,im in enumerate(imgs):sheet.paste(im,(12+j*(im.width+12),12))
    sheet.save(BASE/'spread.png');sheet.thumbnail((800,800));sheet.save(BASE/'spread-thumb.jpg',quality=94)
    bad=[r for r in report if r['spare_pt']<0 or r['scale']!=1]
    print('Rendered 2 pages;',len(report),'text frames;',len(bad),'overflow frames.')

if __name__=='__main__':render_pdf()
