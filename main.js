// Image pop-in animation
const animatedWrappers = document.querySelectorAll('.animate-wrapper');
const popInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector('.animate');
    if (!el) return;
    if (entry.isIntersecting) {
      el.classList.add('square-animation');
      return;
    }
    el.classList.remove('square-animation');
  });
});
animatedWrappers.forEach(w => popInObserver.observe(w));

// Slide in left text
const leftBlocks = document.querySelectorAll('.slide-left-animate');
const leftObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector('.slide-left');
    if (!el) return;
    if (entry.isIntersecting) {
      el.classList.add('slide-left-animate');
      return;
    }
    el.classList.toggle('slide-left-animate');
  });
});
leftBlocks.forEach(b => leftObserver.observe(b));

// Slide in right text
const rightBlocks = document.querySelectorAll('.slide-right-animate');
const rightObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector('.slide-right');
    if (!el) return;
    if (entry.isIntersecting) {
      el.classList.add('slide-right-animate');
      return;
    }
    el.classList.toggle('slide-right-animate');
  });
});
rightBlocks.forEach(b => rightObserver.observe(b));

// Smooth scroll for pill links
document.querySelectorAll('.pill-link').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    history.pushState(null, '', id);
  });
});

// Active pill highlighting on scroll
const pills = Array.from(document.querySelectorAll('.pill-link'));
const pillMap = Object.fromEntries(pills.map(p => [p.getAttribute('href'), p]));
const observeIds = [
  '#case-calm',
  '#case-loans',
  '#case-amg',
  '#case-ictsm',
  '#case-baur',
  '#case-zeiss',
  '#case-bbva',
  '#case-bosch',
  '#clients',
  '#contact'
];
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const pill = pillMap[id];
    if (!pill) return;
    if (entry.isIntersecting) {
      pills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
    }
  });
}, { rootMargin: '-50% 0px -45% 0px', threshold: 0 });

observeIds.forEach(id => {
  const el = document.querySelector(id);
  if (el) activeObserver.observe(el);
});

// Collapsible triggers (Show Details / Hide Details)
(function initChevronToggles() {
  document.querySelectorAll('.collapsible-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target') || btn.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      if (!panel) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      const labelEl = btn.querySelector('.Button-label');
      if (labelEl) labelEl.textContent = open ? 'Show Details' : 'Hide Details';
    });
  });
})();