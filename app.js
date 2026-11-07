const themeButtons = document.querySelectorAll("[data-theme-choice]");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  themeColor.content = theme === "light" ? "#f5f5f5" : "#0b0b0b";

  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("The theme preference could not be saved.", error);
    }
  }

  themeButtons.forEach((button) => {
    const active = theme === "light" ? "light" : "dark";
    const alternative = theme === "light" ? "dark" : "light";
    button.hidden = button.dataset.themeChoice === theme;
    button.setAttribute("aria-label", `${active} mode is active. Switch to ${alternative} mode.`);
    button.title = `${active} mode active · Switch to ${alternative} mode`;
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
});

setTheme(document.documentElement.dataset.theme, false);
