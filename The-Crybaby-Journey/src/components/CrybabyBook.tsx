import React, { useEffect, useMemo, useRef, useState } from 'react';  
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { useAudio } from './AudioManager';

type FragmentKey = 'story' | 'essence' | 'inspiration' | 'intention';

type StoryLine = {
  en: string;
  fr: string;
};

type InteractiveLayer = {
  id: string;
  label: string;
  fragment: FragmentKey;
  image: string;
  depth: number;
  hotspot: string;
};

type BookFragment = {
  label: string;
  text: string;
  voice?: string;
};

type BookPage = {
  id: string;
  title: string;
  subtitle: string;
  chapter: string;
  background: string;
  music: string;
  storyVoiceEn?: string;
  storyVoiceFr?: string;
  sources?: string[];
  story: StoryLine[];
  fragments: Record<FragmentKey, BookFragment>;
  layers: InteractiveLayer[];
};

const fragmentOrder: FragmentKey[] = ['story', 'essence', 'inspiration', 'intention'];

const introFullText =
  'Ce livre raconte les premières aventures de Cry Baby.\n\nChaque page cache une chanson, une émotion,\net des fragments oubliés.\n\nÉcoute attentivement.\n\nLes papillons te révéleront ce que le conte ne dit pas.';

const STORY_DURATION: Record<string, number> = {
  crybaby: 9500,
  dollhouse: 9600,
  pityparty: 8000,
  madhatter: 10700,
};

const STORY_EN_DURATION: Record<string, number> = {
  crybaby: 9000,
  dollhouse: 10700,
  pityparty: 8000,
  madhatter: 10700,
};

const PAGES: BookPage[] = [
  {
    id: 'intro',
    title: 'Le livre de Crybaby',
    subtitle: 'Un conte interactif',
    chapter: 'Prologue',
    background: '/assets/book/crybaby1.png',
    music: '',
    sources: [],
    story: [],
    fragments: {
      story: {
        label: 'Prologue',
        text: introFullText,
        voice: '/assets/audio/voices/intro-narration.mp3',
      },
      essence: { label: 'Fragments', text: '' },
      inspiration: { label: 'Écoute', text: '' },
      intention: { label: 'Papillons', text: '' },
    },
    layers: [],
  },
  {
    id: 'crybaby',
    title: 'Cry Baby',
    subtitle: "L'océan de l'hypersensibilité",
    chapter: 'Chapitre I',
    background: '/assets/book/crybaby/fond.png',
    music: '/assets/audio/crybaby.mp3',
    storyVoiceEn: '/assets/audio/voices/crybaby-story-en.mp3',
    storyVoiceFr: '/assets/audio/voices/crybaby-story-fr.mp3',
    sources: [
      'Vogue, 2016',
      'Noisey, 2015',
      'Interviews autour du “toy sound” et de la création du personnage Cry Baby',
    ],
    story: [
      { en: 'Saddest girl she has to be', fr: 'Elle doit être la fille la plus triste' },
      { en: 'Salty tears stream down her cheek', fr: 'Des larmes salées coulent sur sa joue' },
      { en: 'Her heart’s bigger than her body', fr: 'Son cœur est plus grand que son corps' },
      { en: 'Her name is Cry Baby', fr: 'Elle s’appelle Cry Baby' },
    ],
    fragments: {
      story: {
        label: 'Accroche',
        text:
          'Il était une fois une enfant dont le cœur battait trop fort pour son petit corps.\n\nOn l’appelait Cry Baby,\ncar elle transformait chaque peine en une marée montante.',
        voice: '/assets/audio/voices/crybaby-accroche.mp3',
      },
      essence: {
        label: 'Essence musicale',
        text:
          'La chanson s’ouvre sur un rythme binaire simple,\npresque enfantin.\n\nPuis elle est submergée par des basses synthétiques profondes.\n\nLe son commence par des bulles et des clapotis,\ncomme si l’on plongeait littéralement dans l’eau.\n\nC’est l’incarnation sonore de Cry Baby :\nune apparence fragile,\nqui cache une puissance émotionnelle capable de tout inonder.',
        voice: '/assets/audio/voices/crybaby-essence.mp3',
      },
      inspiration: {
        label: 'Inspiration & Challenge',
        text:
          'Melanie Martinez a voulu transformer le terme Cry Baby,\nune insulte subie durant son enfance,\nen un titre de noblesse.\n\nLe défi musical était de créer une alt-pop singulière,\nen mariant des sons vintage,\ncomme les hochets et les boîtes à musique,\navec des basses hip-hop plus lourdes.\n\nElle utilise cette immersion sonore\npour rendre la tristesse confortable,\npresque universelle.',
        voice: '/assets/audio/voices/crybaby-inspiration.mp3',
      },
      intention: {
        label: 'Intention profonde',
        text:
          'Mon cœur est plus grand que mon corps.\n\nCry Baby explore l’idée que l’hypersensibilité\nn’est pas une maladie,\nmais une extension de soi.\n\nC’est aussi une critique d’une société\nqui demande d’étouffer ses émotions.\n\nIci, pleurer n’est pas un échec.\n\nC’est une libération nécessaire\npour ne pas exploser.',
        voice: '/assets/audio/voices/crybaby-intention.mp3',
      },
    },
    layers: [
      {
        id: 'banderolles',
        label: 'Banderoles',
        fragment: 'story',
        image: '/assets/book/crybaby/banderolles.png',
        depth: 15,
        hotspot: 'left-[7%] top-[6%] w-[22%] h-[28%]',
      },
      {
        id: 'cadrebleu',
        label: 'Cadre bleu',
        fragment: 'inspiration',
        image: '/assets/book/crybaby/cadrebleu.png',
        depth: 22,
        hotspot: 'left-[74%] top-[4%] w-[18%] h-[20%]',
      },
      {
        id: 'cadrerouge',
        label: 'Cadre rouge',
        fragment: 'intention',
        image: '/assets/book/crybaby/cadrerouge.png',
        depth: 28,
        hotspot: 'left-[76%] top-[52%] w-[18%] h-[22%]',
      },
      {
        id: 'personnage',
        label: 'Cry Baby',
        fragment: 'intention',
        image: '/assets/book/crybaby/personnage.png',
        depth: 55,
        hotspot: '',
      },
      {
        id: 'biberon',
        label: 'Biberon',
        fragment: 'essence',
        image: '/assets/book/crybaby/biberon.png',
        depth: 85,
        hotspot: 'left-[5%] top-[68%] w-[22%] h-[24%]',
      },
    ],
  },
  {
    id: 'dollhouse',
    title: 'Dollhouse',
    subtitle: 'Le théâtre des apparences',
    chapter: 'Chapitre II',
    background: '/assets/book/dollhouse/fond.png',
    music: '/assets/audio/dollhouse.mp3',
    storyVoiceEn: '/assets/audio/voices/dollhouse-story-en.mp3',
    storyVoiceFr: '/assets/audio/voices/dollhouse-story-fr.mp3',
    sources: [
      'Campagne Indiegogo Dollhouse, 2014',
      'Digital Spy, 2015',
      'Interviews sur l’hypocrisie sociale et l’univers Dollhouse',
    ],
    story: [
      { en: 'And in her picture perfect home', fr: 'Et dans sa maison parfaite en apparence' },
      { en: 'Momma’s drunk while daddy moans', fr: 'Maman est ivre pendant que papa gémit' },
      { en: 'Her brother always comes home stoned', fr: 'Son frère rentre toujours défoncé' },
      { en: 'She watches in her room alone', fr: 'Elle regarde seule depuis sa chambre' },
    ],
    fragments: {
      story: {
        label: 'Accroche',
        text:
          'Bienvenue dans la maison\noù les sourires sont peints\net les cœurs sont en miettes.\n\nNe regarde pas trop près…\n\nou tu verras les fissures dans le plastique.',
        voice: '/assets/audio/voices/dollhouse-accroche.mp3',
      },
      essence: {
        label: 'Essence musicale',
        text:
          'Le tempo est rigide et mécanique.\n\nIl imite le mouvement saccadé\nd’une poupée à remonter\nqui finit par dérailler.\n\nCe rythme piégé illustre parfaitement\nl’enfermement des personnages\ndans leurs rôles familiaux\net la répétition des faux-semblants.',
        voice: '/assets/audio/voices/dollhouse-essence.mp3',
      },
      inspiration: {
        label: 'Inspiration & Challenge',
        text:
          'Dollhouse s’inspire de l’hypocrisie\ndes banlieues parfaites,\noù chacun joue un rôle\npour masquer des fissures plus sombres.\n\nAddiction, infidélité, solitude…\n\nTout est caché derrière une façade impeccable.\n\nLe plus grand challenge fut l’indépendance :\nMelanie a dû financer son clip via Indiegogo,\ncar son label ne croyait pas encore en cet univers sombre.\n\nC’est sa communauté\nqui a construit cette maison.',
        voice: '/assets/audio/voices/dollhouse-inspiration.mp3',
      },
      intention: {
        label: 'Intention profonde',
        text:
          'Regarde dans le garde-manger…\n\nles verres sont pleins de sirop.\n\nLe sirop devient la métaphore\nde ce que l’on avale\npour faire taire la douleur.\n\nDollhouse est un cri\ncontre la pression sociale\net le déni.\n\nUne œuvre sur la solitude absolue,\nmême au sein du foyer.',
        voice: '/assets/audio/voices/dollhouse-intention.mp3',
      },
    },
    layers: [
      {
        id: 'fumee',
        label: 'Fumée',
        fragment: 'story',
        image: '/assets/book/dollhouse/fumee.png',
        depth: 15,
        hotspot: '',
      },
      {
        id: 'maison',
        label: 'Maison',
        fragment: 'essence',
        image: '/assets/book/dollhouse/maison.png',
        depth: 35,
        hotspot: '',
      },
      {
        id: 'personnage',
        label: 'Cry Baby',
        fragment: 'inspiration',
        image: '/assets/book/dollhouse/personnage.png',
        depth: 55,
        hotspot: '',
      },
      {
        id: 'porte',
        label: 'Porte',
        fragment: 'intention',
        image: '/assets/book/dollhouse/porte.png',
        depth: 75,
        hotspot: '',
      },
      {
        id: 'piece-crybaby',
        label: 'Chambre de Crybaby',
        fragment: 'story',
        image: '',
        depth: 0,
        hotspot: 'left-[17%] top-[42%] w-[33%] h-[21%]',
      },
      {
        id: 'piece-salon',
        label: 'Salon',
        fragment: 'essence',
        image: '',
        depth: 0,
        hotspot: 'left-[14%] top-[64%] w-[34%] h-[22%]',
      },
      {
        id: 'piece-frere',
        label: 'Chambre du frère',
        fragment: 'inspiration',
        image: '',
        depth: 0,
        hotspot: 'left-[55%] top-[42%] w-[24%] h-[21%]',
      },
      {
        id: 'piece-parents',
        label: 'Chambre des parents',
        fragment: 'intention',
        image: '',
        depth: 0,
        hotspot: 'left-[55%] top-[65%] w-[27%] h-[23%]',
      },
    ],
  },
  {
    id: 'pityparty',
    title: 'Pity Party',
    subtitle: 'L’explosion solitaire',
    chapter: 'Chapitre III',
    background: '/assets/book/pityparty/fond.png',
    music: '/assets/audio/pityparty.mp3',
    storyVoiceEn: '/assets/audio/voices/pityparty-story-en.mp3',
    storyVoiceFr: '/assets/audio/voices/pityparty-story-fr.mp3',
    sources: [
      'Billboard News, 2015',
      'Elle Magazine, 2016',
      'Référence à “It’s My Party” de Lesley Gore, 1963',
    ],
    story: [
      { en: 'Her birthday was around the bend', fr: 'Son anniversaire approchait' },
      { en: 'She invited him and all her friends', fr: 'Elle l’avait invité, lui et tous ses amis' },
      { en: 'None of which did attend', fr: 'Aucun d’eux n’est venu' },
      { en: 'Her happiness came to an end', fr: 'Son bonheur prit fin' },
    ],
    fragments: {
      story: {
        label: 'Accroche',
        text:
          'Personne n’est venu à la fête…\n\nAlors Cry Baby a décidé\nd’inviter sa propre folie\nà danser sous les ballons en cendres.',
        voice: '/assets/audio/voices/pityparty-accroche.mp3',
      },
      essence: {
        label: 'Essence musicale',
        text:
          'Le morceau joue sur une dynamique\ncalme puis tempête.\n\nLa tension monte peu à peu,\njusqu’à un cri viscéral\nau milieu du pont.\n\nCe cri brise littéralement la structure pop.\n\nIl déchire la douceur de la mélodie,\net marque la rupture psychologique de Cry Baby.',
        voice: '/assets/audio/voices/pityparty-essence.mp3',
      },
      inspiration: {
        label: 'Inspiration & Challenge',
        text:
          'Melanie Martinez reprend et détourne\nle tube de 1963,\nIt’s My Party,\nde Lesley Gore.\n\nLe défi était de transformer\nun caprice vintage\nen une véritable crise existentielle\nsur l’isolement social.\n\nPour son premier clip réalisé seule,\nelle a dû convaincre son équipe\nque détruire un gâteau\net brûler des ballons\npouvait devenir une forme\nde poésie macabre.',
        voice: '/assets/audio/voices/pityparty-inspiration.mp3',
      },
      intention: {
        label: 'Intention profonde',
        text:
          'Pity Party explore la solitude choisie.\n\nQuand personne ne vient,\non apprend à être sa propre fête.\n\nC’est une ode à la santé mentale\net au droit de craquer.\n\nCry Baby comprend\nqu’elle doit devenir sa propre compagnie\nlorsque le monde l’ignore.',
        voice: '/assets/audio/voices/pityparty-intention.mp3',
      },
    },
    layers: [
  {
    id: 'banderolles',
    label: 'Banderolles',
    fragment: 'story',
    image: '/assets/book/pityparty/banderolles.png',
    depth: 14,
    hotspot: '',
  },
  {
    id: 'ballonsgauche',
    label: 'Accroche',
    fragment: 'story',
    image: '/assets/book/pityparty/ballonsgauche.png',
    depth: 35,
    hotspot: 'left-[4%] top-[25%] w-[25%] h-[43%]',
  },
  {
    id: 'ballonsdroite',
    label: 'Ballons droite',
    fragment: 'story',
    image: '/assets/book/pityparty/ballonsdroite.png',
    depth: 38,
    hotspot: '',
  },
  {
    id: 'personnage',
    label: 'Essence musicale',
    fragment: 'essence',
    image: '/assets/book/pityparty/personnage.png',
    depth: 65,
    hotspot: 'left-[75%] top-[10%] w-[30%] h-[52%]',
  },
  {
    id: 'brasoursbleu',
    label: 'Inspiration',
    fragment: 'inspiration',
    image: '/assets/book/pityparty/brasoursbleu.png',
    depth: 82,
    hotspot: 'left-[6%] top-[72%] w-[34%] h-[18%]',
  },
  {
    id: 'teteoursrose',
    label: 'Intention',
    fragment: 'intention',
    image: '/assets/book/pityparty/teteoursrose.png',
    depth: 78,
    hotspot: 'left-[63%] top-[69%] w-[30%] h-[24%]',
  },
],
  },
  {
    id: 'madhatter',
    title: 'Mad Hatter',
    subtitle: 'La couronne du chaos',
    chapter: 'Chapitre IV',
    background: '/assets/book/madhatter/fond.png',
    music: '/assets/audio/madhatter.mp3',
    storyVoiceEn: '/assets/audio/voices/madhatter-story-en.mp3',
    storyVoiceFr: '/assets/audio/voices/madhatter-story-fr.mp3',
    sources: [
      'Alternative Press, 2017',
      'Fuse TV',
      'Références à Alice au Pays des Merveilles de Lewis Carroll',
    ],
    story: [
      { en: 'Cry Baby sat and disagreed', fr: 'Cry Baby resta assise et refusa' },
      { en: 'Imperfect, insane, and emotional was she', fr: 'Elle était imparfaite, folle et émotionnelle' },
      { en: 'But she feels safe, going to sleep', fr: 'Mais elle se sent en sécurité en s’endormant' },
      { en: 'And there’s no one else that she’d rather be', fr: 'Et elle ne voudrait être personne d’autre' },
    ],
    fragments: {
      story: {
        label: 'Accroche',
        text:
          'Ne crains pas les ombres.\n\nCar les meilleures personnes\nsont toutes un peu dérangées.\n\nLa fin du voyage\nest le début de ta liberté.',
        voice: '/assets/audio/voices/madhatter-accroche.mp3',
      },
      essence: {
        label: 'Essence musicale',
        text:
          'C’est le morceau le plus complexe.\n\nIl mêle des synthétiseurs glitchés,\ndes rires distordus,\net des bruitages électroniques imprévisibles.\n\nLa musique ne cherche plus à être jolie.\n\nElle devient expérimentale,\nà l’image d’une santé mentale\nqui cesse enfin de se cacher.',
        voice: '/assets/audio/voices/madhatter-essence.mp3',
      },
      inspiration: {
        label: 'Inspiration & Challenge',
        text:
          'L’univers puise dans Alice au Pays des Merveilles,\nde Lewis Carroll.\n\nLe challenge lyrique était d’écrire un hymne\nqui rende la folie attrayante,\npresque sécurisante.\n\nMelanie voulait conclure l’album\nsur une victoire non conventionnelle :\nl’acceptation d’être bizarre\nselon les standards des autres.',
        voice: '/assets/audio/voices/madhatter-inspiration.mp3',
      },
      intention: {
        label: 'Intention profonde',
        text:
          'L’acceptation est totale.\n\nLes meilleures personnes sont folles.\n\nMelanie explique que la normalité\nest une construction étouffante.\n\nEn embrassant son instabilité,\nCry Baby trouve enfin la paix.\n\nCe n’est pas une chute.\n\nC’est une ascension\nvers sa propre vérité\net sa propre liberté.',
        voice: '/assets/audio/voices/madhatter-intention.mp3',
      },
    },
    layers: [
      {
        id: 'arbres',
        label: 'Arbres',
        fragment: 'story',
        image: '/assets/book/madhatter/arbres.png',
        depth: 12,
        hotspot: '',
      },
      {
        id: 'herbes',
        label: 'Herbes',
        fragment: 'intention',
        image: '/assets/book/madhatter/herbes.png',
        depth: 90,
        hotspot: '',
      },
      {
        id: 'bonbons',
        label: 'Bonbons',
        fragment: 'inspiration',
        image: '/assets/book/madhatter/bonbons.png',
        depth: 35,
        hotspot: 'left-[16%] top-[80%] w-[20%] h-[14%]',
      },
      {
        id: 'bonbonsdroite',
        label: 'Bonbons droite',
        fragment: 'essence',
        image: '/assets/book/madhatter/bonbonsdroite.png',
        depth: 45,
        hotspot: 'left-[60%] top-[15%] w-[22%] h-[18%]',
      },
      {
        id: 'donuts',
        label: 'Donuts',
        fragment: 'story',
        image: '/assets/book/madhatter/donuts.png',
        depth: 55,
        hotspot: 'left-[3%] top-[30%] w-[20%] h-[18%]',
      },
      {
        id: 'paindepice',
        label: 'Pain d’épice',
        fragment: 'intention',
        image: '/assets/book/madhatter/paindepice.png',
        depth: 80,
        hotspot: 'left-[68%] top-[73%] w-[25%] h-[16%]',
      },
      {
        id: 'personnage',
        label: 'Cry Baby',
        fragment: 'essence',
        image: '/assets/book/madhatter/personnage.png',
        depth: 65,
        hotspot: '',
      },
    ],
  },
  {
    id: 'transition',
    title: 'Pages blanches',
    subtitle: 'À vous d’écrire la suite',
    chapter: 'Épilogue',
    background: '/assets/book/crybaby2.png',
    music: '',
    sources: [],
    story: [],
    fragments: {
      story: {
        label: 'Pages vides',
        text:
          'Les pages sont encore blanches…\n\nL’histoire de Cry Baby\nn’est plus seulement racontée.\n\nMaintenant…\n\nc’est à toi de continuer.\n\nTes choix écriront\nles prochains mots du livre.\n\nEntre dans l’histoire…\n\net découvre ce qui vient ensuite.',
        voice: '/assets/audio/voices/outro-pensee.mp3',
      },
      essence: { label: 'Histoire', text: '' },
      inspiration: { label: 'Choix', text: '' },
      intention: { label: 'Entrée', text: '' },
    },
    layers: [],
  },
];

export default function CrybabyBook() {
  const { setEra } = useStore();
  const { playMusic, playVoice, playSfx, stopMusic, stopVoice, stopAll } = useAudio();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [revealed, setRevealed] = useState<Record<string, FragmentKey[]>>({});
  const [openedFragment, setOpenedFragment] = useState<FragmentKey | null>(null);
  const fragmentsScrollRef = useRef<HTMLDivElement | null>(null);
  const activeFragmentRef = useRef<HTMLDivElement | null>(null);
  const [typedText, setTypedText] = useState('');
  const [introTypedText, setIntroTypedText] = useState('');
  const [outroTypedText, setOutroTypedText] = useState('');
  const [storyCompleted, setStoryCompleted] = useState<Record<string, boolean>>({});
  const [storyTranslated, setStoryTranslated] = useState<Record<string, boolean>>({});
  const [autoTranslatedLines, setAutoTranslatedLines] = useState<Record<string, number[]>>({});
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [enteringBook, setEnteringBook] = useState(false);

  const page = PAGES[currentPage];
  const revealedForPage = revealed[page.id] ?? [];
  const isStoryCompleted = storyCompleted[page.id] ?? false;

  const visibleFragments = useMemo(() => {
    return fragmentOrder.filter((key) => revealedForPage.includes(key));
  }, [revealedForPage]);


  useEffect(() => {
    stopMusic();  

    stopVoice();
    setOpenedFragment(null);
    setTypedText('');
    setIsStoryPlaying(false);

    if (page.id === 'intro' && page.fragments.story.voice) {
      setIntroTypedText('');

      window.setTimeout(() => {
        playVoice(page.fragments.story.voice as string);

        let index = 0;
        const speed = 70;

        const interval = window.setInterval(() => {
          index += 1;
          setIntroTypedText(introFullText.slice(0, index));

          if (index >= introFullText.length) {
            window.clearInterval(interval);
          }
        }, speed);
      }, 500);
    }

    if (
        page.id !== 'intro' &&
        page.id !== 'transition' &&
        page.storyVoiceEn &&
        !storyCompleted[page.id]
      ) {
        window.setTimeout(() => {
          playVoice(page.storyVoiceEn as string);

          window.setTimeout(() => {
            if (page.music) playMusic(page.music);
          }, STORY_EN_DURATION[page.id] ?? 9000);
        }, 700);
      }

    if (page.id === 'transition' && page.fragments.story.voice) {
      setOutroTypedText('');

      window.setTimeout(() => {
        playVoice(page.fragments.story.voice as string);

        let index = 0;
        const speed = 60;
        const fullText = page.fragments.story.text;

        const interval = window.setInterval(() => {
          index += 1;
          setOutroTypedText(fullText.slice(0, index));

          if (index >= fullText.length) {
            window.clearInterval(interval);
          }
        }, speed);
      }, 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id]);

 useEffect(() => {
  return () => {
    stopAll();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    if (!openedFragment) {
      setTypedText('');
      return;
    }

    const fullText = page.fragments[openedFragment].text;
    let index = 0;

    setTypedText('');

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        window.clearInterval(interval);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, [openedFragment, page]);

  useEffect(() => {
  if (!openedFragment) return;

  window.setTimeout(() => {
    activeFragmentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, 120);
}, [openedFragment, typedText]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 30,
      y: (e.clientY / window.innerHeight - 0.5) * 30,
    });
  };

  const toggleStoryLineTranslation = (index: number) => {
    if (isStoryPlaying) return;

    const key = `${page.id}-${index}`;

    setStoryTranslated((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleStoryContinue = () => {
    if (page.id === 'intro' || page.id === 'transition') return;
    if (isStoryCompleted || isStoryPlaying) return;

    stopVoice();
    playSfx('/assets/audio/soundeffect.mp3');
    setIsStoryPlaying(true);

    if (page.storyVoiceFr) {
      playVoice(page.storyVoiceFr);
    }

    page.story.forEach((_, index) => {
      window.setTimeout(() => {
        setAutoTranslatedLines((prev) => {
          const current = prev[page.id] ?? [];

          if (current.includes(index)) return prev;

          return {
            ...prev,
            [page.id]: [...current, index],
          };
        });
      }, index * 1500 + 600);
    });

    window.setTimeout(() => {
      setStoryCompleted((prev) => ({
        ...prev,
        [page.id]: true,
      }));

      setIsStoryPlaying(false);
      stopVoice();
    }, STORY_DURATION[page.id] ?? 9000);
  };

  const revealFragment = (fragment: FragmentKey) => {
    playSfx('/assets/audio/soundeffect.mp3');

    const fragmentInfo = page.fragments[fragment];

    if (fragmentInfo.voice) {
      playVoice(fragmentInfo.voice);
    }

    setRevealed((prev) => {
      const current = prev[page.id] ?? [];

      if (current.includes(fragment)) return prev;

      return {
        ...prev,
        [page.id]: [...current, fragment],
      };
    });

    

    setOpenedFragment(fragment);
  };

  const handleNext = () => {
    setOpenedFragment(null);
    stopVoice();
    setIsStoryPlaying(false);

    if (currentPage < PAGES.length - 1) {
      setCurrentPage((prev) => prev + 1);
      return;
    };

    setEnteringBook(true);
    stopAll();

    window.setTimeout(() => {
      setEra('k12');
    }, 1300);
  };

  const handlePrev = () => {
    setOpenedFragment(null);
    stopVoice();
    setIsStoryPlaying(false);

    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageDoubleClick = (side: 'left' | 'right') => {
    if (isStoryPlaying) return;

    if (side === 'left') handlePrev();
    if (side === 'right') handleNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#1c120d]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,214,170,0.18),rgba(20,10,8,0.96))]" />
      <div className="absolute inset-0 opacity-[0.22] mix-blend-soft-light bg-[url('/assets/book/paper-texture.png')]" />

      <motion.div
        key={page.id}
        initial={{ opacity: 0, scale: 0.96, rotateY: 6 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.96, rotateY: -6 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="relative z-10 h-[88vh] w-[min(94vw,1280px)]"
      >
        <div className="absolute inset-0 rounded-[1.8rem] bg-[#3b2418] shadow-[0_30px_90px_rgba(0,0,0,0.65)]" />
        <div className="absolute inset-[14px] rounded-[1.3rem] border border-[#846044]/50 bg-[#d8bd8b]" />

        <div className="absolute inset-[26px] overflow-hidden rounded-[1rem] bg-[#ead6ad] shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,249,220,0.65),rgba(150,95,55,0.32))]" />
          <div className="absolute left-1/2 top-0 z-30 h-full w-10 -translate-x-1/2 bg-gradient-to-r from-black/30 via-white/20 to-black/30 blur-sm" />

          <div className="relative z-20 grid h-full grid-cols-1 md:grid-cols-2">
            <section
              onDoubleClick={() => handlePageDoubleClick('left')}
              className="relative hidden h-full overflow-hidden border-r border-[#8d6749]/40 [perspective:1200px] md:block"
            >
              <div className="absolute inset-0 opacity-25 bg-[url('/assets/book/page-texture.png')]" />

              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  rotateX: -mousePos.y * 0.18,
                  rotateY: mousePos.x * 0.18,
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={page.background}
                  alt={page.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(30,14,8,0.28))]" />

                {page.layers
                  .filter((layer) => layer.image)
                  .map((layer) => (
                    <motion.img
                      key={layer.id}
                      src={layer.image}
                      alt={layer.label}
                      draggable={false}
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover drop-shadow-[0_12px_18px_rgba(0,0,0,0.25)]"
                      style={{
                        x: mousePos.x * (layer.depth / 80),
                        y: mousePos.y * (layer.depth / 80),
                        transform: `translateZ(${layer.depth}px)`,
                        zIndex: layer.depth,
                      }}
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
              </motion.div>

              <AnimatePresence>
                {isStoryCompleted &&
                  page.layers
                    .filter((layer) => layer.hotspot)
                    .map((layer) => {
                      const isRevealed = revealedForPage.includes(layer.fragment);

                      return (
                        <motion.button
                          key={`${layer.id}-hotspot`}
                          type="button"
                          aria-label={layer.label}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.6 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            revealFragment(layer.fragment);
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.92 }}
                          className={`group absolute ${layer.hotspot} z-[300] cursor-pointer rounded-full`}
                        >
                          <motion.span
                            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-2xl"
                            animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.9, 0.55] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                          />

                          <motion.span
                            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-yellow-200/40"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                          />

                          <motion.img
                            src="/assets/hotpoint/papillonjaune.png"
                            alt="Papillon interactif"
                            draggable={false}
                            className="absolute left-1/2 top-1/2 z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_22px_rgba(255,255,255,1)]"
                            animate={
                              isRevealed
                                ? { scale: 0.9, opacity: 0.75 }
                                : {
                                    y: [0, -6, 0],
                                    scale: [1, 1.15, 1],
                                    rotate: [-4, 4, -4],
                                  }
                            }
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />

                          {isRevealed && (
                            <span className="absolute left-1/2 top-1/2 z-30 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-yellow-700 shadow-[0_0_20px_rgba(255,255,255,1)]">
                              ✓
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
              </AnimatePresence>
            </section>

            <section
              onDoubleClick={() => handlePageDoubleClick('right')}
              className="relative h-full overflow-hidden p-7 md:p-8"
            >
              <div className="absolute inset-0 opacity-30 bg-[url('/assets/book/page-texture.png')]" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-5">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#8a5a49]">
                    {page.chapter}
                  </p>

                  <h1 className="font-serif text-5xl italic leading-none text-[#3b2418]">
                    {page.title}
                  </h1>
                </div>

                {page.id === 'intro' ? (
                  <div className="custom-scroll flex-1 overflow-y-auto pr-4 font-serif text-xl italic leading-relaxed text-[#3d2c26]">
                    <p className="whitespace-pre-line">
                      {introTypedText}
                      {introTypedText.length < introFullText.length && (
                        <span className="animate-pulse">|</span>
                      )}
                    </p>
                  </div>
                ) : page.id === 'transition' ? (
                  <div className="flex flex-1 items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.9, delay: 0.3 }}
                      className="relative max-w-[430px] rounded-[2rem] border border-[#b88b6a]/35 bg-[#fff4dc]/75 p-7 font-serif text-xl italic leading-relaxed text-[#3d2c26] shadow-xl backdrop-blur-sm"
                    >
                      <div className="absolute -left-4 bottom-8 h-8 w-8 rotate-45 border-b border-l border-[#b88b6a]/35 bg-[#fff4dc]/75" />
                      <p className="whitespace-pre-line">
                        {outroTypedText}
                        {outroTypedText.length < page.fragments.story.text.length && (
                          <span className="animate-pulse">|</span>
                        )}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {!isStoryCompleted ? (
                      <motion.div
                        key="story"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-1 items-center"
                      >
                        <div className="w-full font-serif text-2xl italic leading-[1.9] text-[#3d2c26]">
                          {page.story.map((line, index) => {
                            const manualKey = `${page.id}-${index}`;
                            const autoTranslated =
                              autoTranslatedLines[page.id]?.includes(index) ?? false;
                            const translated = storyTranslated[manualKey] ?? autoTranslated;

                            return (
                              <motion.button
                                key={line.en}
                                type="button"
                                disabled={isStoryPlaying}
                                onClick={() => toggleStoryLineTranslation(index)}
                                className="block text-left transition hover:text-[#8f4f5e] disabled:cursor-default"
                              >
                                <AnimatePresence mode="wait">
                                  <motion.span
                                    key={translated ? line.fr : line.en}
                                    initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                                    transition={{ duration: 0.45 }}
                                    className="block"
                                  >
                                    {translated ? line.fr : line.en}
                                  </motion.span>
                                </AnimatePresence>
                              </motion.button>
                            );
                          })}

                          <button
                            type="button"
                            onClick={handleStoryContinue}
                            disabled={isStoryPlaying}
                            className="mt-10 inline-flex items-center justify-center rounded-full border border-[#b88b6a]/50 bg-[#8f4f5e] px-7 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[#fff4dc] shadow-[0_0_25px_rgba(143,79,94,0.35)] transition hover:scale-105 hover:bg-[#a95f70] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isStoryPlaying ? 'Narration en cours...' : 'Lancer la narration'}
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="fragments"
                        ref={fragmentsScrollRef}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="custom-scroll flex-1 space-y-5 overflow-y-auto pr-4"
                      >
                        {visibleFragments.length === 0 ? (
                          <p className="font-serif text-xl italic leading-relaxed text-[#8a5a49]">
                            Les papillons sont apparus dans l’image. Cliquez sur eux pour révéler ce
                            que cache cette page.
                          </p>
                        ) : (
                          visibleFragments.map((key) => (
                            <motion.div
                              key={key}
                              ref={openedFragment === key ? activeFragmentRef : null}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border-b border-[#b88b6a]/20 pb-4 scroll-mt-10"
                            >
                              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#a76f60]">
                                ✦ {page.fragments[key].label}
                              </p>

                              <p className="whitespace-pre-line font-serif text-lg italic leading-relaxed text-[#3d2c26]">
                                {openedFragment === key ? typedText : page.fragments[key].text}
                                {openedFragment === key &&
                                  typedText.length < page.fragments[key].text.length && (
                                    <span className="animate-pulse">|</span>
                                  )}
                              </p>
                            </motion.div>
                          ))
                        )}

                        {page.sources && page.sources.length > 0 && visibleFragments.length === 4 && (
                          <div className="pt-2">
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a76f60]">
                              Sources
                            </p>
                            <p className="font-serif text-sm italic leading-relaxed text-[#3d2c26]">
                              {page.sources.join(' · ')}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                <div className="mt-4 text-xs uppercase tracking-[0.3em] text-[#9b6a59]">
                  {page.id === 'intro'
                    ? 'Tournez la page pour commencer'
                    : page.id === 'transition'
                      ? 'Entre dans l’histoire'
                      : isStoryCompleted
                        ? `Fragments révélés : ${revealedForPage.length}/4`
                        : isStoryPlaying
                          ? 'Narration en cours'
                          : 'Lecture du conte'}
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {enteringBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] overflow-hidden bg-[#fff4dc]"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 2.4 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src="/assets/book/crybaby2.png"
                alt="Entrer dans le livre"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="rounded-[2rem] border border-[#b88b6a]/40 bg-[#fff4dc]/85 px-10 py-8 shadow-2xl backdrop-blur-md">
                <p className="font-serif text-4xl italic text-[#3d2c26]">
                  À vous d’écrire la suite...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0 || isStoryPlaying}
          className="rounded-full border border-[#e6cda2]/40 bg-[#fff4dc]/90 p-3 text-[#7a4b3a] shadow disabled:opacity-30"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isStoryPlaying}
          className="flex items-center gap-2 rounded-full bg-[#8f4f5e] px-5 py-3 text-sm font-bold text-white shadow hover:bg-[#a95f70] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {page.id === 'transition' ? 'Entrer dans le livre' : 'Tourner la page'}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="fixed bottom-8 left-8 z-50 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 backdrop-blur-md">
        {currentPage + 1} / {PAGES.length}
        {page.id !== 'intro' &&
          page.id !== 'transition' &&
          isStoryCompleted &&
          ` · ${revealedForPage.length}/4`}
      </div>

      {page.id !== 'intro' &&
        page.id !== 'transition' &&
        isStoryCompleted &&
        visibleFragments.length === 0 && (
          <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-md">
            Cliquez sur les papillons pour révéler les fragments
          </div>
        )}

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
    </motion.div>
  );
}