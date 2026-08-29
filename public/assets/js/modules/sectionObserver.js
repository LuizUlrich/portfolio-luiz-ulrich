import { qsa } from '../core/dom.js';
import { prefersReducedMotion } from '../core/motion.js';

let initialized = false;

export function initSectionObserver() {
  if (initialized) return () => {};

  const sections = qsa('.section');
  if (!sections.length) return () => {};

  initialized = true;

  if (prefersReducedMotion) {
    sections.forEach((section) => section.classList.add('is-visible'));
    return () => {
      initialized = false;
    };
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  sections.forEach((section) => observer.observe(section));

  return () => {
    observer.disconnect();
    initialized = false;
  };
}
