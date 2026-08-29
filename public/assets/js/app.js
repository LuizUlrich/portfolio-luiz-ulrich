const supportedImagePattern = /\.(?:jpe?g|png|webp)(?:[?#].*)?$/i;

window.supportedImageExtensions = ["jpg", "jpeg", "png", "webp"];
window.isSupportedImageAsset = (value = "") => supportedImagePattern.test(String(value).trim());

(function _run() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _run, { once: true });
    return;
  }

  if (typeof window.initReveal === "function") {
    window.initReveal();
  }

  const currentPath = window.location.pathname;

  document.querySelectorAll("#mainNav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const normalizedHref = href.startsWith("/")
      ? href.replace(/\/$/, "")
      : "/" + href.replace(/\.html$/, "");
    const normalizedPath = currentPath === "/" ? "/" : currentPath.replace(/\/$/, "");

    if (
      normalizedHref === normalizedPath ||
      (normalizedPath === "/" && (href === "index.html" || href === "/"))
    ) {
      link.classList.add("is-active");
    }
  });
})();
