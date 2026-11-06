#!/usr/bin/env python3
"""Build a small, editable InDesign 2023 IDML package from the shared layout."""

from __future__ import annotations

import argparse
import io
import json
import math
import re
import zipfile
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import quote

from lxml import etree
from PIL import Image, ImageOps


PACKAGE_NS = "http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging"
CONTAINER_NS = "urn:oasis:names:tc:opendocument:xmlns:container"
MM_TO_PT = 72.0 / 25.4
IDML_VERSION = "18.0"
NO_CHARACTER_STYLE = "CharacterStyle/$ID/[No character style]"
NO_PARAGRAPH_STYLE = "ParagraphStyle/$ID/[No paragraph style]"
NO_OBJECT_STYLE = "ObjectStyle/$ID/[None]"
WEIGHTS = {"Regular", "Medium", "SemiBold", "Bold", "ExtraBold", "Black"}
LAYERS = {
    "background": ("L_bg", "خلفيات"),
    "images": ("L_img", "صور"),
    "shapes": ("L_shape", "قوالب وأشكال"),
    "text": ("L_text", "نصوص ومعادلات"),
    "labels": ("L_label", "تسميات وأسهم"),
    "furniture": ("L_hf", "رأس وتذييل"),
}
LAYER_ORDER = {key: index for index, key in enumerate(LAYERS)}
JUSTIFICATION = {"right": "RightAlign", "left": "LeftAlign", "center": "CenterAlign"}
DIRECTION = {"rtl": "RightToLeftDirection", "ltr": "LeftToRightDirection"}
POSITION = {"normal": None, "sup": "Superscript", "sub": "Subscript"}


def _number(value: Any, label: str, *, minimum: float | None = None) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{label} must be a finite number")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{label} must be a finite number") from exc
    if not math.isfinite(result) or (minimum is not None and result < minimum):
        raise ValueError(f"{label} is outside its valid range")
    return result


def _text(value: Any, label: str) -> str:
    if not isinstance(value, str):
        raise ValueError(f"{label} must be a string")
    for char in value:
        code = ord(char)
        if not (code in (0x9, 0xA, 0xD) or 0x20 <= code <= 0xD7FF or 0xE000 <= code <= 0xFFFD or 0x10000 <= code <= 0x10FFFF):
            raise ValueError(f"{label} contains a character that XML 1.0 cannot represent")
    return value


def _fmt(value: float) -> str:
    return f"{value:.4f}"


def _pt(value_mm: float) -> float:
    return value_mm * MM_TO_PT


def _sub(parent: etree._Element, name: str, attrs: dict[str, Any] | None = None) -> etree._Element:
    element = etree.SubElement(parent, name)
    if attrs:
        for key, value in attrs.items():
            if value is not None:
                element.set(key, str(value))
    return element


def _package_root(local_name: str) -> etree._Element:
    return etree.Element(
        f"{{{PACKAGE_NS}}}{local_name}",
        nsmap={"idPkg": PACKAGE_NS},
        DOMVersion=IDML_VERSION,
    )


def _xml_bytes(root: etree._Element) -> bytes:
    if root.tag == "Document":
        root.addprevious(etree.ProcessingInstruction(
            "aid", 'style="50" type="document" readerVersion="6.0" featureSet="257" product="18.0(77)"'
        ))
    return etree.tostring(root.getroottree(), encoding="UTF-8", xml_declaration=True, standalone=True, pretty_print=True)


def _validate_layout(layout: dict[str, Any], package_dir: Path) -> tuple[dict[str, Any], dict[str, bytes]]:
    if not isinstance(layout, dict):
        raise ValueError("layout must be a JSON object")

    dimensions: dict[str, float] = {}
    for key, expected in (("width", 210.0), ("height", 297.0), ("bleed", 10.0)):
        if key not in layout:
            raise ValueError(f"layout.{key} is required")
        value = _number(layout[key], f"layout.{key}", minimum=0.0)
        if abs(value - expected) > 0.01:
            raise ValueError(f"layout.{key} must be {expected:g} mm for the A4 proof")
        dimensions[key] = value

    raw_colors = layout.get("colors")
    if not isinstance(raw_colors, dict) or not raw_colors:
        raise ValueError("layout.colors must be a non-empty object")
    colors: dict[str, dict[str, Any]] = {}
    for key, color in raw_colors.items():
        if not isinstance(key, str) or not key or not isinstance(color, dict):
            raise ValueError("each color must have a non-empty key and an object value")
        rgb = color.get("rgb")
        if not isinstance(rgb, str) or re.fullmatch(r"#[0-9a-fA-F]{6}", rgb) is None:
            raise ValueError(f"colors.{key}.rgb must be a #RRGGBB value")
        cmyk = color.get("cmyk")
        if not isinstance(cmyk, (list, tuple)) or len(cmyk) != 4:
            raise ValueError(f"colors.{key}.cmyk must contain four components")
        colors[key] = {
            "rgb": rgb,
            "cmyk": [_number(v, f"colors.{key}.cmyk", minimum=0.0) for v in cmyk],
        }
        if any(v > 100 for v in colors[key]["cmyk"]):
            raise ValueError(f"colors.{key}.cmyk components must be from 0 to 100")

    raw_styles = layout.get("styles")
    if not isinstance(raw_styles, dict) or not raw_styles:
        raise ValueError("layout.styles must be a non-empty object")
    styles: dict[str, dict[str, Any]] = {}
    for key, style in raw_styles.items():
        if not isinstance(key, str) or not key or not isinstance(style, dict):
            raise ValueError("each style must have a non-empty key and an object value")
        font = _text(style.get("font"), f"styles.{key}.font")
        weight = style.get("weight")
        if not isinstance(weight, str) or weight not in WEIGHTS:
            raise ValueError(f"styles.{key}.weight must be one of {', '.join(sorted(WEIGHTS))}")
        color_key = style.get("color")
        if not isinstance(color_key, str) or color_key not in colors:
            raise ValueError(f"styles.{key}.color references an unknown color")
        align = style.get("align")
        direction = style.get("direction")
        if not isinstance(align, str) or align not in JUSTIFICATION:
            raise ValueError(f"styles.{key}.align must be right, left, or center")
        if not isinstance(direction, str) or direction not in DIRECTION:
            raise ValueError(f"styles.{key}.direction must be rtl or ltr")
        styles[key] = {
            "font": font,
            "weight": weight,
            "size": _number(style.get("size"), f"styles.{key}.size", minimum=0.1),
            "leading": _number(style.get("leading"), f"styles.{key}.leading", minimum=0.1),
            "color": color_key,
            "align": align,
            "direction": direction,
        }

    raw_pages = layout.get("pages")
    if not isinstance(raw_pages, list) or len(raw_pages) != 2:
        raise ValueError("layout.pages must contain exactly two pages")
    root_dir = package_dir.resolve(strict=True)
    if not root_dir.is_dir():
        raise ValueError("package_dir must be a directory")

    pages: list[dict[str, Any]] = []
    seen_page_names: set[str] = set()
    item_name_counts: dict[str, int] = {}
    image_data: dict[str, bytes] = {}
    for page_index, raw_page in enumerate(raw_pages, start=1):
        if not isinstance(raw_page, dict):
            raise ValueError(f"pages[{page_index - 1}] must be an object")
        page_name = _text(str(raw_page.get("name", page_index)), f"pages[{page_index - 1}].name")
        if not page_name or page_name in seen_page_names:
            raise ValueError("page names must be non-empty and unique")
        seen_page_names.add(page_name)
        raw_items = raw_page.get("items")
        if not isinstance(raw_items, list):
            raise ValueError(f"pages[{page_index - 1}].items must be a list")
        items: list[dict[str, Any]] = []
        for item_index, raw_item in enumerate(raw_items):
            label = f"pages[{page_index - 1}].items[{item_index}]"
            if not isinstance(raw_item, dict):
                raise ValueError(f"{label} must be an object")
            item = dict(raw_item)
            name = _text(item.get("name"), f"{label}.name")
            if not name:
                raise ValueError(f"{label}.name must be non-empty")
            item_name_counts[name] = item_name_counts.get(name, 0) + 1
            item["_idml_name"] = name if item_name_counts[name] == 1 else f"{name} · {item_name_counts[name]}"
            layer = item.get("layer")
            if not isinstance(layer, str) or layer not in LAYERS:
                raise ValueError(f"{label}.layer must be one of {', '.join(LAYERS)}")
            raw_kind = item.get("type")
            kind = item.get("shape") if raw_kind == "shape" else raw_kind
            if not isinstance(kind, str) or kind not in {"rect", "ellipse", "line", "image", "text"}:
                raise ValueError(f"{label}.type must be shape, line, image, or text")
            item["_kind"] = kind
            item["_page_index"] = page_index
            for field in ("x", "y") if kind != "line" else ("x1", "y1", "x2", "y2"):
                item[field] = _number(item.get(field), f"{label}.{field}")
            if kind != "line":
                item["w"] = _number(item.get("w"), f"{label}.w", minimum=0.001)
                item["h"] = _number(item.get("h"), f"{label}.h", minimum=0.001)
            item["_id"] = f"item_{page_index:02d}_{item_index + 1:04d}"
            if kind in {"rect", "ellipse"}:
                for field in ("fill", "stroke"):
                    key = item.get(field)
                    if key is not None and (not isinstance(key, str) or key not in colors):
                        raise ValueError(f"{label}.{field} references an unknown color")
                item["_stroke_width"] = _number(item.get("stroke_width", 0), f"{label}.stroke_width", minimum=0)
                radius = _number(item.get("radius", 0), f"{label}.radius", minimum=0)
                if radius > min(item["w"], item["h"]) / 2:
                    raise ValueError(f"{label}.radius cannot exceed half of the smaller dimension")
                item["_radius"] = radius if kind == "rect" else 0.0
            elif kind == "line":
                key = item.get("stroke")
                if not isinstance(key, str) or key not in colors:
                    raise ValueError(f"{label}.stroke references an unknown color")
                item["_stroke_width"] = _number(item.get("stroke_width"), f"{label}.stroke_width", minimum=0.001)
            elif kind == "image":
                file_name = item.get("file")
                if not isinstance(file_name, str):
                    raise ValueError(f"{label}.file must be a relative Links path")
                relative = PurePosixPath(file_name)
                if relative.is_absolute() or not relative.parts or relative.parts[0] != "Links" or ".." in relative.parts:
                    raise ValueError(f"{label}.file must stay inside the package Links directory")
                source = root_dir.joinpath(*relative.parts).resolve(strict=True)
                try:
                    source.relative_to(root_dir)
                except ValueError as exc:
                    raise ValueError(f"{label}.file resolves outside package_dir") from exc
                try:
                    with Image.open(source) as opened:
                        if opened.format != "JPEG":
                            raise ValueError(f"{label}.file must be a JPEG")
                        image = ImageOps.exif_transpose(opened)
                        width_px, height_px = image.size
                        orientation = opened.getexif().get(274, 1)
                        if opened.mode == "CMYK" and orientation == 1:
                            data = source.read_bytes()
                        else:
                            converted = image.convert("CMYK")
                            buffer = io.BytesIO()
                            converted.save(buffer, format="JPEG", quality=95, subsampling=0)
                            data = buffer.getvalue()
                except (OSError, ValueError) as exc:
                    if isinstance(exc, ValueError) and str(exc).endswith("must be a JPEG"):
                        raise
                    raise ValueError(f"{label}.file is not a readable JPEG image: {exc}") from exc
                frame_ratio = item["w"] / item["h"]
                image_ratio = width_px / height_px
                if abs(frame_ratio - image_ratio) / image_ratio > 0.001:
                    raise ValueError(f"{label}.file aspect ratio must match its frame within 0.1% (no crop is intended)")
                archive_name = relative.as_posix()
                image_data[archive_name] = data
                item["_image_path"] = archive_name
                item["_image_width"] = width_px
                item["_image_height"] = height_px
            elif kind == "text":
                style_key = item.get("style")
                if not isinstance(style_key, str) or style_key not in styles:
                    raise ValueError(f"{label}.style references an unknown style")
                source_text = _text(item.get("text"), f"{label}.text")
                item["_style_key"] = style_key
                raw_runs = item.get("runs")
                if raw_runs is None:
                    runs = [{"text": source_text, "position": "normal"}]
                else:
                    if not isinstance(raw_runs, list):
                        raise ValueError(f"{label}.runs must be a list")
                    runs = []
                    for run_index, raw_run in enumerate(raw_runs):
                        if not isinstance(raw_run, dict):
                            raise ValueError(f"{label}.runs[{run_index}] must be an object")
                        run_text = _text(raw_run.get("text"), f"{label}.runs[{run_index}].text")
                        position = raw_run.get("position", "normal")
                        if not isinstance(position, str) or position not in POSITION:
                            raise ValueError(f"{label}.runs[{run_index}].position must be normal, sup, or sub")
                        run: dict[str, Any] = {"text": run_text, "position": position}
                        if "weight" in raw_run:
                            if not isinstance(raw_run["weight"], str) or raw_run["weight"] not in WEIGHTS:
                                raise ValueError(f"{label}.runs[{run_index}].weight is not a supported weight")
                            run["weight"] = raw_run["weight"]
                        if "direction" in raw_run:
                            if not isinstance(raw_run["direction"], str) or raw_run["direction"] not in DIRECTION:
                                raise ValueError(f"{label}.runs[{run_index}].direction must be rtl or ltr")
                            run["direction"] = raw_run["direction"]
                        runs.append(run)
                    if "".join(run["text"] for run in runs) != source_text:
                        raise ValueError(f"{label}.runs text must concatenate to item.text")
                item["_runs"] = runs
            items.append(item)
        pages.append({"name": page_name, "items": items})

    return {"dimensions": dimensions, "colors": colors, "styles": styles, "pages": pages}, image_data


def _add_path(parent: etree._Element, points: list[tuple[float, float, float, float, float, float]], *, opened: bool) -> None:
    properties = _sub(parent, "Properties")
    geometry = _sub(properties, "PathGeometry")
    path_type = _sub(geometry, "GeometryPathType", {"PathOpen": str(opened).lower()})
    array = _sub(path_type, "PathPointArray")
    for x, y, lx, ly, rx, ry in points:
        _sub(array, "PathPointType", {
            "Anchor": f"{_fmt(x)} {_fmt(y)}",
            "LeftDirection": f"{_fmt(lx)} {_fmt(ly)}",
            "RightDirection": f"{_fmt(rx)} {_fmt(ry)}",
        })


def _rectangle_points(x: float, y: float, width: float, height: float) -> list[tuple[float, float, float, float, float, float]]:
    x2, y2 = x + width, y + height
    return [(px, py, px, py, px, py) for px, py in ((x, y), (x, y2), (x2, y2), (x2, y))]


def _ellipse_points(x: float, y: float, width: float, height: float) -> list[tuple[float, float, float, float, float, float]]:
    cx, cy = x + width / 2, y + height / 2
    rx, ry = width / 2, height / 2
    k = 0.5522847498
    return [
        (cx, y, cx - k * rx, y, cx + k * rx, y),
        (x + width, cy, x + width, cy - k * ry, x + width, cy + k * ry),
        (cx, y + height, cx + k * rx, y + height, cx - k * rx, y + height),
        (x, cy, x, cy + k * ry, x, cy - k * ry),
    ]


def _color_ref(color_key: str | None, color_ids: dict[str, str]) -> str:
    return "Swatch/None" if color_key is None else color_ids[color_key]


def _add_default_style_groups(root: etree._Element) -> tuple[etree._Element, etree._Element, etree._Element, etree._Element]:
    char_group = _sub(root, "RootCharacterStyleGroup", {"Self": "rcsg"})
    _sub(char_group, "CharacterStyle", {
        "Self": NO_CHARACTER_STYLE,
        "Imported": "false",
        "SplitDocument": "false",
        "EmitCss": "true",
        "StyleUniqueId": "$ID/",
        "IncludeClass": "true",
        "Name": "$ID/[No character style]",
    })

    para_group = _sub(root, "RootParagraphStyleGroup", {"Self": "rpsg"})
    _sub(para_group, "ParagraphStyle", {
        "Self": NO_PARAGRAPH_STYLE,
        "Name": "$ID/[No paragraph style]",
        "Imported": "false",
        "NextStyle": NO_PARAGRAPH_STYLE,
        "KeyboardShortcut": "0 0",
    })
    normal = _sub(para_group, "ParagraphStyle", {
        "Self": "ParagraphStyle/$ID/NormalParagraphStyle",
        "Name": "$ID/NormalParagraphStyle",
        "Imported": "false",
        "NextStyle": "ParagraphStyle/$ID/NormalParagraphStyle",
        "KeyboardShortcut": "0 0",
        "PointSize": "12",
        "FontStyle": "Regular",
    })
    properties = _sub(normal, "Properties")
    _sub(properties, "BasedOn", {"type": "string"}).text = "$ID/[No paragraph style]"
    _sub(properties, "AppliedFont", {"type": "string"}).text = "Cairo"
    _sub(properties, "Leading", {"type": "unit"}).text = "14"

    cell_group = _sub(root, "RootCellStyleGroup", {"Self": "rcesg"})
    _sub(cell_group, "CellStyle", {
        "Self": "CellStyle/$ID/[None]",
        "AppliedParagraphStyle": NO_PARAGRAPH_STYLE,
        "Name": "$ID/[None]",
    })
    table_group = _sub(root, "RootTableStyleGroup", {"Self": "rtsg"})
    _sub(table_group, "TableStyle", {"Self": "TableStyle/$ID/[Basic Table]", "Name": "$ID/[Basic Table]"})

    object_group = _sub(root, "RootObjectStyleGroup", {"Self": "rosg"})
    _sub(object_group, "ObjectStyle", {
        "Self": NO_OBJECT_STYLE,
        "Name": "$ID/[None]",
        "AppliedParagraphStyle": NO_PARAGRAPH_STYLE,
        "FillColor": "Swatch/None",
        "StrokeColor": "Swatch/None",
        "StrokeWeight": "0",
    })
    for name in ("Normal Graphics Frame", "Normal Text Frame"):
        obj = _sub(object_group, "ObjectStyle", {
            "Self": f"ObjectStyle/$ID/[{name}]",
            "Name": f"$ID/[{name}]",
            "AppliedParagraphStyle": NO_PARAGRAPH_STYLE,
            "FillColor": "Swatch/None",
            "StrokeColor": "Swatch/None",
            "StrokeWeight": "0",
        })
        based_on = _sub(_sub(obj, "Properties"), "BasedOn", {"type": "string"})
        based_on.text = "$ID/[None]"
    return char_group, para_group, cell_group, object_group


def _make_styles(
    colors: dict[str, dict[str, Any]], styles: dict[str, dict[str, Any]], pages: list[dict[str, Any]],
) -> tuple[etree._Element, dict[str, str], dict[str, str], dict[str, str], dict[tuple[Any, ...], str]]:
    root = _package_root("Styles")
    char_group, para_group, _, object_group = _add_default_style_groups(root)
    color_ids = {key: f"Color/c{index:04d}" for index, key in enumerate(colors, start=1)}
    para_ids = {key: f"ParagraphStyle/p{index:04d}" for index, key in enumerate(styles, start=1)}

    for key, style in styles.items():
        para = _sub(para_group, "ParagraphStyle", {
            "Self": para_ids[key],
            "Name": key,
            "Imported": "false",
            "NextStyle": para_ids[key],
            "KeyboardShortcut": "0 0",
            "FontStyle": style["weight"],
            "PointSize": _fmt(style["size"]),
            "FillColor": color_ids[style["color"]],
            "Justification": JUSTIFICATION[style["align"]],
            "ParagraphDirection": DIRECTION[style["direction"]],
            "Composer": "$ID/HL Composer Optyca",
            "AppliedLanguage": "$ID/Arabic" if style["direction"] == "rtl" else "$ID/English: USA",
            "Hyphenation": "false",
            "KeepLinesTogether": "true",
        })
        properties = _sub(para, "Properties")
        _sub(properties, "BasedOn", {"type": "string"}).text = "ParagraphStyle/$ID/NormalParagraphStyle"
        _sub(properties, "AppliedFont", {"type": "string"}).text = style["font"]
        _sub(properties, "Leading", {"type": "unit"}).text = _fmt(style["leading"])

    char_ids: dict[tuple[Any, ...], str] = {}
    char_counter = 0
    for page in pages:
        for item in page["items"]:
            if item["_kind"] != "text":
                continue
            base = styles[item["_style_key"]]
            for run in item["_runs"]:
                weight = run.get("weight", base["weight"])
                direction = run.get("direction", base["direction"])
                position = run["position"]
                if weight == base["weight"] and direction == base["direction"] and position == "normal":
                    continue
                key = (item["_style_key"], weight, direction, position)
                if key in char_ids:
                    continue
                char_counter += 1
                char_id = f"CharacterStyle/c{char_counter:04d}"
                char_ids[key] = char_id
                attrs = {
                    "Self": char_id,
                    "Imported": "false",
                    "Name": f"{item['name']} · {position} · {weight} · {direction}",
                    "FontStyle": weight,
                    "AppliedLanguage": "$ID/Arabic" if direction == "rtl" else "$ID/English: USA",
                    "CharacterDirection": DIRECTION[direction],
                }
                if POSITION[position] is not None:
                    attrs["Position"] = POSITION[position]
                character = _sub(char_group, "CharacterStyle", attrs)
                _sub(_sub(character, "Properties"), "AppliedFont", {"type": "string"}).text = base["font"]

    object_ids: dict[str, str] = {}
    object_counter = 0
    for page in pages:
        for item in page["items"]:
            object_counter += 1
            object_id = f"ObjectStyle/o{object_counter:04d}"
            object_ids[item["_id"]] = object_id
            kind = item["_kind"]
            fill = _color_ref(item.get("fill") if kind in {"rect", "ellipse"} else None, color_ids)
            stroke = _color_ref(item.get("stroke") if kind in {"rect", "ellipse", "line"} else None, color_ids)
            attrs = {
                "Self": object_id,
                "Name": item["_idml_name"],
                "Imported": "false",
                "AppliedParagraphStyle": para_ids.get(item.get("_style_key"), NO_PARAGRAPH_STYLE),
                "FillColor": fill,
                "StrokeColor": stroke,
                "StrokeWeight": _fmt(item.get("_stroke_width", 0)),
            }
            if kind == "rect" and item.get("_radius", 0) > 0:
                radius = _fmt(_pt(item["_radius"]))
                for corner in ("TopLeft", "TopRight", "BottomRight", "BottomLeft"):
                    attrs[f"{corner}CornerOption"] = "RoundedCorner"
                    attrs[f"{corner}CornerRadius"] = radius
            obj = _sub(object_group, "ObjectStyle", attrs)
            _sub(_sub(obj, "Properties"), "BasedOn", {"type": "string"}).text = "$ID/[None]"
    return root, color_ids, para_ids, object_ids, char_ids


def _make_graphic(colors: dict[str, dict[str, Any]], color_ids: dict[str, str]) -> etree._Element:
    root = _package_root("Graphic")
    defaults = [
        ("Color/Black", "Black", "Process", "CMYK", "0 0 0 100", "Specialblack", "false", "false"),
        ("Color/Paper", "Paper", "Process", "CMYK", "0 0 0 0", "Specialpaper", "true", "false"),
        ("Color/Registration", "Registration", "Registration", "CMYK", "100 100 100 100", "Specialregistration", "false", "false"),
    ]
    for self_id, name, model, space, value, override, editable, removable in defaults:
        _sub(root, "Color", {
            "Self": self_id,
            "Model": model,
            "Space": space,
            "ColorValue": value,
            "ColorOverride": override,
            "BaseColor": "n",
            "SpotInkAliasSpotColorReference": "n",
            "Name": name,
            "ColorEditable": editable,
            "ColorRemovable": removable,
            "Visible": "true",
            "SwatchCreatorID": "7937",
            "SwatchColorGroupReference": "n",
        })
    for key, color in colors.items():
        _sub(root, "Color", {
            "Self": color_ids[key],
            "Model": "Process",
            "Space": "CMYK",
            "ColorValue": " ".join(_fmt(value) for value in color["cmyk"]),
            "ColorOverride": "Normal",
            "BaseColor": "n",
            "SpotInkAliasSpotColorReference": "n",
            "Name": key,
            "ColorEditable": "true",
            "ColorRemovable": "true",
            "Visible": "true",
            "SwatchCreatorID": "7937",
            "SwatchColorGroupReference": "n",
        })
    for name, angle, density, order in (
        ("Cyan", "75", "0.61", "1"),
        ("Magenta", "15", "0.76", "2"),
        ("Yellow", "0", "0.16", "3"),
        ("Black", "45", "1.7", "4"),
    ):
        _sub(root, "Ink", {
            "Self": f"Ink/$ID/Process {name}",
            "Name": f"$ID/Process {name}",
            "Angle": angle,
            "ConvertToProcess": "false",
            "Frequency": "70",
            "NeutralDensity": density,
            "PrintInk": "true",
            "TrapOrder": order,
            "InkType": "Normal",
        })
    return root


def _make_fonts(styles: dict[str, dict[str, Any]]) -> etree._Element:
    root = _package_root("Fonts")
    families: dict[str, set[str]] = {}
    for style in styles.values():
        families.setdefault(style["font"], set()).add(style["weight"])
    for family_index, (family, weights) in enumerate(sorted(families.items()), start=1):
        family_id = f"fontfam{family_index:03d}"
        family_node = _sub(root, "FontFamily", {"Self": family_id, "Name": family})
        for face_index, weight in enumerate(sorted(weights, key=lambda value: list(sorted(WEIGHTS)).index(value)), start=1):
            postscript = f"{family.replace(' ', '-')}-{weight}"
            full_name = f"{family} {weight}"
            _sub(family_node, "Font", {
                "Self": f"{family_id}_{face_index:02d}",
                "FontFamily": family,
                "Name": full_name,
                "PostScriptName": postscript,
                "Status": "Installed",
                "FontStyleName": weight,
                "FontType": "OpenTypeTT",
                "WritingScript": "0",
                "FullName": full_name,
                "FullNameNative": full_name,
                "FontStyleNameNative": weight,
                "PlatformName": "$ID/",
            })
    return root


def _make_preferences(dimensions: dict[str, float]) -> etree._Element:
    root = _package_root("Preferences")
    width, height, bleed = (_pt(dimensions[key]) for key in ("width", "height", "bleed"))
    _sub(root, "DocumentPreference", {
        "PageHeight": _fmt(height),
        "PageWidth": _fmt(width),
        "PagesPerDocument": "2",
        "FacingPages": "false",
        "DocumentBleedTopOffset": _fmt(bleed),
        "DocumentBleedBottomOffset": _fmt(bleed),
        "DocumentBleedInsideOrLeftOffset": _fmt(bleed),
        "DocumentBleedOutsideOrRightOffset": _fmt(bleed),
        "DocumentBleedUniformSize": "true",
        "SlugTopOffset": "0",
        "SlugBottomOffset": "0",
        "SlugInsideOrLeftOffset": "0",
        "SlugRightOrOutsideOffset": "0",
        "DocumentSlugUniformSize": "false",
        "PreserveLayoutWhenShuffling": "true",
        "AllowPageShuffle": "true",
        "OverprintBlack": "true",
        "PageBinding": "RightToLeft",
        "ColumnDirection": "Horizontal",
        "ColumnGuideLocked": "true",
        "MasterTextFrame": "false",
        "SnippetImportUsesOriginalLocation": "false",
        "StartPageNumber": "1",
        "Intent": "PrintIntent",
    })
    _sub(root, "MarginPreference", {
        "ColumnCount": "1",
        "ColumnGutter": "0",
        "Top": _fmt(_pt(10)),
        "Bottom": _fmt(_pt(10)),
        "Left": _fmt(_pt(10)),
        "Right": _fmt(_pt(10)),
        "ColumnDirection": "Horizontal",
    })
    _sub(root, "TextPreference", {
        "TypographersQuotes": "true",
        "SuperscriptSize": "60",
        "SuperscriptPosition": "33.3",
        "SubscriptSize": "60",
        "SubscriptPosition": "20",
    })
    return root


def _make_story(story_id: str, item: dict[str, Any], styles: dict[str, dict[str, Any]], para_ids: dict[str, str], char_ids: dict[tuple[Any, ...], str]) -> etree._Element:
    root = _package_root("Story")
    story = _sub(root, "Story", {
        "Self": story_id,
        "AppliedTOCStyle": "n",
        "TrackChanges": "false",
        "StoryTitle": item["name"],
        "AppliedNamedGrid": "n",
    })
    direction = styles[item["_style_key"]]["direction"]
    _sub(story, "StoryPreference", {
        "OpticalMarginAlignment": "false",
        "OpticalMarginSize": "12",
        "FrameType": "TextFrameType",
        "StoryOrientation": "Horizontal",
        "StoryDirection": DIRECTION[direction],
    })
    runs = item["_runs"]
    paragraphs: list[list[dict[str, Any]]] = [[]]
    for run in runs:
        pieces = run["text"].split("\n")
        for piece_index, piece in enumerate(pieces):
            paragraphs[-1].append({**run, "text": piece})
            if piece_index < len(pieces) - 1:
                paragraphs.append([])
    for paragraph_runs in paragraphs:
        paragraph = _sub(story, "ParagraphStyleRange", {"AppliedParagraphStyle": para_ids[item["_style_key"]]})
        if not paragraph_runs:
            paragraph_runs = [{"text": "", "position": "normal"}]
        for run in paragraph_runs:
            base = styles[item["_style_key"]]
            weight = run.get("weight", base["weight"])
            run_direction = run.get("direction", base["direction"])
            position = run["position"]
            key = (item["_style_key"], weight, run_direction, position)
            char_id = char_ids.get(key, NO_CHARACTER_STYLE)
            char_range = _sub(paragraph, "CharacterStyleRange", {"AppliedCharacterStyle": char_id})
            _sub(char_range, "Content").text = run["text"]
    return root


def _make_spread(
    page: dict[str, Any], page_index: int, dimensions: dict[str, float],
    color_ids: dict[str, str], para_ids: dict[str, str], object_ids: dict[str, str],
    story_ids: dict[str, str], styles: dict[str, dict[str, Any]],
) -> etree._Element:
    root = _package_root("Spread")
    width, height = _pt(dimensions["width"]), _pt(dimensions["height"])
    spread = _sub(root, "Spread", {
        "Self": f"sp{page_index}",
        "PageCount": "1",
        "BindingLocation": "1",
        "ShowMasterItems": "true",
        "AllowPageShuffle": "false",
        "ItemTransform": "1 0 0 1 0 0",
        "FlattenerOverride": "Default",
    })
    page_node = _sub(spread, "Page", {
        "Self": f"pg{page_index}",
        "Name": page["name"],
        "AppliedMaster": "n",
        "GeometricBounds": f"0 0 {_fmt(height)} {_fmt(width)}",
        "ItemTransform": f"1 0 0 1 {_fmt(-width / 2)} {_fmt(-height / 2)}",
        "MasterPageTransform": "1 0 0 1 0 0",
        "OverrideList": "",
    })
    _sub(page_node, "MarginPreference", {
        "ColumnCount": "1",
        "ColumnGutter": "0",
        "Top": _fmt(_pt(10)),
        "Bottom": _fmt(_pt(10)),
        "Left": _fmt(_pt(10)),
        "Right": _fmt(_pt(10)),
        "ColumnDirection": "Horizontal",
    })

    image_counter = 0
    link_counter = 0
    for item in sorted(page["items"], key=lambda row: LAYER_ORDER[row["layer"]]):
        kind = item["_kind"]
        name = item["_idml_name"]
        object_style = object_ids[item["_id"]]
        common = {
            "Self": item["_id"],
            "ItemLayer": LAYERS[item["layer"]][0],
            "Name": name,
            "FillColor": _color_ref(item.get("fill") if kind in {"rect", "ellipse"} else None, color_ids),
            "StrokeColor": _color_ref(item.get("stroke") if kind in {"rect", "ellipse", "line"} else None, color_ids),
            "StrokeWeight": _fmt(item.get("_stroke_width", 0)),
            "ItemTransform": "1 0 0 1 0 0",
            "AppliedObjectStyle": object_style,
        }
        if kind in {"rect", "ellipse", "image"}:
            x = _pt(item["x"] - dimensions["width"] / 2)
            y = _pt(item["y"] - dimensions["height"] / 2)
            w, h = _pt(item["w"]), _pt(item["h"])
            if kind == "ellipse":
                node = _sub(spread, "Oval", {**common, "ContentType": "Unassigned"})
                _add_path(node, _ellipse_points(x, y, w, h), opened=False)
            else:
                if kind == "image":
                    common.update({"ContentType": "GraphicType", "FillColor": "Swatch/None", "StrokeColor": "Swatch/None", "StrokeWeight": "0"})
                    for corner in ("TopLeft", "TopRight", "BottomRight", "BottomLeft"):
                        common[f"{corner}CornerOption"] = "None"
                else:
                    common["ContentType"] = "Unassigned"
                    radius = _pt(item.get("_radius", 0))
                    option = "RoundedCorner" if radius > 0 else "None"
                    for corner in ("TopLeft", "TopRight", "BottomRight", "BottomLeft"):
                        common[f"{corner}CornerOption"] = option
                        if radius > 0:
                            common[f"{corner}CornerRadius"] = _fmt(radius)
                node = _sub(spread, "Rectangle", common)
                _add_path(node, _rectangle_points(x, y, w, h), opened=False)
                if kind == "image":
                    _sub(node, "FrameFittingOption", {
                        "LeftCrop": "0", "TopCrop": "0", "RightCrop": "0", "BottomCrop": "0",
                        "FittingOnEmptyFrame": "FillProportionally",
                    })
                    image_counter += 1
                    link_counter += 1
                    scale = w / item["_image_width"]
                    image = _sub(node, "Image", {
                        "Self": f"im{page_index}_{image_counter}",
                        "ItemTransform": f"{_fmt(scale)} 0 0 {_fmt(scale)} {_fmt(x)} {_fmt(y)}",
                        "ImageTypeName": "$ID/JPEG",
                        "ActualPpi": "72 72",
                        "EffectivePpi": f"{_fmt(72 / scale)} {_fmt(72 / scale)}",
                        "Space": "$ID/CMYK",
                    })
                    props = _sub(image, "Properties")
                    _sub(props, "GraphicBounds", {
                        "Left": "0", "Top": "0",
                        "Right": str(item["_image_width"]), "Bottom": str(item["_image_height"]),
                    })
                    _sub(image, "Link", {
                        "Self": f"lk{page_index}_{link_counter}",
                        "LinkResourceURI": f"file:{quote(item['_image_path'], safe='/')}",
                        "LinkResourceFormat": "$ID/JPEG",
                        "StoredState": "Normal",
                        "LinkClassID": "35906",
                        "LinkClientID": "257",
                        "LinkResourceModified": "false",
                        "LinkObjectModified": "false",
                        "ShowInUI": "true",
                        "CanEmbed": "true",
                        "CanUnembed": "true",
                        "CanPackage": "true",
                        "ImportPolicy": "NoAutoImport",
                        "ExportPolicy": "NoAutoExport",
                    })
        elif kind == "line":
            node = _sub(spread, "GraphicLine", {**common, "ContentType": "Unassigned", "LeftLineEnd": "None", "RightLineEnd": "None"})
            x1 = _pt(item["x1"] - dimensions["width"] / 2)
            y1 = _pt(item["y1"] - dimensions["height"] / 2)
            x2 = _pt(item["x2"] - dimensions["width"] / 2)
            y2 = _pt(item["y2"] - dimensions["height"] / 2)
            points = [(x1, y1, x1, y1, x1, y1), (x2, y2, x2, y2, x2, y2)]
            _add_path(node, points, opened=True)
        else:
            story_id = story_ids[item["_id"]]
            node = _sub(spread, "TextFrame", {
                **common,
                "ParentStory": story_id,
                "PreviousTextFrame": "n",
                "NextTextFrame": "n",
                "ContentType": "TextType",
            })
            x = _pt(item["x"] - dimensions["width"] / 2)
            y = _pt(item["y"] - dimensions["height"] / 2)
            w, h = _pt(item["w"]), _pt(item["h"])
            _add_path(node, _rectangle_points(x, y, w, h), opened=False)
            baseline = _fmt(styles[item["_style_key"]]["size"])
            pref = _sub(node, "TextFramePreference", {
                "TextColumnCount": "1",
                "VerticalJustification": "TopAlign",
                "FirstBaselineOffset": "FixedHeight",
                "MinimumFirstBaselineOffset": baseline,
                "AutoSizingType": "Off",
            })
            inset = _sub(_sub(pref, "Properties"), "InsetSpacing", {"type": "list"})
            for _ in range(4):
                _sub(inset, "ListItem", {"type": "unit"}).text = "0.0000"

    return root


def _make_designmap(pages: list[dict[str, Any]], story_ids: dict[str, str]) -> etree._Element:
    stories = [story_ids[item["_id"]] for page in pages for item in page["items"] if item["_kind"] == "text"]
    root = etree.Element("Document", nsmap={"idPkg": PACKAGE_NS}, DOMVersion=IDML_VERSION, Self="d", Name="Arabic chemistry proof.indd",
                         StoryList=" ".join(stories), ZeroPoint="0 0", ActiveLayer=LAYERS["text"][0],
                         CMYKProfile="Coated FOGRA39 (ISO 12647-2:2004)", RGBProfile="sRGB IEC61966-2.1",
                         SolidColorIntent="UseColorSettings", AfterBlendingIntent="UseColorSettings",
                         DefaultImageIntent="UseColorSettings", RGBPolicy="PreserveEmbeddedProfiles",
                         CMYKPolicy="CombinationOfPreserveAndSafeCmyk", AccurateLABSpots="false")
    for element, src in (("Graphic", "Resources/Graphic.xml"), ("Fonts", "Resources/Fonts.xml"),
                         ("Styles", "Resources/Styles.xml"), ("Preferences", "Resources/Preferences.xml")):
        _sub(root, f"{{{PACKAGE_NS}}}{element}", {"src": src})
    for layer_id, layer_name in LAYERS.values():
        _sub(root, "Layer", {
            "Self": layer_id, "Name": layer_name, "Visible": "true", "Locked": "false",
            "IgnoreWrap": "false", "ShowGuides": "true", "LockGuides": "false",
            "UI": "true", "Expendable": "true", "Printable": "true",
        })
    for index in range(1, len(pages) + 1):
        _sub(root, f"{{{PACKAGE_NS}}}Spread", {"src": f"Spreads/Spread_sp{index}.xml"})
    _sub(root, "Section", {
        "Self": "sec1", "Length": str(len(pages)), "Name": "", "ContinueNumbering": "false",
        "IncludeSectionPrefix": "false", "PageNumberStyle": "Arabic", "PageStart": "pg1",
        "SectionPrefix": "", "PageNumberStart": "1",
    })
    for page in pages:
        for item in page["items"]:
            if item["_kind"] == "text":
                _sub(root, f"{{{PACKAGE_NS}}}Story", {"src": f"Stories/Story_{story_ids[item['_id']]}.xml"})
    return root


def export_idml(layout: dict[str, Any], package_dir: str | Path, output_path: str | Path) -> Path:
    """Export two A4 pages as editable InDesign 2023 IDML with linked CMYK JPEGs."""
    normalized, image_data = _validate_layout(layout, Path(package_dir))
    pages = normalized["pages"]
    styles = normalized["styles"]
    colors = normalized["colors"]
    dimensions = normalized["dimensions"]

    style_root, color_ids, para_ids, object_ids, char_ids = _make_styles(colors, styles, pages)
    story_ids: dict[str, str] = {}
    story_index = 0
    for page in pages:
        for item in page["items"]:
            if item["_kind"] == "text":
                story_index += 1
                story_ids[item["_id"]] = f"st{story_index}"

    entries: dict[str, bytes] = {
        "designmap.xml": _xml_bytes(_make_designmap(pages, story_ids)),
        "META-INF/container.xml": _xml_bytes(_container_root()),
        "Resources/Graphic.xml": _xml_bytes(_make_graphic(colors, color_ids)),
        "Resources/Fonts.xml": _xml_bytes(_make_fonts(styles)),
        "Resources/Preferences.xml": _xml_bytes(_make_preferences(dimensions)),
        "Resources/Styles.xml": _xml_bytes(style_root),
    }
    for page_index, page in enumerate(pages, start=1):
        spread = _make_spread(page, page_index, dimensions, color_ids, para_ids, object_ids, story_ids, styles)
        entries[f"Spreads/Spread_sp{page_index}.xml"] = _xml_bytes(spread)
        for item in page["items"]:
            if item["_kind"] == "text":
                story_id = story_ids[item["_id"]]
                entries[f"Stories/Story_{story_id}.xml"] = _xml_bytes(
                    _make_story(story_id, item, styles, para_ids, char_ids)
                )
    entries.update(image_data)

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(destination, "w") as archive:
        archive.writestr("mimetype", "application/vnd.adobe.indesign-idml-package", compress_type=zipfile.ZIP_STORED)
        for name, data in entries.items():
            archive.writestr(name, data, compress_type=zipfile.ZIP_DEFLATED)
    return destination


def _container_root() -> etree._Element:
    root = etree.Element(f"{{{CONTAINER_NS}}}container", nsmap={None: CONTAINER_NS}, version="1.0")
    rootfiles = _sub(root, f"{{{CONTAINER_NS}}}rootfiles")
    _sub(rootfiles, f"{{{CONTAINER_NS}}}rootfile", {"full-path": "designmap.xml", "media-type": "text/xml"})
    return root


def main() -> None:
    parser = argparse.ArgumentParser(description="Export a two-page Arabic chemistry layout to IDML.")
    parser.add_argument("layout_json", help="Path to the shared layout JSON")
    parser.add_argument("package_dir", help="Directory containing relative Links/ images")
    parser.add_argument("output_path", help="Destination IDML path")
    args = parser.parse_args()
    with Path(args.layout_json).open("r", encoding="utf-8") as source:
        layout = json.load(source)
    print(export_idml(layout, args.package_dir, args.output_path))


if __name__ == "__main__":
    main()
