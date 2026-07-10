/* PhD Zero-Shot UAV · shared page behaviour (no framework) */

/* mark the current nav item */
(function () {
  var here = location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".masthead nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href.indexOf("#") !== -1) return; /* section links never mark current */
    var target = new URL(href, location.href).pathname.replace(/\/index\.html$/, "/");
    if (target === here) a.setAttribute("aria-current", "page");
  });
})();

/* TOC scrollspy on article pages */
(function () {
  var toc = document.querySelector(".toc");
  if (!toc) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
  var map = {};
  links.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        links.forEach(function (l) { l.classList.remove("on"); });
        var l = map[en.target.id];
        if (l) l.classList.add("on");
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  links.forEach(function (l) {
    var sec = document.getElementById(l.getAttribute("href").slice(1));
    if (sec) io.observe(sec);
  });
})();

/* KaTeX auto-render: pages that use math include KaTeX CSS/JS via CDN
   and call this after the auto-render script loads. Fallback: if the
   CDN is unreachable, raw LaTeX stays visible between $$ ... $$. */
function renderMathOnPage() {
  if (typeof renderMathInElement !== "function") return;
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false
  });
}
