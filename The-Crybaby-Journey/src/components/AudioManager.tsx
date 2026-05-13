import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, VolumeX } from 'lucide-react';

type AudioContextType = {
  musicVolume: number;
  voiceVolume: number;
  sfxVolume: number;
  setMusicVolume: (value: number) => void;
  setVoiceVolume: (value: number) => void;
  setSfxVolume: (value: number) => void;
  playMusic: (src: string, loop?: boolean) => void;
  playVoice: (src: string) => void;
  playSfx: (src: string) => void;
  stopMusic: () => void;
  stopVoice: () => void;
  stopAll: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

const getSavedVolume = (key: string, fallback: number) => {
  const saved = localStorage.getItem(key);
  return saved ? Number(saved) : fallback;
};

function AudioSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-pink-800/70">
          {label}
        </span>
        <span className="text-xs text-pink-900/50">
          {Math.round(value * 100)}%
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-pink-500"
      />
    </div>
  );
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  const [musicVolume, setMusicVolumeState] = useState(() =>
    getSavedVolume('volume_music', 0.15),
  );
  const [voiceVolume, setVoiceVolumeState] = useState(() =>
    getSavedVolume('volume_voice', 0.50),
  );
  const [sfxVolume, setSfxVolumeState] = useState(() =>
    getSavedVolume('volume_sfx', 0.25),
  );

  const [showPanel, setShowPanel] = useState(false);

  const setMusicVolume = (value: number) => {
    setMusicVolumeState(value);
    localStorage.setItem('volume_music', String(value));

    if (musicRef.current) musicRef.current.volume = value;
  };

  const setVoiceVolume = (value: number) => {
    setVoiceVolumeState(value);
    localStorage.setItem('volume_voice', String(value));

    if (voiceRef.current) voiceRef.current.volume = value;
  };

  const setSfxVolume = (value: number) => {
    setSfxVolumeState(value);
    localStorage.setItem('volume_sfx', String(value));

    if (sfxRef.current) sfxRef.current.volume = value;
  };

  const fadeMusicTo = async (target: number) => {
    const audio = musicRef.current;
    if (!audio) return;

    const start = audio.volume;

    for (let i = 0; i <= 12; i++) {
      audio.volume = start + (target - start) * (i / 12);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
  };

  const playMusic = async (src: string, loop = true) => {
    const audio = musicRef.current;
    if (!audio || !src) return;

    await fadeMusicTo(0);

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.loop = loop;

    await audio.play().catch(() => {});
    await fadeMusicTo(musicVolume);
  };

  const playVoice = async (src: string) => {
    const audio = voiceRef.current;
    if (!audio || !src) return;

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.volume = voiceVolume;

    await audio.play().catch(() => {});
  };

  const playSfx = async (src: string) => {
    const audio = sfxRef.current;
    if (!audio || !src) return;

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.volume = sfxVolume;

    await audio.play().catch(() => {});
  };

  const stopMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;

    await fadeMusicTo(0);
    audio.pause();
  };

  const stopVoice = () => {
    voiceRef.current?.pause();
  };

  const stopAll = () => {
    musicRef.current?.pause();
    voiceRef.current?.pause();
    sfxRef.current?.pause();
  };

  useEffect(() => {
    if (musicRef.current) musicRef.current.volume = musicVolume;
    if (voiceRef.current) voiceRef.current.volume = voiceVolume;
    if (sfxRef.current) sfxRef.current.volume = sfxVolume;
  }, [musicVolume, voiceVolume, sfxVolume]);

  const allMuted = musicVolume === 0 && voiceVolume === 0 && sfxVolume === 0;

  return (
    <AudioContext.Provider
      value={{
        musicVolume,
        voiceVolume,
        sfxVolume,
        setMusicVolume,
        setVoiceVolume,
        setSfxVolume,
        playMusic,
        playVoice,
        playSfx,
        stopMusic,
        stopVoice,
        stopAll,
      }}
    >
      <audio ref={musicRef} preload="auto" />
      <audio ref={voiceRef} preload="auto" />
      <audio ref={sfxRef} preload="auto" />

      {children}

      <div className="fixed right-6 top-6 z-[2000]">
        <button
          type="button"
          onClick={() => setShowPanel((prev) => !prev)}
          className="rounded-full border border-white/10 bg-black/20 p-3 text-white shadow-xl backdrop-blur-md transition hover:bg-black/35"
          aria-label="Paramètres audio"
        >
          {allMuted ? <VolumeX size={18} /> : <Settings size={18} />}
        </button>

        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className="absolute right-0 mt-3 w-72 rounded-2xl border border-pink-100/50 bg-pink-50/95 p-4 text-pink-950 shadow-2xl backdrop-blur-md"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-pink-500">
                Paramètres audio
              </p>

              <p className="mb-4 font-serif text-sm italic text-pink-950/70">
                Le port du casque est vivement conseillé.
              </p>

              <AudioSlider
                label="Musique"
                value={musicVolume}
                onChange={setMusicVolume}
              />

              <AudioSlider
                label="Voix"
                value={voiceVolume}
                onChange={setVoiceVolume}
              />

              <AudioSlider
                label="Effets"
                value={sfxVolume}
                onChange={setSfxVolume}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error('useAudio doit être utilisé dans AudioProvider');
  }

  return context;
}