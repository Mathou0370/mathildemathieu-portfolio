import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { useStore } from '../store';
import { useAudio } from './AudioManager';

type Stop = {
  id: string;
  title: string;
  text: string;
  y: number;
  zoom: number;
  hotspot: string;
};

const STOPS: Stop[] = [
  {
    id: 'after-k12',
    title: 'Après K-12',
    text:
      "À la fin de K-12, Cry Baby se retrouve face à un portail. Portals commence après ce passage : elle quitte l’école, le monde humain et son ancienne identité. Ce dernier album n’est plus un récit classique, mais une traversée symbolique entre la mort, la mémoire et la renaissance.",
    y: 0,
    zoom: 1,
    hotspot: 'left-[44%] top-[22%]',
  },
  {
    id: 'death',
    title: 'Death',
    text:
      "Cry Baby meurt, mais son âme continue d’exister. Portals transforme la mort en passage spirituel : elle n’est pas montrée comme une disparition, mais comme le début d’une métamorphose.",
    y: 55,
    zoom: 1.01,
    hotspot: 'left-[58%] top-[36%]',
  },
  {
    id: 'void',
    title: 'Void',
    text:
      "Avant de renaître, l’âme traverse un vide intérieur. Cet espace représente l’anxiété, les pensées refoulées et la confrontation avec soi-même. Portals parle de guérison : il faut regarder ses blessures avant de pouvoir changer.",
    y: 110,
    zoom: 1.02,
    hotspot: 'left-[30%] top-[50%]',
  },
  {
    id: 'organic-world',
    title: 'Un monde organique',
    text:
      "L’univers pastel et enfantin des deux premières ères laisse place à une forêt vivante : eau, mousse, fleurs, champignons et lumière naturelle. L’album devient plus sensoriel, plus spirituel, presque comme une promenade dans un corps ou dans une âme.",
    y: 165,
    zoom: 1.02,
    hotspot: 'left-[70%] top-[56%]',
  },
  {
    id: 'old-cages',
    title: 'Les anciennes cages',
    text:
      "Même si Portals parle de renaissance, il garde des traces du monde d’avant : relations toxiques, regard des autres, objectification, réseaux sociaux, attentes imposées aux femmes. Cry Baby ne cherche plus seulement à survivre : elle apprend à se détacher.",
    y: 220,
    zoom: 1.015,
    hotspot: 'left-[22%] top-[62%]',
  },
  {
    id: 'creature',
    title: 'The Creature',
    text:
      "La nouvelle forme de Cry Baby est étrange, féerique et organique. The Creature n’est pas faite pour être parfaite ou rassurante : elle représente une identité plus libre, vulnérable et puissante. Elle accepte d’être incomprise.",
    y: 275,
    zoom: 1.01,
    hotspot: 'left-[62%] top-[48%]',
  },
  {
    id: 'womb',
    title: 'Womb',
    text:
      "Tout en bas du voyage, la mort devient naissance. Portals ferme la trilogie sur une boucle : vie, mort, renaissance. Cry Baby disparaît, mais quelque chose d’elle continue ailleurs, sous une autre forme.",
    y: 330,
    zoom: 1,
    hotspot: 'left-[46%] top-[72%]',
  },
];

export default function Portals3D() {
  const { setEra } = useStore();
  const { playMusic, stopMusic, playSfx } = useAudio();

  const [currentStop, setCurrentStop] = useState(0);
  const [opened, setOpened] = useState<Stop | null>(null);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [ending, setEnding] = useState(false);

  const stop = STOPS[currentStop];
  const allRevealed = revealed.length === STOPS.length;

  const particles = useMemo(
    () =>
      Array.from({ length: 105 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 5,
        opacity: 0.12 + Math.random() * 0.4,
      })),
    [],
  );

  const reveal = (item: Stop) => {
    playSfx('/assets/audio/soundeffect.mp3');
    setOpened(item);

    setRevealed((prev) =>
      prev.includes(item.id) ? prev : [...prev, item.id],
    );
  };

  const closeCard = () => {
    setOpened(null);
  };

  const goToOutro = () => {
    playSfx('/assets/audio/soundeffect.mp3');
    setEnding(true);

    window.setTimeout(() => {
      setEra('outro');
    }, 2200);
  };

  useEffect(() => {
  playMusic('/assets/audio/portals-ambiance.mp3');

  return () => {
    stopMusic();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (locked || opened || ending) return;

      setLocked(true);

      if (e.deltaY > 0) {
        if (currentStop === STOPS.length - 1 && allRevealed) {
          goToOutro();
          return;
        }

        setCurrentStop((prev) => Math.min(prev + 1, STOPS.length - 1));
      } else {
        setCurrentStop((prev) => Math.max(prev - 1, 0));
      }

      window.setTimeout(() => {
        setLocked(false);
      }, 950);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [locked, opened, ending, currentStop, allRevealed]);

  return (
    <motion.section
      className="fixed inset-0 z-40 overflow-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: ending ? 1.22 : 1,
        filter: ending ? 'brightness(1.8) saturate(1.15)' : 'brightness(1)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.1, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute left-0 top-0 w-full"
        animate={{
          y: `-${stop.y}vh`,
          scale: stop.zoom,
        }}
        transition={{
          duration: 1.45,
          ease: 'easeInOut',
        }}
      >
        <motion.img
          src="/assets/portals/portals-forest.png"
          alt="Portals Forest"
          draggable={false}
          className="w-full select-none object-contain brightness-[0.94] contrast-[1.06] saturate-[1.04]"
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.72)_100%)]" />

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(187,247,208,0.22), transparent 12%), radial-gradient(circle at 80% 60%, rgba(255,200,230,0.16), transparent 14%)',
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, 14, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,240,190,0.13),transparent_35%)]"
        animate={{
          y: [0, -18, 0],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]"
        animate={{
          x: ['-20%', '20%', '-20%'],
          opacity: [0.12, 0.3, 0.12],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-green-100 shadow-[0_0_16px_rgba(187,247,208,0.8)]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -45, 0],
              x: [0, 12, -8, 0],
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {ending && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-[499] h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 3.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.1, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ending && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[500] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <div className="absolute left-8 top-8 z-50 max-w-xl">
        <p className="mb-3 text-xs uppercase tracking-[0.45em] text-green-100/70">
          la renaissance de cry baby
        </p>

        <h1 className="font-serif text-6xl italic text-white drop-shadow-lg md:text-7xl">
          Portals
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
          Scrolle du haut vers le bas pour traverser la forêt et révéler les fragments de la dernière étape du voyage.
        </p>

        <div className="mt-5 inline-flex rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/65 backdrop-blur-md">
          Fragment {currentStop + 1}/{STOPS.length} · Révélés {revealed.length}/{STOPS.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!ending && (
          <motion.button
            key={stop.id}
            type="button"
            onClick={() => reveal(stop)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            className={`absolute ${stop.hotspot} z-50 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full`}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-green-200/40 blur-3xl"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
            />

            <motion.span
              className="absolute h-16 w-16 rounded-full border border-green-100/70 bg-green-300/20"
              animate={{
                scale: [1, 1.65, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
            />

            <motion.img
              src="/assets/hotpoint/papillonvert.png"
              alt="Papillon interactif"
              draggable={false}
              className="relative z-10 h-14 w-14 object-contain drop-shadow-[0_0_25px_rgba(134,239,172,1)]"
              animate={
                revealed.includes(stop.id)
                  ? { scale: 0.9, opacity: 0.7 }
                  : {
                      y: [0, -6, 0],
                      rotate: [-4, 4, -4],
                      scale: [1, 1.12, 1],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {revealed.includes(stop.id) && (
              <span className="absolute z-30 grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-green-700 shadow-[0_0_20px_rgba(255,255,255,1)]">
                ✓
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            className="absolute bottom-8 left-1/2 z-[100] w-[92%] max-w-3xl -translate-x-1/2 rounded-[3rem_1.5rem_3.5rem_1.8rem] border border-green-100/15 bg-[#07130c]/75 p-7 shadow-[0_0_60px_rgba(134,239,172,0.18)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-green-200/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-8 right-10 h-24 w-24 rounded-full bg-pink-200/10 blur-2xl" />

            <button
              type="button"
              onClick={closeCard}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-xs uppercase tracking-[0.35em] text-green-100/70">
              Fragment Portals
            </p>

            <h2 className="mt-2 pr-10 font-serif text-4xl italic text-white">
              {opened.title}
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">
              {opened.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 z-50">
        {allRevealed && currentStop === STOPS.length - 1 ? (
          <button
            type="button"
            onClick={goToOutro}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-xl transition hover:scale-105"
          >
            Quitter le portail
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60 backdrop-blur-md">
            <ChevronDown className="h-4 w-4" />
            Scroll
          </div>
        )}
      </div>
    </motion.section>
  );
}