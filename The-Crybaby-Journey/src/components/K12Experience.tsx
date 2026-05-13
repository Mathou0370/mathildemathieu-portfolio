import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { useAudio } from './AudioManager';

const AMBIENT_MUSIC = '/assets/audio/cafet.mp3';

type Hotspot = {
  id: string;
  x: string;
  y: string;
  title: string;
  text: string;
};

type Choice = {
  label: string;
  target: string;
  explanation: string;
};



type LineKind = 'narration' | 'dialogue' | 'thought' | 'sound';

type StoryLine = {
  speaker?: string;
  kind: LineKind;
  text: string;
  audio?: string;
};
type SceneSfx = {
  onEnter?: string;
};

type Scene = {
  id: string;
  title: string;
  music: string;
  background: string;
  voiceFolder?: string;
  sfx?: SceneSfx;
  lines: StoryLine[];
  choiceIntro?: string;
  hotspots: Hotspot[];
  choices: Choice[];
};

const SCENES: Record<string, Scene> = {
  wob: {
    id: 'wob',
    title: 'Wheels on the Bus',
    music: '/assets/audio/k12/wheels-on-the-bus.mp3',
    background: '/assets/k12/1schoolbus.png',
    voiceFolder: '/assets/audio/k12/voices/wob',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Le bus roule depuis plusieurs minutes.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'Personne ne parle vraiment… mais le bruit remplit tout l’espace.' },
      { speaker: 'Kelly', kind: 'dialogue', text: 'Hé Cry Baby… tu comptes pleurer toute la journée ?' },
      { speaker: 'Élèves', kind: 'sound', text: 'rient' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'Ignore-les.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'À travers les vitres, le monde semble normal.' },
      { speaker: 'Conducteur', kind: 'dialogue', text: 'Asseyez-vous immédiatement !' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais ici… quelque chose paraît déjà cassé.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ce bus ne nous emmène pas seulement à l’école.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Il nous emmène dans un système où tout le monde apprend à regarder ailleurs.' },
    ],
    choiceIntro: 'Les portes du bus s’ouvrent dans un grincement. K-12 attend au bout de l’allée.',
    hotspots: [
      {
        id: 'window',
        x: '18%',
        y: '38%',
        title: 'Le contraste',
        text:
          'Wheels on the Bus détourne une comptine enfantine pour créer quelque chose de profondément inconfortable. Le trajet paraît innocent. Les couleurs restent douces. Les élèves ressemblent encore à des enfants. Mais derrière cette façade, la violence existe déjà partout. Le monde extérieur continue normalement derrière les vitres… comme si personne ne remarquait réellement ce qui se passe à l’intérieur du bus.',
      },
      {
        id: 'students',
        x: '55%',
        y: '48%',
        title: 'L’indifférence collective',
        text:
          'Personne n’intervient lorsque Kelly se moque de Cry Baby. Les autres rient. Ou regardent ailleurs. À K-12, la cruauté devient presque une langue commune. Le silence collectif protège souvent davantage les agresseurs que les victimes.',
      },
      {
        id: 'driver',
        x: '82%',
        y: '57%',
        title: 'Les adultes absents',
        text:
          'Le conducteur représente les adultes censés protéger les enfants. Mais il maintient seulement l’ordre extérieur : les sièges alignés, les règles, le calme. Jamais la sécurité émotionnelle. Le système voit le désordre. Pas la souffrance.',
      },
    ],
    choices: [
      {
        label: 'Descendre du bus',
        target: 'transition',
        explanation: 'Je suis descendue du bus. K-12 se dressait devant moi.',
      },
    ],
  },

  transition: {
    id: 'transition',
    title: 'Arrivée à K-12',
    music: '/assets/audio/dehors.mp3',
    background: '/assets/k12/2transition.png',
    voiceFolder: '/assets/audio/k12/voices/transition',
     sfx: {
    onEnter: '/assets/audio/sfx/school-bell.mp3',
  },
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Le bus ralentit devant les grilles de K-12.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Le bâtiment est immense.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Rose. Parfait. Presque irréel.' },
      { speaker: 'Kelly', kind: 'dialogue', text: 'Essaie de pas te perdre, Cry Baby.' },
      { speaker: 'Professeur', kind: 'dialogue', text: 'Bienvenue à K-12.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Plus je regarde les fenêtres…' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Plus j’ai l’impression qu’elles nous observent aussi.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ce n’est pas une école.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'C’est une machine.' },
    ],
    choiceIntro: 'La sonnerie retentit. Les élèves se dirigent vers les salles de classe.',
    hotspots: [],
    choices: [
      {
        label: 'Entrer en classe',
        target: 'cf',
        explanation: 'Je suis entrée dans la classe. Le vrai test commençait.',
      },
    ],
  },

  cf: {
    id: 'cf',
    title: 'Class Fight',
    music: '/assets/audio/k12/class-fight.mp3',
    background: '/assets/k12/3classfight.png',
    voiceFolder: '/assets/audio/k12/voices/cf',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Le cours dure depuis trop longtemps.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Kelly n’arrête pas de me regarder.' },
      { speaker: 'Brandon', kind: 'dialogue', text: 'Tu peux me passer ça ?' },
      { speaker: 'Kelly', kind: 'dialogue', text: 'Pourquoi tu lui parles ?' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'J’ai rien fait.' },
      { speaker: 'Kelly', kind: 'dialogue', text: 'Menteuse.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'Avant même que je comprenne…' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'Kelly me frappe au visage.' },
      { speaker: 'Professeur', kind: 'dialogue', text: 'LES FILLES !' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Toute la classe regarde.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais personne n’aide vraiment.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'La violence fait déjà partie du système ici.' },
    ],
    choiceIntro: 'Kelly vient de la frapper. Trois portes s’ouvrent devant Cry Baby, mais aucune ne ressemble vraiment à une solution.',
    hotspots: [
      {
        id: 'kelly',
        x: '42%',
        y: '48%',
        title: 'La violence émotionnelle',
        text:
          'Class Fight parle d’une colère qui explose parce qu’elle n’a jamais été comprise. Les élèves grandissent dans un environnement où les émotions sont ridiculisées, ignorées, ou punies. Alors elles finissent par sortir sous la forme de violence. Kelly devient autant le produit du système que Cry Baby.',
      },
      {
        id: 'teacher',
        x: '27%',
        y: '25%',
        title: 'L’autorité passive',
        text:
          'Le professeur intervient uniquement lorsque le calme disparaît. Pas quand la souffrance commence. À K-12, les adultes semblent davantage préoccupés par la discipline que par ce qui pousse réellement les élèves à se détruire entre eux.',
      },
      {
        id: 'classroom',
        x: '58%',
        y: '70%',
        title: 'Terrain hostile',
        text:
          'Une salle de classe devrait être un lieu d’apprentissage. Mais ici, elle devient un espace de compétition, de jugement, et de surveillance permanente. Même les bureaux semblent trop serrés pour respirer.',
      },
    ],
    choices: [
      { label: 'Aller voir le Principal', target: 'principal', explanation: 'Après que Kelly m’a frappée, j’ai voulu croire que l’autorité pouvait encore m’aider.' },
      { label: 'Aller à l’infirmerie', target: 'nurse', explanation: 'Après que Kelly m’a frappée, j’ai cherché un endroit où soigner ce qui faisait mal.' },
      { label: 'Se cacher dans une salle sombre', target: 'showtell', explanation: 'Après que Kelly m’a frappée, j’ai voulu disparaître dans une salle sombre, loin des regards.' },
    ],
  },

  principal: {
    id: 'principal',
    title: 'The Principal',
    music: '/assets/audio/k12/theprincipal.mp3',
    background: '/assets/k12/4theprincipal.png',
    voiceFolder: '/assets/audio/k12/voices/principal',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Le bureau du Principal sent le faux calme.' },
      { speaker: 'Principal', kind: 'dialogue', text: 'Kelly est une excellente élève.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Elle m’a frappée.' },
      { speaker: 'Principal', kind: 'dialogue', text: 'Peut-être l’as-tu provoquée.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Il parle de discipline.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'De réputation.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais jamais de justice.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ici, l’autorité protège surtout elle-même.' },
    ],
    choiceIntro: 'Le bureau ne lui a donné aucune réponse.',
    hotspots: [
      {
        id: 'desk',
        x: '50%',
        y: '60%',
        title: 'Le pouvoir',
        text:
          'The Principal critique les figures d’autorité qui utilisent leur position pour conserver le contrôle plutôt que protéger les plus vulnérables. Melanie Martinez s’est aussi inspirée du climat politique américain durant le mandat de Donald Trump. Le Principal devient alors une représentation du pouvoir : arrogant, déconnecté, et incapable de reconnaître ses propres violences.',
      },
      {
        id: 'trophies',
        x: '74%',
        y: '32%',
        title: 'L’image parfaite',
        text:
          'Les trophées remplissent la pièce comme si l’école devait constamment prouver sa réussite. À K-12, l’apparence compte plus que le bien-être des élèves. Le système préfère sembler parfait plutôt qu’admettre ses fissures.',
      },
      {
        id: 'door',
        x: '15%',
        y: '58%',
        title: 'Aucune véritable aide',
        text:
          'Cry Baby entre ici en espérant être protégée. Mais elle découvre que même les adultes participent à la machine. Il n’existe presque aucun espace réellement sûr à K-12.',
      },
    ],
    choices: [
      { label: 'Aller manger', target: 'social', explanation: 'Le Principal m’a renvoyée vers les autres, comme si m’adapter suffisait.' },
    ],
  },

  nurse: {
    id: 'nurse',
    title: "Nurse’s Office",
    music: '/assets/audio/k12/nurses-office.mp3',
    background: '/assets/k12/5nurse.png',
    voiceFolder: '/assets/audio/k12/voices/nurse',
    lines: [
      { speaker: 'Cry Baby', kind: 'thought', text: 'L’infirmerie paraît douce.' },
      { speaker: 'Infirmière', kind: 'dialogue', text: 'Assieds-toi.' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'Tu saignes un peu…' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Sa voix est calme.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Trop calme.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ici, la douleur est endormie.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Elle n’est jamais vraiment écoutée.' },
    ],
    choiceIntro: 'Cry Baby comprend que l’infirmerie ne réparera rien.',
    hotspots: [
      {
        id: 'bed',
        x: '40%',
        y: '60%',
        title: 'Fuir le système',
        text:
          'Nurse’s Office parle du désir de disparaître quelques heures. Tomber malade devient presque une solution. Quand l’école devient insupportable, le corps finit parfois par chercher lui-même une échappatoire.',
      },
      {
        id: 'medicine',
        x: '68%',
        y: '42%',
        title: 'Faire taire',
        text:
          'Les médicaments deviennent une métaphore : on calme les symptômes, mais jamais la cause. À K-12, la souffrance émotionnelle est anesthésiée, pas comprise.',
      },
      {
        id: 'light',
        x: '52%',
        y: '25%',
        title: 'Le faux confort',
        text:
          'L’infirmerie paraît rassurante. Mais plus Cry Baby reste ici, plus la douceur semble artificielle. Comme si le système avait appris à cacher sa violence sous du pastel.',
      },
    ],
    choices: [
      { label: 'Aller manger', target: 'social', explanation: 'L’infirmerie n’a rien réparé. Elle a seulement rendu la douleur plus silencieuse.' },
    ],
  },

  showtell: {
    id: 'showtell',
    title: 'Show & Tell',
    music: '/assets/audio/k12/show-and-tell.mp3',
    background: '/assets/k12/6showtell.png',
    voiceFolder: '/assets/audio/k12/voices/showtell',
    lines: [
      { speaker: 'Cry Baby', kind: 'thought', text: 'Je voulais seulement me cacher quelques minutes.' },
      { speaker: 'Professeur', kind: 'dialogue', text: 'Puisque tu es là… montre-nous quelque chose.' },
      { speaker: 'Élève', kind: 'dialogue', text: 'Ouais ! Fais-nous un spectacle !' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Les regards tombent tous sur moi.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Comme si mon corps leur appartenait déjà.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ils veulent voir quelque chose.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Pas quelqu’un.' },
    ],
    choiceIntro: 'Quand les projecteurs s’éteignent, Cry Baby quitte la scène.',
    hotspots: [
      {
        id: 'stage',
        x: '50%',
        y: '55%',
        title: 'Être regardée',
        text:
          'Show & Tell parle du sentiment d’être constamment observée. Cry Baby devient un objet de spectacle : quelque chose qu’on regarde, qu’on juge, qu’on consomme.',
      },
      {
        id: 'spotlight',
        x: '35%',
        y: '25%',
        title: 'La célébrité',
        text:
          'La chanson reflète aussi le rapport de Melanie Martinez à la célébrité. Les artistes sont souvent traités comme des produits : aimés tant qu’ils divertissent.',
      },
      {
        id: 'audience',
        x: '68%',
        y: '62%',
        title: 'La consommation émotionnelle',
        text:
          'Le public veut des émotions sincères… mais sans réellement voir la personne derrière. Comme si la douleur devenait une performance.',
      },
    ],
    choices: [
      { label: 'Aller manger', target: 'social', explanation: 'Après avoir été exposée, j’ai rejoint les autres avec l’impression d’être encore observée.' },
    ],
  },

  social: {
    id: 'social',
    title: 'Transition — Cantine',
    music: '',
    background: '/assets/k12/7cafeteria.png',
    voiceFolder: '/assets/audio/k12/voices/social',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'La sonnerie retentit dans tout le bâtiment.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'Les élèves sortent des salles comme une vague.' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'Tu viens manger ?' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'J’ai faim…' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais j’ai surtout besoin de respirer un peu.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Après tout ce qui vient de se passer, chaque couloir semble encore plus étroit.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Comme si l’école entière essayait de nous avaler.' },
    ],
    choiceIntro: 'Cry Baby doit choisir où aller.',
    hotspots: [],
    choices: [
      { label: 'Rejoindre des amis', target: 'lunchbox', explanation: 'J’ai cherché des amies, mais les sourires sonnaient faux.' },
      { label: 'Aller dans les cuisines', target: 'strawberry', explanation: 'J’ai senti le poids des regards sur mon corps.' },
      { label: 'Aller aux toilettes', target: 'orange', explanation: 'J’ai vu la détresse dans le miroir des autres.' },
    ],
  },

  lunchbox: {
    id: 'lunchbox',
    title: 'Lunchbox Friends',
    music: '/assets/audio/k12/lunchbox-friends.mp3',
    background: '/assets/k12/8lunchbox.png',
    voiceFolder: '/assets/audio/k12/voices/lunchbox',
    lines: [
      { speaker: 'Kelly', kind: 'dialogue', text: 'Viens avec nous.' },
      { speaker: 'Fille', kind: 'dialogue', text: 'On devrait trop sortir ensemble un jour !' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Elles parlent beaucoup…' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais personne ne dit quelque chose de vrai.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Les sourires paraissent faux.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Comme si tout le monde jouait un rôle invisible.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ici, l’amitié ressemble surtout à une question d’image.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Être seule paraît presque plus honnête.' },
    ],
    choiceIntro: 'Cry Baby se lève de table.',
    hotspots: [
      {
        id: 'table',
        x: '50%',
        y: '60%',
        title: 'Popularité',
        text:
          'Lunchbox Friends critique les relations construites uniquement sur le statut social. Les groupes deviennent des vitrines : qui est accepté, qui est ignoré, qui mérite d’être vu. Être entourée ne signifie pas être aimée.',
      },
      {
        id: 'girls',
        x: '64%',
        y: '48%',
        title: 'Fausses connexions',
        text:
          'Les conversations paraissent chaleureuses… mais tout semble vide derrière les sourires. Melanie évoque aussi les relations superficielles dans l’industrie musicale : des liens créés par intérêt, pas par sincérité.',
      },
      {
        id: 'tray',
        x: '38%',
        y: '70%',
        title: 'La solitude',
        text:
          'Même assise au milieu des autres, Cry Baby se sent isolée. Comme si personne ne cherchait réellement à connaître qui elle est.',
      },
    ],
    choices: [
      { label: 'Retourner dans les couloirs', target: 'rebellion', explanation: 'J’ai compris qu’être seule valait mieux que mal entourée.' },
    ],
  },

  strawberry: {
    id: 'strawberry',
    title: 'Strawberry Shortcake',
    music: '/assets/audio/k12/strawberry-shortcake.mp3',
    background: '/assets/k12/9strawberry.png',
    voiceFolder: '/assets/audio/k12/voices/strawberry',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Les cuisines sont presque vides.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'L’odeur du sucre flotte encore dans l’air.' },
      { speaker: 'Garçon', kind: 'dialogue', text: 'T’avais qu’à pas mettre ça.' },
      { speaker: 'Employée', kind: 'dialogue', text: 'Les filles devraient faire plus attention à leur tenue.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Pourquoi c’est toujours à nous de changer ?' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Pourquoi mon corps ressemble toujours à un problème pour eux ?' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ici, les filles apprennent surtout à avoir honte d’exister.' },
    ],
    choiceIntro: 'Cry Baby quitte les cuisines avec une colère lourde.',
    hotspots: [
      {
        id: 'cake',
        x: '62%',
        y: '67%',
        title: 'Consommation',
        text:
          'Dans Strawberry Shortcake, le corps féminin devient un dessert. Quelque chose que l’on regarde, juge, découpe, puis consomme. L’esthétique sucrée rend la critique encore plus violente.',
      },
      {
        id: 'uniform',
        x: '36%',
        y: '62%',
        title: 'Dress code',
        text:
          'Les filles apprennent très tôt qu’elles doivent modifier leur apparence pour éviter le regard des autres. Mais les garçons, eux, apprennent rarement à contrôler ce regard.',
      },
      {
        id: 'kitchen',
        x: '48%',
        y: '40%',
        title: 'Violence cachée',
        text:
          'Tout paraît doux : les couleurs, les pâtisseries, la lumière chaude. Mais cette douceur cache une violence quotidienne profondément normalisée.',
      },
    ],
    choices: [
      { label: 'Retourner dans les couloirs', target: 'rebellion', explanation: 'La honte qu’ils voulaient me donner s’est transformée en colère.' },
    ],
  },

  orange: {
    id: 'orange',
    title: 'Orange Juice',
    music: '/assets/audio/k12/orange-juice.mp3',
    background: '/assets/k12/10orange.png',
    voiceFolder: '/assets/audio/k12/voices/orange',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Les toilettes sont silencieuses.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'Il ne reste que l’eau qui coule.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Et les miroirs.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Ça va ?' },
      { speaker: 'Fille', kind: 'dialogue', text: 'J’ai juste… pas faim.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Son reflet tremble presque autant qu’elle.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Certaines douleurs ne laissent aucune trace visible.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Tu n’as pas besoin de te détruire pour être belle.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Personne ne devrait apprendre à se haïr pour être accepté.' },
    ],
    choiceIntro: 'Cry Baby sort des toilettes avec l’impression d’avoir vu une blessure silencieuse.',
    hotspots: [
      {
        id: 'mirror',
        x: '50%',
        y: '45%',
        title: 'Image de soi',
        text:
          'Orange Juice parle des troubles alimentaires, de la comparaison constante et de la difficulté d’aimer son propre reflet. Les miroirs deviennent des ennemis silencieux.',
      },
      {
        id: 'sink',
        x: '42%',
        y: '68%',
        title: 'La honte',
        text:
          'Les toilettes représentent l’endroit où la souffrance reste cachée. Personne ne voit ce qui se passe ici. Et pourtant, beaucoup d’élèves s’y effondrent en silence.',
      },
      {
        id: 'orange',
        x: '62%',
        y: '70%',
        title: 'Imperfectly perfect',
        text:
          'La chanson rappelle que personne n’a besoin d’être parfait pour mériter l’amour. “Your body is imperfectly perfect.” Cry Baby essaye d’offrir à l’autre la douceur qu’elle ne reçoit jamais elle-même.',
      },
    ],
    choices: [
      { label: 'Retourner dans les couloirs', target: 'rebellion', explanation: 'J’ai vu que se sauver commence parfois par regarder quelqu’un autrement.' },
    ],
  },

  rebellion: {
    id: 'rebellion',
    title: 'Transition — Couloirs',
    music: '',
    background: '/assets/k12/11hallway.png',
    voiceFolder: '/assets/audio/k12/voices/rebellion',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'La sonnerie résonne encore dans tout le bâtiment.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'Les couloirs se remplissent puis se vident aussitôt.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'J’ai demandé de l’aide.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'J’ai cherché des amis.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais tout ici ressemble à une autre façon de survivre.' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'Tu viens ?' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Je crois que je dois encore comprendre quelque chose.' },
    ],
    choiceIntro: 'Quatre directions s’ouvrent devant elle.',
    hotspots: [],
    choices: [
      { label: 'Aller au Drama Club', target: 'drama', explanation: 'J’ai choisi de jouer un rôle pour survivre.' },
      { label: 'Errer dans les couloirs', target: 'detention', explanation: 'J’ai fini enfermée parce que je dérangeais l’ordre.' },
      { label: 'Aller voir un professeur', target: 'teacherpet', explanation: 'J’ai cru trouver un guide, mais la confiance peut devenir dangereuse.' },
      { label: 'Aller voir son crush', target: 'sweethearts', explanation: 'J’ai cherché l’amour, mais même l’amour peut devenir une cage.' },
    ],
  },

  drama: {
    id: 'drama',
    title: 'Drama Club',
    music: '/assets/audio/k12/drama-club.mp3',
    background: '/assets/k12/12drama.png',
    voiceFolder: '/assets/audio/k12/voices/drama',
    lines: [
      { speaker: 'Prof', kind: 'dialogue', text: 'Souris davantage.' },
      { speaker: 'Élève', kind: 'dialogue', text: 'Ici, tout le monde joue quelqu’un d’autre.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Même les adultes portent des rôles.' },
      { speaker: 'Prof', kind: 'dialogue', text: 'Recommence depuis le début.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Comme si personne n’avait le droit d’être sincère.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Et si je ne voulais plus jouer ?' },
    ],
    choiceIntro: 'Cry Baby retire le masque.',
    hotspots: [
      {
        id: 'mask',
        x: '45%',
        y: '50%',
        title: 'Conformité',
        text:
          'Drama Club critique l’idée que chacun doit performer une version acceptable de lui-même. Le système récompense ceux qui jouent correctement leur rôle.',
      },
      {
        id: 'curtain',
        x: '30%',
        y: '30%',
        title: 'Le théâtre social',
        text:
          'K-12 entier ressemble à une immense scène. Chaque élève apprend : quoi dire, quoi cacher, quoi devenir.',
      },
      {
        id: 'spotlight',
        x: '55%',
        y: '60%',
        title: 'Être observé',
        text:
          'Plus Cry Baby est observée, plus elle commence à surveiller elle-même chacun de ses gestes.',
      },
    ],
    choices: [
      { label: 'Sortir dehors', target: 'recess', explanation: 'Sur scène, j’ai compris que tout K-12 n’était qu’un théâtre cruel.' },
    ],
  },

  detention: {
    id: 'detention',
    title: 'Detention',
    music: '/assets/audio/k12/detention.mp3',
    background: '/assets/k12/13detention.png',
    voiceFolder: '/assets/audio/k12/voices/detention',
    lines: [
      { speaker: 'Haut-parleur', kind: 'dialogue', text: 'Cry Baby est attendue en retenue immédiatement.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Je n’ai pourtant rien fait.' },
      { speaker: 'Prof', kind: 'dialogue', text: 'Assieds-toi et réfléchis à ton comportement.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Quel comportement ?' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ici, être différente ressemble déjà à une faute.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ils veulent qu’on obéisse.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Pas qu’on guérisse.' },
    ],
    choiceIntro: 'Quand la porte s’ouvre enfin, Cry Baby ne se sent pas corrigée.',
    hotspots: [
      {
        id: 'clock',
        x: '55%',
        y: '25%',
        title: 'Le contrôle',
        text: 'Même le temps semble appartenir au système. Chaque minute devient une punition.',
      },
      {
        id: 'room',
        x: '45%',
        y: '65%',
        title: 'L’isolement',
        text:
          'La retenue enferme les élèves seuls avec leurs pensées. Mais personne ne leur apprend réellement comment aller mieux.',
      },
      {
        id: 'desk',
        x: '62%',
        y: '58%',
        title: 'Discipline',
        text:
          'Le système préfère corriger les comportements visibles plutôt que comprendre les blessures invisibles.',
      },
    ],
    choices: [
      { label: 'Sortir dehors', target: 'recess', explanation: 'La punition m’a appris que ma liberté devait commencer ailleurs.' },
    ],
  },

  teacherpet: {
    id: 'teacherpet',
    title: 'Teacher’s Pet',
    music: '/assets/audio/k12/teachers-pet.mp3',
    background: '/assets/k12/14teacherpet.png',
    voiceFolder: '/assets/audio/k12/voices/teacherpet',
    lines: [
      { speaker: 'Professeur', kind: 'dialogue', text: 'Tu es différente des autres élèves.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Sa voix paraît rassurante au début.' },
      { speaker: 'Professeur', kind: 'dialogue', text: 'Tu es très mature pour ton âge.' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'On devrait partir.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Certaines attentions ressemblent à des pièges.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Tous les adultes ne méritent pas notre confiance.' },
    ],
    choiceIntro: 'Cry Baby recule vers la porte.',
    hotspots: [
      {
        id: 'desk',
        x: '52%',
        y: '55%',
        title: 'Manipulation',
        text:
          'Teacher’s Pet parle du grooming et des relations abusives entre adulte et élève. La manipulation commence souvent par des compliments.',
      },
      {
        id: 'door',
        x: '22%',
        y: '62%',
        title: 'Le piège',
        text:
          'L’espace devient étouffant. Le danger apparaît souvent dans des endroits où personne ne regarde.',
      },
      {
        id: 'light',
        x: '60%',
        y: '28%',
        title: 'Le malaise',
        text:
          'La scène paraît calme… mais quelque chose semble profondément mauvais sous la surface.',
      },
    ],
    choices: [
      { label: 'Sortir dehors', target: 'recess', explanation: 'J’ai compris que certaines protections ressemblent à des cages.' },
    ],
  },

  sweethearts: {
    id: 'sweethearts',
    title: 'High School Sweethearts',
    music: '/assets/audio/k12/high-school-sweethearts.mp3',
    background: '/assets/k12/15sweethearts.png',
    voiceFolder: '/assets/audio/k12/voices/sweethearts',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'Son casier est juste là.' },
      { speaker: 'Crush', kind: 'dialogue', text: 'C’est pour moi ?' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Pendant quelques secondes…' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'J’ai envie d’y croire.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais aimer quelqu’un ne devrait jamais demander de disparaître.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Alors respecte mes limites.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Ou ne m’approche pas du tout.' },
    ],
    choiceIntro: 'Cry Baby laisse retomber la main.',
    hotspots: [
      {
        id: 'letter',
        x: '50%',
        y: '55%',
        title: 'Respect',
        text:
          'High School Sweethearts parle d’amour… mais surtout de respect émotionnel. Cry Baby refuse les relations qui demandent de se sacrifier soi-même.',
      },
      {
        id: 'locker',
        x: '62%',
        y: '42%',
        title: 'L’adolescence',
        text:
          'Le lycée transforme souvent l’amour en validation sociale. Comme si être aimée définissait notre valeur.',
      },
      {
        id: 'hallway',
        x: '40%',
        y: '30%',
        title: 'Grandir',
        text:
          'Cry Baby commence enfin à comprendre qu’elle peut poser ses propres limites.',
      },
    ],
    choices: [
      { label: 'Sortir dehors', target: 'recess', explanation: 'Même l’amour devait être quitté s’il me demandait de devenir quelqu’un d’autre.' },
    ],
  },

  recess: {
    id: 'recess',
    title: 'Recess',
    music: '/assets/audio/k12/recess.mp3',
    background: '/assets/k12/16recess.png',
    voiceFolder: '/assets/audio/k12/voices/recess',
    lines: [
      { speaker: 'Cry Baby', kind: 'narration', text: 'La cour est presque vide.' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'On peut encore partir.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Non.' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'On doit détruire cet endroit.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Le bus.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'La classe.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Les couloirs.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Chaque endroit racontait une violence différente.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Mais tous menaient à la même vérité.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Ce n’était pas moi le problème.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'C’était le système entier.' },
      { speaker: 'Cry Baby', kind: 'narration', text: 'L’air commence soudainement à vibrer.' },
      { speaker: 'Angelita', kind: 'dialogue', text: 'C’est quoi ça… ?' },
      { speaker: 'Cry Baby', kind: 'dialogue', text: 'Une sortie.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Peut-être qu’on ne fuit pas.' },
      { speaker: 'Cry Baby', kind: 'thought', text: 'Peut-être qu’on renaît.' },
    ],
    choiceIntro: 'Au fond de la cour, un portail apparaît.',
    hotspots: [
      {
        id: 'yard',
        x: '50%',
        y: '42%',
        title: 'Pause',
        text:
          'Recess représente enfin une respiration. Cry Baby cesse de courir après l’acceptation.',
      },
      {
        id: 'sky',
        x: '35%',
        y: '65%',
        title: 'Prendre du recul',
        text:
          'Après avoir traversé tout K-12, Cry Baby comprend que le problème n’a jamais été sa sensibilité. Le système lui-même était construit pour briser les élèves.',
      },
      {
        id: 'portal',
        x: '75%',
        y: '35%',
        title: 'Transformation',
        text:
          'Le portail symbolise la sortie du système scolaire, la destruction des anciennes règles, la métamorphose de Cry Baby et le passage vers Portals. Ce n’est pas une fuite. C’est une renaissance.',
      },
    ],
    choices: [
      {
        label: 'Traverser le portail',
        target: 'portal',
        explanation: 'Ce n’était pas une fin. C’était une métamorphose.',
      },
    ],
  },
};

function useTypewriter(text: string, speed = 22, forceFull = false) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (forceFull) {
      setDisplayed(text);
      return;
    }

    setDisplayed('');
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) window.clearInterval(interval);
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed, forceFull]);

  return {
    displayed,
    finished: displayed.length >= text.length,
  };
}
export default function K12Experience() {
  const { setEra, setOutroReturnStep } = useStore();

  const { musicVolume, voiceVolume, sfxVolume, playSfx } = useAudio();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const [currentSceneId, setCurrentSceneId] = useState('wob');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewedHotspots, setViewedHotspots] = useState<Record<string, string[]>>({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [readyForHotspots, setReadyForHotspots] = useState(false);
  const [forceFullLine, setForceFullLine] = useState(false);
  const [portalTransition, setPortalTransition] = useState(false);

  const scene = SCENES[currentSceneId];
  const currentLine = scene.lines[lineIndex];

  const { displayed, finished } = useTypewriter(
    currentLine?.text ?? '',
    20,
    forceFullLine,
  );

  const viewedForScene = viewedHotspots[scene.id] ?? [];

  const allHotspotsViewed = useMemo(() => {
    return scene.hotspots.length === 0 || viewedForScene.length >= scene.hotspots.length;
  }, [scene.hotspots.length, viewedForScene.length]);

  useEffect(() => {
    if (scene.sfx?.onEnter) {
      playSfx(scene.sfx.onEnter);
    }
  }, [scene.id, scene.sfx, playSfx]);

  useEffect(() => {
    setLineIndex(0);
    setReadyForHotspots(false);
    setActiveHotspot(null);
    setForceFullLine(false);
    voiceRef.current?.pause();
  }, [currentSceneId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const fadeTo = async (target: number) => {
      const start = audio.volume || 0;

      for (let i = 0; i <= 12; i++) {
        if (cancelled) return;
        audio.volume = start + (target - start) * (i / 12);
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
    };

    const changeMusic = async () => {
      await fadeTo(0);
      audio.pause();

      audio.src = scene.music || AMBIENT_MUSIC;
      audio.currentTime = 0;
      audio.loop = true;

      if (isMusicPlaying) {
        await audio.play().catch(() => {});
        await fadeTo(musicVolume);
      }
    };

    changeMusic();

    return () => {
      cancelled = true;
    };
}, [scene.music, currentSceneId, isMusicPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = musicVolume;
  }, [musicVolume]);

  useEffect(() => {
    if (voiceRef.current) voiceRef.current.volume = voiceVolume;
  }, [voiceVolume]);

  useEffect(() => {
    if (readyForHotspots || !currentLine || !scene.voiceFolder) return;

    const voice = voiceRef.current;
    if (!voice) return;

    voice.pause();
    voice.src = `${scene.voiceFolder}/${lineIndex}.mp3`;
    voice.currentTime = 0;
    voice.volume = currentLine.kind === 'sound' ? sfxVolume : voiceVolume;
    voice.play().catch(() => {});
  }, [
  scene.id,
  scene.voiceFolder,
  lineIndex,
  currentLine,
  readyForHotspots,
]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 28,
      y: (e.clientY / window.innerHeight - 0.5) * 28,
    });
  };

  const goNextLine = () => {
    setForceFullLine(false);

    if (lineIndex < scene.lines.length - 1) {
      setLineIndex((prev) => prev + 1);
      return;
    }

    voiceRef.current?.pause();
    setReadyForHotspots(true);
  };

  const skipLine = () => {
    if (!finished) {
      setForceFullLine(true);
      return;
    }

    goNextLine();
  };

  const skipSceneText = () => {
    voiceRef.current?.pause();
    setLineIndex(scene.lines.length - 1);
    setReadyForHotspots(true);
    setForceFullLine(true);
  };

  const skipHotspots = () => {
    setViewedHotspots((prev) => ({
      ...prev,
      [scene.id]: scene.hotspots.map((hotspot) => hotspot.id),
    }));
    setActiveHotspot(null);
  };

  const openHotspot = (hotspot: Hotspot) => {
    playSfx('/assets/audio/soundeffect.mp3');
    setActiveHotspot(hotspot);

    setViewedHotspots((prev) => {
      const current = prev[scene.id] ?? [];
      if (current.includes(hotspot.id)) return prev;

      return {
        ...prev,
        [scene.id]: [...current, hotspot.id],
      };
    });
  };

  const handleChoice = (choice: Choice) => {
    if (choice.target === 'portal') {
      setPortalTransition(true);

      audioRef.current?.pause();
      voiceRef.current?.pause();

      window.setTimeout(() => {
        setOutroReturnStep('room');
        setEra('outro');
      }, 1800);

      return;
    }

    setCurrentSceneId(choice.target);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
    >
      <audio ref={audioRef} loop />
      <audio ref={voiceRef} preload="auto" />

      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${scene.background})`,
            x: mousePos.x * -0.45,
            y: mousePos.y * -0.45,
            scale: 1.08,
          }}
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0, scale: 1.12 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: `url(${scene.background})`,
          x: mousePos.x * 0.35,
          y: mousePos.y * 0.35,
          scale: 1.16,
        }}
      />

      <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/25" />

      <div className="absolute left-8 top-8 z-30">
        <h1 className="font-serif text-5xl italic text-cyan-50 drop-shadow-lg">
          {scene.title}
        </h1>

        {readyForHotspots && !allHotspotsViewed && (
          <p className="mt-3 rounded-full bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-100 backdrop-blur-md">
            Papillons découverts : {viewedForScene.length}/{scene.hotspots.length}
          </p>
        )}
      </div>

      {readyForHotspots &&
        scene.hotspots.map((hotspot) => {
          const isViewed = viewedForScene.includes(hotspot.id);

          return (
            <motion.button
              key={hotspot.id}
              type="button"
              aria-label={hotspot.title}
              onClick={() => openHotspot(hotspot)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className={`absolute z-[300] h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-opacity ${
                isViewed ? 'opacity-35 grayscale' : 'opacity-100'
              }`}
              style={{ left: hotspot.x, top: hotspot.y }}
            >
              {!isViewed && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-cyan-200/50 blur-2xl"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.9, 0.55] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />

                  <motion.span
                    className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/80 bg-cyan-200/40"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </>
              )}

              <motion.img
                src="/assets/hotpoint/papillonbleu.png"
                alt="Papillon interactif"
                draggable={false}
                className="absolute left-1/2 top-1/2 z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_22px_rgba(180,240,255,1)]"
                animate={
                  isViewed
                    ? { scale: 0.9 }
                    : {
                        y: [0, -6, 0],
                        scale: [1, 1.15, 1],
                        rotate: [-4, 4, -4],
                      }
                }
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {isViewed && (
                <span className="absolute left-1/2 top-1/2 z-20 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-cyan-700 shadow-[0_0_20px_rgba(255,255,255,1)]">
                  ✓
                </span>
              )}
            </motion.button>
          );
        })}

      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            className="absolute z-[350] w-[320px] rounded-3xl border border-cyan-200 bg-cyan-50/95 p-5 text-cyan-950 shadow-2xl backdrop-blur-xl"
            style={{
              left: activeHotspot.x,
              top: activeHotspot.y,
              transform: 'translate(36px, -28px)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
          >
            <h2 className="font-serif text-xl italic text-cyan-800">
              {activeHotspot.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-cyan-950/80">
              {activeHotspot.text}
            </p>

            <button
              onClick={() => setActiveHotspot(null)}
              className="mt-4 rounded-full bg-cyan-500 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-400"
            >
              Fermer
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-40 p-5">
        <motion.div
          key={`${scene.id}-textbox`}
          className="relative mx-auto max-w-4xl rounded-t-[2rem] border-t-4 border-cyan-200 bg-cyan-50/82 p-5 pb-8 shadow-[0_-18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 26 }}
        >
          {!readyForHotspots ? (
            <>
              <div className="custom-scroll max-h-[150px] overflow-y-auto pr-3">
                <AnimatePresence mode="wait">
                  {currentLine && (
                    <motion.div
                      key={`${scene.id}-${lineIndex}-${currentLine.text}`}
                      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                      transition={{ duration: 0.35 }}
                      className={
                        currentLine.kind === 'dialogue'
                          ? 'rounded-2xl border border-cyan-200/60 bg-white/60 px-4 py-3'
                          : currentLine.kind === 'thought'
                            ? 'rounded-2xl border border-pink-200/60 bg-pink-50/60 px-4 py-3'
                            : currentLine.kind === 'sound'
                              ? 'text-center font-serif text-base italic text-cyan-900/50'
                              : 'rounded-2xl bg-cyan-50/40 px-4 py-3'
                      }
                    >
                      {currentLine.speaker && (
                        <p
                          className={
                            currentLine.kind === 'thought'
                              ? 'mb-1 text-[10px] uppercase tracking-[0.25em] text-pink-500'
                              : currentLine.kind === 'dialogue'
                                ? 'mb-1 text-[10px] uppercase tracking-[0.25em] text-cyan-600'
                                : 'mb-1 text-[10px] uppercase tracking-[0.25em] text-slate-500'
                          }
                        >
                          {currentLine.kind === 'thought'
                            ? `Pensée de ${currentLine.speaker}`
                            : currentLine.speaker}
                        </p>
                      )}

                      <p
                        className={
                          currentLine.kind === 'thought'
                            ? 'font-serif text-lg italic leading-relaxed text-pink-950'
                            : currentLine.kind === 'dialogue'
                              ? 'font-serif text-xl leading-relaxed text-slate-900'
                              : currentLine.kind === 'sound'
                                ? 'font-serif italic'
                                : 'font-serif text-lg leading-relaxed text-slate-800'
                        }
                      >
                        {currentLine.kind === 'sound' ? `*${displayed}*` : displayed}
                        {!finished && <span className="animate-pulse">|</span>}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={skipLine}
                className="mt-4 rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-white shadow-lg hover:bg-cyan-400"
              >
                {finished ? 'Continuer' : 'Afficher la phrase'}
              </button>

              <button
                onClick={skipSceneText}
                className="absolute bottom-3 right-5 font-serif text-xs italic text-cyan-950/30 transition hover:text-cyan-950/60"
              >
                skip
              </button>
            </>
          ) : !allHotspotsViewed ? (
            <div className="relative pb-4">
              <p className="font-serif text-lg italic leading-relaxed text-cyan-950">
                Explore les papillons bleus pour comprendre ce que cette chanson dénonce.
              </p>

              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-cyan-700/70">
                {viewedForScene.length}/{scene.hotspots.length} fragments découverts
              </p>

              <button
                onClick={skipHotspots}
                className="absolute bottom-0 right-0 font-serif text-xs italic text-cyan-950/30 transition hover:text-cyan-950/60"
              >
                skip
              </button>
            </div>
          ) : (
            <div>
              {scene.choiceIntro && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 rounded-2xl border border-cyan-200/60 bg-white/50 px-5 py-4 font-serif text-lg italic leading-relaxed text-cyan-950 shadow-inner"
                >
                  {scene.choiceIntro}
                </motion.p>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                {scene.choices.map((choice, index) => (
                  <motion.button
                    key={choice.label}
                    onClick={() => handleChoice(choice)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative overflow-hidden rounded-3xl border border-pink-200/70 bg-gradient-to-br from-pink-100/90 to-cyan-50/90 p-5 text-left shadow-xl backdrop-blur-md transition hover:border-pink-300 hover:shadow-2xl"
                  >
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-pink-500/80">
                      Choix {index + 1}
                    </span>

                    <span className="flex items-center justify-between gap-4 font-serif text-xl italic text-cyan-950">
                      {choice.label}
                      <ArrowRight
                        size={20}
                        className="shrink-0 transition group-hover:translate-x-1"
                      />
                    </span>

                    <span className="mt-3 block text-sm leading-relaxed text-cyan-950/65 opacity-0 transition group-hover:opacity-100">
                      {choice.explanation}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {portalTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[999] overflow-hidden bg-white"
          >
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 2.4, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)]"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="font-serif text-4xl italic text-pink-200">
                The end is only the beginning...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(8, 145, 178, 0.08);
          border-radius: 999px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(8, 145, 178, 0.35);
          border-radius: 999px;
        }
      `}</style>
    </motion.div>
  );
}