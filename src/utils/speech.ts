export type PronunciationGroup = 'drugs' | 'terms' | 'abbreviations' | 'special';

let currentAudio: HTMLAudioElement | null = null;

const stopCurrentAudio = () => {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
};

export const playPronunciation = (group: PronunciationGroup, id: string) => {
  if (typeof window === 'undefined') return;

  stopCurrentAudio();

  const baseUrl = import.meta.env.BASE_URL || '/';
  const src = `${baseUrl}audio/${group}/${encodeURIComponent(id)}.mp3`;
  const audio = new Audio(src);
  audio.preload = 'auto';
  currentAudio = audio;

  const release = () => {
    if (currentAudio === audio) currentAudio = null;
  };

  audio.addEventListener('ended', release, { once: true });
  audio.addEventListener('error', () => {
    console.error('Pronunciation audio failed to load:', src);
    release();
  }, { once: true });

  void audio.play().catch((error) => {
    console.error('Pronunciation audio failed to play:', error);
    release();
  });
};
