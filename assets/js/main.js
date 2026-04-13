/* ════════════════════════════════════════
   VAPORWAVE PORTFOLIO — main.js
════════════════════════════════════════ */

/* ══════════════════════════════════
   LIGHTBOX
══════════════════════════════════ */
(function initLightbox() {
  const lb          = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lbImg');
  const lbCaption   = document.getElementById('lbCaption');
  const lbCounter   = document.getElementById('lbCounter');
  const lbZoomLevel = document.getElementById('lbZoomLevel');
  const lbViewport  = document.getElementById('lbViewport');
  const lbClose     = document.getElementById('lbClose');
  const lbPrev      = document.getElementById('lbPrev');
  const lbNext      = document.getElementById('lbNext');
  const lbZoomIn    = document.getElementById('lbZoomIn');
  const lbZoomOut   = document.getElementById('lbZoomOut');
  const lbZoomReset = document.getElementById('lbZoomReset');

  /* ── Estado ── */
  let slides      = [];   // array de { src, alt, caption }
  let currentIdx  = 0;
  let scale       = 1;
  let vx          = 0;    // offset visual X em px
  let vy          = 0;    // offset visual Y em px
  const MIN_SCALE = 1;
  const MAX_SCALE = 5;
  const ZOOM_STEP = 0.5;

  /* ── Arrastar ── */
  let dragging      = false;
  let dragStartX    = 0;
  let dragStartY    = 0;
  let dragStartVX   = 0;
  let dragStartVY   = 0;

  /* ── Pinch-to-zoom ── */
  let lastPinchDist = 0;

  /* ─────────────────── helpers ─────────────────── */

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function clampTranslate() {
    if (scale <= 1) { vx = 0; vy = 0; return; }
    const imgW = lbImg.offsetWidth;
    const imgH = lbImg.offsetHeight;
    const vpW  = lbViewport.offsetWidth;
    const vpH  = lbViewport.offsetHeight;
    const maxX = Math.max(0, (imgW * scale - vpW)  / 2);
    const maxY = Math.max(0, (imgH * scale - vpH) / 2);
    vx = clamp(vx, -maxX, maxX);
    vy = clamp(vy, -maxY, maxY);
  }

  function applyTransform(animate = true) {
    if (!animate) lbImg.classList.add('no-anim');
    lbImg.style.transform = `scale(${scale}) translate(${vx / scale}px, ${vy / scale}px)`;
    if (!animate) {
      requestAnimationFrame(() => requestAnimationFrame(() => lbImg.classList.remove('no-anim')));
    }
    lbZoomLevel.textContent = Math.round(scale * 100) + '%';
    lbViewport.classList.toggle('is-zoomed', scale > 1);
  }

  function resetTransform(animate = true) {
    scale = 1; vx = 0; vy = 0;
    applyTransform(animate);
  }

  /* ─────────────────── open / close ─────────────────── */

  function open(idx, sourceSlides) {
    slides = sourceSlides;
    currentIdx = idx;
    showSlide(currentIdx, false);
    lb.classList.add('open');
  }

  function close() {
    lb.classList.remove('open');
    /* Limpa src após transição */
    setTimeout(() => { lbImg.src = ''; lbImg.alt = ''; }, 260);
    resetTransform(false);
  }

  function showSlide(idx, animate = true) {
    const s = slides[idx];
    lbImg.src     = s.src;
    lbImg.alt     = s.alt;
    lbCaption.textContent = s.caption;
    lbCounter.textContent = `${idx + 1} / ${slides.length}`;
    resetTransform(animate);
  }

  function prev() {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    showSlide(currentIdx);
  }

  function next() {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
  }

  /* ─────────────────── zoom ─────────────────── */

  function zoomBy(delta, originX = 0, originY = 0) {
    const newScale = clamp(scale + delta, MIN_SCALE, MAX_SCALE);
    if (newScale === scale) return;
    const ratio = newScale / scale;
    vx = originX - ratio * (originX - vx);
    vy = originY - ratio * (originY - vy);
    scale = newScale;
    clampTranslate();
    applyTransform(false);
  }

  function zoomAtViewportCenter(delta) {
    zoomBy(delta, 0, 0);  /* origem = centro do viewport */
  }

  /* ─────────────────── eventos botões ─────────────────── */

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  (e) => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click',  (e) => { e.stopPropagation(); next(); });

  lbZoomIn.addEventListener('click',  (e) => { e.stopPropagation(); zoomAtViewportCenter(+ZOOM_STEP); });
  lbZoomOut.addEventListener('click', (e) => { e.stopPropagation(); zoomAtViewportCenter(-ZOOM_STEP); });
  lbZoomReset.addEventListener('click', (e) => { e.stopPropagation(); resetTransform(); });

  /* Clica no fundo (não na imagem) fecha */
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target === lbViewport) close();
  });

  /* ─────────────────── scroll wheel → zoom ─────────────────── */

  lbViewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect    = lbViewport.getBoundingClientRect();
    const originX = e.clientX - rect.left - rect.width  / 2;
    const originY = e.clientY - rect.top  - rect.height / 2;
    const delta   = e.deltaY < 0 ? +0.2 : -0.2;
    zoomBy(delta, originX, originY);
  }, { passive: false });

  /* ─────────────────── arrastar (mouse) ─────────────────── */

  lbViewport.addEventListener('mousedown', (e) => {
    if (scale <= 1 || e.button !== 0) return;
    e.preventDefault();
    dragging = true;
    dragStartX  = e.clientX;
    dragStartY  = e.clientY;
    dragStartVX = vx;
    dragStartVY = vy;
    lbViewport.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    vx = dragStartVX + (e.clientX - dragStartX);
    vy = dragStartVY + (e.clientY - dragStartY);
    clampTranslate();
    applyTransform(false);
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    lbViewport.classList.remove('is-dragging');
  });

  /* ─────────────────── touch: pinch-zoom + arrastar ─────────────────── */

  lbViewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      lastPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1 && scale > 1) {
      dragging    = true;
      dragStartX  = e.touches[0].clientX;
      dragStartY  = e.touches[0].clientY;
      dragStartVX = vx;
      dragStartVY = vy;
    }
  }, { passive: true });

  lbViewport.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const rect  = lbViewport.getBoundingClientRect();
      const midX  = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left - rect.width  / 2;
      const midY  = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top  - rect.height / 2;
      zoomBy((dist - lastPinchDist) * 0.01, midX, midY);
      lastPinchDist = dist;
    } else if (e.touches.length === 1 && dragging) {
      e.preventDefault();
      vx = dragStartVX + (e.touches[0].clientX - dragStartX);
      vy = dragStartVY + (e.touches[0].clientY - dragStartY);
      clampTranslate();
      applyTransform(false);
    }
  }, { passive: false });

  lbViewport.addEventListener('touchend', () => { dragging = false; });

  /* ─────────────────── teclado ─────────────────── */

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    switch (e.key) {
      case 'Escape':      close(); break;
      case 'ArrowLeft':   prev();  break;
      case 'ArrowRight':  next();  break;
      case '+': case '=': zoomAtViewportCenter(+ZOOM_STEP); break;
      case '-':           zoomAtViewportCenter(-ZOOM_STEP); break;
      case '0':           resetTransform(); break;
    }
    /* Impede navegação das seções enquanto lightbox está aberto */
    e.stopPropagation();
  });

  /* ─────────────────── expõe o método open ─────────────────── */

  window.openLightbox = open;
})();


/* ══════════════════════════════════
   CARROSSEL
══════════════════════════════════ */
function initCarousel(carouselId, autoPlayMs = 4000) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const track   = carousel.querySelector('.carousel__track');
  const slides  = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const dotsEl  = carousel.querySelector('.carousel__dots');
  const btnPrev = carousel.querySelector('.carousel__btn--prev');
  const btnNext = carousel.querySelector('.carousel__btn--next');

  let current = 0;
  let timer   = null;

  /* Monta dots */
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', (e) => { e.stopPropagation(); resetTimer(); goTo(i); });
    dotsEl.appendChild(d);
  });

  const allDots = Array.from(dotsEl.querySelectorAll('.carousel__dot'));

  /* Dados dos slides para o lightbox */
  const lbSlides = slides.map(slide => ({
    src:     slide.querySelector('img').src,
    alt:     slide.querySelector('img').alt,
    caption: slide.querySelector('.carousel__caption')?.textContent || '',
  }));

  /* Clique no slide → abre lightbox */
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      window.openLightbox(i, lbSlides);
    });
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    allDots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, autoPlayMs);
  }

  btnNext.addEventListener('click', (e) => { e.stopPropagation(); resetTimer(); next(); });
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); resetTimer(); prev(); });

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => resetTimer());

  /* Swipe mobile no carrossel */
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { resetTimer(); diff > 0 ? next() : prev(); }
  }, { passive: true });

  resetTimer();
}

initCarousel('carousel-orbis');
initCarousel('carousel-booking');

/* ══════════════════════════════════
   CARROSSEL DE PROJETOS (peek)
══════════════════════════════════ */
(function initProjectsSlider() {
  const slider  = document.getElementById('projSlider');
  const track   = document.getElementById('projTrack');
  const slides  = Array.from(track.querySelectorAll('.proj-slide'));
  const btnPrev = document.getElementById('projPrev');
  const btnNext = document.getElementById('projNext');
  const counter = document.getElementById('projCounter');
  const total   = slides.length;
  const GAP     = 16;
  let current   = 0;

  /* Calcula o translateX para centralizar o slide ativo */
  function getOffset(idx) {
    const slideW  = slides[0].offsetWidth;
    const sliderW = slider.offsetWidth;
    const center  = (sliderW - slideW) / 2;   /* margem para centralizar */
    return center - idx * (slideW + GAP);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(total - 1, idx));

    track.style.transform = `translateX(${getOffset(current)}px)`;
    counter.textContent   = `${current + 1} / ${total}`;

    slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    updateButtons();
  }

  function updateButtons() {
    btnPrev.classList.toggle('visible', current > 0);
    btnNext.classList.toggle('visible', current < total - 1);
  }

  /* Recalcula ao redimensionar (offsetWidth muda) */
  window.addEventListener('resize', () => goTo(current));

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  /* Swipe mobile */
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend',   (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  /* Inicializa */
  goTo(0);
})();


/* ══════════════════════════════════
   SCROLL-SNAP + DOT NAV
══════════════════════════════════ */
const container = document.getElementById('snapContainer');
const sections  = Array.from(document.querySelectorAll('.snap-section'));
const dots      = Array.from(document.querySelectorAll('.dot-nav__dot'));

let currentIndex = 0;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  currentIndex = index;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  updateDots(index);
}

window.scrollToSection = scrollToSection;

function updateDots(index) {
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => scrollToSection(parseInt(dot.dataset.target, 10)));
});

/* Teclado — só age se o lightbox não estiver aberto */
document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    scrollToSection(Math.min(currentIndex + 1, sections.length - 1));
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    scrollToSection(Math.max(currentIndex - 1, 0));
  }
});

/* IntersectionObserver — seção ativa */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        currentIndex = index;
        updateDots(index);
      }
    });
  },
  { root: container, threshold: 0.5 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* IntersectionObserver — reveal cards */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { root: container, threshold: 0.25 }
);

sections.forEach((s) => cardObserver.observe(s));

/* ══════════════════════════════════
   INFO POPUP
══════════════════════════════════ */
(function initInfoPopup() {
  const popup = document.getElementById('infoPopup');
  if (!popup) return;

  let activeBtn = null;

  function closePopup() {
    popup.classList.remove('is-open');
    if (activeBtn) {
      activeBtn.setAttribute('aria-expanded', 'false');
      activeBtn = null;
    }
  }

  function openPopup(btn) {
    const text = btn.dataset.info || '';
    popup.textContent = text;

    // Render off-screen to measure height
    popup.style.left = '-9999px';
    popup.style.top = '-9999px';
    popup.classList.add('is-open');

    const rect = btn.getBoundingClientRect();
    const popupW = popup.offsetWidth;
    const popupH = popup.offsetHeight;

    // Center horizontally over button, clamped to viewport
    let left = rect.left + rect.width / 2 - popupW / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - popupW - 8));

    // Place above button
    const top = rect.top - popupH - 12;

    popup.style.left = left + 'px';
    popup.style.top = top + 'px';

    // Arrow points to center of button
    const arrowLeft = (rect.left + rect.width / 2) - left;
    popup.style.setProperty('--arrow-left', arrowLeft + 'px');

    btn.setAttribute('aria-expanded', 'true');
    activeBtn = btn;
  }

  document.querySelectorAll('.info-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeBtn === btn) {
        closePopup();
      } else {
        closePopup();
        openPopup(btn);
      }
    });
  });

  document.addEventListener('click', closePopup);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
})();
