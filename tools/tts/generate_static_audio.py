from __future__ import annotations

import hashlib
import json
import random
import re
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import torch
import torchaudio as ta
from pydub import AudioSegment, silence
from chatterbox.tts import ChatterboxTTS

ROOT = Path(__file__).resolve().parents[2]
REFERENCE = ROOT / "public/audio/voice-samples/chatterbox-default.wav"
MANIFEST = ROOT / "public/audio/manifest.json"
PROFILE = "chatterbox-fixed-v1-speed-0.85"
SPEED = "0.85"
BITRATE = "64k"

def extract_entries(path: Path, kind: str) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*id:\s*'[^']+'[\s\S]*?^\s*\}", text, flags=re.MULTILINE)
    entries = []
    for block in blocks:
        id_match = re.search(r"\bid:\s*'([^']+)'", block)
        en_match = re.search(r"\ben:\s*'([^']+)'", block)
        if not id_match or not en_match:
            continue
        group = "drugs" if kind == "drugs" else ("abbreviations" if re.search(r"\babbr:\s*'[^']+'", block) else "terms")
        entries.append({"group": group, "id": id_match.group(1), "text": en_match.group(1)})
    return entries

def speech_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace(" / ", ". ").replace("/", " ")).strip()

def set_seed(key: str) -> None:
    seed = int(hashlib.sha1(key.encode("utf-8")).hexdigest()[:8], 16)
    random.seed(seed)
    np.random.seed(seed % (2**32 - 1))
    torch.manual_seed(seed)

def load_manifest() -> dict:
    if not MANIFEST.exists():
        return {}
    try:
        return json.loads(MANIFEST.read_text(encoding="utf-8"))
    except Exception:
        return {}

def extract_carrier_target(wav_path: Path, out_path: Path) -> None:
    audio = AudioSegment.from_wav(wav_path)

    chunks = silence.split_on_silence(
        audio,
        min_silence_len=110,
        silence_thresh=audio.dBFS - 24,
        keep_silence=30,
    )

    if len(chunks) < 3:
        chunks = silence.split_on_silence(
            audio,
            min_silence_len=80,
            silence_thresh=audio.dBFS - 20,
            keep_silence=25,
        )

    if len(chunks) < 3:
        raise RuntimeError(f"Could not isolate carrier target; got {len(chunks)} chunks")

    useful = [chunk for chunk in chunks if len(chunk) >= 120]
    if len(useful) < 3:
        useful = chunks

    target = useful[1]

    nonsilent = silence.detect_nonsilent(
        target,
        min_silence_len=45,
        silence_thresh=target.dBFS - 28,
    )
    if nonsilent:
        start = max(0, nonsilent[0][0] - 20)
        end = min(len(target), nonsilent[-1][1] + 35)
        target = target[start:end]

    clean = AudioSegment.silent(duration=45) + target + AudioSegment.silent(duration=70)
    clean.export(out_path, format="wav")

def main() -> None:
    if not REFERENCE.exists():
        raise FileNotFoundError(f"Voice reference not found: {REFERENCE}")

    items = extract_entries(ROOT / "src/data/drugs.ts", "drugs")
    items += extract_entries(ROOT / "src/data/clinicalTerms.ts", "terms")
    items.append({"group": "special", "id": "suxamethonium-apnoea", "text": "Suxamethonium apnoea"})

    old = load_manifest()
    old_items = old.get("items", {}) if old.get("profile") == PROFILE else {}
    expected = {f"{x['group']}/{x['id']}" for x in items}

    for group in ("drugs", "terms", "abbreviations", "special"):
        folder = ROOT / "public/audio" / group
        folder.mkdir(parents=True, exist_ok=True)
        for stale in folder.glob("*.mp3"):
            if f"{group}/{stale.stem}" not in expected:
                stale.unlink()

    pending = []
    manifest_items = {}
    for item in items:
        key = f"{item['group']}/{item['id']}"
        spoken = speech_text(item["text"])
        output = ROOT / "public/audio" / item["group"] / f"{item['id']}.mp3"
        prev = old_items.get(key, {})
        if not (output.exists() and prev.get("source_text") == item["text"] and prev.get("spoken_text") == spoken):
            pending.append({**item, "spoken": spoken})
        manifest_items[key] = {
            "source_text": item["text"],
            "spoken_text": spoken,
            "file": f"/audio/{item['group']}/{item['id']}.mp3",
        }

    if pending:
        model = ChatterboxTTS.from_pretrained(device="cpu")
        model.prepare_conditionals(str(REFERENCE), exaggeration=0.5)
        with tempfile.TemporaryDirectory() as tmp:
            tmp_dir = Path(tmp)
            for i, item in enumerate(pending, 1):
                key = f"{item['group']}/{item['id']}"
                print(f"[{i}/{len(pending)}] {key}: {item['spoken']}")
                set_seed(key)
                carrier_text = f"Okay. {item['spoken']}. Done."
                wav = model.generate(carrier_text, exaggeration=0.45, cfg_weight=0.45)

                carrier_wav = tmp_dir / f"{item['group']}-{item['id']}-carrier.wav"
                clean_wav = tmp_dir / f"{item['group']}-{item['id']}-clean.wav"
                ta.save(str(carrier_wav), wav, model.sr)
                extract_carrier_target(carrier_wav, clean_wav)

                output = ROOT / "public/audio" / item["group"] / f"{item['id']}.mp3"
                subprocess.run([
                    "ffmpeg", "-y", "-loglevel", "error",
                    "-i", str(clean_wav),
                    "-filter:a", f"atempo={SPEED}",
                    "-ac", "1", "-ar", "24000",
                    "-codec:a", "libmp3lame", "-b:a", BITRATE,
                    str(output),
                ], check=True)

    manifest = {
        "profile": PROFILE,
        "engine": "ChatterboxTTS",
        "voice_reference": "/audio/voice-samples/chatterbox-default.wav",
        "speed": 0.85,
        "format": "mp3",
        "bitrate": BITRATE,
        "items": manifest_items,
    }
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Done: {len(items)} entries.")

if __name__ == "__main__":
    main()
