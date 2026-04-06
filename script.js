(function () {
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  const navToggle = document.getElementById('navToggle');
  const navRight = document.getElementById('navRight');
  const backToTopBtn = document.getElementById('backToTop');
  const themeToggleBtn = document.getElementById('themeToggle');
  const sections = document.querySelectorAll('main section[id]');

  /* ── SMOOTH SCROLL ── */
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      if (navRight) navRight.classList.remove('open');
    });
  });

  /* ── ACTIVE NAV LINK ── */
  function setActiveLink() {
    const scrollPos = window.scrollY;
    let currentId = null;
    sections.forEach((s) => { if (scrollPos >= s.offsetTop - 110) currentId = s.id; });
    navLinks.forEach((l) => l.classList.toggle('active-link', l.getAttribute('href').slice(1) === currentId));
  }

  /* ── BACK TO TOP ── */
  function toggleBackToTop() {
    if (backToTopBtn) backToTopBtn.classList.toggle('show', window.scrollY > 300);
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── MOBILE NAV ── */
  if (navToggle && navRight) {
    navToggle.addEventListener('click', () => navRight.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!navRight.contains(e.target) && !navToggle.contains(e.target)) {
        navRight.classList.remove('open');
      }
    });
  }

  /* ── THEME TOGGLE ── */
  if (themeToggleBtn) {
    const applyTheme = (isLight) => {
      document.body.classList.toggle('light-theme', isLight);
      themeToggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      themeToggleBtn.innerHTML = isLight ? '&#9728;' : '&#9790;';
    };
    applyTheme(false);
    themeToggleBtn.addEventListener('click', () => applyTheme(!document.body.classList.contains('light-theme')));
  }

  /* ── LIGHTBOX FOR PROJECT IMAGES ── */
  const imgs = document.querySelectorAll('.project-img');
  if (imgs.length) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:100;background:rgba(0,0,0,0.88);align-items:center;justify-content:center;cursor:zoom-out;';
    const bigImg = document.createElement('img');
    bigImg.style.cssText = 'max-width:90vw;max-height:88vh;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,0.6);';
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);

    imgs.forEach((img) => {
      img.addEventListener('click', () => {
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  /* ── INIT ── */
  setActiveLink();
  toggleBackToTop();
})();
