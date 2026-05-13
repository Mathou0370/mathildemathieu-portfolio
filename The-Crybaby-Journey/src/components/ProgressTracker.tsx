import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store';

type TrackerStep = {
  id: 'intro' | 'crybaby' | 'k12' | 'outro' | 'portals' | 'summary';
  label: string;
  butterfly: string;
};

const STORAGE_KEY = 'unlockedTrackerSteps';

const STEPS: TrackerStep[] = [
  {
    id: 'intro',
    label: 'La chambre',
    butterfly: '/assets/hotpoint/papillonrose.png',
  },
  {
    id: 'crybaby',
    label: 'Le livre',
    butterfly: '/assets/hotpoint/papillonjaune.png',
  },
  {
    id: 'k12',
    label: 'K-12',
    butterfly: '/assets/hotpoint/papillonbleu.png',
  },
  {
    id: 'outro',
    label: 'Retour au livre',
    butterfly: '/assets/hotpoint/papillonjaune.png',
  },
  {
    id: 'portals',
    label: 'Portals',
    butterfly: '/assets/hotpoint/papillonvert.png',
  },
  {
    id: 'summary',
    label: 'Éveil',
    butterfly: '/assets/hotpoint/papillonrose.png',
  },
];

const readUnlockedSteps = (): TrackerStep['id'][] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return ['intro'];

    const parsed = JSON.parse(saved) as TrackerStep['id'][];
    return parsed.length ? parsed : ['intro'];
  } catch {
    return ['intro'];
  }
};

export default function ProgressTracker() {
  const { currentEra, setEra, outroReturnStep, setOutroReturnStep } = useStore();

  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<TrackerStep['id'][]>(
    readUnlockedSteps,
  );

  const virtualEra =
    currentEra === 'outro' && outroReturnStep === 'summary'
      ? 'summary'
      : currentEra;

  const currentIndex = STEPS.findIndex((step) => step.id === virtualEra);

  useEffect(() => {
    setUnlockedIds((prev) => {
      const currentStep = STEPS[currentIndex]?.id ?? 'intro';

      if (prev.includes(currentStep)) return prev;

      const next = [...prev, currentStep];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, [currentIndex]);

  const unlockedSteps = useMemo(() => {
    return STEPS.filter((step) => unlockedIds.includes(step.id));
  }, [unlockedIds]);

  useEffect(() => {
    setIsVisible(true);

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [currentEra, outroReturnStep]);

  const showFull = isVisible || isHovering;

  const goToStep = (id: TrackerStep['id']) => {
    if (!unlockedIds.includes(id)) return;

    if (id === 'summary') {
      setOutroReturnStep('summary');
      setEra('outro');
      return;
    }

    if (id === 'outro') {
      setOutroReturnStep('room');
      setEra('outro');
      return;
    }

    if (id === 'intro' || id === 'crybaby' || id === 'k12' || id === 'portals') {
      setEra(id);
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="fixed left-6 top-1/2 z-[200] -translate-y-1/2"
      animate={{
        opacity: showFull ? 1 : 0.35,
        x: showFull ? 0 : -18,
        scale: showFull ? 1 : 0.92,
      }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          {unlockedSteps.map((step, index) => {
            const absoluteIndex = STEPS.findIndex((s) => s.id === step.id);
            const isCurrent = step.id === virtualEra;
            const isPast = absoluteIndex < currentIndex;

            return (
              <motion.div
                key={step.id}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.2, rotate: -40 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, type: 'spring' }}
              >
                <button
                  type="button"
                  onClick={() => goToStep(step.id)}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full"
                  aria-label={`Aller à ${step.label}`}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full blur-xl"
                    animate={{
                      opacity: isCurrent ? [0.35, 0.8, 0.35] : 0,
                      scale: isCurrent ? [1, 1.25, 1] : 1,
                      backgroundColor: isCurrent
                        ? 'rgba(255,255,255,0.45)'
                        : 'transparent',
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.img
                    src={step.butterfly}
                    alt=""
                    draggable={false}
                    className={`relative z-10 h-7 w-7 object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] ${
                      isPast || isCurrent ? 'opacity-100' : 'opacity-70'
                    }`}
                    animate={
                      isCurrent
                        ? {
                            y: [0, -4, 0],
                            rotate: [-5, 5, -5],
                            scale: [1, 1.15, 1],
                          }
                        : { scale: isPast ? 0.9 : 0.82 }
                    }
                    transition={{
                      duration: 1.8,
                      repeat: isCurrent ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  />

                  {showFull && (
                    <span className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/75 backdrop-blur-md group-hover:block">
                      {step.label}
                    </span>
                  )}
                </button>

                {index < unlockedSteps.length - 1 && (
                  <div className="my-1 h-8 w-[2px] overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.75, ease: 'easeInOut' }}
                      className="h-full w-full bg-white/70"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showFull && (
          <motion.div
            key={virtualEra}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="mt-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/65 backdrop-blur-md"
          >
            {STEPS.find((step) => step.id === virtualEra)?.label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}