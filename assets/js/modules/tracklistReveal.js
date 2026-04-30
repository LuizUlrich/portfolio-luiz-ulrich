import { qsa } from "../core/dom.js";
import { impact } from "../core/impact.js";

export function initTracklistReveal() {
  const tracks = qsa('.tracklist article');
  if (!tracks.length) return;

  tracks.forEach((track) => {
    const detail = track.querySelector('.track-detail');
    if (!detail) return;

    track.classList.add('track');

    track.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });

    const toggle = () => {
      const open = track.classList.toggle('is-open');
      track.setAttribute('aria-expanded', String(open));
      impact(track);
    };

    track.setAttribute('tabindex', '0');
    track.setAttribute('aria-expanded', 'false');

    track.addEventListener('click', toggle);
    track.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
}
