import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronRight, RotateCcw, X } from 'lucide-react';
import { useStore } from '../store';
import { useAudio } from './AudioManager';

type OutroStep = 'room' | 'summary' | 'credits';

const ROOM_LAYERS = [
  { id: 'fond', src: '/assets/intro/fond.png', depth: 4 },
  { id: 'rideaux', src: '/assets/intro/rideaux.png', depth: 10 },
  { id: 'miroir', src: '/assets/intro/miroir.png', depth: 8 },
  { id: 'coeur_k12', src: '/assets/intro/coeur_k12.png', depth: 18 },
  { id: 'commode', src: '/assets/intro/commode.png', depth: 12 },
  { id: 'boite_musique', src: '/assets/intro/boite_musique.png', depth: 22 },
  { id: 'ours', src: '/assets/intro/ours.png', depth: 24 },
  { id: 'livre', src: '/assets/intro/livre.png', depth: 26 },
  { id: 'blocs', src: '/assets/intro/blocs.png', depth: 20 },
  { id: 'ballons', src: '/assets/intro/ballons.png', depth: 30 },
];


export default function Outro() {
  const { setEra, outroReturnStep, setOutroReturnStep } = useStore();
  const { playMusic, stopMusic, playSfx } = useAudio();

  const [step, setStep] = useState<OutroStep>(outroReturnStep);
  const [opened, setOpened] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (step === 'room') {
      playMusic('/assets/audio/chambre-ambiance.mp3', true);
    } else {
      stopMusic();
    }

    return () => {
      stopMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 22,
      y: (e.clientY / window.innerHeight - 0.5) * 22,
    });
  };

  const goStep = (next: OutroStep) => {
    playSfx('/assets/audio/soundeffect.mp3');
    setOpened(false);
    setStep(next);
  };

 const goToPortalsDream = () => {
  playSfx('/assets/audio/soundeffect.mp3');
  setOutroReturnStep('summary');
  setEra('portals');
};

  return (
    <motion.section
      className="fixed inset-0 z-50 overflow-hidden bg-[#170d12] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {step === 'room' && (
          <motion.div
            key="room"
            onMouseMove={handleMouseMove}
            className="absolute inset-0 overflow-hidden bg-[#e8a8a1]"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
          >
            {ROOM_LAYERS.map((layer) => {
              const isBook = layer.id === 'livre';
              const isBalloon = layer.id === 'ballons';
              const isMusicBox = layer.id === 'boite_musique';

              return (
                <motion.img
                  key={layer.id}
                  src={layer.src}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                  style={{
                    x: mousePos.x * (layer.depth / 55),
                    y: mousePos.y * (layer.depth / 55),
                    scale: 1.035,
                  }}
                  animate={
                    isBook
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
                />
              );
            })}

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute left-8 top-8 z-50 max-w-xl">
              <p className="mb-3 text-xs uppercase tracking-[0.45em] text-pink-100/80">
                retour dans la chambre
              </p>

              <h1 className="font-serif text-6xl italic text-white drop-shadow-lg">
                Le livre est resté là
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                Elle a quitté K-12.
                <br />
                Mais le livre ne sait pas encore écrire ce qu’il y a derrière le portail.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={() => {
                playSfx('/assets/audio/soundeffect.mp3');
                setOpened(true);
              }}
              className="absolute left-[38%] top-[72%] z-50 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-pink-100/40 blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />

              <motion.img
                src="/assets/hotpoint/papillonjaune.png"
                alt="Point clé"
                draggable={false}
                className="relative z-10 h-12 w-12 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,1)]"
                animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            <AnimatePresence>
              {opened && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  className="absolute bottom-8 left-1/2 z-[100] w-[92%] max-w-3xl -translate-x-1/2 rounded-[2.5rem] border border-white/15 bg-[#fff4dc]/90 p-7 text-[#3b2418] shadow-2xl backdrop-blur-xl"
                >
                  <button
                    type="button"
                    onClick={() => setOpened(false)}
                    className="absolute right-5 top-5 rounded-full border border-[#3b2418]/10 bg-white/40 p-2 text-[#3b2418]/70 transition hover:bg-white/70"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <p className="text-xs uppercase tracking-[0.35em] text-[#8f4f5e]">
                    dernière page
                  </p>

                  <h2 className="mt-2 pr-10 font-serif text-4xl italic">
                    Et maintenant, où va-t-elle ?
                  </h2>

                  <p className="mt-5 whitespace-pre-line font-serif text-lg italic leading-relaxed">
                    Cry Baby a traversé l’enfance,
                    l’école,
                    les blessures,
                    les choix,
                    et les portes qui l’ont forcée à grandir.
                    {'\n\n'}
                    Elle a quitté K-12 par un portail,
                    mais personne ne sait vraiment ce qu’il y a derrière.
                    {'\n\n'}
                    Peut-être qu’on ne peut pas écrire la suite dans un livre.
                    Peut-être qu’il faut d’abord s’endormir…
                    {'\n\n'}
                    Ferme les yeux.
                    Le rêve va répondre à sa manière.
                  </p>

                  <button
                    type="button"
                    onClick={goToPortalsDream}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8f4f5e] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a95f70]"
                  >
                    S&apos;endormir
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {step === 'summary' && (
          <motion.div
            key="summary"
            className="absolute inset-0 overflow-hidden bg-[#1c120d] text-[#3b2418]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BookLayout>
              <section className="relative hidden overflow-hidden border-r border-[#8d6749]/40 bg-[#3b2418] md:flex md:items-center md:justify-center">
  <div className="relative z-10 p-10 text-center text-[#fff4dc]">
    <motion.img
      src="/assets/hotpoint/papillonjaune.png"
      alt=""
      className="mx-auto mb-6 h-20 w-20 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]"
      animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />

    <p className="text-xs uppercase tracking-[0.45em] text-[#e6cda2]/70">
      voyage terminé
    </p>

    <h2 className="mt-4 font-serif text-5xl italic leading-tight">
      Merci d’avoir traversé
      <br />
      The Crybaby Journey
    </h2>

    <p className="mt-6 font-serif text-lg italic leading-relaxed text-[#fff4dc]/70">
      Le rêve a refermé la boucle.
      <br />
      Le livre, lui, garde les fragments.
    </p>
  </div>
</section>

              <section className="custom-scroll h-full overflow-y-auto p-8">
                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#8a5a49]">
                  Sommaire du voyage
                </p>

                <h1 className="font-serif text-5xl italic leading-none">
                  Rejouer une expérience
                </h1>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <FragmentCard
                    butterfly="/assets/hotpoint/papillonrose.png"
                    title="Cry Baby"
                    count="Fragments d’enfance"
                    text="Revivre les premières blessures, les souvenirs et l’univers de la chambre."
                  />

                  <FragmentCard
                    butterfly="/assets/hotpoint/papillonbleu.png"
                    title="K-12"
                    count="30+ fragments"
                    text="Explorer les chansons, les choix et les symboles cachés dans l’école."
                  />

                  <FragmentCard
                    butterfly="/assets/hotpoint/papillonvert.png"
                    title="Portals"
                    count="Métamorphose"
                    text="Traverser le rêve, la mort symbolique et la renaissance de Cry Baby."
                  />
                </div>

                <div className="mt-8 rounded-[2rem] border border-[#b88b6a]/35 bg-[#fff4dc]/70 p-6 shadow-inner">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#a76f60]">
                    expérience interactive
                  </p>

                  <h2 className="mt-3 font-serif text-3xl italic">
                    Revisiter les fragments oubliés
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#3b2418]/70">
                    Chaque papillon découvert révèle une nouvelle lecture des chansons,
                    des symboles et du parcours émotionnel de Cry Baby.
                    <br />
                    <br />
                    Vous pouvez retourner dans chaque univers à tout moment pour retrouver
                    des détails cachés ou revivre certaines scènes.
                  </p>
                </div>

                <div className="mt-8 grid gap-4">
                  <ReplayButton label="Revivre Cry Baby" onClick={() => setEra('crybaby')} />
                  <ReplayButton label="Retourner à K-12" onClick={() => setEra('k12')} />
                  <ReplayButton label="Retraverser Portals" onClick={() => setEra('portals')} />
                </div>

                

                <button
                  type="button"
                  onClick={() => goStep('credits')}
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#8f4f5e] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a95f70]"
                >
                  Voir les crédits
                  <ChevronRight className="h-5 w-5" />
                </button>
              </section>
            </BookLayout>
          </motion.div>
        )}

        {step === 'credits' && (
          <motion.div
            key="credits"
            className="absolute inset-0 bg-[#1c120d] text-[#3b2418]"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <BookLayout>
              <section className="relative hidden overflow-hidden border-r border-[#8d6749]/40 bg-[#3b2418] md:flex md:items-center md:justify-center">
                <div className="absolute inset-0 opacity-20">
                  <motion.img
                    src="/assets/hotpoint/papillonjaune.png"
                    alt=""
                    className="absolute left-16 top-20 h-20 w-20"
                    animate={{ y: [0, -12, 0], rotate: [-8, 8, -8] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <motion.img
                    src="/assets/hotpoint/papillonbleu.png"
                    alt=""
                    className="absolute bottom-24 right-20 h-24 w-24"
                    animate={{ y: [0, -16, 0], rotate: [6, -6, 6] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>

                <div className="relative z-10 text-center text-[#fff4dc]">
                  <p className="text-xs uppercase tracking-[0.45em] text-[#e6cda2]/70">
                    The Crybaby Journey
                  </p>

                  <h2 className="mt-5 font-serif text-6xl italic">
                    Crédits
                  </h2>

                  <p className="mt-6 max-w-sm font-serif text-lg italic text-[#fff4dc]/70">
                    Une expérience interactive autour de Cry Baby, K-12 et Portals.
                  </p>
                </div>
              </section>

              <section className="custom-scroll h-full overflow-y-auto p-8">
                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#8a5a49]">
                  Crédits & sources
                </p>

                <h1 className="font-serif text-5xl italic leading-none">
                  Merci d’avoir joué
                </h1>

                <div className="mt-8 grid gap-5">
                  <CreditCard title="Projet">
                    The Crybaby Journey est une expérience web interactive réalisée
                    dans le cadre d’un projet universitaire en BUT MMI.
                  </CreditCard>

                  <CreditCard title="Création">
                    Projet imaginé, designé et développé par
                    <br />
                    <span className="font-serif text-2xl italic text-[#8f4f5e]">
                      Mathilde Mathieu
                    </span>
                  </CreditCard>

                  <CreditCard title="Univers original">
                    Univers, albums, personnages, chansons et direction artistique :
                    Melanie Martinez.
                    <br />
                    Albums évoqués : Cry Baby, K-12 et Portals.
                    <br />
                    Film évoqué : K-12, écrit et réalisé par Melanie Martinez.
                  </CreditCard>

                  <CreditCard title="Ambiances sonores">
                    Certaines ambiances de boîte à musique utilisées dans la chambre
                    finale proviennent des arrangements de R3 Music Box.
                    <br />
                    Musiques originales : Melanie Martinez.
                    <br />
                    Arrangements boîte à musique : R3 Music Box.
                  </CreditCard>

                  <CreditCard title="Cadre universitaire">
                    Département MMI — IUT.

                    <div className="mt-5 flex flex-wrap items-center gap-6">
                      <img
                        src="/assets/logos/logo-mmi.png"
                        alt="Logo MMI"
                        className="h-14 object-contain opacity-80"
                        draggable={false}
                      />

                      <img
                        src="/assets/logos/logo-iut.png"
                        alt="Logo IUT"
                        className="h-14 object-contain opacity-80"
                        draggable={false}
                      />
                    </div>
                  </CreditCard>

                  <CreditCard title="Sources">
                    Sources utilisées pendant la conception : interviews, articles,
                    analyses et contenus publics autour des albums Cry Baby, K-12 et Portals.
                    <br />
                    Références notamment consultées : Vogue, Noisey, Billboard,
                    Alternative Press, Music Scene Media, The Student News Site of Summit
                    High School, ainsi que des analyses de fans sur la narration de Portals.
                  </CreditCard>

                  <CreditCard title="Note">
                    Ce projet n’est pas officiel et n’est affilié ni à Melanie Martinez,
                    ni à son label. Il a été conçu uniquement dans un objectif universitaire,
                    culturel et artistique.
                  </CreditCard>
                </div>
<button
  type="button"
  onClick={() => goStep('summary')}
  className="mt-8 mr-3 inline-flex items-center gap-2 rounded-full border border-[#b88b6a]/50 bg-[#fff4dc]/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7a4b3a] transition hover:bg-white"
>
  Retour
</button>
                <button
                  type="button"
                  onClick={() => {
                    setOutroReturnStep('room');
                    setEra('intro');
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#b88b6a]/50 bg-[#fff4dc]/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7a4b3a] transition hover:bg-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Recommencer
                </button>
              </section>
            </BookLayout>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(90, 55, 35, 0.12);
          border-radius: 999px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(#b9826a, #8f4f5e);
          border-radius: 999px;
          border: 2px solid rgba(255, 244, 220, 0.8);
        }

        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #8f4f5e rgba(90, 55, 35, 0.12);
        }
      `}</style>
    </motion.section>
  );
}

function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-full items-center justify-center p-6">
      <div className="relative h-[88vh] w-[min(94vw,1280px)]">
        <div className="absolute inset-0 rounded-[1.8rem] bg-[#3b2418] shadow-[0_30px_90px_rgba(0,0,0,0.65)]" />

        <div className="absolute inset-[14px] rounded-[1.3rem] border border-[#846044]/50 bg-[#d8bd8b]" />

        <div className="absolute inset-[26px] overflow-hidden rounded-[1rem] bg-[#ead6ad] shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,249,220,0.65),rgba(150,95,55,0.32))]" />

          <div className="absolute left-1/2 top-0 z-30 h-full w-10 -translate-x-1/2 bg-gradient-to-r from-black/30 via-white/20 to-black/30 blur-sm" />

          <div className="relative z-20 grid h-full grid-cols-1 md:grid-cols-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function FragmentCard({
  butterfly,
  title,
  count,
  text,
}: {
  butterfly: string;
  title: string;
  count: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-3xl border border-[#b88b6a]/35 bg-[#fff4dc]/75 p-5 shadow-lg"
    >
      <motion.img
        src={butterfly}
        alt=""
        className="mb-4 h-10 w-10 object-contain"
        animate={{ y: [0, -5, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <p className="text-xs uppercase tracking-[0.25em] text-[#a76f60]">
        {title}
      </p>

      <p className="mt-2 font-serif text-2xl italic">
        {count}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-[#3b2418]/70">
        {text}
      </p>
    </motion.div>
  );
}

function ReplayButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between rounded-3xl border border-[#b88b6a]/35 bg-[#fff4dc]/70 px-5 py-4 font-serif text-xl italic shadow transition hover:bg-white"
    >
      {label}

      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
    </button>
  );
}

function CreditCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#b88b6a]/30 bg-[#fff4dc]/70 p-5 shadow-sm">
      <CreditTitle>{title}</CreditTitle>

      <div className="mt-3 font-serif text-lg italic leading-relaxed text-[#3b2418]/80">
        {children}
      </div>
    </div>
  );
}

function CreditTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase not-italic tracking-[0.25em] text-[#a76f60]">
      {children}
    </p>
  );
}