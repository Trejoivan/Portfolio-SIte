const yearEl = document.querySelector(".year");
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const sectionHeroEl = document.querySelector(".section-hero");
const allLinks = document.querySelectorAll("a[href]");
const filterButtons = document.querySelectorAll(".filter-btn");
const filterableItems = document.querySelectorAll("[data-category]");
const impactCards = document.querySelectorAll(".impact-card");
const impactButtons = document.querySelectorAll("[data-impact]");
const impactTitleEl = document.querySelector("#impact-detail-title");
const impactCopyEl = document.querySelector("#impact-detail-copy");

const impactDetails = {
  clients: {
    title: "Client-scale product ownership",
    copy:
      "Owns the product lifecycle for data reporting and claims processing systems serving 690+ client companies, from ideation and requirements through execution, release, and iteration.",
  },
  funding: {
    title: "Portfolio-level solution management",
    copy:
      "Operates as Solution Manager for multi-domain, multi-system initiatives, authoring solution documentation, SOPs, and stakeholder presentations for a portfolio collection valued over $8M in allocated technical funding.",
  },
  efficiency: {
    title: "Operational efficiency through better systems",
    copy:
      "Helped deliver measurable business outcomes, including reducing resource utilization by 80% and improving team throughput through structured workflows and clearer prioritization.",
  },
  ai: {
    title: "AI-assisted product and engineering workflows",
    copy:
      "Pioneered AI adoption within the PM organization by customizing BMAD, Claude, GPT, and Cursor workflows for product planning, documentation synthesis, and engineering execution.",
  },
  marines: {
    title: "Leadership under operational pressure",
    copy:
      "Coordinated safety procedures and quality-controlled training for 64,800 Marines through the Martial Arts Instructor course, while also managing logistics and database responsibilities during active duty.",
  },
};

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (btnNav && header) {
  btnNav.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });
}

allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || (!href.startsWith("#") && href !== "#")) return;

    event.preventDefault();

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (href !== "#") {
      const sectionEl = document.querySelector(href);
      if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("main-nav-link") && header) {
      header.classList.remove("nav-open");
    }
  });
});

if (sectionHeroEl) {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      document.body.classList.toggle("sticky", !entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-88px",
    }
  );

  observer.observe(sectionHeroEl);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });

    filterableItems.forEach((item) => {
      const categories = item.dataset.category?.split(" ") || [];
      const shouldHighlight =
        activeFilter === "all" || categories.includes(activeFilter);

      item.classList.toggle("is-dimmed", !shouldHighlight);
    });
  });
});

impactButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const detail = impactDetails[button.dataset.impact];
    if (!detail || !impactTitleEl || !impactCopyEl) return;

    impactCards.forEach((card) => {
      card.classList.toggle("active", card.contains(button));
    });

    impactTitleEl.textContent = detail.title;
    impactCopyEl.textContent = detail.copy;
  });
});

function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flex-gap");
}

checkFlexGap();
