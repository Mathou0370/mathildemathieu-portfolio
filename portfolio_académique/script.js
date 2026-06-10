const state = {
  currentSection: "about",
  currentYear: "all",
  currentCategory: "all",
  currentProject: null,
  lightboxImages: [],
  lightboxIndex: 0,
};

const elements = {
  bootScreen: document.getElementById("boot-screen"),
  siteShell: document.getElementById("site-shell"),
  enterSiteBtn: document.getElementById("enter-site-btn"),
  bootProgressBar: document.getElementById("boot-progress-bar"),
  sections: document.querySelectorAll(".content-window"),
  sidebarButtons: document.querySelectorAll(".nav-btn"),
  yearButtons: document.querySelectorAll("[data-filter-year]"),
  categoryButtons: document.querySelectorAll(".toolbar__button[data-filter-category]"),
  shortcutButtons: document.querySelectorAll(".skill-tag[data-filter-category]"),
  jumpYearButtons: document.querySelectorAll("[data-jump-year]"),
  sectionTargetButtons: document.querySelectorAll("[data-section-target]"),
  projectsGrid: document.getElementById("projects-grid"),
  acTableContainer: document.getElementById("ac-table-container"),
  competenceOverview: document.getElementById("competence-overview"),
  statProjects: document.getElementById("stat-projects"),
  statAc: document.getElementById("stat-ac"),
  clock: document.getElementById("clock"),
  modal: document.getElementById("project-modal"),
  modalTitle: document.getElementById("modal-project-title"),
  modalContent: document.getElementById("modal-project-content"),
  closeModal: document.getElementById("close-modal"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightbox-image"),
  lightboxClose: document.getElementById("lightbox-close"),
  lightboxPrev: document.getElementById("lightbox-prev"),
  lightboxNext: document.getElementById("lightbox-next"),
  lightboxCounter: document.getElementById("lightbox-counter"),
  heroProjectsBtn: document.getElementById("hero-projects-btn"),
  taskbarHomeBtn: document.getElementById("taskbar-home-btn"),
};

const acLabels = {
  "AC11.01": "Présenter une organisation, ses activités et son environnement",
  "AC11.02": "Évaluer un site web, un produit multimédia ou un dispositif interactif existant",
  "AC11.03": "Produire des analyses statistiques descriptives",
  "AC11.04": "Analyser des formes médiatiques et leur sémiotique",
  "AC11.05": "Identifier les cibles",
  "AC11.06": "Réaliser des entretiens utilisateurs pour construire des personae et des récits utilisateurs",
  "AC12.01": "Concevoir un produit ou un service en terme d’usage et de fonctionnalité",
  "AC12.02": "Construire la proposition de valeur d’un produit ou d’un service",
  "AC12.03": "Proposer une recommandation marketing",
  "AC12.04": "Proposer une stratégie de communication",
  "AC13.01": "Écrire pour les médias numériques",
  "AC13.02": "Produire des pistes graphiques et des planches d’inspiration",
  "AC13.03": "Créer, composer et retoucher des visuels",
  "AC13.04": "Tourner et monter une vidéo",
  "AC13.05": "Designer une interface web",
  "AC13.06": "Optimiser les médias en fonction de leurs usages et supports de diffusion",
  "AC14.01": "Exploiter de manière autonome un environnement de développement efficace et productif",
  "AC14.02": "Produire des pages Web fluides incluant un balisage sémantique efficace et des interactions simples",
  "AC14.03": "Générer des pages Web à partir de données structurées",
  "AC14.04": "Mettre en ligne une application Web en utilisant une solution d’hébergement standard",
  "AC14.05": "Modéliser les données d’une application Web",
  "AC14.06": "Déployer et personnaliser une application Web en utilisant un CMS ou un framework MVC",
  "AC21.01": "Analyser la stratégie de communication ou marketing d’un acteur",
  "AC21.02": "Auditer un site web, une marque ou un service",
  "AC21.03": "Traiter des données avec des outils statistiques",
  "AC21.04": "Identifier et décrire les parcours client",
  "AC21.05": "Cartographier les expériences utilisateur",
  "AC22.01": "Co-concevoir un produit ou un service",
  "AC22.02": "Produire une recommandation ergonomique à partir des tests utilisateurs",
  "AC22.03": "Co-construire une recommandation stratégique",
  "AC22.04": "Optimiser le référencement d’un site web, d’un produit ou d’un service",
  "AC22.05": "Mettre en place une présence sur les réseaux sociaux",
  "AC23.01": "Produire un écrit journalistique sourcé et documenté",
  "AC23.02": "Définir une iconographie",
  "AC23.03": "Créer et décliner une identité visuelle",
  "AC23.04": "Imaginer, écrire et scénariser en vue d’une communication multimédia ou transmédia",
  "AC23.05": "Réaliser, composer et produire pour une communication plurimédia",
  "AC23.06": "Élaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D",
  "AC24.01": "Produire des pages et applications Web responsives",
  "AC24.02": "Mettre en place ou développer un back office",
  "AC24.03": "Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs",
  "AC24.04": "Modéliser les traitements d’une application Web",
  "AC24.05": "Optimiser une application web en termes de référencement et de temps de chargement",
  "AC24.06": "Configurer une solution d’hébergement adaptée aux besoins",
  "AC25.01": "Gérer un projet avec une méthode d’amélioration continue",
  "AC25.02": "Cartographier un écosystème",
  "AC25.03": "Initier la constitution d’un réseau professionnel",
  "AC25.04": "Collaborer au sein des organisations",
  "AC25.05": "Maîtriser les codes des productions écrites et orales professionnelles",
  "AC25.06": "Prendre en compte les contraintes juridiques",
  "AC33.01": "Adopter et justifier une démarche originale et personnelle dans ses productions",
  "AC33.02": "Concevoir un design system et en produire les éléments visuels, graphiques ou sonores",
  "AC33.03": "Maîtriser les étapes de production d'un projet multimédia",
  "AC33.04": "Produire les éléments pour une expérience sophistiquée",
  "AC33.05": "Appréhender les enjeux liés à la direction artistique",
  "AC35.01": "Piloter un produit, un service ou une équipe",
  "AC35.02": "Maîtriser la qualité en projet Web ou multimédia",
  "AC35.03": "Concevoir un projet d’entreprise innovante en définissant le nom, l’identité, la forme juridique et le ton de la marque",
  "AC35.04": "Défendre un projet de manière convaincante",
};

const acReference = {
  Comprendre: {
    color: "comprendre",
    levels: [
      { title: "NIVEAU 1", items: ["AC11.01", "AC11.02", "AC11.03", "AC11.04", "AC11.05", "AC11.06"] },
      { title: "NIVEAU 2", items: ["AC21.01", "AC21.02", "AC21.03", "AC21.04", "AC21.05"] }
    ]
  },
  Concevoir: {
    color: "concevoir",
    levels: [
      { title: "NIVEAU 1", items: ["AC12.01", "AC12.02", "AC12.03", "AC12.04"] },
      { title: "NIVEAU 2", items: ["AC22.01", "AC22.02", "AC22.03", "AC22.04", "AC22.05"] }
    ]
  },
  Exprimer: {
    color: "exprimer",
    levels: [
      { title: "NIVEAU 1", items: ["AC13.01", "AC13.02", "AC13.03", "AC13.04", "AC13.05", "AC13.06"] },
      { title: "NIVEAU 2", items: ["AC23.01", "AC23.02", "AC23.03", "AC23.04", "AC23.05", "AC23.06"] },
      { title: "NIVEAU 3", items: ["AC33.01", "AC33.02", "AC33.03", "AC33.04", "AC33.05"] }
    ]
  },
  Développer: {
    color: "developper",
    levels: [
      { title: "NIVEAU 1", items: ["AC14.01", "AC14.02", "AC14.03", "AC14.04", "AC14.05", "AC14.06"] },
      { title: "NIVEAU 2", items: ["AC24.01", "AC24.02", "AC24.03", "AC24.04", "AC24.05", "AC24.06"] }
    ]
  },
  Entreprendre: {
    color: "entreprendre",
    levels: [
      { title: "NIVEAU 1", items: ["AC15.01", "AC15.02", "AC15.03", "AC15.04", "AC15.05", "AC15.06", "AC15.07"] },
      { title: "NIVEAU 2", items: ["AC25.01", "AC25.02", "AC25.03", "AC25.04", "AC25.05", "AC25.06"] },
      { title: "NIVEAU 3", items: ["AC35.01", "AC35.02", "AC35.03", "AC35.04"] }
    ]
  }
};


const yearMeta = {
  mmi1: { label: "📚 BUT 1", date: "2023 - 2024", order: 10 },
  mmi2: { label: "📚 BUT 2", date: "2024 - 2025", order: 20 },
  stagemmi2: { label: "💼 Stage BUT2", date: "Fév. - Mars 2025 · 8 sem.", order: 25 },
  mmi3: { label: "📚 BUT 3", date: "2025 - 2026", order: 30 },
  stagemmi3: { label: "💼 Stage BUT3", date: "Sept. 2025 - Mai 2026 · 18 sem.", order: 35 },
  associatif: { label: "🤝 Associatif", date: "2024 - 2026", order: 28 },
  personnel: { label: "🌸 Personnel", date: "Pratique libre", order: 5 },
};

const competenceTexts = {
  comprendre: "Analyser un contexte, des usages, une communication ou des données pour mieux orienter un projet.",
  concevoir: "Transformer une idée ou un besoin en réponse structurée : stratégie, expérience, parcours, valeur.",
  exprimer: "Créer des contenus visuels, audiovisuels, éditoriaux ou interactifs avec une intention claire.",
  developper: "Construire des sites, interfaces ou expériences web fonctionnelles, responsives et exploitables.",
  entreprendre: "Organiser, collaborer, piloter, défendre un projet et agir dans un cadre professionnel.",
};

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function normalizeYear(value) { return String(value || "").toLowerCase().replaceAll(" ", ""); }
function normalizeCategory(value) {
  const raw = String(value || "").toLowerCase();
  return { comprendre:"comprendre", concevoir:"concevoir", exprimer:"exprimer", développer:"developper", developper:"developper", entreprendre:"entreprendre" }[raw] || raw;
}
function getYearInfo(project) {
  const key = normalizeYear(project.year);
  return yearMeta[key] || { label: project.year || "", date: project.dateLabel || "", order: 0 };
}
function inferDate(project) { return project.dateLabel || project.date || getYearInfo(project).date || ""; }
function projectImage(project) { return project.cover || project.image || "../ressources/fond.jpg"; }
function getProjectDomains(project) {
  const domains = new Set();
  (project.ac || []).forEach(code => {
    if (/^AC11|^AC21/.test(code)) domains.add("comprendre");
    if (/^AC12|^AC22/.test(code)) domains.add("concevoir");
    if (/^AC13|^AC23|^AC33/.test(code)) domains.add("exprimer");
    if (/^AC14|^AC24/.test(code)) domains.add("developper");
    if (/^AC15|^AC25|^AC35/.test(code)) domains.add("entreprendre");
  });
  if (!domains.size && project.category) domains.add(normalizeCategory(project.category));
  return [...domains];
}
function getDomainLabel(domain) { return { comprendre:"Comprendre", concevoir:"Concevoir", exprimer:"Exprimer", developper:"Développer", entreprendre:"Entreprendre" }[domain] || domain; }
function renderDomainChips(domains) { return domains.map(domain => `<span class="domain-chip domain-chip--${domain}">${escapeHtml(getDomainLabel(domain))}</span>`).join(""); }
function updateClock() { if (elements.clock) elements.clock.textContent = new Date().toLocaleTimeString("fr-FR"); }
function showSection(sectionId) {
  state.currentSection = sectionId;
  elements.sections.forEach(section => section.classList.toggle("is-visible", section.id === sectionId));
  elements.sidebarButtons.forEach(button => button.classList.toggle("is-active", button.dataset.section === sectionId));
  if (sectionId === "projects") renderProjects();
  if (sectionId === "ac") renderAcTable();
  if (sectionId === "competences") renderCompetenceOverview();
}
function sortedProjects(list) {
  return [...list].sort((a,b) => (getYearInfo(b).order - getYearInfo(a).order) || (Number(b.id) - Number(a.id)));
}
function getFilteredProjects() {
  return sortedProjects(projects.filter(project => {
    const yearMatch = state.currentYear === "all" || normalizeYear(project.year) === state.currentYear;
    const domains = getProjectDomains(project);
    const categoryMatch = state.currentCategory === "all" || domains.includes(state.currentCategory);
    return yearMatch && categoryMatch;
  }));
}
function renderProjects() {
  const filtered = getFilteredProjects();
  if (!elements.projectsGrid) return;
  if (!filtered.length) { elements.projectsGrid.innerHTML = `<div class="project-rich-block"><p>Aucune trace ne correspond à ce filtre.</p></div>`; return; }
  elements.projectsGrid.innerHTML = filtered.map(project => {
    const acBadges = (project.ac || []).slice(0, 6).map(code => `<span>${escapeHtml(code)}</span>`).join("");
    const domains = getProjectDomains(project);
    const year = getYearInfo(project);
    return `<article class="project-card project-card--${normalizeYear(project.year)}"><button class="project-card__button" type="button" data-project-id="${project.id}"><div class="project-card__media"><img src="${projectImage(project)}" alt="${escapeHtml(project.title)}" loading="lazy" onerror="this.onerror=null;this.src='../ressources/fond.jpg';"></div><div class="project-card__body"><div class="project-card__meta-row"><span>${escapeHtml(year.label)}</span><span>${escapeHtml(inferDate(project))}</span></div><h3 class="project-card__title">${escapeHtml(project.title)}</h3><div class="project-card__domains">${renderDomainChips(domains)}</div><p class="project-card__description">${escapeHtml(project.shortDescription || "")}</p><div class="project-card__ac">${acBadges}</div></div></button></article>`;
  }).join("");
  elements.projectsGrid.querySelectorAll("[data-project-id]").forEach(button => button.addEventListener("click", () => {
    const project = projects.find(item => String(item.id) === String(button.dataset.projectId));
    if (project) openProject(project);
  }));
}
function renderCompetenceOverview() {
  if (!elements.competenceOverview) return;
  const domains = ["comprendre", "concevoir", "exprimer", "developper", "entreprendre"];
  elements.competenceOverview.innerHTML = domains.map(domain => {
    const linked = sortedProjects(projects.filter(project => getProjectDomains(project).includes(domain))).slice(0, 5);
    return `<article class="competence-card competence-card--${domain}"><h3>${getDomainLabel(domain)}</h3><p>${competenceTexts[domain]}</p><div class="competence-card__projects">${linked.map(project => `<button type="button" data-project-id="${project.id}">${escapeHtml(project.title)}</button>`).join("")}</div><button class="mini-link" type="button" data-competence-jump="${domain}">Voir toutes les traces</button></article>`;
  }).join("");
  elements.competenceOverview.querySelectorAll("[data-project-id]").forEach(button => button.addEventListener("click", () => { const project = projects.find(item => String(item.id) === String(button.dataset.projectId)); if (project) openProject(project); }));
  elements.competenceOverview.querySelectorAll("[data-competence-jump]").forEach(button => button.addEventListener("click", () => { state.currentCategory = button.dataset.competenceJump; state.currentYear = "all"; syncFilterButtons(); renderProjects(); showSection("projects"); }));
}
function renderAcTable() {
  if (!elements.acTableContainer) return;
  const acMap = {};
  projects.forEach(project => (project.ac || []).forEach(code => { if (!acMap[code]) acMap[code] = []; acMap[code].push(project.title); }));
  elements.acTableContainer.innerHTML = Object.entries(acReference).map(([competence, data], index) => {
    const categoryId = `ac-category-${index}`;
    const innerRows = data.levels.map(level => `<tr class="ac-level-row"><td colspan="4">${level.title}</td></tr>${level.items.map(code => { const linked = acMap[code] || []; return `<tr><td>${escapeHtml(code)}</td><td>${escapeHtml(acLabels[code] || "")}</td><td>${linked.length ? "✔" : "○"}</td><td>${linked.map(escapeHtml).join(", ")}</td></tr>`; }).join("")}`).join("");
    return `<div class="ac-category is-collapsed ac-category--${data.color}" id="${categoryId}"><button class="ac-category__header" type="button" data-ac-toggle="${categoryId}"><span>${competence}</span><span>+</span></button><div class="ac-category__content"><table class="ac-table"><thead><tr><th>Code AC</th><th>Description</th><th>Trace</th><th>Projet(s)</th></tr></thead><tbody>${innerRows}</tbody></table></div></div>`;
  }).join("");
  elements.acTableContainer.querySelectorAll("[data-ac-toggle]").forEach(button => button.addEventListener("click", () => { const target = document.getElementById(button.dataset.acToggle); if (!target) return; target.classList.toggle("is-collapsed"); const symbol = button.querySelector("span:last-child"); if (symbol) symbol.textContent = target.classList.contains("is-collapsed") ? "+" : "−"; }));
}
function buildGallery(project) {
  const images = project.images?.length ? project.images : [{ src: project.cover || project.image || "../ressources/fond.jpg", alt: project.title }];
  const first = images[0];
  return `<div class="project-gallery project-gallery--clean"><figure class="project-gallery__featured"><img src="${first.src}" alt="${escapeHtml(first.alt || project.title)}" data-lightbox-src="${first.src}" data-lightbox-alt="${escapeHtml(first.alt || project.title)}" data-lightbox-index="0" onerror="this.onerror=null;this.src='../ressources/fond.jpg';"><figcaption>Image principale — cliquez pour agrandir</figcaption></figure><div class="project-gallery__thumbs">${images.map((image, index) => `<button type="button" class="project-thumb" aria-label="Ouvrir image ${index + 1}"><img src="${image.src}" alt="${escapeHtml(image.alt || project.title)}" data-lightbox-src="${image.src}" data-lightbox-alt="${escapeHtml(image.alt || project.title)}" data-lightbox-index="${index}" onerror="this.onerror=null;this.src='../ressources/fond.jpg';"></button>`).join("")}</div></div>`;
}
function openProject(project) {
  state.currentProject = project;
  const galleryImages = project.images?.length ? project.images : [{ src: project.cover || project.image || "../ressources/fond.jpg", alt: project.title }];
  const domains = getProjectDomains(project);
  const acList = (project.ac || []).map(code => `<li><strong>${escapeHtml(code)}</strong> — ${escapeHtml(acLabels[code] || "")}</li>`).join("");
  const year = getYearInfo(project);
  elements.modalTitle.textContent = project.title || "Projet";
  elements.modalContent.innerHTML = `<div class="project-detail"><div class="project-hero-detail"><div><div class="project-header-meta"><span>${escapeHtml(year.label)}</span><span>${escapeHtml(inferDate(project))}</span><span>${escapeHtml(project.type || "trace")}</span></div><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.shortDescription || "")}</p><div class="project-domains">${renderDomainChips(domains)}</div></div></div>${buildGallery(project)}<div class="project-detail-grid"><div class="project-rich-block project-rich-block--accent">${project.infoHtml || ""}</div><div class="project-rich-block"><h3>Apprentissages critiques mobilisés</h3><ul>${acList}</ul>${project.acHtml || ""}</div><div class="project-rich-block project-rich-block--wide">${project.evaluationHtml || ""}</div></div></div>`;
  elements.modalContent.querySelectorAll("[data-lightbox-src]").forEach(img => img.addEventListener("click", () => { state.lightboxImages = galleryImages; state.lightboxIndex = Number(img.dataset.lightboxIndex || 0); renderLightbox(); openLightbox(); }));
  elements.modal.classList.remove("hidden");
  elements.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeProject() { elements.modal.classList.add("hidden"); elements.modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
function renderLightbox() { const current = state.lightboxImages[state.lightboxIndex]; if (!current) return; elements.lightboxImage.src = current.src; elements.lightboxImage.alt = current.alt || ""; const hasMultiple = state.lightboxImages.length > 1; elements.lightboxPrev.classList.toggle("hidden", !hasMultiple); elements.lightboxNext.classList.toggle("hidden", !hasMultiple); elements.lightboxCounter.classList.toggle("hidden", !hasMultiple); if (hasMultiple) elements.lightboxCounter.textContent = `${state.lightboxIndex + 1} / ${state.lightboxImages.length}`; }
function openLightbox() { elements.lightbox.classList.remove("hidden"); elements.lightbox.setAttribute("aria-hidden", "false"); }
function closeLightbox() { elements.lightbox.classList.add("hidden"); elements.lightbox.setAttribute("aria-hidden", "true"); elements.lightboxImage.src = ""; state.lightboxImages = []; state.lightboxIndex = 0; }
function prevLightboxImage() { if (state.lightboxImages.length < 2) return; state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxImages.length) % state.lightboxImages.length; renderLightbox(); }
function nextLightboxImage() { if (state.lightboxImages.length < 2) return; state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxImages.length; renderLightbox(); }
function syncFilterButtons() {
  elements.yearButtons.forEach(item => item.classList.toggle("is-active", item.dataset.filterYear === state.currentYear));
  elements.categoryButtons.forEach(item => item.classList.toggle("is-active", item.dataset.filterCategory === state.currentCategory));
}
function jumpToYear(year) { state.currentYear = year; state.currentCategory = "all"; syncFilterButtons(); renderProjects(); showSection("projects"); document.getElementById("projects")?.scrollIntoView({ behavior:"smooth", block:"start" }); }
function updateStats() { const acSet = new Set(); projects.forEach(project => (project.ac || []).forEach(code => acSet.add(code))); elements.statProjects.textContent = String(projects.length); elements.statAc.textContent = String(acSet.size); }
function runBootAnimation() { if (!elements.bootProgressBar) return; let value = 0; const interval = setInterval(() => { value += 20; elements.bootProgressBar.style.width = `${Math.min(value, 100)}%`; if (value >= 100) clearInterval(interval); }, 120); }
function initBootScreen() { runBootAnimation(); elements.enterSiteBtn?.addEventListener("click", () => { elements.bootScreen.classList.add("hidden"); elements.siteShell.classList.remove("hidden"); }); }
function initSidebarNavigation() { elements.sidebarButtons.forEach(button => button.addEventListener("click", () => showSection(button.dataset.section))); }
function initFilters() {
  elements.yearButtons.forEach(button => button.addEventListener("click", () => { state.currentYear = button.dataset.filterYear; syncFilterButtons(); renderProjects(); showSection("projects"); }));
  [...elements.categoryButtons, ...elements.shortcutButtons].forEach(button => button.addEventListener("click", () => { state.currentCategory = button.dataset.filterCategory; syncFilterButtons(); renderProjects(); showSection("projects"); document.getElementById("projects")?.scrollIntoView({ behavior:"smooth", block:"start" }); }));
  elements.jumpYearButtons.forEach(button => button.addEventListener("click", () => jumpToYear(button.dataset.jumpYear)));
  elements.sectionTargetButtons.forEach(button => button.addEventListener("click", () => showSection(button.dataset.sectionTarget)));
  document.querySelectorAll("[data-open-project-title]").forEach(button => button.addEventListener("click", () => { const target = projects.find(p => (p.title || "").toLowerCase().includes(button.dataset.openProjectTitle.toLowerCase())); if (target) openProject(target); }));
}
function initModal() { elements.closeModal.addEventListener("click", closeProject); elements.modal.addEventListener("click", event => { if (event.target === elements.modal) closeProject(); }); }
function initLightbox() { elements.lightboxClose.addEventListener("click", closeLightbox); elements.lightboxPrev.addEventListener("click", prevLightboxImage); elements.lightboxNext.addEventListener("click", nextLightboxImage); elements.lightbox.addEventListener("click", event => { if (event.target === elements.lightbox) closeLightbox(); }); }
function initQuickActions() { elements.heroProjectsBtn?.addEventListener("click", () => jumpToYear("all")); elements.taskbarHomeBtn?.addEventListener("click", () => { showSection("about"); window.scrollTo({ top:0, behavior:"smooth" }); }); }
function initKeyboard() { document.addEventListener("keydown", event => { if (event.key === "Escape") { if (!elements.lightbox.classList.contains("hidden")) { closeLightbox(); return; } if (!elements.modal.classList.contains("hidden")) closeProject(); } if (!elements.lightbox.classList.contains("hidden")) { if (event.key === "ArrowLeft") prevLightboxImage(); if (event.key === "ArrowRight") nextLightboxImage(); } }); }
function init() { updateClock(); setInterval(updateClock, 1000); updateStats(); initBootScreen(); initSidebarNavigation(); initFilters(); initModal(); initLightbox(); initQuickActions(); initKeyboard(); renderProjects(); renderAcTable(); renderCompetenceOverview(); showSection("about"); }
init();
