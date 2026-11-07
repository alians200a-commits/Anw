"""Build the revised Kimya3-Ch3 package: new typography, selective new images, re-paginated IDML + preview."""
import copy
import shutil
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from idml_model import Doc, Item, write_tree  # noqa: E402
import typo  # noqa: E402
from textlayout import TextEngine  # noqa: E402
import reflow  # noqa: E402
from render import Renderer  # noqa: E402

SRC = HERE / "idml"
WORK = HERE / "work"
OUT = HERE / "out"
PREV_LINKS = HERE.parent / "redesign/previous/Kimya3-Ch3-Package/Links"
COLLECTION = HERE / "collection"

NEW_STYLES = {
    # new style, cloned from, (family, weight, size, leading), InDesign name
    "chipl": ("chip", ("Readex Pro", "Bold", 12, 16), "كبسولة-وسم"),
    "kickert": ("kicker", ("Readex Pro", "Bold", 14, 18), "وسم-سؤال-علل"),
}


def add_styles(doc):
    root = doc.styles_tree.getroot()
    group = root.find(".//RootParagraphStyleGroup")
    for new, (base, spec, name) in NEW_STYLES.items():
        typo.PARA[new] = spec
        src = group.find("ParagraphStyle[@Self='ParagraphStyle/%s']" % base)
        el = copy.deepcopy(src)
        el.set("Self", "ParagraphStyle/" + new)
        el.set("Name", name)
        el.set("NextStyle", "ParagraphStyle/" + new)
        group.append(el)
    typo.apply_to_styles(doc)


def retag_stories(doc, log):
    changed = 0
    for sp in doc.spreads:
        for it in sp.items:
            if it.type != "TextFrame":
                continue
            st = doc.stories[it.story]
            paras = st.paragraphs()
            if not paras:
                continue
            key = paras[0][0].replace("ParagraphStyle/", "")
            text = st.plain_text().strip()
            if key == "chip" and (it.name.startswith("وسم") or it.name.startswith("تسمية")):
                st.set_pstyle("ParagraphStyle/chipl"); changed += 1
            elif key == "kicker" and text in typo.TAG_WORDS:
                st.set_pstyle("ParagraphStyle/kickert"); changed += 1
    log.append(f"أُعيد تصنيف {changed} إطار وسم/تسمية إلى أنماط الوسوم الجديدة")


def write_fonts(root):
    (root / "Resources/Fonts.xml").write_text(typo.fonts_xml(), encoding="utf-8")


def zip_idml(root, out):
    out = Path(out)
    if out.exists():
        out.unlink()
    with zipfile.ZipFile(out, "w") as z:
        z.write(root / "mimetype", "mimetype", compress_type=zipfile.ZIP_STORED)
        z.write(root / "designmap.xml", "designmap.xml", compress_type=zipfile.ZIP_DEFLATED)
        for p in sorted(root.rglob("*")):
            rel = p.relative_to(root).as_posix()
            if p.is_file() and rel not in ("mimetype", "designmap.xml"):
                z.write(p, rel, compress_type=zipfile.ZIP_DEFLATED)


def main(with_images=True):
    log = []
    shutil.rmtree(WORK, ignore_errors=True)
    shutil.copytree(SRC, WORK)
    OUT.mkdir(exist_ok=True)
    links = OUT / "Links"
    shutil.rmtree(links, ignore_errors=True)
    shutil.copytree(PREV_LINKS, links)

    orig = Doc(SRC)
    doc = Doc(WORK)
    add_styles(doc)
    retag_stories(doc, log)
    engine = TextEngine(doc)
    pages = reflow.load_pages(doc)
    ruler_R, ruler_L = reflow.ruler_templates(doc)
    if with_images:
        import images
        images.apply(doc, pages, links, log)
    rf = reflow.Reflow(doc, engine, orig, log)
    for i, page in enumerate(pages):
        rf.grow(page, i + 1)
    pages = reflow.paginate(pages, doc, log)
    for s in doc.stories.values():
        s.write()
    doc.write_styles()
    write_fonts(WORK)
    # master header frames need two more points for the 11 pt header
    for m in doc.masters.values():
        for it in m.items:
            if it.type == "TextFrame" and it.name == "رأس-صفحة":
                x0, y0, x1, y1 = it.bbox()
                it.set_bbox(x0, y0 - 2, x1, y1 + 2)
        m.write()
    reflow.rebuild_spreads(doc, pages, ruler_R, ruler_L, WORK)
    idml = OUT / "Kimya3-Ch3.idml"
    zip_idml(WORK, idml)
    # render from the written package
    final = Doc(WORK)
    r = Renderer(final, links, TextEngine(final))
    n = r.render(str(OUT / "Kimya3-Ch3-Preview.pdf"))
    (OUT / "build-log.txt").write_text("\n".join(log), encoding="utf-8")
    print("pages:", n)
    print("\n".join(log))
    return n


if __name__ == "__main__":
    main(with_images="--no-images" not in sys.argv)
