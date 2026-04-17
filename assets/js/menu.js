window.site.onReady(() => {
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const headerBackdrop = document.getElementById("headerBackdrop");

  if (!menuToggle || !mainNav || !siteHeader) return;
  if (siteHeader.dataset.menuReady === "true") return;

  const mobileBreakpoint = 760;
  const backdropFadeDuration = 220;
  const navLinks = [...mainNav.querySelectorAll("a")];

  let lastScrollY = window.scrollY;
  let ticking = false;
  let backdropTimer = null;

  siteHeader.dataset.menuReady = "true";

  const syncBodyState = () => {
    const shouldLockScroll = window.innerWidth <= mobileBreakpoint && mainNav.classList.contains("is-open");
    document.body.classList.toggle("is-nav-open", shouldLockScroll);
  };

  const syncBackdropState = (isOpen) => {
    if (!headerBackdrop) return;

    if (backdropTimer) {
      window.clearTimeout(backdropTimer);
      backdropTimer = null;
    }

    if (isOpen && window.innerWidth <= mobileBreakpoint) {
      headerBackdrop.hidden = false;
      window.requestAnimationFrame(() => {
        headerBackdrop.classList.add("is-visible");
      });
      return;
    }

    headerBackdrop.classList.remove("is-visible");
    backdropTimer = window.setTimeout(() => {
      headerBackdrop.hidden = true;
    }, backdropFadeDuration);
  };

  const setMenuState = (isOpen) => {
    mainNav.classList.toggle("is-open", isOpen);
    menuToggle.classList.toggle("is-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    siteHeader.classList.toggle("is-nav-open", isOpen);

    if (isOpen) {
      siteHeader.classList.remove("is-hidden");
    }

    syncBodyState();
    syncBackdropState(isOpen);
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    if (!mainNav.classList.contains("is-open")) return;

    setMenuState(false);

    if (returnFocus) {
      menuToggle.focus();
    }
  };

  const topRevealOffset = 24;
  const scrollDelta = 10;

  const updateHeaderVisibility = () => {
    const currentScrollY = window.scrollY;
    const navIsOpen = mainNav.classList.contains("is-open");
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;
    const movedEnough = Math.abs(currentScrollY - lastScrollY) > scrollDelta;

    if (currentScrollY <= topRevealOffset || navIsOpen) {
      siteHeader.classList.remove("is-hidden");
    } else if (movedEnough && scrollingDown) {
      siteHeader.classList.add("is-hidden");
    } else if (movedEnough && scrollingUp) {
      siteHeader.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.contains("is-open");
    const nextState = !isOpen;

    setMenuState(nextState);

    if (nextState && window.innerWidth <= mobileBreakpoint) {
      navLinks[0]?.focus();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  headerBackdrop?.addEventListener("click", () => {
    closeMenu({ returnFocus: true });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("is-open")) return;

    const clickedInsideNav = mainNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    const clickedBackdrop = headerBackdrop?.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && !clickedBackdrop) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu({ returnFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();
      syncBackdropState(false);
      return;
    }

    syncBodyState();
    syncBackdropState(mainNav.classList.contains("is-open"));
  });

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateHeaderVisibility);
    },
    { passive: true }
  );
});
