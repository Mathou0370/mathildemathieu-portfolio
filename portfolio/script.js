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

  projectsGrid: document.getElementById("projects-grid"),
  acTableContainer: document.getElementById("ac-table-container"),
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeYear(value) {
  return String(value || "").toLowerCase();
}

function normalizeCategory(value) {
  const raw = String(value || "").toLowerCase();
  const map = {
    comprendre: "comprendre",
    concevoir: "concevoir",
    exprimer: "exprimer",
    développer: "developper",
    developper: "developper",
    entreprendre: "entreprendre",
  };
  return map[raw] || raw;
}

function inferDate(project) {
  if (project.dateLabel) return project.dateLabel;
  if (project.date) return project.date;

  const source = `${project.infoHtml || ""} ${project.title || ""}`;
  const monthMatch = source.match(
    /(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre)\s+\d{4}/i
  );
  if (monthMatch) return monthMatch[0];
  if (/2023/i.test(source)) return "2023";
  if (/2024/i.test(source)) return "2024";
  if (/2025/i.test(source)) return "2025";
  if (/2026/i.test(source)) return "2026";
  return "";
}

function projectImage(project) {
  return project.cover || project.image || "../ressources/fond.jpg";
}

function getProjectDomains(project) {
  const domains = new Set();

  (project.ac || []).forEach((code) => {
    if (/^AC1[12]|^AC22/.test(code)) domains.add("concevoir");
    if (/^AC11|^AC21/.test(code)) domains.add("comprendre");
    if (/^AC13|^AC23|^AC33/.test(code)) domains.add("exprimer");
    if (/^AC14|^AC24/.test(code)) domains.add("developper");
    if (/^AC15|^AC25|^AC35/.test(code)) domains.add("entreprendre");
  });

  if (!domains.size && project.category) {
    domains.add(normalizeCategory(project.category));
  }

  return [...domains];
}

function getDomainLabel(domain) {
  const labels = {
    comprendre: "Comprendre",
    concevoir: "Concevoir",
    exprimer: "Exprimer",
    developper: "Développer",
    entreprendre: "Entreprendre",
  };
  return labels[domain] || domain;
}

function renderDomainChips(domains) {
  return domains
    .map((domain) => {
      const label = getDomainLabel(domain);
      return `<span class="domain-chip domain-chip--${domain}">${escapeHtml(label)}</span>`;
    })
    .join("");
}

function updateClock() {
  const now = new Date();
  if (elements.clock) {
    elements.clock.textContent = now.toLocaleTimeString("fr-FR");
  }
}

function showSection(sectionId) {
  state.currentSection = sectionId;

  elements.sections.forEach((section) => {
    section.classList.toggle("is-visible", section.id === sectionId);
  });

  elements.sidebarButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.section === sectionId);
  });

  if (sectionId === "projects") renderProjects();
  if (sectionId === "ac") renderAcTable();
}

function getFilteredProjects() {
  return projects.filter((project) => {
    const yearMatch =
      state.currentYear === "all" || normalizeYear(project.year) === state.currentYear;

    const projectDomains = getProjectDomains(project);
    const categoryMatch =
      state.currentCategory === "all" || projectDomains.includes(state.currentCategory);

    return yearMatch && categoryMatch;
  });
}

function renderProjects() {
  const filtered = getFilteredProjects();

  if (!filtered.length) {
    elements.projectsGrid.innerHTML = `
      <div class="project-rich-block">
        <p>Aucun projet ne correspond à ce filtre.</p>
      </div>
    `;
    return;
  }

  elements.projectsGrid.innerHTML = filtered
    .map((project) => {
      const acBadges = (project.ac || [])
        .map((code) => `<span>${escapeHtml(code)}</span>`)
        .join("");

      const domains = getProjectDomains(project);

      return `
        <article class="project-card">
          <button class="project-card__button" type="button" data-project-id="${project.id}">
            <div class="project-card__media">
              <img
                src="${projectImage(project)}"
                alt="${escapeHtml(project.title)}"
                loading="lazy"
                onerror="this.onerror=null;this.src='../ressources/fond.jpg';"
              >
            </div>

            <div class="project-card__body">
              <div class="project-card__meta-row">
                <span>${escapeHtml(project.year || "")}</span>
                <span>${escapeHtml(inferDate(project) || "")}</span>
              </div>

              <h3 class="project-card__title">${escapeHtml(project.title)}</h3>

              <div class="project-card__domains">
                ${renderDomainChips(domains)}
              </div>

              <p class="project-card__description">${escapeHtml(project.shortDescription || "")}</p>

              <div class="project-card__ac">${acBadges}</div>
            </div>
          </button>
        </article>
      `;
    })
    .join("");

  elements.projectsGrid
    .querySelectorAll("[data-project-id]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const project = projects.find((item) => item.id === Number(button.dataset.projectId));
        if (project) openProject(project);
      });
    });
}

function renderAcTable() {
  const acMap = {};

  projects.forEach((project) => {
    (project.ac || []).forEach((code) => {
      if (!acMap[code]) acMap[code] = [];
      acMap[code].push(project.title);
    });
  });

  elements.acTableContainer.innerHTML = Object.entries(acReference)
    .map(([competence, data], index) => {
      const categoryId = `ac-category-${index}`;

      const innerTable = `
        <table class="ac-table">
          <thead>
            <tr>
              <th>Code AC</th>
              <th>Description</th>
              <th>Validée</th>
              <th>Projet(s) concerné(s)</th>
            </tr>
          </thead>
          <tbody>
            ${data.levels.map((level) => `
              <tr class="ac-level-row">
                <td colspan="4">${level.title}</td>
              </tr>
              ${level.items.map((code) => {
                const linkedProjects = acMap[code] || [];
                return `
                  <tr>
                    <td>${escapeHtml(code)}</td>
                    <td>${escapeHtml(acLabels[code] || "")}</td>
                    <td>${linkedProjects.length ? "✔" : "○"}</td>
                    <td>${linkedProjects.map(escapeHtml).join(", ")}</td>
                  </tr>
                `;
              }).join("")}
            `).join("")}
          </tbody>
        </table>
      `;

      return `
        <div class="ac-category is-collapsed ac-category--${data.color}" id="${categoryId}">
          <button class="ac-category__header" type="button" data-ac-toggle="${categoryId}">
            <span>${competence}</span>
            <span>+</span>
          </button>
          <div class="ac-category__content">
            ${innerTable}
          </div>
        </div>
      `;
    })
    .join("");

  elements.acTableContainer.querySelectorAll("[data-ac-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.acToggle);
      if (!target) return;

      target.classList.toggle("is-collapsed");

      const symbol = button.querySelector("span:last-child");
      if (symbol) {
        symbol.textContent = target.classList.contains("is-collapsed") ? "+" : "−";
      }
    });
  });
}

function buildGallery(project) {
  const images = project.images?.length
    ? project.images
    : [{ src: project.cover || project.image || "../ressources/fond.jpg", alt: project.title }];

  return `
    <div class="project-gallery">
      ${images.map((image, index) => `
        <img
          src="${image.src}"
          alt="${escapeHtml(image.alt || project.title)}"
          data-lightbox-src="${image.src}"
          data-lightbox-alt="${escapeHtml(image.alt || project.title)}"
          data-lightbox-index="${index}"
          onerror="this.onerror=null;this.src='../ressources/fond.jpg';"
        >
      `).join("")}
    </div>
  `;
}

function openProject(project) {
  state.currentProject = project;

  const galleryImages = project.images?.length
    ? project.images
    : [{ src: project.cover || project.image || "../ressources/fond.jpg", alt: project.title }];

  const domains = getProjectDomains(project);

  const acList = (project.ac || []).map((code) => `
    <li><strong>${escapeHtml(code)}</strong> — ${escapeHtml(acLabels[code] || "")}</li>
  `).join("");

  elements.modalTitle.textContent = project.title || "Projet";
  elements.modalContent.innerHTML = `
    <div class="project-detail">
      <div class="project-header-meta">
        <span>${escapeHtml(project.year || "")}</span>
        <span>${escapeHtml(inferDate(project))}</span>
      </div>

      <div class="project-domains">
        ${renderDomainChips(domains)}
      </div>

      ${buildGallery(project)}

      <div class="project-rich-block project-rich-block--accent">
        ${project.infoHtml || ""}
      </div>

      <div class="project-rich-block">
        <h3>Apprentissages critiques mobilisés</h3>
        <ul>${acList}</ul>
        ${project.acHtml || ""}
      </div>

      <div class="project-rich-block">
        ${project.evaluationHtml || ""}
      </div>
    </div>
  `;

  elements.modalContent.querySelectorAll("[data-lightbox-src]").forEach((img) => {
    img.addEventListener("click", () => {
      state.lightboxImages = galleryImages;
      state.lightboxIndex = Number(img.dataset.lightboxIndex || 0);
      renderLightbox();
      openLightbox();
    });
  });

  elements.modal.classList.remove("hidden");
  elements.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProject() {
  elements.modal.classList.add("hidden");
  elements.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderLightbox() {
  const current = state.lightboxImages[state.lightboxIndex];
  if (!current) return;

  elements.lightboxImage.src = current.src;
  elements.lightboxImage.alt = current.alt || "";

  const hasMultiple = state.lightboxImages.length > 1;

  elements.lightboxPrev.classList.toggle("hidden", !hasMultiple);
  elements.lightboxNext.classList.toggle("hidden", !hasMultiple);
  elements.lightboxCounter.classList.toggle("hidden", !hasMultiple);

  if (hasMultiple) {
    elements.lightboxCounter.textContent = `${state.lightboxIndex + 1} / ${state.lightboxImages.length}`;
  }
}

function openLightbox() {
  elements.lightbox.classList.remove("hidden");
  elements.lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  elements.lightbox.classList.add("hidden");
  elements.lightbox.setAttribute("aria-hidden", "true");
  elements.lightboxImage.src = "";
  elements.lightboxImage.alt = "";
  state.lightboxImages = [];
  state.lightboxIndex = 0;
}

function prevLightboxImage() {
  if (state.lightboxImages.length < 2) return;
  state.lightboxIndex =
    (state.lightboxIndex - 1 + state.lightboxImages.length) % state.lightboxImages.length;
  renderLightbox();
}

function nextLightboxImage() {
  if (state.lightboxImages.length < 2) return;
  state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxImages.length;
  renderLightbox();
}

function updateStats() {
  const totalProjects = projects.length;
  const acSet = new Set();

  projects.forEach((project) => {
    (project.ac || []).forEach((code) => acSet.add(code));
  });

  elements.statProjects.textContent = String(totalProjects);
  elements.statAc.textContent = String(acSet.size);
}

function runBootAnimation() {
  if (!elements.bootProgressBar) return;
  let value = 0;
  const interval = setInterval(() => {
    value += 20;
    elements.bootProgressBar.style.width = `${Math.min(value, 100)}%`;
    if (value >= 100) clearInterval(interval);
  }, 120);
}

function initBootScreen() {
  runBootAnimation();

  if (!elements.enterSiteBtn) return;

  elements.enterSiteBtn.addEventListener("click", () => {
    elements.bootScreen.classList.add("hidden");
    elements.siteShell.classList.remove("hidden");
  });
}

function initSidebarNavigation() {
  elements.sidebarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section);
    });
  });
}

function initFilters() {
  elements.yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentYear = button.dataset.filterYear;

      elements.yearButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      renderProjects();
      showSection("projects");
    });
  });

  [...elements.categoryButtons, ...elements.shortcutButtons].forEach((button) => {
    button.addEventListener("click", () => {
      state.currentCategory = button.dataset.filterCategory;

      elements.categoryButtons.forEach((item) => {
        item.classList.toggle(
          "is-active",
          item.dataset.filterCategory === state.currentCategory
        );
      });

      renderProjects();
      showSection("projects");
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initModal() {
  elements.closeModal.addEventListener("click", closeProject);

  elements.modal.addEventListener("click", (event) => {
    if (event.target === elements.modal) {
      closeProject();
    }
  });
}

function initLightbox() {
  elements.lightboxClose.addEventListener("click", closeLightbox);
  elements.lightboxPrev.addEventListener("click", prevLightboxImage);
  elements.lightboxNext.addEventListener("click", nextLightboxImage);

  elements.lightbox.addEventListener("click", (event) => {
    if (event.target === elements.lightbox) {
      closeLightbox();
    }
  });
}

function initQuickActions() {
  if (elements.heroProjectsBtn) {
    elements.heroProjectsBtn.addEventListener("click", () => {
      showSection("projects");
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (elements.taskbarHomeBtn) {
    elements.taskbarHomeBtn.addEventListener("click", () => {
      showSection("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!elements.lightbox.classList.contains("hidden")) {
        closeLightbox();
        return;
      }

      if (!elements.modal.classList.contains("hidden")) {
        closeProject();
      }
    }

    if (!elements.lightbox.classList.contains("hidden")) {
      if (event.key === "ArrowLeft") prevLightboxImage();
      if (event.key === "ArrowRight") nextLightboxImage();
    }
  });
}

function init() {
  updateClock();
  setInterval(updateClock, 1000);

  updateStats();
  initBootScreen();
  initSidebarNavigation();
  initFilters();
  initModal();
  initLightbox();
  initQuickActions();
  initKeyboard();

  renderProjects();
  renderAcTable();
  showSection("about");
}

init();