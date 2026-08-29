import { qsa } from '../core/dom.js';
import { impact } from '../core/impact.js';

let initialized = false;

export function initTracklistReveal() {
  if (initialized) return () => {};

  const tracks = qsa('.tracklist article');
  if (!tracks.length) return () => {};

  initialized = true;

  const cleanups = [];

  tracks.forEach((track, idx) => {
    const detail = track.querySelector('.track-detail');
    const summary = track.querySelector('.track-summary');
    if (!detail || !summary) return;

    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'track-toggle btn-expand';
    control.setAttribute('aria-expanded', 'false');
    const detailId = detail.id || `track-detail-${idx + 1}`;
    detail.id = detailId;
    control.setAttribute('aria-controls', detailId);
    control.textContent = 'Expandir detalhes';

    summary.insertAdjacentElement('afterend', control);
    track.classList.add('track');

    const toggle = () => {
      const open = track.classList.toggle('is-open');
      control.setAttribute('aria-expanded', String(open));
      control.textContent = open ? 'Ocultar detalhes' : 'Expandir detalhes';
      impact(control);
    };

    const onControlClick = (event) => {
      event.stopPropagation();
      toggle();
    };

    const onTrackClick = (event) => {
      const withinLink = event.target.closest('a');
      const withinControl = event.target.closest('.track-toggle');
      if (withinLink || withinControl) return;
      toggle();
    };

    control.addEventListener('click', onControlClick);
    track.addEventListener('click', onTrackClick);

    cleanups.push(() => {
      control.removeEventListener('click', onControlClick);
      track.removeEventListener('click', onTrackClick);
      control.remove();
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    initialized = false;
  };
}
