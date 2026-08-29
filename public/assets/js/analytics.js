document.addEventListener("DOMContentLoaded", () => {
  let isLocalDebug = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  try {
    isLocalDebug = isLocalDebug && window.localStorage?.getItem("debugAnalytics") === "true";
  } catch {
    isLocalDebug = false;
  }

  function track(eventName, payload) {
    if (window.siteAnalytics && typeof window.siteAnalytics.track === "function") {
      window.siteAnalytics.track(eventName, payload);
      return;
    }

    if (isLocalDebug) {
      console.debug(`[analytics] ${eventName}`, payload);
    }
  }

  const outboundLinks = document.querySelectorAll(
    'a[href^="http"], a[href^="mailto:"], a[href^="https://wa.me/"]'
  );

  outboundLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      const label = (link.textContent || "").trim() || href;

      track("outbound_click", {
        label,
        href,
        page: window.location.pathname
      });
    });
  });

  document.querySelectorAll(".play-track-btn").forEach((button) => {
    button.addEventListener("click", () => {
      track("play_track", {
        trackIndex: button.dataset.track || "0",
        page: window.location.pathname
      });
    });
  });
});
