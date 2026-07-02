/* =====================================================
   TRAIGAMOS EL COLOR DE VUELTA — JS Principal
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar scroll ── */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ── Language toggle ── */
  const langBtn = document.getElementById('langBtn');
  const body    = document.body;
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const isEn = body.classList.toggle('lang-en');
      langBtn.textContent = isEn ? 'ES' : 'EN';
      langBtn.setAttribute('aria-pressed', String(isEn));
    });
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Lightbox ── */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lbImg');
  const lbCaption   = document.getElementById('lbCaption');
  const lbClose     = document.getElementById('lbClose');
  const lbPrev      = document.getElementById('lbPrev');
  const lbNext      = document.getElementById('lbNext');
  const photoItems  = [...document.querySelectorAll('.mosaic-item')];

  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    const item = photoItems[idx];
    lbImg.src      = item.querySelector('img').src;
    lbImg.alt      = item.querySelector('img').alt;
    lbCaption.textContent = item.querySelector('.photo-caption')?.textContent || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbImg.classList.add('entering');
    setTimeout(() => lbImg.classList.remove('entering'), 300);
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function stepLightbox(dir) {
    currentIdx = (currentIdx + dir + photoItems.length) % photoItems.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      openLightbox(currentIdx);
      lbImg.style.opacity = '1';
    }, 150);
  }

  photoItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
  });

  if (lbClose)  lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)   lbPrev.addEventListener('click', () => stepLightbox(-1));
  if (lbNext)   lbNext.addEventListener('click', () => stepLightbox(1));

  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape')    closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchs = document.querySelectorAll('.nav-links a[href^="#"]');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchs.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

});
