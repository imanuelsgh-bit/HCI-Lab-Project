
document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     0. INJECT THE STYLES THIS SCRIPT NEEDS
     ========================================================= */
  const style = document.createElement("style");
  style.textContent = `
    .slideshow.js-on .slide { animation: none; opacity: 0; transition: opacity 0.8s ease; }
    .slideshow.js-on .slide.active { opacity: 1; }
    .slide-btn {
      position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
      background: rgba(20,20,20,0.6); color: #fff; border: none;
      width: 2.4em; height: 2.4em; border-radius: 50%; cursor: pointer;
      font-size: 1em; transition: background 0.3s;
    }
    .slide-btn:hover { background: #FF8000; color: #141414; }
    .slide-btn.prev { left: 0.6em; }
    .slide-btn.next { right: 0.6em; }
    .slide-dots {
      position: absolute; bottom: 0.7em; left: 0; right: 0; z-index: 2;
      display: flex; justify-content: center; gap: 0.5em;
    }
    .slide-dot {
      width: 0.8em; height: 0.8em; border-radius: 50%; border: none; cursor: pointer;
      background: rgba(255,255,255,0.5); transition: all 0.3s;
    }
    .slide-dot.active { background: #FF8000; transform: scale(1.25); }
 
    .filter-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.7em; margin-bottom: 2em; }
    .filter-btn {
      background: white; color: #141414; border: 2px solid #141414; border-radius: 2em;
      padding: 0.4em 1.3em; font-weight: bold; cursor: pointer; font-family: inherit;
      transition: all 0.3s;
    }
    .filter-btn:hover, .filter-btn.active { background: #FF8000; border-color: #FF8000; }
 
    .nav-links a.active { color: #FF8000; }
 
    /* Back-to-top button */
    .to-top {
      position: fixed; right: 1.5em; bottom: 1.5em; z-index: 90;
      width: 3em; height: 3em; border-radius: 50%; border: none; cursor: pointer;
      background: #FF8000; color: #141414; font-size: 1.2em; font-weight: bold;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      opacity: 0; visibility: hidden; transform: translateY(15px);
      transition: opacity 0.3s, transform 0.3s, visibility 0.3s, background 0.3s;
    }
    .to-top.show { opacity: 1; visibility: visible; transform: none; }
    .to-top:hover { background: #47C7FC; transform: translateY(-3px); }
 
    /* Language switcher */
    .lang-switch { display: flex; gap: 0.4em; }
    .lang-btn {
      background: transparent; color: white; border: 2px solid white; border-radius: 2em;
      padding: 0.2em 0.8em; font-weight: bold; font-size: 0.85em; cursor: pointer;
      font-family: inherit; transition: all 0.3s;
    }
    .lang-btn:hover { border-color: #FF8000; color: #FF8000; }
    .lang-btn.active { background: #FF8000; border-color: #FF8000; color: #141414; }
 
    .toast {
      position: fixed; bottom: 2em; left: 50%; transform: translate(-50%, 20px);
      background: #141414; color: white; padding: 0.8em 1.6em; border-radius: 2em;
      border-bottom: 3px solid #47C7FC; opacity: 0; transition: all 0.3s; z-index: 100;
    }
    .toast.show { opacity: 1; transform: translate(-50%, 0); }
 
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);
 
  /* =========================================================
     1. TRANSLATIONS (add a new language by adding a new block)
     ========================================================= */
  const I18N = {
    en: {
      title: "Svitlo Imanuel Robert Saragih's Portfolio",
      metaDesc: "Hi, this is Svitlo's Portfolio. I am a computer science student at Binus International University.",
      navAbout: "About",
      navProjects: "Projects",
      navSkills: "Skills",
      navContact: "Contact",
      heroTitle: "Welcome to my website!",
      tagline: "Scroll down to see more details",
      heroBtn: "My Works",
      aboutTitle: "About Me",
      aboutP1: "Hi, I'm Svitlo Imanuel Robert Saragih. I'm a computer science student at Binus International University.",
      aboutP2: "The purpose of this portfolio is to showcase my skills and projects as an aspiring software developer.",
      aboutP3: "I design this website based on the colour scheme of Mclaren as I like Mclaren Cars. Feel free to explore.",
      avatarAlt: "Photo of Svitlo",
      projectsTitle: "Projects",
      filterAll: "All",
      piTitle: "Raspberry Pi Project",
      piDesc: "A simple automation system built with a Raspberry Pi.",
      piAlt: "Raspberry Pi Project",
      pyTitle: "Python Game",
      pyDesc: "A game I built in Python.",
      pyTag: "CLI Phone Game, executable through terminal",
      pyAlt: "Python game",
      pyLink: "Play the game",
      webTitle: "Web Development Project",
      webDesc: "A web project showcasing HTML and CSS.",
      webAlt: "Web Development Project",
      skillsTitle: "Skills",
      contactTitle: "Contact",
      footer: "\u00A9 2026 Svitlo Imanuel Robert Saragih",
      skillTip: "Filter projects by {skill}",
      noProjects: "No projects tagged with {skill} yet!",
      copied: "Copied {email} to clipboard!",
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
      goToSlide: "Go to slide {n}",
      backToTop: "Back to top"
    },
    id: {
      title: "Portofolio Svitlo Imanuel Robert Saragih",
      metaDesc: "Halo, ini portofolio Svitlo. Saya mahasiswa ilmu komputer di Binus International University.",
      navAbout: "Tentang",
      navProjects: "Proyek",
      navSkills: "Keahlian",
      navContact: "Kontak",
      heroTitle: "Selamat datang di website saya!",
      tagline: "Gulir ke bawah untuk melihat detail lainnya",
      heroBtn: "Karya Saya",
      aboutTitle: "Tentang Saya",
      aboutP1: "Halo, saya Svitlo Imanuel Robert Saragih. Saya mahasiswa ilmu komputer di Binus International University.",
      aboutP2: "Tujuan portofolio ini adalah menampilkan keahlian dan proyek saya sebagai calon pengembang perangkat lunak.",
      aboutP3: "Saya mendesain website ini berdasarkan skema warna McLaren karena saya menyukai mobil McLaren. Silakan menjelajah.",
      avatarAlt: "Foto Svitlo",
      projectsTitle: "Proyek",
      filterAll: "Semua",
      piTitle: "Proyek Raspberry Pi",
      piDesc: "Sistem otomasi sederhana yang dibuat dengan Raspberry Pi.",
      piAlt: "Proyek Raspberry Pi",
      pyTitle: "Game Python",
      pyDesc: "Game yang saya buat dengan Python.",
      pyTag: "Game HP berbasis CLI, dijalankan lewat terminal",
      pyAlt: "Game Python",
      pyLink: "Mainkan game",
      webTitle: "Proyek Pengembangan Web",
      webDesc: "Proyek web yang menampilkan HTML dan CSS.",
      webAlt: "Proyek Pengembangan Web",
      skillsTitle: "Keahlian",
      contactTitle: "Kontak",
      footer: "\u00A9 2026 Svitlo Imanuel Robert Saragih",
      skillTip: "Filter proyek berdasarkan {skill}",
      noProjects: "Belum ada proyek dengan tag {skill}!",
      copied: "{email} disalin ke papan klip!",
      prevSlide: "Slide sebelumnya",
      nextSlide: "Slide berikutnya",
      goToSlide: "Ke slide {n}",
      backToTop: "Kembali ke atas"
    }
  };
 
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "portfolio-lang";
  let currentLang = DEFAULT_LANG;
 
  // t("key", {name: value}) -> translated string with {placeholders} filled in
  function t(key, vars = {}) {
    const dict = I18N[currentLang] || I18N[DEFAULT_LANG];
    let text = dict[key] ?? I18N[DEFAULT_LANG][key] ?? key;
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    return text;
  }
 
  // Saved choice first, then the browser's language, then English
  function detectLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && I18N[saved]) return saved;
    } catch (e) { /* storage blocked: ignore */ }
 
    const prefs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || DEFAULT_LANG];
    for (const pref of prefs) {
      const code = pref.toLowerCase().split("-")[0];
      if (I18N[code]) return code;
    }
    return DEFAULT_LANG;
  }
 
  /* =========================================================
     2. TOAST
     ========================================================= */
  function showToast(message) {
    const old = document.querySelector(".toast");
    if (old) old.remove();
 
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);
 
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
 
  /* =========================================================
     3. HERO SLIDESHOW
     ========================================================= */
  const slideshow = document.querySelector(".slideshow");
  const slides = document.querySelectorAll(".slide");
  let prevBtn, nextBtn, dots = [];
 
  if (slideshow && slides.length > 0) {
    slideshow.classList.add("js-on");
    let current = 0;
    let timer;
 
    prevBtn = document.createElement("button");
    prevBtn.className = "slide-btn prev";
    prevBtn.innerHTML = "&#10094;";
 
    nextBtn = document.createElement("button");
    nextBtn.className = "slide-btn next";
    nextBtn.innerHTML = "&#10095;";
 
    const dotsWrap = document.createElement("div");
    dotsWrap.className = "slide-dots";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slide-dot";
      dot.addEventListener("click", () => { show(i); restart(); });
      dotsWrap.appendChild(dot);
    });
 
    slideshow.append(prevBtn, nextBtn, dotsWrap);
    dots = Array.from(dotsWrap.querySelectorAll(".slide-dot"));
 
    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
      dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    }
    function start() { timer = setInterval(() => show(current + 1), 4000); }
    function restart() { clearInterval(timer); start(); }
 
    prevBtn.addEventListener("click", () => { show(current - 1); restart(); });
    nextBtn.addEventListener("click", () => { show(current + 1); restart(); });
    slideshow.addEventListener("mouseenter", () => clearInterval(timer));
    slideshow.addEventListener("mouseleave", () => { clearInterval(timer); start(); });
 
    show(0);
    start();
  }
 
  /* =========================================================
     4. PROJECT FILTERING + CLICKABLE SKILL PILLS
     ========================================================= */
  const projectsSection = document.querySelector("#projects");
  const cardsContainer = document.querySelector(".cards");
  const cards = document.querySelectorAll(".card");
  const skillItems = document.querySelectorAll(".skills li");
  let filterButtons = [];
 
  if (projectsSection && cardsContainer && cards.length > 0) {
    // Category names are internal keys, so they never change with the language
    const categories = ["All", "Python", "Raspberry Pi", "HTML/CSS"];
 
    // Remember each card's tags in English BEFORE any translation happens
    cards.forEach((card) => {
      const tags = Array.from(card.querySelectorAll(".tags li")).map((li) =>
        li.textContent.trim().toLowerCase()
      );
      card.dataset.tags = JSON.stringify(tags);
    });
 
    const filterBar = document.createElement("div");
    filterBar.className = "filter-bar";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (cat === "All" ? " active" : "");
      btn.dataset.category = cat;
      btn.textContent = cat === "All" ? t("filterAll") : cat;
      btn.addEventListener("click", () => filterProjects(cat));
      filterBar.appendChild(btn);
    });
    projectsSection.insertBefore(filterBar, cardsContainer);
    filterButtons = Array.from(filterBar.querySelectorAll(".filter-btn"));
 
    function filterProjects(category) {
      filterButtons.forEach((b) =>
        b.classList.toggle("active", b.dataset.category === category)
      );
      const wanted = category.toLowerCase().split("/");
 
      cards.forEach((card) => {
        const tags = JSON.parse(card.dataset.tags || "[]");
        const match = category === "All" || wanted.some((w) => tags.includes(w));
        card.style.display = match ? "" : "none";
      });
    }
 
    skillItems.forEach((skill) => {
      const name = skill.textContent.trim();
      skill.style.cursor = "pointer";
      skill.addEventListener("click", () => {
        const category = categories.find((c) => c.toLowerCase() === name.toLowerCase());
        if (category) {
          filterProjects(category);
          projectsSection.scrollIntoView({ behavior: "smooth" });
        } else {
          showToast(t("noProjects", { skill: name }));
        }
      });
    });
  }
 
  /* =========================================================
     5. ACTIVE NAV LINK (SCROLLSPY)
     ========================================================= */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
 
  function updateNav() {
    let currentId = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 140) currentId = section.id;
    });
    navLinks.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`)
    );
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
 
  /* =========================================================
     6. COPY EMAIL ON CLICK
     ========================================================= */
  const emailLink = document.querySelector('.contact-list a[href^="mailto:"]');
  if (emailLink && navigator.clipboard) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailLink.getAttribute("href").replace("mailto:", "");
      navigator.clipboard
        .writeText(email)
        .then(() => showToast(t("copied", { email })))
        .catch(() => { window.location.href = emailLink.href; });
    });
  }
 
  /* =========================================================
     7. SCROLL-REVEAL
     ========================================================= */
  const revealEls = document.querySelectorAll(".about, .card, .skills li");
  revealEls.forEach((el) => el.classList.add("reveal"));
 
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }
 
  /* =========================================================
     7a. "sir.s" LOGO LINK (YouTube)
     ========================================================= */
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.href = "https://youtu.be/hB7CDrVnNCs?si=xzHaG-XXfUpZ1bIE";
    logo.target = "_blank";
    logo.rel = "noopener";
  }
 
  /* =========================================================
     7b. BACK-TO-TOP BUTTON
     ========================================================= */
  const topBtn = document.createElement("button");
  topBtn.className = "to-top";
  topBtn.innerHTML = "&#8593;";
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(topBtn);
 
  function updateTopBtn() {
    // Appears once the visitor has scrolled down about 400px
    topBtn.classList.toggle("show", window.scrollY > 400);
  }
  window.addEventListener("scroll", updateTopBtn, { passive: true });
  updateTopBtn();
 
  /* =========================================================
     8. LANGUAGE SWITCHING
     ========================================================= */
  // Every translatable element: [element, translation key, attribute (omit for text)]
  const q = (sel, i = 0) => document.querySelectorAll(sel)[i];
  const bindings = [
    [q('.nav-links a[href="#about"]'), "navAbout"],
    [q('.nav-links a[href="#projects"]'), "navProjects"],
    [q('.nav-links a[href="#skills"]'), "navSkills"],
    [q('.nav-links a[href="#contact"]'), "navContact"],
    [q(".hero-content h1"), "heroTitle"],
    [q(".tagline"), "tagline"],
    [q(".hero-content .btn"), "heroBtn"],
    [q("#about h2"), "aboutTitle"],
    [q(".avatar"), "avatarAlt", "alt"],
    [q(".about-text p", 0), "aboutP1"],
    [q(".about-text p", 1), "aboutP2"],
    [q(".about-text p", 2), "aboutP3"],
    [q("#projects h2"), "projectsTitle"],
    [q(".card", 0)?.querySelector("h3"), "piTitle"],
    [q(".card", 0)?.querySelector("p"), "piDesc"],
    [q(".card", 0)?.querySelector("img"), "piAlt", "alt"],
    [q(".card", 1)?.querySelector("h3"), "pyTitle"],
    [q(".card", 1)?.querySelector("p"), "pyDesc"],
    [q(".card", 1)?.querySelector("img"), "pyAlt", "alt"],
    [q(".card", 1)?.querySelectorAll(".tags li")[1], "pyTag"],
    [q(".card", 1)?.querySelector(".project-link"), "pyLink"],
    [q(".card", 2)?.querySelector("h3"), "webTitle"],
    [q(".card", 2)?.querySelector("p"), "webDesc"],
    [q(".card", 2)?.querySelector("img"), "webAlt", "alt"],
    [q("#skills h2"), "skillsTitle"],
    [q("#contact h2"), "contactTitle"],
    [q(".footer p"), "footer"]
  ].filter(([el]) => el); // skip anything missing from the page
 
  // Language switcher buttons, added to the nav bar
  const langSwitch = document.createElement("div");
  langSwitch.className = "lang-switch";
  langSwitch.setAttribute("role", "group");
  langSwitch.setAttribute("aria-label", "Language");
 
  Object.keys(I18N).forEach((code) => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.dataset.lang = code;
    btn.textContent = code.toUpperCase();
    btn.addEventListener("click", () => setLanguage(code));
    langSwitch.appendChild(btn);
  });
 
  const nav = document.querySelector(".nav");
  if (nav) nav.appendChild(langSwitch);
 
  function setLanguage(lang) {
    if (!I18N[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
 
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
 
    document.documentElement.lang = lang;
    document.title = t("title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("metaDesc"));
 
    bindings.forEach(([el, key, attr]) => {
      if (attr) el.setAttribute(attr, t(key));
      else el.textContent = t(key);
    });
 
    // Elements created by this script
    filterButtons.forEach((btn) => {
      if (btn.dataset.category === "All") btn.textContent = t("filterAll");
    });
    skillItems.forEach((skill) => {
      skill.title = t("skillTip", { skill: skill.textContent.trim() });
    });
    if (prevBtn) prevBtn.setAttribute("aria-label", t("prevSlide"));
    if (nextBtn) nextBtn.setAttribute("aria-label", t("nextSlide"));
    topBtn.setAttribute("aria-label", t("backToTop"));
    topBtn.title = t("backToTop");
    dots.forEach((dot, i) => dot.setAttribute("aria-label", t("goToSlide", { n: i + 1 })));
 
    langSwitch.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }
 
  setLanguage(detectLanguage());
});
 
