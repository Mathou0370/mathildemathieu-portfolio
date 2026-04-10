/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const projects = [
        // ── MMI 1 ──
        {
            id: 'vv-chair',
            name: 'Virtual Voyager Chair (VV Chair)',
            year: 'mmi1', yearLabel: 'MMI 1 — S1 (Déc. 2023)',
            competence: 'concevoir',
            compLabel: '🧠 Concevoir',
            date: '2023-12',
            cover: './ressources/projets/VVChair1.png',
            proof: './ressources/projets/VVChair2.png',
            context: 'Conception d’un dispositif de réalité virtuelle innovant (chaise motorisée synchronisée). Réalisé dans le cadre du module Marketing / Pitch Commercial (IUT de Toulon).',
            quoi: 'Imaginer un produit numérique innovant répondant à une problématique de mobilité ou de loisir. Structurer une offre commerciale viable (étude de marché, cibles, coûts). Présenter le projet sous forme de pitch professionnel.',
            qui: 'Projet de groupe (4 personnes). Mon rôle : Responsable Logistique & Business Model.',
            outils: ['Canva', 'PowerPoint', 'Excel', 'Recherche documentaire'],
            ac: [
                { code: 'AC12.01', comp: 'concevoir', desc: 'J\'ai défini les spécificités techniques du produit (dimensions de 140cm, choix des matériaux comme le bois et le métal pour la durabilité) et les fonctionnalités interactives (mécanisme motorisé articulé pour simuler les secousses).' },
                { code: 'AC12.02', comp: 'concevoir', desc: 'J\'ai travaillé sur la réponses aux contraintes écologiques et sur les leviers d\'optimisation en proposant des matériaux recyclés et des partenariats stratégiques pour rendre l\'expérience accessible.' },
                { code: 'AC12.03', comp: 'concevoir', desc: 'J\'ai chiffré le projet avec une analyse précise : coût de revient (310€), prix de vente (550€) et calcul du ROI (Retour sur Investissement) basé sur un objectif de vente de 100 unités par mois.' }
            ],
            appris: 'Ce projet m\'a appris à lier la créativité à la réalité économique. Concevoir un bel objet ne suffit pas ; il faut qu\'il soit fabricable, transportable et rentable. J\'ai découvert comment structurer un business model solide (B2B avec les offices de tourisme et B2C pour les familles).',
            critique: 'Points forts : Une analyse financière assez précise qui crédibilise le projet auprès d\'investisseurs fictifs. Axe d\'amélioration : "Si c\'était à refaire, j\'approfondirais la partie \'Éco-conception\' en détaillant davantage le circuit de recyclage des composants électroniques, un point crucial aujourd\'hui dans la compétence Comprendre l\'environnement technologique."',
            ia: 'L\'IA a été utilisée pour simuler des scénarios de vente et m\'aider à structurer les calculs complexes de ROI, me permettant de tester plusieurs stratégies de prix de vente.',
        },
        {
            id: 'bicycle',
            name: 'Deck "Les Noces Funèbres" – Collection Bicycle',
            year: 'mmi1', yearLabel: 'MMI 1 — S2',
            competence: 'exprimer',
            compLabel: '🎨 Exprimer',
            date: '2024-03',
            cover: './ressources/projets/deckcartesBurton.jpg',
            proof: './ressources/projets/deckcartesBurton2.jpg',
            context: 'Conception d\'un deck de 13 cartes, du packaging et d\'une présentation Behance. Ressource de Production Graphique — Semestre 2.',
            quoi: 'Réinterpréter l\'univers de Tim Burton à travers un objet de jeu classique. Maîtriser la création vectorielle complexe et la mise en page de présentation. Développer une identité graphique cohérente (typographie, illustrations, packaging).',
            qui: 'Travail individuel.',
            outils: ['Adobe Illustrator', 'Adobe Photoshop'],
            ac: [
                { code: 'AC13.02', comp: 'exprimer', desc: 'Analyse de la DA du film pour extraire des codes visuels (traits fins, mélancolie).' },
                { code: 'AC13.03', comp: 'exprimer', desc: 'Dessin vectoriel (Illustrator) : Création intégrale des personnages et des illustrations à la plume pour obtenir le rendu "tremblé" caractéristique. Création sur-mesure de la typographie pour les chiffres et du symbole "Cœur".' },
                { code: 'AC13.06', comp: 'exprimer', desc: 'Utilisation de Photoshop pour la réalisation de mockups réalistes et la mise en page de la planche Behance, valorisant le produit fini dans un environnement professionnel.' }
            ],
            appris: 'Ce projet m\'a appris à quel point le détail fait la différence : créer ma propre typographie a permis d\'unifier les illustrations et les éléments informatifs de la carte. J\'ai aussi appris à passer du vecteur pur à une présentation visuelle immersive sur Photoshop.',
            critique: 'Réussite : "La réinterprétation des personnages est fidèle à l\'œuvre originale tout en respectant les codes du jeu de cartes." Axe d\'amélioration : "Je prévois de poursuivre ce projet pour finaliser l\'intégralité du paquet (54 cartes) et passer plus de temps sur le design du verso, afin d\'offrir une expérience de collectionneur complète."',
        },
        {
            id: 'batbee',
            name: 'BatBee — Créature hybride surréaliste',
            year: 'mmi1', yearLabel: 'MMI 1 — S1 (3 semaines)',
            competence: 'exprimer',
            compLabel: '🎨 Exprimer',
            date: '2023-12',
            cover: './ressources/projets/batbee.png',
            proof: './ressources/projets/batbee2.png',
            context: 'Réalisation d\'un photomontage hybride mêlant une chauve-souris et une abeille sous la forme d\'un post Instagram. IUT de Toulon — Ressource de Production Graphique.',
            quoi: 'Fusionner un mammifère avec un insecte tout en respectant des contraintes de réalisme visuel. Créer un visuel intrigant capable d\'arrêter le "scroll" sur les réseaux sociaux. Appréhender les outils de composition et de retouche d\'image.',
            qui: 'Travail personnel.',
            outils: ['Adobe Photoshop'],
            ac: [
                { code: 'AC13.02', comp: 'exprimer', desc: 'Recherche iconographique minutieuse pour trouver des textures (poils, ailes, antennes) compatibles en termes de perspective et de grain.' },
                { code: 'AC13.03', comp: 'exprimer', desc: 'Utilisation intensive des masques de fusion pour mêler les textures organiques et harmonisation colorimétrique pour simuler une source de lumière unique.' },
                { code: 'AC13.06', comp: 'exprimer', desc: 'Exportation du visuel final aux dimensions spécifiques d\'Instagram (1080x1080 px) en veillant à la netteté des détails pour l\'affichage mobile.' }
            ],
            appris: 'La problématique majeure était de rendre "réelle" une créature impossible. Ce projet m\'a permis de comprendre l\'importance de la gestion des calques et de l\'ordre d\'empilement pour obtenir un mélange cohérent entre deux textures organiques différentes.',
            critique: 'Réussite : "Pour un premier travail de détourage complexe, le résultat global est percutant et l\'anatomie hybride de la créature fonctionne bien visuellement." Difficultés rencontrées : "J\'ai rencontré des difficultés sur le détourage fin et la gestion de la transparence des ailes de l\'abeille. C\'est un point sur lequel il aurait fallu passer plus de temps pour parfaire le réalisme. Ce projet a marqué le début de ma détermination à mieux maîtriser les outils de sélection avancés pour produire des œuvres plus abouties."',
        },
        {
            id: 'sidewaves',
            name: 'SAÉ 203 — Système de Gestion d\'Agence Web',
            year: 'mmi1', yearLabel: 'MMI 1 — S2',
            competence: 'developper',
            compLabel: '💻 Développer',
            date: '2024-04',
            link: 'https://sidewaves.mathildemathieu.fr',
            linkLabel: 'Voir le site (Hostinger)',
            cover: './ressources/projets/sidewaves2.png',
            proof: './ressources/projets/sidewaves3.png',
            context: 'Création d\'un outil métier dynamique permettant la gestion interne des tâches d\'une agence. SAÉ 203 — Concevoir un site web avec une source de données.',
            quoi: 'Développer une plateforme capable de faire le lien entre une base de données et une interface utilisateur. Sécuriser l\'accès aux informations de l\'agence via un système de connexion. Permettre le suivi en temps réel de l\'avancement des missions (To-do list dynamique).',
            qui: 'Binôme. Mon rôle : Développement du système d\'authentification (Espace membre), création de l\'interface de gestion de tâches (PHP/MySQL) et responsable du déploiement.',
            outils: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'Hostinger', 'VS Code', 'WAMP/MAMP'],
            ac: [
                { code: 'AC14.01', comp: 'developper', desc: 'Utilisation autonome de VS Code et de l\'environnement local WAMP/MAMP pour développer et tester les scripts PHP avant leur déploiement.' },
                { code: 'AC14.02', comp: 'developper', desc: 'Intégration HTML/CSS des tableaux de bord et structuration rigoureuse des formulaires de saisie de données pour garantir une saisie fluide.' },
                { code: 'AC14.03', comp: 'developper', desc: 'Utilisation du langage PHP pour interroger la base de données MySQL et afficher dynamiquement la liste des tâches et des projets de l\'agence.' },
                { code: 'AC14.04', comp: 'developper', desc: 'Sélection et configuration d\'un hébergement Hostinger, gestion du transfert des fichiers par FTP et migration de la base de données locale vers le serveur de production.' },
                { code: 'AC14.05', comp: 'developper', desc: 'Conception du schéma relationnel SQL (tables utilisateurs, projets, tâches) et mise en place de la sécurité des données (hachage des mots de passe en PHP).' }
            ],
            appris: 'Ce projet m\'a permis de comprendre le cycle de vie complet d\'une application web, de la conception de la base de données à la mise en ligne. J\'ai découvert la logique des sessions PHP et la responsabilité que représente la gestion des données utilisateurs (sécurité, hachage).',
            critique: 'Réussite : "Le système de connexion et les fonctions de base (MVP) étaient robustes et pleinement fonctionnels lors de la mise en ligne." Axe d\'amélioration : "Par manque de temps, toutes les fonctionnalités imaginées au départ n\'ont pas été implémentées. Cependant, j\'ai appris à prioriser les besoins fonctionnels vitaux pour livrer un produit utilisable. J\'ai su solliciter des ressources externes (IA pour le débogage et mentorat par les pairs) pour résoudre des points bloquants complexes, une démarche essentielle en développement agile."',
            ia: 'J\'ai utilisé l\'IA comme support au débogage, notamment pour comprendre les erreurs de syntaxe dans les requêtes SQL et pour optimiser la structure de mes conditions en PHP.',
        },
        {
            id: 'brigittebee',
            name: 'Site Vitrine Brigitte Bee — Intégration CMS',
            year: 'mmi1', yearLabel: 'MMI 1 — S2',
            competence: 'developper',
            compLabel: '💻 Développer',
            date: '2024-05',
            link: 'https://brigittebee.mathildemathieu.fr',
            linkLabel: 'Voir le site WordPress',
            cover: './ressources/projets/brigittebee1.png',
            proof: './ressources/projets/brigittebee2.png',
            context: 'Reproduction d\'une maquette graphique sous l\'outil de gestion de contenu WordPress. Semestre 2 — Module Gestion de contenu.',
            quoi: 'Apprendre à structurer un site avec un CMS professionnel. Respecter une charte graphique pré-établie (maquette). Gérer une bibliothèque de médias (œuvres d\'art) de manière organisée.',
            qui: 'Travail individuel.',
            outils: ['WordPress', 'Blocs Gutenberg'],
            ac: [
                { code: 'AC14.02', comp: 'developper', desc: 'Intégration soignée des contenus via les blocs natifs, en respectant la hiérarchie des titres (Hn) pour le référencement naturel.' },
                { code: 'AC14.03', comp: 'developper', desc: 'Utilisation des catégories et étiquettes pour automatiser l\'affichage des œuvres dans les différentes sections du site.' },
                { code: 'AC14.06', comp: 'developper', desc: 'Installation de WordPress, choix et personnalisation du thème pour coller à l\'univers visuel de l\'artiste.' }
            ],
            appris: 'J\'ai réussi à prendre en main l\'outil rapidement pour transformer une maquette statique en site consultable.',
            critique: 'Réussite : "J\'ai réussi à prendre en main l\'outil rapidement pour transformer une maquette statique en site consultable." Axe d\'amélioration : "À ce stade, le site n\'était pas encore parfaitement responsive sur tous les supports, un point que j\'ai largement corrigé en deuxième année sur le projet Home Key."',
        },
        // ── MMI 2 ──
        {
            id: 'lan-comprendre',
            name: 'Design d\'expérience visiteur – MMI LAN',
            year: 'mmi2', yearLabel: 'MMI 2 — S3/S4',
            competence: 'comprendre',
            compLabel: '🔍 Comprendre',
            date: '2024-12',
            cover: './ressources/projets/mmilan1.png',
            proof: './ressources/projets/mmilan2.png',
            context: 'Le projet consistait à organiser une LAN (Local Area Network) au sein de l\'IUT, un événement compétitif de jeux vidéo rassemblant une quarantaine de joueurs et des visiteurs sur une journée.',
            quoi: 'Analyse et conception du parcours global des visiteurs et joueurs, incluant la modélisation spatiale (plans de salle) et la mise en place d\'un système de gamification (récompenses). Comment transformer une salle de classe en un lieu d\'événement fluide et engageant ?',
            qui: 'Rôle : Ingénierie spatiale, Système de Gamification, Animation UX.',
            outils: ['Plans de salle', 'Système de gamification (points buvette)', 'Stand Just Dance'],
            ac: [
                { code: 'AC21.04', comp: 'comprendre', desc: 'J\'ai conçu le "User Journey" physique : de l\'accueil sécurisé à la zone de tournoi, en passant par les stands d\'animation.' },
                { code: 'AC21.05', comp: 'comprendre', desc: 'Identification des zones de chaleur (flux devant la finale) et des points de satisfaction (système de récompense immédiate pour la participation).' }
            ],
            appris: 'Ma réussite majeure a été de concilier les contraintes techniques rigides (électricité, sécurité) avec le plaisir des visiteurs. J\'ai compris que le "système de récompense" est le levier le plus puissant pour transformer un simple spectateur en acteur de l\'événement.',
            gap: 'En MMI 1, mon rôle se limitait à la gestion opérationnelle (accueil, pointage). En MMI 2, lors de la LAN, j\'ai vécu une véritable montée en compétence. Je ne me suis plus contentée d\'accueillir des gens : j\'ai conçu l\'expérience de A à Z. Je suis passée d\'un rôle d\'exécutante à celui de conceptrice d\'expérience (UX Designer physique).',
        },
        {
            id: 'crossyroadpower',
            name: 'Crossy Road Power – Extension de Gameplay',
            year: 'mmi2', yearLabel: 'MMI 2 — S4',
            competence: 'concevoir',
            compLabel: '🧠 Concevoir',
            date: '2025-03',
            cover: './ressources/projets/crossyroadpower1.png',
            proof: './ressources/projets/crossyroadpower2.png',
            context: 'Analyse UX et conception de nouvelles mécaniques de jeu (super-pouvoirs) pour le jeu Crossy Road. SAÉ UX Gaming.',
            quoi: 'Identifier les leviers d\'engagement et les points de frustration du jeu original. Concevoir 4 pouvoirs (Flash, Mage, Shield, Power) équilibrés pour enrichir l\'expérience sans la dénaturer. Maquetter l\'interface utilisateur (UI) et les feedbacks visuels liés à ces pouvoirs.',
            qui: 'Travail individuel.',
            outils: ['Maquettage UI', 'UX Gaming Analysis'],
            ac: [
                { code: 'AC22.03', comp: 'concevoir', desc: 'Recherche et sélection de fonctionnalités utiles (vitesse, protection, destruction) basées sur les attentes des joueurs pour renouveler l\'intérêt du jeu.' },
                { code: 'AC22.04', comp: 'concevoir', desc: 'Amélioration du système de récompense et de survie via des interactions spécifiques (boutons d\'activation, jauges d\'écoulement, teintes d\'écran).' }
            ],
            appris: 'En MMI 1, ma conception se limitait à l\'esthétique d\'un objet (Jeu de cartes). En MMI 2, je passe à une conception de système complexe. J\'ai appris à penser en termes de conditions, d\'effets et de durée, ce qui demande une logique de conception beaucoup plus rigoureuse.',
            critique: 'Réussite : "L\'analyse des besoins est pertinente : les pouvoirs choisis répondent à des situations de jeu concrètes." Axe d\'amélioration : "Avec le recul, je considère que la direction artistique des sprites et des effets mériterait d\'être approfondie pour mieux s\'intégrer au style \'voxel\' original."',
        },
        {
            id: 'escarpolette',
            name: 'Animation Narrative 3D — L\'Escarpolette',
            year: 'mmi2', yearLabel: 'MMI 2 — S4',
            competence: 'exprimer',
            compLabel: '🎨 Exprimer',
            date: '2025-04',
            cover: './ressources/projets/jeanhonore.webp',
            proof: './ressources/projets/jeanhonore.webp',
            context: 'Transformation d\'une œuvre picturale classique (Jean Honoré Fragonard) en une scène animée en 3D. Module de Création 3D.',
            quoi: 'Décomposer une image 2D pour créer une illusion de profondeur (Parallax). Animer des éléments de manière subtile pour renforcer l\'aspect onirique. Respecter l\'œuvre originale tout en y apportant une dimension cinématographique.',
            qui: 'Travail individuel.',
            outils: ['Photoshop', 'Blender'],
            ac: [
                { code: 'AC23.05', comp: 'exprimer', desc: 'Utilisation avancée de Photoshop pour détourer chaque objet, personnage et élément de décor, puis reconstitution des arrière-plans pour permettre le mouvement sans artefacts visuels.' },
                { code: 'AC23.06', comp: 'exprimer', desc: 'Importation des calques dans Blender, positionnement sur l\'axe Z pour créer la profondeur et animation des caméras et des objets.' }
            ],
            appris: 'En MMI 1, je créais des compositions statiques. En MMI 2, j\'ai appris à sculpter l\'espace et le temps. Ce projet marque ma capacité à préparer la donnée en 2D pour l\'exploiter en 3D.',
            critique: 'Réussite : "J\'ai adoré la phase sur Blender, notamment la sensation de \'vie\' que l\'on donne à une image historique." Axe d\'amélioration : "Pour rendre le projet plus professionnel, je devrais retravailler le rigging ou les clés d\'animation du balancement de la femme sur la balançoire."',
        },
        {
            id: 'homekey',
            name: 'Home Key — Intégration haute fidélité',
            year: 'mmi2', yearLabel: 'MMI 2 — S4',
            competence: 'developper',
            compLabel: '💻 Développer',
            date: '2025-05',
            link: 'https://homekey.mathildemathieu.fr',
            linkLabel: 'Voir le site (4h30 challenge)',
            cover: './ressources/projets/homekey1.png',
            proof: './ressources/projets/homekey2.png',
            context: 'Reproduction d\'une maquette complexe fournie responsive sur Wordpress (Desktop, Tablette et Mobile). Contrainte majeure : Réalisation complète en une session de 4h30.',
            quoi: 'Transformer une intention graphique statique en un site vivant dans un délai très court. Assurer une adaptation responsive parfaite sans dénaturer la Direction Artistique (DA) fournie. Dynamiser l\'interface par des micro-interactions pertinentes.',
            qui: 'Travail individuel.',
            outils: ['WordPress', 'Elementor / Gutenberg'],
            ac: [
                { code: 'AC24.01', comp: 'developper', desc: 'Traduction précise des trois formats de maquettes. J\'ai veillé à ce que la hiérarchie visuelle et la DA générale restent cohérentes lors du passage sur mobile.' },
                { code: 'AC24.03', comp: 'developper', desc: 'Ajout de micro-interactions (effets au survol, transitions fluides) pour rendre le dispositif interactif plus professionnel et engageant.' }
            ],
            appris: 'Ce projet témoigne d\'un gain d\'efficacité majeur par rapport à la MMI 1. Ma maîtrise m\'a permis de livrer un site complexe, incluant une gestion fine du responsive, en seulement 4h30. L\'outil est désormais au service de ma créativité.',
            critique: 'Réussite : "La tenue des délais sans sacrifier la qualité visuelle. Le site est \'pixel perfect\' par rapport à la maquette, tout en étant fluide dans ses animations."',
        },
        {
            id: 'lan-entreprendre',
            name: 'Organisation de la LAN MMI — Logistique',
            year: 'mmi2', yearLabel: 'MMI 2 — S3/S4',
            competence: 'entreprendre',
            compLabel: '🚀 Entreprendre',
            date: '2025-01',
            cover: './ressources/projets/mmilan3.png',
            proof: './ressources/projets/mmilan4.png',
            context: 'Pilotage d\'un événement e-sport d\'envergure (LAN) impliquant la gestion de 40 joueurs, du public et d\'un spectacle de clôture. Association "TouLAN".',
            quoi: 'Viabilité économique (sponsoring), gestion opérationnelle (staff, sécurité), innovation de service (gamification).',
            qui: 'Rôles : Responsable logistique, chargée de sponsoring, coordinatrice de l\'expérience spectateur.',
            outils: ['Gestion de projet', 'Démarchage Sponsoring', 'Discord'],
            ac: [
                { code: 'AC25.01', comp: 'entreprendre', desc: 'Planification des espaces (plans de salle) en conformité avec les normes de sécurité et préparation logistique des salles le jour J.' },
                { code: 'AC25.02', comp: 'entreprendre', desc: 'Coordination générale du staff pour assurer le déroulé fluide de la journée. Gestion des répétitions et de la mise en scène du spectacle final.' },
                { code: 'AC25.03', comp: 'entreprendre', desc: 'Création de supports (cartons d\'invitation, trailers, TikTok) et gestion de la communauté via le serveur Discord officiel.' },
                { code: 'AC25.04', comp: 'entreprendre', desc: 'Membre active de l\'association TouLAN : création du dossier de sponsoring, démarchage direct, conduite de réunions avec les partenaires.' }
            ],
            appris: 'Entreprendre ce projet m\'a confrontée à la réalité du terrain. J\'ai appris à passer d\'une posture d\'étudiante à celle de gestionnaire de projet, capable d\'innover tout en respectant des contraintes strictes.',
            critique: 'Réussite : "Ma capacité à être polyvalente : passer du démarchage de sponsors le matin à la coordination technique des flux l\'après-midi." Axe d\'amélioration : "La gestion du stress lors des imprévus du direct."',
        },
        // ── MMI 3 ──
        {
            id: 'affiche-opera',
            name: 'Affiche "Vers un monde plus humain" — Opéra de Toulon',
            year: 'mmi3', yearLabel: 'MMI 3 — S5 (Déc. 2025)',
            competence: 'exprimer',
            compLabel: '🎨 Exprimer',
            date: '2025-12',
            cover: './ressources/projets/affiche-opera.png',
            proof: './ressources/projets/affiche-opera2.png',
            context: 'Création du visuel de communication pour un spectacle de danse classique. SAÉ 5.Crea.01a (Communication Visuelle).',
            quoi: 'Traduire graphiquement le passage d\'une ère technologique froide à une renaissance organique. Intégrer une trame numérique sur des photos réelles pour symboliser la fusion entre corps et décors projetés.',
            qui: 'Travail individuel (Photomontage et typographie).',
            outils: ['Adobe Photoshop'],
            ac: [
                { code: 'AC33.03', comp: 'exprimer', desc: 'Gestion complète du workflow, du détourage complexe des danseurs à l\'application de trames graphiques urbaines, assurant un rendu professionnel prêt pour l\'impression.' },
                { code: 'AC33.05', comp: 'exprimer', desc: 'Respect des codes prestigieux de l\'Opéra tout en imposant une vision moderne. J\'ai justifié le choix du contraste entre l\'humain et le numérique pour servir le récit du spectacle.' }
            ],
            appris: 'Ce travail m\'a permis d\'explorer un langage visuel plus mature. J\'ai réussi à rendre la technologie "sensible" en l\'intégrant comme une peau sur les corps, prouvant que la DA peut renforcer le message profond d\'une œuvre.',
            gap: 'En MMI 1 (BatBee), je découvrais les masques de fusion. Ici, la technique est au service d\'un message institutionnel. Je ne cherche plus seulement le réalisme visuel, mais la cohérence sémantique.',
        },
        {
            id: 'crybaby',
            name: '"The Crybaby Journey" — Chef-d’œuvre Individuel',
            year: 'mmi3', yearLabel: 'MMI 3 — S5 (2026)',
            competence: 'exprimer',
            compLabel: '🎨 Exprimer',
            date: '2026-01',
            cover: './ressources/projets/affiche-melanie.png',
            proof: './ressources/projets/affiche-melanie2.png',
            context: 'Livret d\'intention et Design System pour un projet immersif transmédia (Hommage à Melanie Martinez). SAÉ 5.Crea.01b.',
            quoi: 'Définir l\'ambition d\'un projet de fin d\'études mêlant Web, 3D et Storytelling. Valider une identité professionnelle forte auprès d\'un comité pédagogique.',
            qui: 'Auteur-créateur (Travail individuel).',
            outils: ['Affinity Designer', 'Suite Affinity'],
            ac: [
                { code: 'AC33.01', comp: 'exprimer', desc: 'Appropriation de l\'univers de Melanie Martinez pour créer une œuvre dérivée unique, basée sur une esthétique surréaliste et narrative.' },
                { code: 'AC33.02', comp: 'exprimer', desc: 'Première utilisation de la Suite Affinity pour produire les fondations visuelles (couleurs, typos, composants) destinées à être déclinées sur tous les supports futurs.' },
                { code: 'AC35.03', comp: 'entreprendre', desc: 'Définition de l\'identité, du ton de marque et de la vision artistique globale d\'un service numérique immersif inédit.' }
            ],
            appris: 'Ce projet marque mon passage de l\'exécution à l\'auteur-créateur. En utilisant Affinity pour la première fois, j\'ai gagné en autonomie technique et prouvé ma capacité à structurer un projet d\'envergure.',
            gap: 'Sur le projet Noces Funèbres (MMI 1), je suivais scrupuleusement l\'univers de Tim Burton. Pour mon Chef-d\'œuvre, j\'affirme une posture d\'auteur : je m\'approprie une influence pour créer mon propre système visuel complet.',
        },
        {
            id: 'face-au-mur',
            name: '"Face au mur" — Scénographie numérique',
            year: 'mmi3', yearLabel: 'MMI 3 — S5 (Mars 2026)',
            competence: 'exprimer',
            compLabel: '🎨 Exprimer',
            date: '2026-03',
            cover: './ressources/projets/danseopera.png',
            proof: './ressources/projets/danseopera2.jpg',
            context: 'Décor numérique évolutif (cubes 3D) pour un spectacle de danse classique à l\'Opéra de Toulon. Semestre 5 — Collaboration avec l\'Opéra.',
            quoi: 'Faire du décor un "partenaire de jeu" synchronisé avec la tension chorégraphique. Adapter la technique 3D aux besoins artistiques des commanditaires et des danseurs.',
            qui: 'Binôme (Production 3D) / Individuel (Pilotage et relation client).',
            outils: ['Blender'],
            ac: [
                { code: 'AC33.04', comp: 'exprimer', desc: 'Modélisation sur Blender d\'un environnement réactif (cubes bleu électrique). J\'ai géré l\'évolution organique (vague, empilement) pour créer une expérience visuelle immersive.' },
                { code: 'AC33.05', comp: 'exprimer', desc: 'Choix d\'un minimalisme abstrait pour ne pas étouffer le mouvement des danseurs tout en soulignant la montée en tension.' },
                { code: 'AC35.01', comp: 'entreprendre', desc: 'Coordination entre les attentes artistiques du chorégraphe et les contraintes techniques. J\'ai géré les répétitions pour synchroniser l\'animation 3D avec les mouvements réels.' }
            ],
            appris: 'La difficulté majeure a été l\'agilité : s\'adapter aux danseurs en modifiant les courbes d\'animation en temps réel. Cette collaboration directe a validé ma capacité à transformer une idée abstraite en un service scénique fonctionnel.',
        },
        {
            id: 'snoozly',
            name: 'Snoozly — Startup de capsules de repos',
            year: 'mmi3', yearLabel: 'MMI 3 — S5 (Fév. 2026)',
            competence: 'entreprendre',
            compLabel: '🚀 Entreprendre',
            date: '2026-02',
            cover: './ressources/projets/businessplan.png',
            proof: './ressources/projets/businessplan2.png',
            context: 'Élaboration du Business Plan complet pour une solution de bien-être au travail (QVT). BUT MMI — Semestre 5 (Module Entreprendre).',
            quoi: 'Transformer un concept créatif en un dossier de création d’entreprise structuré. Analyser l\'écosystème (marché, concurrence) et définir une stratégie de développement viable.',
            qui: 'Projet de groupe (3 personnes). Posture : CRO (Chief Revenue Officer).',
            outils: ['Business Plan', 'Étude de marché', 'Tableur financier'],
            ac: [
                { code: 'AC35.01', comp: 'entreprendre', desc: 'Participation à la coordination du dossier. Mon rôle a été de veiller à la cohérence entre l\'offre de service et la stratégie de développement globale.' },
                { code: 'AC35.03', comp: 'entreprendre', desc: 'Rédaction des parties clés : étude du marché, analyse de la concurrence et définition de l’offre. Travail sur l\'argumentation liée aux directives CSRD.' },
                { code: 'AC35.04', comp: 'entreprendre', desc: 'Structuration de la stratégie de déploiement. Assimilation des conclusions financières (CA cible, point mort) pour construire un argumentaire de vente cohérent.' }
            ],
            appris: 'La rédaction de ce Business Plan m\'a forcée à sortir du pur design pour penser "écosystème". J\'ai appris à structurer une offre non pas selon mes goûts, mais selon les besoins d\'un marché.',
            gap: 'Au semestre 1 (VV Chair), j\'abordais le marketing de manière scolaire. Pour Snoozly, j\'ai adopté une posture de consultante. Je ne décris plus un objet, je développe une stratégie de marque.',
        },
        {
            id: 'narrative-design',
            name: 'Analyse Narrative & Game Writing',
            year: 'mmi3', yearLabel: 'MMI 3 — S5 (Jan. 2026)',
            competence: 'entreprendre',
            compLabel: '🚀 Entreprendre',
            date: '2026-01',
            cover: './ressources/projets/ecriture-multimedia.png',
            proof: './ressources/projets/ecriture-multimedia2.png',
            context: 'Dossier d\'expertise de 40 pages sur les mécaniques d\'immersion dans le jeu vidéo AAA (TLOU / Witcher 3). TD Narrative Design.',
            quoi: 'Analyser comment le gameplay et la DA servent le récit et l\'expérience joueur. Synthétiser des mécaniques complexes pour nourrir mon propre Chef-d\'œuvre.',
            qui: 'Binôme.',
            outils: ['Canva', 'Document PDF illustré'],
            ac: [
                { code: 'AC35.02', comp: 'entreprendre', desc: 'Rendu d\'un dossier de haute qualité éditoriale, alliant précision de l\'analyse (lore, arcs narratifs) et clarté visuelle.' },
                { code: 'AC35.04', comp: 'entreprendre', desc: 'Argumentation sur la supériorité des boucles de jeu émotionnelles et des choix moraux comme vecteurs de fidélisation utilisateur.' },
                { code: 'AC33.01', comp: 'exprimer', desc: 'Utilisation critique de l\'IA pour la synthèse de données complexes, permettant de me concentrer sur une réflexion personnelle approfondie.' }
            ],
            appris: 'Ce travail de veille stratégique a directement nourri la conception de The Crybaby Journey. J\'ai appris que l\'immersion ne dépend pas que de la technique, mais de la cohérence absolue entre la DA et les actions du joueur.',
            gap: 'En deuxième année (Crossy Road Power), j\'imaginais des mécaniques simples. Cette analyse témoigne d\'une montée en compétence théorique : je suis capable de décortiquer des systèmes narratifs complexes.',
        },
    ];

    // ══════════════════════════════════════════════════════════
    // ÉTAT & UI
    // ══════════════════════════════════════════════════════════
    let currentView = 'annee';
    let currentFilter = 'all';
    let lbImages: string[] = [];
    let lbIndex = 0;

    const compColors: Record<string, string> = {
        comprendre:   '#d32f2f',
        concevoir:    '#f57c00',
        exprimer:     '#fbc02d',
        developper:   '#2e7d32',
        entreprendre: '#1976d2'
    };
    const compBg: Record<string, string> = {
        comprendre:   '#fee2e2',
        concevoir:    '#ffedd5',
        exprimer:     '#fef9c3',
        developper:   '#dcfce7',
        entreprendre: '#dbeafe'
    };

    const toolIcons: Record<string, string> = {
        'Adobe Photoshop':    '🖼️',
        'Adobe Illustrator':  '✒️',
        'Affinity Designer':  '🔷',
        'Blender':            '🧊',
        'Figma':              '🎨',
        'WordPress':          '🌐',
        'PHP':                '🐘',
        'MySQL':              '🗄️',
        'HTML5':              '📄',
        'CSS3':               '🎨',
        'CSS personnalisé':   '🎨',
        'JavaScript':         '⚡',
        'VS Code':            '💻',
        'Canva':              '🖌️',
        'PowerPoint':         '📊',
        'Excel':              '📈',
        'Discord':            '💬',
        'Hostinger':          '☁️',
        'WAMP/MAMP':          '🖥️',
        'Maquettage UI':      '📐',
        'Document PDF illustré': '📋',
        'Tableur financier':  '📈',
        'Blocs Gutenberg':    '🧩',
        'Recherche documentaire': '🔍',
        'Plans de salle':     '🗺️',
    };

    // ══════════════════════════════════════════════════════════
    // FONCTIONS
    // ══════════════════════════════════════════════════════════
    
    (window as any).toggleACCategory = function(header: HTMLElement) {
        let row = header.nextElementSibling as HTMLElement;
        let arrow = header.querySelector(".arrow") as HTMLElement;
        let isOpen = true;

        // Check current state from first row
        if (row && row.style.display === "none") {
            isOpen = false;
        }

        while (row && !row.classList.contains("ac-cat-header")) {
            row.style.display = isOpen ? "none" : "";
            row = row.nextElementSibling as HTMLElement;
        }

        if (arrow) {
            arrow.style.transform = isOpen ? "rotate(-90deg)" : "rotate(0deg)";
        }
    };

    const getFiltered = () => {
        return projects.filter(p => {
            if (currentFilter === 'all') return true;
            if (['mmi1','mmi2','mmi3'].includes(currentFilter)) return p.year === currentFilter;
            return p.competence === currentFilter;
        });
    };

    const renderCard = (p: any) => {
        const color = compColors[p.competence];
        const bg    = compBg[p.competence];
        const div = document.createElement('div');
        div.className = 'project-card';
        div.onclick = () => openModal(p);
        div.innerHTML = `
            <img class="card-img" src="${p.cover}" alt="${p.name}"
                 onerror="this.src='https://win98icons.alexmeub.com/icons/png/image_old-0.png'; this.style.objectFit='contain'; this.style.padding='20px';">
            <div class="card-body">
                <div class="card-title">${p.name}</div>
                <div class="card-meta">${p.yearLabel}</div>
                <div class="card-desc">${p.context.substring(0, 90)}...</div>
            </div>
            <div class="card-footer">
                <span class="comp-badge" style="background:${bg}; border-color:${color}; color:${color};">${p.compLabel}</span>
                ${p.ac.slice(0,2).map((a: any) => `<span class="comp-badge" style="background:${bg}; border-color:${color}; color:${color};">${a.code}</span>`).join('')}
            </div>
        `;
        return div;
    };

    const renderProjects = () => {
        const container = document.getElementById('projets-container');
        if (!container) return;
        container.innerHTML = '';
        const filtered = getFiltered();

        if (currentView === 'annee') {
            const years = ['mmi1','mmi2','mmi3'];
            const yearInfo: Record<string, any> = {
                mmi1: { label: '📁 MMI 1', sub: 'Semestre 1 & 2 — 2023/2024', color: '#316ac5' },
                mmi2: { label: '📁 MMI 2', sub: 'Semestre 3 & 4 — 2024/2025', color: '#2a7a2a' },
                mmi3: { label: '📁 MMI 3', sub: 'Semestre 5 — 2025/2026', color: '#c83232' }
            };
            years.forEach(yr => {
                const items = filtered.filter(p => p.year === yr);
                if (!items.length) return;
                const block = document.createElement('div');
                block.className = 'year-block';
                const header = document.createElement('div');
                header.className = 'year-header';
                header.style.background = `linear-gradient(90deg, ${yearInfo[yr].color}, #1a1a4a)`;
                header.innerHTML = `${yearInfo[yr].label} <span class="year-sub">${yearInfo[yr].sub}</span> <span style="margin-left:auto; font-size:11px; opacity:0.7;">${items.length} projet${items.length>1?'s':''}</span> <span class="year-toggle">▼</span>`;
                header.addEventListener('click', () => block.classList.toggle('collapsed'));
                const grid = document.createElement('div');
                grid.className = 'projects-grid';
                items.forEach(p => grid.appendChild(renderCard(p)));
                block.appendChild(header);
                block.appendChild(grid);
                container.appendChild(block);
            });
        } else {
            const comps = ['comprendre','concevoir','exprimer','developper','entreprendre'];
            const compInfo: Record<string, any> = {
                comprendre:   { label: '🔍 Comprendre',   sub: 'Stratégie, UX Research, analyse' },
                concevoir:    { label: '🧠 Concevoir',     sub: 'Design thinking, proposition de valeur' },
                exprimer:     { label: '🎨 Exprimer',      sub: 'Production graphique, audiovisuel, 3D' },
                developper:   { label: '💻 Développer',    sub: 'Web, CMS, BDD, intégration' },
                entreprendre: { label: '🚀 Entreprendre',  sub: 'Gestion de projet, stratégie, équipe' }
            };
            comps.forEach(comp => {
                const items = filtered.filter(p => p.competence === comp);
                if (!items.length) return;
                const block = document.createElement('div');
                block.className = 'year-block';
                const header = document.createElement('div');
                header.className = 'year-header';
                header.style.background = `linear-gradient(90deg, ${compColors[comp]}, #1a1a2e)`;
                header.innerHTML = `${compInfo[comp].label} <span class="year-sub">${compInfo[comp].sub}</span> <span style="margin-left:auto; font-size:11px; opacity:0.7;">${items.length} projet${items.length>1?'s':''}</span> <span class="year-toggle">▼</span>`;
                header.addEventListener('click', () => block.classList.toggle('collapsed'));
                const grid = document.createElement('div');
                grid.className = 'projects-grid';
                items.forEach(p => grid.appendChild(renderCard(p)));
                block.appendChild(header);
                block.appendChild(grid);
                container.appendChild(block);
            });
        }

        if (!container.children.length) {
            container.innerHTML = '<p style="padding:20px; color:#808080; text-align:center; font-style:italic;">Aucun projet pour ce filtre.</p>';
        }
    };

    (window as any).setView = (v: string) => {
        currentView = v;
        document.getElementById('view-annee')?.classList.toggle('active', v === 'annee');
        document.getElementById('view-comp')?.classList.toggle('active', v === 'comp');
        const title = document.getElementById('projets-title');
        if (title) title.textContent = v === 'annee' ? '📁 Mes Projets — Vue par Année' : '🎯 Mes Projets — Vue par Compétence';
        renderProjects();
    };

    (window as any).setFilter = (val: string) => {
        currentFilter = val;
        renderProjects();
    };

    (window as any).filterByComp = (comp: string) => {
        currentFilter = comp;
        const sel = document.getElementById('filter-select') as HTMLSelectElement;
        if (sel) sel.value = comp;
        const section = document.getElementById('projets');
        if (section) section.style.display = 'block';
        document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
        renderProjects();
    };

    // ══════════════════════════════════════════════════════════
    // MODALE & LIGHTBOX
    // ══════════════════════════════════════════════════════════
    const openModal = (p: any) => {
        const modal = document.getElementById('proj-modal');
        if (!modal) return;
        modal.classList.remove('is-fullscreen');
        const fsBtn = modal.querySelector('.fullscreen-btn');
        if (fsBtn) fsBtn.textContent = '⛶';
        const title = document.getElementById('modal-title');
        if (title) title.textContent = p.name;

        // Info Tab
        const color = compColors[p.competence];
        const imgs = [];
        if (p.cover) imgs.push(p.cover);
        if (p.proof && p.proof !== p.cover) imgs.push(p.proof);

        let infoHtml = `
            <div style="border-left:4px solid ${color}; padding-left:12px; margin-bottom:14px;">
                <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">${p.name}</div>
                <div style="font-size:11px; color:#555;">${p.yearLabel} &nbsp;·&nbsp; <span style="color:${color}; font-weight:bold;">${p.compLabel}</span></div>
            </div>
        `;

        if (imgs.length) {
            const soloClass = imgs.length === 1 ? ' solo' : '';
            infoHtml += `<div class="modal-carousel"><div class="carousel-imgs">`;
            imgs.forEach((src, i) => {
                infoHtml += `<img src="${src}" alt="Visuel ${i+1}" class="proof-img${soloClass}"
                    onclick="window.openLightbox(${JSON.stringify(imgs)}, ${i})"
                    onerror="this.style.display='none'" title="Cliquer pour agrandir">`;
            });
            infoHtml += `</div></div>`;
        }

        [['Contexte', p.context],['Quoi / Objectifs', p.quoi],['Qui', p.qui]].forEach(([label, val]) => {
            if (!val) return;
            infoHtml += `<div class="info-row"><div class="info-label">${label}</div><div class="info-val">${val}</div></div>`;
        });

        if (p.link) {
            infoHtml += `<div class="info-row"><div class="info-label">Lien</div><div class="info-val"><a href="${p.link}" target="_blank" style="color:${color}; font-weight:bold; text-decoration:underline;">${p.linkLabel || 'Voir le projet'} ↗</a></div></div>`;
        }

        if (p.outils?.length) {
            const chips = p.outils.map((o: string) => {
                const icon = toolIcons[o] || '🔧';
                return `<span class="tool-chip" title="${o}">${icon} ${o}</span>`;
            }).join('');
            infoHtml += `<div class="info-row"><div class="info-label">Outils</div><div class="info-val"><div class="tools-bento">${chips}</div></div></div>`;
        }

        const infoPage = document.getElementById('modal-info');
        if (infoPage) infoPage.innerHTML = infoHtml;

        // AC Tab
        let acHtml = `<p style="font-size:11px; color:#555; margin-bottom:12px;">Apprentissages Critiques validés par ce projet :</p>`;
        p.ac.forEach((a: any) => {
            acHtml += `<div class="ac-row"><span class="ac-row-code">${a.code}</span><span>${a.desc}</span></div>`;
        });
        const acPage = document.getElementById('modal-ac');
        if (acPage) acPage.innerHTML = acHtml;

        // Eval Tab
        let evalHtml = '';
        if (p.appris) evalHtml += `<div style="margin-bottom:12px;"><div style="font-size:11px; font-weight:bold; color:#888; letter-spacing:1px; margin-bottom:4px;">CE QUE J'AI APPRIS</div><div style="font-size:12px; line-height:1.7;">${p.appris}</div></div>`;
        if (p.critique) evalHtml += `<div class="eval-box"><div style="font-size:10px; font-weight:bold; color:#a07000; letter-spacing:1px; margin-bottom:4px;">REGARD CRITIQUE</div>${p.critique}</div>`;
        if (p.gap) evalHtml += `<div class="gap-box"><div style="font-size:10px; font-weight:bold; color:#2a7a2a; letter-spacing:1px; margin-bottom:4px;">⬆ PROGRESSION (GAP)</div>${p.gap}</div>`;
        if (p.ia) evalHtml += `<div style="background:#f8f0ff; border:1px solid #c8b0e0; border-left:3px solid #8a4db2; padding:10px 12px; margin-top:8px; font-size:11px; line-height:1.6;"><div style="font-size:10px; font-weight:bold; color:#6a2a9a; letter-spacing:1px; margin-bottom:4px;">🤖 UTILISATION DE L'IA</div>${p.ia}</div>`;
        const evalPage = document.getElementById('modal-eval');
        if (evalPage) evalPage.innerHTML = evalHtml || '<p style="color:#808080; font-style:italic; font-size:11px;">Réflexion à compléter.</p>';

        (window as any).switchModalTab('info');
        modal.style.display = 'block';
        document.getElementById('panel-overlay')?.classList.add('active');
    };

    (window as any).closeModal = () => {
        const modal = document.getElementById('proj-modal');
        if (modal) modal.style.display = 'none';
        document.getElementById('panel-overlay')?.classList.remove('active');
    };

    (window as any).switchModalTab = (tab: string) => {
        ['info','ac','eval'].forEach(t => {
            document.getElementById('modal-' + t)?.classList.toggle('active', t === tab);
        });
        document.querySelectorAll('.modal-tab').forEach((btn, i) => {
            btn.classList.toggle('active', ['info','ac','eval'][i] === tab);
        });
    };

    (window as any).toggleModalFullscreen = () => {
        const modal = document.getElementById('proj-modal');
        if (!modal) return;
        modal.classList.toggle('is-fullscreen');
        const btn = modal.querySelector('.fullscreen-btn');
        if (btn) btn.textContent = modal.classList.contains('is-fullscreen') ? '⊡' : '⛶';
    };

    (window as any).openLightbox = (imgs: string[], startIndex: number) => {
        lbImages = imgs;
        lbIndex = startIndex || 0;
        renderLightbox();
        document.getElementById('lightbox-overlay')?.classList.add('open');
    };

    const renderLightbox = () => {
        const img = document.getElementById('lightbox-img') as HTMLImageElement;
        if (img) img.src = lbImages[lbIndex];
        const counter = document.getElementById('lightbox-counter');
        if (counter) counter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
        const nav = document.getElementById('lightbox-nav');
        if (nav) nav.style.display = lbImages.length > 1 ? 'flex' : 'none';
    };

    (window as any).lightboxNext = () => { lbIndex = (lbIndex + 1) % lbImages.length; renderLightbox(); };
    (window as any).lightboxPrev = () => { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; renderLightbox(); };
    (window as any).closeLightbox = () => { document.getElementById('lightbox-overlay')?.classList.remove('open'); };

    // ══════════════════════════════════════════════════════════
    // TABLEAU AC
    // ══════════════════════════════════════════════════════════
    const allAC: Record<string, string[]> = {
        'comprendre': ['AC11.01','AC11.02','AC11.03','AC11.04','AC11.05','AC11.06','AC21.01','AC21.02','AC21.03','AC21.04','AC21.05'],
        'concevoir':  ['AC12.01','AC12.02','AC12.03','AC12.04','AC22.01','AC22.02','AC22.03','AC22.04','AC22.05'],
        'exprimer':   ['AC13.01','AC13.02','AC13.03','AC13.04','AC13.05','AC13.06','AC23.01','AC23.02','AC23.03','AC23.04','AC23.05','AC23.06','AC33.01','AC33.02','AC33.03','AC33.04','AC33.05'],
        'developper': ['AC14.01','AC14.02','AC14.03','AC14.04','AC14.05','AC14.06','AC24.01','AC24.02','AC24.03','AC24.04','AC24.05','AC24.06'],
        'entreprendre':['AC15.01','AC15.02','AC15.03','AC15.04','AC15.05','AC15.06','AC15.07','AC25.01','AC25.02','AC25.03','AC25.04','AC25.05','AC25.06','AC35.01','AC35.02','AC35.03','AC35.04'],
    };

    const acDescriptions: Record<string, string> = {
        'AC11.01':'Présenter une organisation, ses activités et son environnement',
        'AC11.02':'Évaluer un site web ou dispositif interactif existant',
        'AC11.03':'Produire des analyses statistiques descriptives',
        'AC11.04':'Analyser des formes médiatiques et leur sémiotique',
        'AC11.05':'Identifier les cibles (socio-économiques, démographiques...)',
        'AC11.06':'Réaliser des entretiens utilisateurs, construire des personae',
        'AC12.01':'Concevoir un produit ou service en terme d\'usage et fonctionnalité',
        'AC12.02':'Construire la proposition de valeur d\'un produit',
        'AC12.03':'Proposer une recommandation marketing',
        'AC15.01':'Cadrer un projet, définir les objectifs et les cibles',
        'AC15.02':'Travailler au sein d\'une équipe pluridisciplinaire',
        'AC15.03':'Communiquer sur un projet (pitch, présentation)',
        'AC15.04':'Évaluer la viabilité d\'un projet',
        'AC15.05':'Gérer la relation client et les prestataires',
        'AC15.06':'Assurer une veille stratégique et technologique',
        'AC15.07':'Développer son réseau professionnel',
        'AC21.01':'Analyser les besoins des utilisateurs et des clients',
        'AC21.02':'Évaluer l\'accessibilité et l\'ergonomie d\'un dispositif',
        'AC21.03':'Réaliser une veille concurrentielle et sectorielle',
        'AC21.04':'Identifier et décrire les parcours client',
        'AC21.05':'Cartographier les expériences utilisateur',
        'AC22.01':'Concevoir une architecture de l\'information',
        'AC22.02':'Définir une stratégie de contenu',
        'AC22.03':'Co-construire une recommandation stratégique',
        'AC22.04':'Optimiser le produit',
        'AC22.05':'Concevoir un prototype interactif',
        'AC13.02':'Produire des pistes graphiques et planches d\'inspiration',
        'AC13.03':'Créer, composer et retoucher des visuels',
        'AC13.06':'Optimiser les médias en fonction de leurs usages',
        'AC23.01':'Concevoir une identité visuelle cohérente',
        'AC23.02':'Réaliser des prises de vues (photo, vidéo)',
        'AC23.03':'Produire des contenus sonores',
        'AC23.04':'Rédiger des contenus adaptés aux supports',
        'AC23.05':'Réaliser, composer et produire pour une communication plurimédia',
        'AC23.06':'Élaborer et produire des animations et de la 3D',
        'AC33.01':'Démarche originale et personnelle',
        'AC33.02':'Concevoir un design system',
        'AC33.03':'Maîtriser les étapes de production',
        'AC33.04':'Produire pour une expérience immersive / sophistiquée',
        'AC33.05':'Appréhender les enjeux de la direction artistique',
        'AC14.01':'Exploiter un environnement de développement efficace',
        'AC14.02':'Produire des pages Web fluides et sémantiques',
        'AC14.03':'Générer des pages Web à partir de données structurées',
        'AC14.04':'Mettre en ligne une application Web',
        'AC14.05':'Modéliser les données d\'une application Web',
        'AC14.06':'Déployer et personnaliser une application via CMS',
        'AC24.01':'Produire des pages et applications Web responsives',
        'AC24.02':'Développer des fonctionnalités dynamiques (JS)',
        'AC24.03':'Intégrer des interactions riches ou des dispositifs interactifs',
        'AC25.01':'Gérer un projet',
        'AC25.02':'Collaborer au sein d\'une équipe',
        'AC25.03':'Piloter une stratégie de communication',
        'AC25.04':'Concevoir un business model (Sponsoring)',
        'AC25.05':'Gérer les aspects juridiques et financiers',
        'AC25.06':'Accompagner le changement',
        'AC35.01':'Piloter un produit, un service ou une équipe',
        'AC35.02':'Maîtriser la qualité en projet multimédia',
        'AC35.03':'Concevoir un projet innovant / d\'entreprise',
        'AC35.04':'Défendre un projet de manière convaincante',
    };

    const validatedAC = new Set();
    const projectsByAC: Record<string, string[]> = {};
    projects.forEach(p => p.ac.forEach(a => {
        validatedAC.add(a.code);
        if (!projectsByAC[a.code]) projectsByAC[a.code] = [];
        projectsByAC[a.code].push(p.name);
    }));

    const buildACTable = () => {
        const table = document.getElementById('ac-table');
        if (!table) return;
        table.innerHTML = `<thead><tr>
            <th style="width:90px;">Code AC</th>
            <th>Description</th>
            <th style="width:60px; text-align:center;">Validée</th>
            <th>Projet(s) concerné(s)</th>
        </tr></thead><tbody id="ac-tbody"></tbody>`;
        const tbody = document.getElementById('ac-tbody');
        if (!tbody) return;

        Object.entries(allAC).forEach(([catKey, codes]) => {
            const catLabel = catKey.charAt(0).toUpperCase() + catKey.slice(1);
            const emoji = catKey === 'comprendre' ? '🔴' : catKey === 'concevoir' ? '🟠' : catKey === 'exprimer' ? '🟡' : catKey === 'developper' ? '🟢' : '🔵';
            
            const catRow = document.createElement('tr');
            catRow.className = `ac-cat-header ${catKey}`;
            catRow.onclick = function() { (window as any).toggleACCategory(this); };
            catRow.innerHTML = `<td colspan="4">${emoji} ${catLabel} <span class="arrow" style="transform:rotate(-90deg)">▼</span></td>`;
            tbody.appendChild(catRow);

            let lastLevel = '';
            codes.forEach(code => {
                const level = code.charAt(2); // AC1, AC2, AC3
                
                if (level !== lastLevel) {
                    const levelRow = document.createElement('tr');
                    levelRow.className = 'ac-level-header';
                    levelRow.style.display = "none";
                    levelRow.innerHTML = `<td colspan="4" style="background:#f0f0f0; font-size:9px; font-weight:bold; color:#777; padding:4px 12px; border:1px solid #c0c0c0; text-transform:uppercase; letter-spacing:1px;">Niveau ${level}</td>`;
                    tbody.appendChild(levelRow);
                    lastLevel = level;
                }

                const validated = validatedAC.has(code);
                const projs = projectsByAC[code] || [];
                const tr = document.createElement('tr');
                tr.style.display = "none"; // Closed by default
                tr.className = `ac-row-item level-${level}`;
                tr.innerHTML = `
                    <td><span class="ac-code">${code}</span></td>
                    <td style="font-size:11px;">${acDescriptions[code] || 'Description non renseignée'}</td>
                    <td class="check-cell"><span class="${validated ? 'check-yes' : 'check-no'}">${validated ? '✓' : '○'}</span></td>
                    <td style="font-size:10px; color:#555;">${projs.join('<br>')}</td>
                `;
                tbody.appendChild(tr);
            });
        });
    };

    (window as any).toggleACTable = (forceOpen = false) => {
        const wrap = document.getElementById('ac-body-wrap');
        const btn = document.getElementById('ac-toggle-btn');
        if (!wrap || !btn) return;
        
        if (forceOpen) {
            wrap.classList.remove('minimized');
            btn.textContent = '▲ Réduire';
        } else {
            const isMin = wrap.classList.toggle('minimized');
            btn.textContent = isMin ? '▼ Afficher' : '▲ Réduire';
        }
    };

    (window as any).openACTable = () => {
        const section = document.getElementById('ac-tableau');
        if (section) section.style.display = 'block';
        (window as any).toggleACTable(true);
        setTimeout(() => {
            document.getElementById('ac-tableau')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    // ══════════════════════════════════════════════════════════
    // UI HELPERS
    // ══════════════════════════════════════════════════════════
    (window as any).toggleMenu = () => {
        document.getElementById('sidebar')?.classList.toggle('active');
        document.getElementById('menu-overlay')?.classList.toggle('active');
    };
    (window as any).closeMenuMobile = () => {
        if (window.innerWidth <= 900) {
            document.getElementById('sidebar')?.classList.remove('active');
            document.getElementById('menu-overlay')?.classList.remove('active');
        }
    };

    const updateClock = () => {
        const d = new Date();
        const clock = document.getElementById('clock');
        if (clock) clock.textContent = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
    };
    setInterval(updateClock, 1000);
    updateClock();

    buildACTable();
    renderProjects();

    // Handle URL hash to open AC table automatically
    if (window.location.hash === '#ac-tableau') {
        setTimeout(() => {
            (window as any).openACTable();
        }, 500);
    }

    return () => {
        // Cleanup if needed
    };
  }, []);

  return (
    <>
      <div id="menu-overlay" onClick={() => (window as any).toggleMenu()}></div>
      <div id="panel-overlay" onClick={() => (window as any).closeModal()}></div>
      <button className="burger-btn" onClick={() => (window as any).toggleMenu()} title="Menu">☰</button>

      <div className="taskbar">
        <div style={{padding:'4px 10px', border:'2px solid', borderColor:'#fff #808080 #808080 #fff', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px'}} onClick={() => (window as any).toggleMenu()}>
          <img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" alt="" style={{width:'18px'}} />
          Portfolio BUT MMI
        </div>
        <div style={{marginLeft:'10px', paddingLeft:'10px', borderLeft:'1px solid #808080', fontSize:'11px', color:'#444', fontStyle:'italic'}}>
          🔒 Accès restreint — /portfolio
        </div>
        <div style={{display:'flex', alignItems:'center', marginLeft:'auto', borderLeft:'1px solid #808080', paddingLeft:'6px', gap:'4px'}}>
          <div className="taskbar-time" id="clock">12:00</div>
        </div>
      </div>

      <aside className="sidebar" id="sidebar">
        <div style={{padding: '0 16px 10px 16px', borderBottom: '1px solid #808080', marginBottom: '10px'}}>
            <a href="../index.html" style={{fontSize: '11px', color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px'}}>
                <span style={{fontSize: '14px'}}>⬅</span> Retour au site principal
            </a>
        </div>
        <div className="profile-card">
          <img src="./ressources/photomathilde.jpg" alt="Mathilde Mathieu" onError={(e) => { (e.target as HTMLImageElement).src='https://win98icons.alexmeub.com/icons/png/user_world-0.png'; }} />
          <h3 style={{marginTop:'10px', fontSize:'14px'}}>Mathilde Mathieu</h3>
          <p style={{fontSize:'11px', color:'#555', marginTop:'4px'}}>BUT MMI — Toulon<br />Portfolio Académique</p>
        </div>
        <nav>
          <div className="nav-section-label">Navigation</div>
          <a href="#accueil" onClick={() => { const s = document.getElementById('accueil'); if(s) s.style.display='block'; (window as any).closeMenuMobile(); }}>🏠 Accueil</a>
          <a href="#projets" onClick={() => { const s = document.getElementById('projets'); if(s) s.style.display='block'; (window as any).closeMenuMobile(); }}>📁 Projets</a>
          <a href="#ac-tableau" onClick={() => { (window as any).openACTable(); (window as any).closeMenuMobile(); }}>✅ Tableau des AC</a>

          <div className="nav-section-label" style={{marginTop:'12px'}}>Filtrer par compétence</div>
          <a href="#" onClick={(e) => { e.preventDefault(); (window as any).filterByComp('comprendre'); (window as any).closeMenuMobile(); }} style={{fontSize:'11px', color:'var(--accent-comprendre)'}}>🔍 Comprendre</a>
          <a href="#" onClick={(e) => { e.preventDefault(); (window as any).filterByComp('concevoir'); (window as any).closeMenuMobile(); }} style={{fontSize:'11px', color:'var(--accent-concevoir)'}}>🧠 Concevoir</a>
          <a href="#" onClick={(e) => { e.preventDefault(); (window as any).filterByComp('exprimer'); (window as any).closeMenuMobile(); }} style={{fontSize:'11px', color:'var(--accent-exprimer)'}}>🎨 Exprimer</a>
          <a href="#" onClick={(e) => { e.preventDefault(); (window as any).filterByComp('developper'); (window as any).closeMenuMobile(); }} style={{fontSize:'11px', color:'var(--accent-developper)'}}>💻 Développer</a>
          <a href="#" onClick={(e) => { e.preventDefault(); (window as any).filterByComp('entreprendre'); (window as any).closeMenuMobile(); }} style={{fontSize:'11px', color:'var(--accent-entreprendre)'}}>🚀 Entreprendre</a>
          <a href="#" onClick={(e) => { e.preventDefault(); (window as any).filterByComp('all'); (window as any).closeMenuMobile(); }} style={{fontSize:'11px'}}>📂 Tous</a>
        </nav>
      </aside>

      <div className="content-wrapper">
        <main>
          <section id="accueil" className="window">
            <div className="title-bar">
              <div className="title-bar-text">🎓 Portfolio Académique — Mathilde Mathieu | BUT MMI Toulon</div>
              <div className="title-bar-controls"><button aria-label="Minimize" onClick={() => { const s = document.getElementById('accueil'); if(s) s.style.display='none'; }}></button><button aria-label="Maximize"></button><button aria-label="Close" onClick={() => { const s = document.getElementById('accueil'); if(s) s.style.display='none'; }}></button></div>
            </div>
            <div className="window-body">
              <div className="about-grid">
                <div>
                  <img src="./ressources/photomathilde.jpg" alt="Mathilde Mathieu" className="about-photo" style={{height:'200px'}} onError={(e) => { (e.target as HTMLImageElement).src='https://win98icons.alexmeub.com/icons/png/user_world-0.png'; }} />
                </div>
                <div>
                  <h2 style={{fontSize:'18px', marginBottom:'10px'}}>Mathilde Mathieu</h2>
                  <p style={{fontSize:'12px', color:'#333', marginBottom:'10px', lineHeight:'1.7'}}>
                    Étudiante en <strong>3ème année de BUT Métiers du Multimédia et de l'Internet</strong> à l'IUT de Toulon, je suis passionnée de création numérique et touche-à-tout dans l’âme.<br /><br />
                    Ce portfolio retrace mon évolution au fil des trois années, à travers des projets mêlant design, vidéo et web. Il montre à la fois mes réalisations, les compétences que j’ai développées et la manière dont j’ai appris à construire et analyser mon travail.
                  </p>
                  <div className="stat-row">
                    <div className="stat-box"><span className="stat-num">15</span><span className="stat-label">Projets tracés</span></div>
                    <div className="stat-box"><span className="stat-num">3</span><span className="stat-label">Années BUT</span></div>
                    <div className="stat-box"><span className="stat-num">5</span><span className="stat-label">Compétences</span></div>
                    <div className="stat-box"><span className="stat-num">30+</span><span className="stat-label">AC validées</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="projets" className="window">
            <div className="title-bar">
              <div className="title-bar-text" id="projets-title">📁 Mes Projets — Vue par Année</div>
              <div className="title-bar-controls"><button aria-label="Minimize" onClick={() => { const s = document.getElementById('projets'); if(s) s.style.display='none'; }}></button><button aria-label="Maximize"></button><button aria-label="Close" onClick={() => { const s = document.getElementById('projets'); if(s) s.style.display='none'; }}></button></div>
            </div>
            <div className="filter-bar">
              <label>Vue :</label>
              <div className="filter-btn-grp">
                <button className="fbtn active" id="view-annee" onClick={() => (window as any).setView('annee')}>📅 Par année</button>
                <button className="fbtn" id="view-comp" onClick={() => (window as any).setView('comp')}>🎯 Par compétence</button>
              </div>
              <div style={{borderLeft:'1px solid #aaa', paddingLeft:'8px', display:'flex', alignItems:'center', gap:'4px', marginLeft:'4px'}}>
                <label>Filtrer :</label>
                <div className="select-wrap">
                  <select id="filter-select" onChange={(e) => (window as any).setFilter(e.target.value)}>
                    <option value="all">📂 Tous les projets</option>
                    <option value="comprendre">🔍 Comprendre</option>
                    <option value="concevoir">🧠 Concevoir</option>
                    <option value="exprimer">🎨 Exprimer</option>
                    <option value="developper">💻 Développer</option>
                    <option value="entreprendre">🚀 Entreprendre</option>
                    <option value="mmi1">📁 MMI 1 seulement</option>
                    <option value="mmi2">📁 MMI 2 seulement</option>
                    <option value="mmi3">📁 MMI 3 seulement</option>
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </div>
            </div>
            <div className="window-body" style={{padding:'16px !important'}}>
              <div id="projets-container"></div>
            </div>
          </section>

          <section id="ac-tableau" className="window" style={{display:'none'}}>
            <div className="title-bar" style={{display:'flex', alignItems:'center'}}>
              <div className="title-bar-text">✅ Tableau des Apprentissages Critiques validés</div>
              <button className="ac-collapse-btn" onClick={() => (window as any).toggleACTable()} id="ac-toggle-btn" title="Réduire/Afficher le tableau">▼ Afficher</button>
              <div className="title-bar-controls"><button aria-label="Minimize" onClick={() => { const s = document.getElementById('ac-tableau'); if(s) s.style.display='none'; }}></button><button aria-label="Maximize"></button><button aria-label="Close" onClick={() => { const s = document.getElementById('ac-tableau'); if(s) s.style.display='none'; }}></button></div>
            </div>
            <div id="ac-body-wrap" className="minimized">
              <div className="window-body" style={{padding:'16px !important'}}>
                <p style={{fontSize:'11px', color:'#555', marginBottom:'14px', fontStyle:'italic'}}>
                  Vue d'ensemble des AC validées par mes projets sur les 3 années de BUT MMI. Cliquez sur une catégorie pour l'ouvrir.
                </p>
                <div className="ac-table-wrap">
                  <table className="ac-table" id="ac-table"></table>
                </div>
              </div>
            </div>
          </section>

          <footer className="desktop-footer">
            <a href="mailto:guimauvepraline@gmail.com" className="desktop-icon">
              <img src="https://win98icons.alexmeub.com/icons/png/outlook_express-0.png" alt="Email" referrerPolicy="no-referrer" />
              <span>Me contacter</span>
            </a>
            <div className="desktop-icon" onClick={() => (window as any).openACTable()}>
              <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="Tableau AC" referrerPolicy="no-referrer" />
              <span>Tableau AC</span>
            </div>
          </footer>
        </main>
      </div>

      <div id="lightbox-overlay" onClick={() => (window as any).closeLightbox()}>
        <button id="lightbox-close" onClick={() => (window as any).closeLightbox()}>✕</button>
        <img id="lightbox-img" src={null as any} alt="Zoom" onClick={(e) => e.stopPropagation()} />
        <div id="lightbox-nav" onClick={(e) => e.stopPropagation()}>
          <button className="lb-btn" onClick={() => (window as any).lightboxPrev()}>◀</button>
          <span id="lightbox-counter">1 / 1</span>
          <button className="lb-btn" onClick={() => (window as any).lightboxNext()}>▶</button>
        </div>
      </div>

      <div id="proj-modal" className="window">
        <div className="title-bar" style={{display:'flex', alignItems:'center', gap:'6px'}}>
          <div className="title-bar-text" id="modal-title" style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1}}>Projet</div>
          <button className="fullscreen-btn" onClick={() => (window as any).toggleModalFullscreen()} title="Plein écran">⛶</button>
          <div className="title-bar-controls"><button aria-label="Close" onClick={() => (window as any).closeModal()}></button></div>
        </div>
        <div className="modal-tabs">
          <button className="modal-tab active" onClick={() => (window as any).switchModalTab('info')}>📄 Fiche</button>
          <button className="modal-tab" onClick={() => (window as any).switchModalTab('ac')}>🎯 Compétences</button>
          <button className="modal-tab" onClick={() => (window as any).switchModalTab('eval')}>💬 Réflexion</button>
        </div>
        <div id="modal-info" className="modal-page active"></div>
        <div id="modal-ac" className="modal-page"></div>
        <div id="modal-eval" className="modal-page"></div>
        <div style={{background:'var(--win-gray)', borderTop:'1px solid #808080', padding:'5px 10px', display:'flex', justifyContent:'flex-end', gap:'6px'}}>
          <button onClick={() => (window as any).closeModal()} style={{padding:'3px 14px', fontSize:'11px'}}>Fermer</button>
        </div>
      </div>
    </>
  );
}
