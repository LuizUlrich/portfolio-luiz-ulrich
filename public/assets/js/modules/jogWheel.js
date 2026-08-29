import { qs } from '../core/dom.js';
import { prefersReducedMotion } from '../core/motion.js';

export const jogState = { speed: 0.08 };

let initialized = false;

export function initJogWheel() {
  if (initialized) return () => {};

  const wheel = qs('.jog-wheel');
  const stage = qs('.cdj-stage');
  if (!wheel || !stage || prefersReducedMotion) return () => {};

  initialized = true;

  let rotation = 0;
  let speed = 0.08;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let tiltX = 0;
  let tiltY = 0;
  let rafId = null;
  let visible = !document.hidden;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const render = () => {
    if (!visible) return;
    rotation = (rotation + speed) % 360;
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;
    jogState.speed = speed;

    wheel.style.transform = `rotate(${rotation.toFixed(2)}deg) perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1.005)`;
    rafId = requestAnimationFrame(render);
  };

  const start = () => {
    if (rafId !== null || !visible) return;
    rafId = requestAnimationFrame(render);
  };

  const stop = () => {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  };

  const onVisibility = () => {
    visible = !document.hidden;
    if (visible) start();
    else stop();
  };

  const onEnter = () => {
    speed = 0.22;
    stage.classList.add('is-engaged');
  };

  const onLeave = () => {
    speed = 0.08;
    targetTiltX = 0;
    targetTiltY = 0;
    stage.classList.remove('is-engaged');
  };

  const onMove = (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    targetTiltY = clamp((x - 0.5) * 8, -4, 4);
    targetTiltX = clamp((0.5 - y) * 8, -4, 4);
  };

  stage.addEventListener('mouseenter', onEnter);
  stage.addEventListener('mouseleave', onLeave);
  stage.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  start();

  return () => {
    stop();
    stage.removeEventListener('mouseenter', onEnter);
    stage.removeEventListener('mouseleave', onLeave);
    stage.removeEventListener('mousemove', onMove);
    document.removeEventListener('visibilitychange', onVisibility);
    initialized = false;
  };
}
