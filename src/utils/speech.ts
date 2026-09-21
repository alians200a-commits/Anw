export const speakTerm = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clear medical pronunciation
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Speech error:', error);
  }
};
