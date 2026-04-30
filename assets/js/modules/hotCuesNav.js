import { qs, qsa } from "../core/dom.js";
import { state } from "../core/state.js";
import { impact } from "../core/impact.js";

export function initHotCuesNav() {
  const nav = qs('#hotCuesNav');
  const toggle = qs('#menuToggle');
  const progressBar = qs('#setProgressBar');
  if (!nav || !toggle) return;

  const links = qsa('a[href^="#"]', nav);
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const setOpen = (open) => {
    state.isMenuOpen = open;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  const updateProgress = () => {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.transform = `scaleX(${(progress / 100).toFixed(4)})`;
  };

  toggle.addEventListener('click', () => {
    impact(toggle);
    setOpen(!nav.classList.contains('is-open'));
  });

  links.forEach((link, idx) => {
    link.style.setProperty('--cue-delay', `${idx * 60}ms`);
    link.style.transitionDelay = `${idx * 60}ms`;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.getAttribute('href');
      const target = id ? document.querySelector(id) : null;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      impact(link);
      setOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      state.activeSection = entry.target.id;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${state.activeSection}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

  sections.forEach((section) => observer.observe(section));
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
