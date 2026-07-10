/* theme toggle: light <-> dark, persisted, prefers-color-scheme aware.
   Pages also include an inline pre-paint snippet in <head> to avoid flash. */
(function () {
  function current() {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  var btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", function () {
    apply(current() === "dark" ? "light" : "dark");
  });
})();
