import { qs } from "../core/dom.js";
import { prefersReducedMotion } from "../core/motion.js";

export const jogState = { speed: 0.08 };

export function initJogWheel() {
  const wheel = qs('.jog-wheel');
  const stage = qs('.cdj-stage');
  if (!wheel || !stage) return;

  if (prefersReducedMotion) return;

  let rotation = 0;
  let speed = 0.08;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let tiltX = 0;
  let tiltY = 0;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const render = () => {
    rotation = (rotation + speed) % 360;
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;
    jogState.speed = speed;

    wheel.style.transform = `rotate(${rotation.toFixed(2)}deg) perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1.005)`;

    requestAnimationFrame(render);
  };

  stage.addEventListener('mouseenter', () => {
    speed = 0.22;
    stage.classList.add('is-engaged');
  });

  stage.addEventListener('mouseleave', () => {
    speed = 0.08;
    targetTiltX = 0;
    targetTiltY = 0;
    stage.classList.remove('is-engaged');
  });

  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    targetTiltY = clamp((x - 0.5) * 8, -4, 4);
    targetTiltX = clamp((0.5 - y) * 8, -4, 4);
  }, { passive: true });

  requestAnimationFrame(render);
}
