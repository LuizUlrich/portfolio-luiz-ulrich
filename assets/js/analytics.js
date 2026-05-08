window.site.onReady(() => {
  const outboundLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
  const trackButtons = document.querySelectorAll(".play-track-btn");

  if (!outboundLinks.length && !trackButtons.length) return;

  const analytics = window.siteAnalytics || {
    track() {}
  };

  window.siteAnalytics = analytics;

  outboundLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      const label = link.dataset.analyticsLabel || (link.textContent || "").trim() || href;

      analytics.track("outbound_click", {
        label,
        href,
        page: window.location.pathname
      });
    });
  });

  trackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      analytics.track("play_track", {
        trackIndex: button.dataset.track || "0",
        page: window.location.pathname
      });
    });
  });
});
