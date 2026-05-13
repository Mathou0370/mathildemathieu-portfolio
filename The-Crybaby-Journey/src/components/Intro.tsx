import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { useAudio } from './AudioManager';

type Step = {
  id: string;
  title: string;
  text: string;
  hint: string;
};

const steps: Step[] = [
  {
    id: 'boite',
    title: 'Avant d’ouvrir le livre',
    text:
      "Le port du casque est vivement conseillé. Cette expérience se découvre aussi avec les oreilles : musiques, voix, ambiances et petits sons guideront votre immersion.\n\nLa boîte à musique vient de se lancer. Vous pouvez régler les volumes à tout moment avec l’icône en haut à droite.",
    hint: 'Clique sur la boîte à musique',
  },
  {
    id: 'ours',
    title: 'Un rêve commence',
    text:
      "La chambre semble calme, mais quelque chose y respire encore. Certains souvenirs ne se voient pas : ils s’écoutent, se devinent, puis reviennent doucement.",
    hint: 'Réveille le premier souvenir',
  },
  {
    id: 'blocs',
    title: 'Trois vies empilées',
    text:
      "Il y a l’enfance, l’école, puis ce qui vient après. Trois formes d’un même cœur qui apprend à survivre, à comprendre, puis à renaître.",
    hint: 'Observe les cubes',
  },
  {
    id: 'coeur',
    title: 'Le cœur de K-12',
    text:
      "Plus loin, Cry Baby quittera sa chambre pour entrer dans un système trop rose pour être innocent. L’école l’attend déjà.",
    hint: 'Approche-toi du cœur',
  },
  {
    id: 'ballons',
    title: 'Les fragments cachés',
    text:
      "Rien ne sera donné directement. Les papillons apparaîtront quand une partie de l’histoire sera prête à être comprise.",
    hint: 'Suis les ballons',
  },
  {
    id: 'livre',
    title: 'Le livre appelle',
    text:
      "Le livre n’est pas seulement posé dans la chambre. Il attend qu’on l’ouvre. Une fois dedans, il faudra aller jusqu’au bout.",
    hint: 'Ouvre le livre',
  },
];

const layers = [
  { id: 'fond', url: '/assets/intro/fond.png', depth: 4 },
  { id: 'rideaux', url: '/assets/intro/rideaux.png', depth: 10 },
  { id: 'miroir', url: '/assets/intro/miroir.png', depth: 8 },
  { id: 'coeur_k12', url: '/assets/intro/coeur_k12.png', depth: 18 },
  { id: 'commode', url: '/assets/intro/commode.png', depth: 12 },
  { id: 'boite_musique', url: '/assets/intro/boite_musique.png', depth: 22 },
  { id: 'ours', url: '/assets/intro/ours.png', depth: 24 },
  { id: 'livre', url: '/assets/intro/livre.png', depth: 26 },
  { id: 'blocs', url: '/assets/intro/blocs.png', depth: 20 },
  { id: 'ballons', url: '/assets/intro/ballons.png', depth: 30 },
];

const hotspots = [
  { id: 'boite', top: '45%', left: '70%', size: '70px' },
  { id: 'ours', top: '60%', left: '32%', size: '70px' },
  { id: 'blocs', top: '88%', left: '8%', size: '70px' },
  { id: 'coeur', top: '34%', left: '32%', size: '70px' },
  { id: 'ballons', top: '36%', left: '94%', size: '74px' },
  { id: 'livre', top: '72%', left: '38%', size: '76px' },
];

export default function Intro() {
  const { setEra } = useStore();
  const { playMusic, playSfx, stopMusic } = useAudio();

  const [currentStep, setCurrentStep] = useState(0);
  const [openedStep, setOpenedStep] = useState<Step | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeStep = steps[currentStep];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      stopMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 24,
      y: (e.clientY / window.innerHeight - 0.5) * 24,
    });
  };

  const handleObjectClick = (id: string) => {
    if (id !== activeStep.id) return;

    playSfx('/assets/audio/soundeffect.mp3');

    if (id === 'boite') {
      playMusic('/assets/audio/chambre-ambiance.mp3', true);
    }

    setOpenedStep(activeStep);
  };

  const launchBookTransition = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      stopMusic();
      setEra('crybaby');
    }, 1900);
  };

  const closePopupAndContinue = () => {
    if (!openedStep) return;

    const isLastStep = currentStep >= steps.length - 1;

    setCompletedSteps((prev) =>
      prev.includes(openedStep.id) ? prev : [...prev, openedStep.id],
    );

    setOpenedStep(null);

    if (isLastStep) {
      launchBookTransition();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const popupPosition = (id: string) => {
    if (id === 'boite') return { top: '36%', left: '52%' };
    if (id === 'ours') return { top: '30%', left: '39%' };
    if (id === 'blocs') return { top: '60%', left: '14%' };
    if (id === 'coeur') return { top: '20%', left: '37%' };
    if (id === 'livre') return { top: '46%', left: '47%' };
    return { top: '20%', left: '66%' };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-screen w-screen overflow-hidden bg-[#e8a8a1]"
    >
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[1300] flex items-center justify-center overflow-hidden bg-[#f7eadf]"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl italic text-pink-900"
            >
              L’histoire de Crybaby s’ouvre...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          isTransitioning
            ? {
                scale: 5.4,
                x: '-18%',
                y: '20%',
                filter: 'blur(3px)',
              }
            : {
                scale: 1,
                x: '0%',
                y: '0%',
                filter: 'blur(0px)',
              }
        }
        transition={{ duration: 1.6, ease: 'easeInOut' }}
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ transformOrigin: '50% 58%' }}
      >
        {layers.map((layer) => {
          const isBook = layer.id === 'livre';
          const isBalloon = layer.id === 'ballons';
          const isMusicBox = layer.id === 'boite_musique';

          return (
            <motion.div
              key={layer.id}
              className="absolute inset-0 h-full w-full"
              style={{
                x: mousePos.x * (layer.depth / 55),
                y: mousePos.y * (layer.depth / 55),
                scale: 1.035,
              }}
              animate={
                isTransitioning
                  ? undefined
                  : isBook
                    ? { y: [0, -5, 0] }
                    : isBalloon
                      ? { y: [0, -10, 0] }
                      : isMusicBox
                        ? { y: [0, -3, 0] }
                        : undefined
              }
              transition={
                isBook || isBalloon || isMusicBox
                  ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                  : undefined
              }
            >
              <img
                src={layer.url}
                alt={layer.id}
                className="h-full w-full select-none object-cover pointer-events-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {!isTransitioning &&
        hotspots.map((spot) => {
          const isActive = activeStep.id === spot.id;
          const isCompleted = completedSteps.includes(spot.id);

          return (
            <motion.button
              key={spot.id}
              type="button"
              onClick={() => handleObjectClick(spot.id)}
              className={`fixed z-[999] -translate-x-1/2 -translate-y-1/2 ${
                isActive ? 'cursor-pointer' : 'pointer-events-none'
              } ${isCompleted ? 'opacity-25' : 'opacity-100'}`}
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.size,
                height: spot.size,
              }}
            >
              {isActive && (
                <motion.div
                  className="relative flex h-full w-full items-center justify-center"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="absolute h-[110px] w-[110px] rounded-full bg-white/55 blur-3xl" />

                  <motion.div
                    className="absolute h-[82px] w-[82px] rounded-full border-2 border-white/80"
                    animate={{ scale: [1, 1.7, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.div
                    className="absolute h-[78px] w-[78px] rounded-full bg-pink-300/50 blur-xl"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.img
                    src="/assets/hotpoint/papillonrose.png"
                    alt="hotspot"
                    className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_18px_rgba(255,255,255,1)]"
                    animate={{
                      scale: [1, 1.18, 1],
                      rotate: [-4, 4, -4],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    draggable={false}
                  />

                  <motion.div
                    className="absolute z-20 h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,1)]"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}

      {!isTransitioning && (
        <div className="fixed bottom-10 left-1/2 z-[1200] -translate-x-1/2 text-center">
          <div className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/70 backdrop-blur-md">
            {activeStep.hint}
          </div>
        </div>
      )}

      <AnimatePresence>
        {openedStep && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="fixed z-[1250] w-[360px] max-w-[calc(100vw-2rem)]"
            style={popupPosition(openedStep.id)}
          >
            <div className="relative rounded-[1.5rem] border border-pink-200 bg-[#fff7ed]/95 p-5 font-serif text-[#5a2c38] shadow-2xl backdrop-blur-md">
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-pink-200 shadow-lg">
                <Sparkles size={15} className="text-pink-700" />
              </div>

              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-pink-400">
                Souvenir trouvé
              </p>

              <h2 className="mb-3 text-3xl italic tracking-tight text-[#5a2c38]">
                {openedStep.title}
              </h2>

              <p className="mb-5 whitespace-pre-line text-lg italic leading-relaxed text-[#6b3546]">
                {openedStep.text}
              </p>

              <button
                onClick={closePopupAndContinue}
                className="w-full rounded-full bg-pink-700 py-2.5 font-bold text-white transition-all hover:bg-pink-800"
              >
                {openedStep.id === 'livre'
                  ? 'Entrer dans le livre'
                  : 'Continuer'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}