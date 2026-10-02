// A small menu linking the FarmRPG tools. Shared: the other tools load this same file with
//   <script src="https://prlygrly.github.io/FarmRPG-Next-Steps/tools-menu.js" defer></script>
// It fills <span id="tools-menu"></span> if the page has one, else sits in the top-right corner.
// Colors follow the page if it sets --tm-bg, --tm-ink and --tm-line; otherwise the browser's own light/dark colors.
(function () {
  const TOOLS = [
    { name: "FarmRPG Next Steps", url: "https://prlygrly.github.io/FarmRPG-Next-Steps/", what: "What to do next: Tower, masteries, quests" },
    { name: "Large Net Planner", url: "https://prlygrly.github.io/buddys-net-planner/", what: "Fishing and Large Net masteries" },
    { name: "Bacon Planner", url: "https://prlygrly.github.io/farmrpg-bacon-planner/", what: "Which pigs to turn into bacon" }
  ];
  const here = location.pathname.toLowerCase();
  const css = `
.tm-wrap { position: relative; display: inline-block; font-size: 15px; line-height: 1.4; }
.tm-wrap.tm-corner { position: fixed; top: 8px; right: 8px; z-index: 50; }
.tm-btn { width: 36px; height: 36px; padding: 0; display: grid; place-items: center; cursor: pointer;
  background: var(--tm-bg, Canvas); color: var(--tm-ink, CanvasText); border: 1px solid var(--tm-line, GrayText); border-radius: 8px; }
.tm-btn svg { width: 18px; height: 18px; }
.tm-list { position: absolute; right: 0; top: calc(100% + 6px); min-width: 250px; max-width: calc(100vw - 24px); margin: 0; padding: 6px;
  list-style: none; background: var(--tm-bg, Canvas); color: var(--tm-ink, CanvasText); border: 1px solid var(--tm-line, GrayText);
  border-radius: 10px; box-shadow: 0 6px 20px rgba(0,0,0,.18); z-index: 50; }
.tm-list[hidden] { display: none; }
.tm-list a { display: block; padding: 7px 10px; border-radius: 6px; color: inherit; text-decoration: none; }
.tm-list a:hover, .tm-list a:focus-visible { background: color-mix(in srgb, currentColor 10%, transparent); }
.tm-list a[aria-current] { font-weight: 700; }
.tm-list small { display: block; opacity: .75; font-weight: 400; }`;
  function build() {
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    let wrap = document.getElementById("tools-menu");
    if (!wrap) { wrap = document.createElement("span"); wrap.classList.add("tm-corner"); document.body.appendChild(wrap); }
    wrap.classList.add("tm-wrap");
    wrap.innerHTML = `<button type="button" class="tm-btn" aria-label="Other FarmRPG tools" aria-expanded="false" aria-controls="tm-list" title="Other FarmRPG tools">
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
      <ul class="tm-list" id="tm-list" hidden>${TOOLS.map(t => {
        const cur = here.startsWith(new URL(t.url).pathname.toLowerCase());
        return `<li><a href="${t.url}"${cur ? ' aria-current="page"' : ""}>${t.name}${cur ? " (this page)" : ""}<small>${t.what}</small></a></li>`;
      }).join("")}</ul>`;
    const btn = wrap.querySelector(".tm-btn"), list = wrap.querySelector(".tm-list");
    const show = on => { list.hidden = !on; btn.setAttribute("aria-expanded", on); };
    btn.addEventListener("click", () => show(list.hidden));
    document.addEventListener("click", e => { if (!wrap.contains(e.target)) show(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !list.hidden) { show(false); btn.focus(); } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
