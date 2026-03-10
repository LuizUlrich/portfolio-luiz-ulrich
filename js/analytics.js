(function () {
  const ANALYTICS_ENABLED = false;

  function trackEvent(eventName, eventData = {}) {
    if (!ANALYTICS_ENABLED) return;

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventData);
      return;
    }

    console.log("[analytics]", eventName, eventData);
  }

  function bindTrackedClicks() {
    const trackedElements = document.querySelectorAll("[data-track-event]");

    trackedElements.forEach((element) => {
      element.addEventListener("click", () => {
        const eventName = element.dataset.trackEvent;
        const eventLabel = element.dataset.trackLabel || "";
        const eventLocation = window.location.pathname;

        trackEvent(eventName, {
          event_label: eventLabel,
          page_location: eventLocation
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindTrackedClicks();
  });

  window.trackEvent = trackEvent;
})();