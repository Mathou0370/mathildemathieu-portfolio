const state = {
  currentSection: "about",
  currentYear: "all",
  currentCategory: "all",
  currentProject: null,
  currentImageIndex: 0,
};

const elements = {
  sections: document.querySelectorAll(".content-section"),
  sidebarButtons: document.querySelectorAll(".sidebar__button"),
  yearButtons: document.querySelectorAll("[data-filter-year]"),
  categoryButtons: document.querySelectorAll(".toolbar__button[data-filter-category]"),
  shortcutButtons: document.querySelectorAll(".skill-badge[data-filter-category]"),
  projectsGrid: document.getElementById("projects-grid"),
  acTableContainer: document.getElementById("ac-table-container"),
  statProjects: document.getElementById("stat-projects"),
  statAc: document.getElementById("stat-ac"),
  clock: document.getElementById("clock"),
  modal: document.getElementById("project-modal"),
  modalTitle: document.getElementById("modal-project-title"),
  modalInfo: document.getElementById("modal-info-content"),
  modalAc: document.getElementById("modal-ac-content"),
  modalEvaluation: document.getElementById("modal-evaluation-content"),
  modalCarousel: document.getElementById("modal-carousel"),
  closeModal: document.getElementById("close-modal"),
  modalTabs: document.querySelectorAll(".modal__tab"),
  modalPanels: document.querySelectorAll(".modal__panel"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightbox-image"),
  lightboxClose: document.getElementById("lightbox-close"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateClock() {
  const now = new Date();
  elements.clock.textContent = now.toLocaleTimeString("fr-FR");
}

function showSection(sectionId) {
  state.currentSection = sectionId;

  elements.sections.forEach((section) => {
    section.classList.toggle("is-visible", section.id === sectionId);
  });

  elements.sidebarButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.section === sectionId);
  });

  if (sectionId === "projects") {
    renderProjects();
  }

  if (sectionId === "ac-table") {
    renderAcTable();
  }
}

function getFilteredProjects() {
  return projects.filter((project) => {
    const yearMatch =
      state.currentYear === "all" || project.year === state.currentYear;
    const categoryMatch =
      state.currentCategory === "all" || project.category === state.currentCategory;
    return yearMatch && categoryMatch;
  });
}

function renderProjects() {
  const filtered = getFilteredProjects();

  if (!filtered.length) {
    elements.projectsGrid.innerHTML = `
      <div class="about-box">
        <p>Aucun projet ne correspond à ce filtre.</p>
      </div>
    `;
    return;
  }

  elements.projectsGrid.innerHTML = filtered
    .map((project) => {
      const acBadges = project.ac
        .map((item) => `<span>${escapeHtml(item.code)}</span>`)
        .join("");

      return `
        <article class="project-card">
          <button class="project-card__button" type="button" data-project-id="${project.id}">
            <div class="project-card__media">
              <img src="${project.cover}" alt="${escapeHtml(project.title)}" loading="lazy">
            </div>
            <div class="project-card__body">
              <p class="project-card__year">${escapeHtml(project.yearLabel)}</p>
              <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
              <span class="project-card__category">${escapeHtml(project.category)}</span>
              <p class="project-card__description">${escapeHtml(project.shortDescription)}</p>
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
        const project = projects.find((item) => item.id === button.dataset.projectId);
        if (project) openProject(project);
      });
    });
}

function groupNameFromCategory(category) {
  switch (category) {
    case "Comprendre":
      return "comprendre";
    case "Concevoir":
      return "concevoir";
    case "Exprimer":
      return "exprimer";
    case "Développer":
      return "developper";
    case "Entreprendre":
      return "entreprendre";
    default:
      return "concevoir";
  }
}

function renderAcTable() {
  const rows = [];

  projects.forEach((project) => {
    project.ac.forEach((acItem) => {
      rows.push({
        category: project.category,
        code: acItem.code,
        label: acItem.label,
        project: project.title,
      });
    });
  });

  const uniqueRows = rows.filter(
    (row, index, array) =>
      array.findIndex((item) => item.code === row.code) === index
  );

  uniqueRows.sort((a, b) => a.code.localeCompare(b.code, "fr"));

  elements.acTableContainer.innerHTML = `
    <table class="ac-table">
      <thead>
        <tr>
          <th>Compétence</th>
          <th>Code AC</th>
          <th>Intitulé</th>
          <th>Projet relié</th>
        </tr>
      </thead>
      <tbody>
        ${uniqueRows
          .map(
            (row) => `
              <tr>
                <td>
                  <span class="ac-tag ac-tag--${groupNameFromCategory(row.category)}">
                    ${escapeHtml(row.category)}
                  </span>
                </td>
                <td>${escapeHtml(row.code)}</td>
                <td>${escapeHtml(row.label)}</td>
                <td>✔ ${escapeHtml(row.project)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderCarousel(project) {
  if (!project.images || !project.images.length) {
    elements.modalCarousel.innerHTML = "";
    return;
  }

  const currentImage =
    project.images[state.currentImageIndex] || project.images[0];

  elements.modalCarousel.innerHTML = `
    <div class="carousel__main">
      <img
        src="${currentImage.src}"
        alt="${escapeHtml(currentImage.alt)}"
        id="carousel-main-image"
      >
    </div>
    <div class="carousel__thumbs">
      ${project.images
        .map(
          (image, index) => `
            <button
              type="button"
              class="carousel__thumb ${index === state.currentImageIndex ? "is-active" : ""}"
              data-carousel-index="${index}"
              aria-label="Afficher l'image ${index + 1}"
            >
              <img src="${image.src}" alt="${escapeHtml(image.alt)}">
            </button>
          `
        )
        .join("")}
    </div>
  `;

  const mainImage = document.getElementById("carousel-main-image");
  if (mainImage) {
    mainImage.addEventListener("click", () => openLightbox(currentImage));
  }

  elements.modalCarousel
    .querySelectorAll("[data-carousel-index]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        state.currentImageIndex = Number(button.dataset.carouselIndex);
        renderCarousel(project);
      });
    });
}

function renderProjectInfo(project) {
  const toolsHtml = project.tools.length
    ? `<ul>${project.tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join("")}</ul>`
    : "<p>Aucun outil renseigné.</p>";

  elements.modalInfo.innerHTML = `
    <div class="project-meta">
      <div class="project-meta__grid">
        <div class="project-meta__box">
          <h4>Quoi</h4>
          <p>${escapeHtml(project.meta.quoi)}</p>
        </div>
        <div class="project-meta__box">
          <h4>Où</h4>
          <p>${escapeHtml(project.meta.ou)}</p>
        </div>
        <div class="project-meta__box">
          <h4>Quand</h4>
          <p>${escapeHtml(project.meta.quand)}</p>
        </div>
        <div class="project-meta__box">
          <h4>Qui</h4>
          <p>${escapeHtml(project.meta.qui)}</p>
        </div>
      </div>

      <div class="project-meta__box">
        <h4>Outils</h4>
        ${toolsHtml}
      </div>

      <div class="project-meta__box project-richtext">
        ${project.infoHtml}
      </div>
    </div>
  `;
}

function renderProjectAc(project) {
  elements.modalAc.innerHTML = `
    <div class="project-meta__box project-richtext">
      <h3>Apprentissages critiques mobilisés</h3>
      <ul>
        ${project.ac
          .map(
            (item) => `
              <li>
                <strong>${escapeHtml(item.code)}</strong> | ${escapeHtml(item.label)} :
                ${escapeHtml(item.description)}
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
  `;
}

function renderProjectEvaluation(project) {
  const iaBlock = project.ia
    ? `
      <div class="project-meta__box">
        <h4>Utilisation de l'IA</h4>
        <p>${escapeHtml(project.ia)}</p>
      </div>
    `
    : "";

  const evolutionBlock = project.evolution
    ? `
      <div class="project-meta__box">
        <h4>Évolution</h4>
        <p>${escapeHtml(project.evolution)}</p>
      </div>
    `
    : "";

  elements.modalEvaluation.innerHTML = `
    <div class="project-meta">
      <div class="project-meta__box">
        <h4>Ce que j'ai appris</h4>
        <p>${escapeHtml(project.learned)}</p>
      </div>

      <div class="project-meta__box">
        <h4>Regard critique</h4>
        <p>${escapeHtml(project.critical)}</p>
      </div>

      ${evolutionBlock}
      ${iaBlock}

      <div class="project-meta__box project-richtext">
        ${project.evaluationHtml}
      </div>
    </div>
  `;
}

function openProject(project) {
  state.currentProject = project;
  state.currentImageIndex = 0;

  elements.modalTitle.textContent = project.title;
  renderCarousel(project);
  renderProjectInfo(project);
  renderProjectAc(project);
  renderProjectEvaluation(project);
  switchTab("info");

  elements.modal.classList.remove("hidden");
  elements.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProject() {
  elements.modal.classList.add("hidden");
  elements.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function switchTab(tabName) {
  elements.modalTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === tabName);
  });

  elements.modalPanels.forEach((panel) => {
    panel.classList.toggle("is-visible", panel.id === `tab-${tabName}`);
  });
}

function openLightbox(image) {
  elements.lightboxImage.src = image.src;
  elements.lightboxImage.alt = image.alt;
  elements.lightbox.classList.remove("hidden");
  elements.lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  elements.lightbox.classList.add("hidden");
  elements.lightbox.setAttribute("aria-hidden", "true");
  elements.lightboxImage.src = "";
  elements.lightboxImage.alt = "";
}

function updateStats() {
  const totalProjects = projects.length;
  const acSet = new Set();

  projects.forEach((project) => {
    project.ac.forEach((item) => acSet.add(item.code));
  });

  elements.statProjects.textContent = String(totalProjects);
  elements.statAc.textContent = String(acSet.size);
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

  elements.modalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab);
    });
  });
}

function initLightbox() {
  elements.lightboxClose.addEventListener("click", closeLightbox);

  elements.lightbox.addEventListener("click", (event) => {
    if (event.target === elements.lightbox) {
      closeLightbox();
    }
  });
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
  });
}

function init() {
  updateClock();
  setInterval(updateClock, 1000);

  updateStats();
  initSidebarNavigation();
  initFilters();
  initModal();
  initLightbox();
  initKeyboard();

  renderProjects();
  renderAcTable();
  showSection("about");
}

init();
