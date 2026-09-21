# Fixed pronunciation audio

The app uses one fixed pre-generated voice instead of browser speech synthesis.

- Engine: ChatterboxTTS
- Fixed voice reference: `public/audio/voice-samples/chatterbox-default.wav`
- Approved playback speed: `0.85x`
- Output: mono MP3, 24 kHz, 64 kbps
- Runtime API cost: none

The generator reads `src/data/drugs.ts` and `src/data/clinicalTerms.ts`, creates only missing or changed files, and writes `public/audio/manifest.json`.

GitHub Actions runs the generator when vocabulary, the reference voice, or the generator itself changes. The active app and legacy pronunciation buttons all play static files, so every device hears the same voice.
