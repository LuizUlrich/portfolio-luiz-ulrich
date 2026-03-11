document.addEventListener("DOMContentLoaded", () => {
  const outboundLinks = document.querySelectorAll(
    'a[href^="http"], a[href^="mailto:"], a[href^="https://wa.me/"]'
  );

  outboundLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      const label = (link.textContent || "").trim() || href;

      console.log("[analytics] outbound_click", {
        label,
        href,
        page: window.location.pathname
      });
    });
  });

  document.querySelectorAll(".play-track-btn").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("[analytics] play_track", {
        trackIndex: button.dataset.track || "0",
        page: window.location.pathname
      });
    });
  });
});