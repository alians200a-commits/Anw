export const speakTerm = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((voice) => /Google US English/i.test(voice.name)) ||
      voices.find((voice) => /Google/i.test(voice.name) && voice.lang.toLowerCase().startsWith('en-us')) ||
      voices.find((voice) => voice.lang.toLowerCase() === 'en-us') ||
      null;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Same settings used by the original Google AI Studio version.
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Speech error:', error);
  }
};
