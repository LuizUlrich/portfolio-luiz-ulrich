document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!menuToggle || !mainNav || !siteHeader) return;

  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    siteHeader.classList.remove("is-nav-open");
  };

  const openMenu = () => {
    mainNav.classList.add("is-open");
    menuToggle.classList.add("is-active");
    menuToggle.setAttribute("aria-expanded", "true");
    siteHeader.classList.add("is-nav-open");
    siteHeader.classList.remove("is-hidden");
  };

  let lastScrollY = window.scrollY;
  let ticking = false;
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
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = mainNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeaderVisibility);
  }, { passive: true });
});
