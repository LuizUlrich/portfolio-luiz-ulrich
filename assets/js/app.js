const supportedImagePattern = /\.(?:jpe?g|png|webp)(?:[?#].*)?$/i;

(() => {
  const readyQueue = [];
  let readyHandled = false;

  function getCurrentPath() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function getCurrentPage() {
    return document.body?.dataset.page || "";
  }

  function getPageHref(page) {
    const pageMap = {
      home: "index.html",
      luiz: "luiz.html",
      ulrich: "ulrich.html",
      contato: "contato.html",
      presskit: "ulrich.html"
    };

    return pageMap[page] || "";
  }

  function setActiveNavLink() {
    const currentPath = getCurrentPath();
    const currentPageHref = getPageHref(getCurrentPage());
    const navLinks = document.querySelectorAll("#mainNav a, .footer-nav a");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const isHome = currentPath === "" && href === "index.html";
      const isActive = href === currentPath || isHome || (currentPageHref && href === currentPageHref);

      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function flushReadyQueue() {
    readyHandled = true;
    setActiveNavLink();

    while (readyQueue.length) {
      const callback = readyQueue.shift();

      try {
        callback();
      } catch (error) {
        console.error("[site] initializer_failed", error);
      }
    }
  }

  const site = {
    supportedImageExtensions: ["jpg", "jpeg", "png", "webp"],
    isSupportedImageAsset(value = "") {
      return supportedImagePattern.test(String(value).trim());
    },
    getCurrentPath,
    getCurrentPage,
    onReady(callback) {
      if (typeof callback !== "function") return;

      if (readyHandled) {
        callback();
        return;
      }

      readyQueue.push(callback);
    },
    storage: {
      load(key, fallback) {
        try {
          const saved = localStorage.getItem(key);
          return saved ? JSON.parse(saved) : fallback;
        } catch {
          return fallback;
        }
      },
      save(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch {
          return false;
        }
      }
    }
  };

  window.site = site;
  window.supportedImageExtensions = site.supportedImageExtensions;
  window.isSupportedImageAsset = site.isSupportedImageAsset;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", flushReadyQueue, { once: true });
  } else {
    flushReadyQueue();
  }
})();
