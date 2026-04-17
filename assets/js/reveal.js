function initReveal() {
  const revealElements = [...document.querySelectorAll(".reveal")];

  const markVisible = (element) => {
    element.classList.add("is-visible");
  };

  const markReady = () => {
    document.body.classList.add("is-page-ready");
  };

  const isMobile = window.innerWidth < 768;

  const useFallback =
    revealElements.length === 0 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window);

  // Delay suave em cascata
  revealElements.forEach((element, index) => {
    const delay = Math.min(index % 4, 3) * 70;
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  // 🚨 MOBILE FIX (crítico)
  if (isMobile) {
    revealElements.forEach(markVisible);
    markReady();
    return;
  }

  if (useFallback) {
    revealElements.forEach(markVisible);
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          markVisible(entry.target);
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1, // mais permissivo
        rootMargin: "0px 0px -5% 0px" // menos agressivo
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // 🚨 GARANTE QUE ELEMENTOS INICIAIS APAREÇAM
  requestAnimationFrame(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        markVisible(el);
      }
    });
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(markReady);
  });
}

window.site.onReady(initReveal);