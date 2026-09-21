# Fixed TTS for Kingdom of Anesthesia

We will not use browser `speechSynthesis` as the final production voice.

## Trial
Open `kokoro_voice_test.ipynb` in Google Colab and run all cells. It compares:
- af_heart
- af_bella
- af_sarah

on:
- Propofol
- Suxamethonium
- Rocuronium

Kokoro is open-weight and its official Python library uses `KPipeline`. The selected voice will later be used to batch-generate all drug names, terms, and abbreviations once, then the app will play static audio files so every user hears the exact same voice.
