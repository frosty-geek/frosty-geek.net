(() => {
  const themeToggle = document.querySelector(".theme-toggle");

  function getPreferredTheme() {
    const chosen = window.localStorage && window.localStorage.getItem("theme");
    if (chosen === "dark" || chosen === "light") {
      return chosen;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  if (themeToggle) {
    applyTheme(getPreferredTheme());
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
      const next = current === "dark" ? "light" : "dark";
      window.localStorage && window.localStorage.setItem("theme", next);
      applyTheme(next);
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!window.localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  const menuTrigger = document.querySelector(".menu-trigger");
  const menu = document.querySelector(".menu");
  const mobileQuery = getComputedStyle(document.body).getPropertyValue("--phoneWidth") || "(max-width: 684px)";
  const isMobile = () => window.matchMedia(mobileQuery).matches;
  const syncMenu = () => {
    if (menuTrigger) menuTrigger.classList.toggle("hidden", !isMobile());
    if (menu) menu.classList.toggle("hidden", isMobile());
  };

  syncMenu();
  if (menuTrigger && menu) {
    menuTrigger.addEventListener("click", () => menu.classList.toggle("hidden"));
  }
  window.addEventListener("resize", syncMenu);
})();
