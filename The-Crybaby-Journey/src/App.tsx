import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store';
import Intro from './components/Intro';
import CrybabyBook from './components/CrybabyBook';
import K12Experience from './components/K12Experience';
import Portals3D from './components/Portals3D';
import Outro from './components/Outro';
import ProgressTracker from './components/ProgressTracker';
import { AudioProvider } from './components/AudioManager';

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

function AppContent() {
  const { currentEra, hasStarted, startExperience } = useStore();
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
  setIsHydrated(true);

  if (hasStarted) return;

  const timer = setTimeout(() => {
    startExperience();
  }, 5000);

  return () => clearTimeout(timer);
}, [hasStarted, startExperience]);

  if (!isHydrated) return null;

  if (!hasStarted) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#1c120d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,233,202,0.42),rgba(232,168,161,0.18)_38%,rgba(28,18,13,0.98)_100%)]" />

      <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light bg-[url('/assets/book/paper-texture.png')]" />

      {[...Array(18)].map((_, i) => (
        <motion.img
          key={i}
          src={
            i % 3 === 0
              ? '/assets/hotpoint/papillonjaune.png'
              : i % 3 === 1
                ? '/assets/hotpoint/papillonrose.png'
                : '/assets/hotpoint/papillonvert.png'
          }
          alt=""
          draggable={false}
          className="absolute h-8 w-8 object-contain opacity-40"
          initial={{
            x: `${5 + i * 5}%`,
            y: '110vh',
            rotate: -20,
            opacity: 0,
          }}
          animate={{
            y: '-15vh',
            x: `${8 + i * 5 + (i % 2 === 0 ? 4 : -4)}%`,
            rotate: [0, 14, -10, 8],
            opacity: [0, 0.5, 0.35, 0],
          }}
          transition={{
            duration: 5 + (i % 5),
            delay: i * 0.16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.92, opacity: 0, filter: 'blur(12px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1 }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="relative flex flex-col items-center text-center">
          <motion.div
            className="absolute top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-pink-100/20 blur-3xl"
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{ duration: 2.8, repeat: Infinity }}
          />

          <motion.div
            className="relative mb-8 h-40 w-56 rounded-[2rem] border border-[#d8bd8b]/60 bg-[#5a3628] shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            animate={{
              y: [0, -5, 0],
              rotateX: [0, 4, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-[10px] rounded-[1.4rem] border border-[#f1d6a6]/30 bg-[#8f4f5e]/35" />

            <motion.div
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#fff4dc]/70 bg-[#fff4dc]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 bg-[#fff4dc]/70" />
              <div className="absolute left-1/2 top-1/2 h-[2px] w-1/2 bg-[#fff4dc]/70" />
            </motion.div>

            <motion.img
              src="/assets/hotpoint/papillonrose.png"
              alt=""
              draggable={false}
              className="absolute -right-5 -top-5 h-14 w-14 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]"
              animate={{
                y: [0, -8, 0],
                rotate: [-6, 6, -6],
                scale: [1, 1.12, 1],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-4 text-xs uppercase tracking-[0.45em] text-pink-200/80"
          >
            Une chambre. Un livre. Des souvenirs à écouter.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: '0.03em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
            transition={{ delay: 0.25, duration: 1 }}
            className="relative font-serif text-5xl italic text-[#fff4dc] md:text-7xl"
          >
            The Crybaby Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative mx-auto mt-6 max-w-md font-serif text-lg italic leading-relaxed text-[#fff4dc]/70"
          >
            De l'enfance à la métamorphose.
          </motion.p>

          <div className="relative mx-auto mt-8 h-1 w-64 overflow-hidden rounded-full bg-[#fff4dc]/20">
            <motion.div
              className="h-full rounded-full bg-[#f9a8d4]"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 4.7, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

  return (
    <main className="relative w-full min-h-screen bg-black">
      <ProgressTracker />

      <AnimatePresence mode="wait">
        {currentEra === 'intro' && <Intro />}
        {currentEra === 'crybaby' && <CrybabyBook />}
        {currentEra === 'k12' && <K12Experience />}
        {currentEra === 'portals' && <Portals3D />}
        {currentEra === 'outro' && <Outro />}
      </AnimatePresence>
    </main>
  );
}