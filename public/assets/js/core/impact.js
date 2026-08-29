export function impact(el) {
  if (!el) return;
  el.classList.remove('click-impact');
  // force reflow to restart animation reliably
  void el.offsetWidth;
  el.classList.add('click-impact');
  window.setTimeout(() => el.classList.remove('click-impact'), 320);
}
