/* ════════════════════════════════════════
   VAPORWAVE PORTFOLIO — main.js
════════════════════════════════════════ */

const container  = document.getElementById('snapContainer');
const sections   = Array.from(document.querySelectorAll('.snap-section'));
const dots       = Array.from(document.querySelectorAll('.dot-nav__dot'));

let currentIndex = 0;
let isScrolling  = false;

/* ─── Scroll to section by index ─── */
function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  currentIndex = index;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  updateDots(index);
}

window.scrollToSection = scrollToSection;

/* ─── Update active dot ─── */
function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

/* ─── Dot click navigation ─── */
dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const target = parseInt(dot.dataset.target, 10);
    scrollToSection(target);
  });
});

/* ─── Keyboard navigation ─── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    scrollToSection(Math.min(currentIndex + 1, sections.length - 1));
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    scrollToSection(Math.max(currentIndex - 1, 0));
  }
});

/* ─── Intersection Observer: track active section + reveal cards ─── */
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

sections.forEach((section) => sectionObserver.observe(section));

/* ─── Intersection Observer: fade-in reveal cards ─── */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.reveal-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { root: container, threshold: 0.25 }
);

sections.forEach((section) => cardObserver.observe(section));
