import { qs } from "../core/dom.js";
import { prefersReducedMotion } from "../core/motion.js";
import { jogState } from "./jogWheel.js";

export function initWaveform() {
  const shell = qs('.waveform-shell');
  const line = qs('.waveform-line');
  if (!shell || !line) return;

  if (prefersReducedMotion) {
    shell.style.setProperty('--wave-amp', '1');
    shell.style.setProperty('--wave-x', '0px');
    return;
  }

  let isVisible = true;
  let ticking = false;
  let pointerX = 0;
  let pointerTargetX = 0;
  let phase = 0;
  let smoothScroll = 0;
  let targetScroll = 0;
  let rafId = null;

  const sectionEnergy = [
    { id: 'hero', base: 1.2 },
    { id: 'manifesto', base: 0.95 },
    { id: 'tracklist', base: 0.85 },
    { id: 'mixer', base: 0.8 },
    { id: 'processo', base: 0.88 },
    { id: 'contato', base: 1.04 },
  ];

  const sections = sectionEnergy
    .map((s) => ({ ...s, el: document.getElementById(s.id) }))
    .filter((s) => s.el);

  const getSectionBase = () => {
    let current = 1;
    const vhCenter = window.innerHeight * 0.45;
    for (const section of sections) {
      const rect = section.el.getBoundingClientRect();
      if (rect.top <= vhCenter && rect.bottom >= vhCenter) {
        current = section.base;
        break;
      }
    }
    return current;
  };

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const updateWave = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    targetScroll = window.scrollY;
    smoothScroll += (targetScroll - smoothScroll) * 0.08;
    const progress = max > 0 ? smoothScroll / max : 0;
    const sectionBase = getSectionBase();
    const pulse = Math.sin(phase) * 0.04;
    const amp = clamp(sectionBase + jogState.speed * 1.5 + progress * 0.08 + pulse, 0.72, 1.5);
    shell.style.setProperty('--wave-amp', amp.toFixed(3));
    shell.style.setProperty('--wave-op', clamp(0.66 + amp * 0.18, 0.68, 0.98).toFixed(3));
  };

  const onPointerMove = (event) => {
    const dx = event.clientX - window.innerWidth / 2;
    pointerTargetX = clamp(dx * 0.015, -10, 10);
  };

  const loop = () => {
    if (!isVisible) {
      rafId = null;
      return;
    }

    phase += 0.025;
    pointerX += (pointerTargetX - pointerX) * 0.08;

    shell.style.setProperty('--wave-x', `${pointerX.toFixed(2)}px`);
    updateWave();
    rafId = requestAnimationFrame(loop);
  };

  const startLoop = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(loop);
  };

  const stopLoop = () => {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateWave();
      ticking = false;
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startLoop();
      else stopLoop();
    });
  }, { threshold: 0.01 });

  observer.observe(line);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('mousemove', onPointerMove, { passive: true });

  updateWave();
  startLoop();
}
