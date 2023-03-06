import './index.css'

// Theme selector

let dos: DosProps;
let currentTheme: DosTheme = (localStorage.getItem("rinst.theme") ?? "aqua") as DosTheme;
const themeSelect = document.querySelector("#theme-select") as HTMLSelectElement;
function applyTheme(newTheme: DosTheme) {
  currentTheme = newTheme;
  localStorage.setItem("rinst.theme", currentTheme);
  document.body.setAttribute("data-theme", currentTheme);
  themeSelect.value = currentTheme;
  if (dos) {
    dos.setTheme(currentTheme);
  }
}
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value as DosTheme);
});
applyTheme(currentTheme);

// Paginator

let topic: string = "win1x";
let page: number = 1;
let topics = document.getElementById("topics") as HTMLDivElement; 
let next = document.getElementById("next") as HTMLButtonElement;
let prev = document.getElementById("prev") as HTMLButtonElement;
next.addEventListener("click", () => {
  page++;
  syncPages();
});
prev.addEventListener("click", () => {
  page--;
  syncPages();
});
function syncPages() {
  let visibleEl = topics.children[0] as HTMLDivElement;
  for (let i = 0; i < topics.childElementCount; ++i) {
    const topicEl = topics.children[i] as HTMLDivElement;
    const visible = topicEl.id !== topic;
    topicEl.style.display = visible ? "none" : "block";

    if (visible) {
      visibleEl = topicEl;
    }
  }

  const pageId = "page-" + page;
  for (let i = 0; i < visibleEl.childElementCount; ++i) {
    const pageEl = visibleEl.children[i] as HTMLDivElement;
    pageEl.style.display = pageEl.id !== pageId ? "none" : "block";
  }

  prev.style.display = page === 1 ? "none" : "block";
  next.style.display = page === visibleEl.childElementCount ? "none" : "block";
}
syncPages();

// js-dos

export type DosTheme = "light" | "dark" | "cupcake" | "bumblebee" | "emerald" | "corporate" |
  "synthwave" | "retro" | "cyberpunk" | "valentine" | "halloween" | "garden" |
  "forest" | "aqua" | "lofi" | "pastel" | "fantasy" | "wireframe" | "black" |
  "luxury" | "dracula" | "cmyk" | "autumn" | "business" | "acid" | "lemonade" |
  "night" | "coffee" | "winter";

export interface DosOptions {
  pathPrefix?: string,
  theme?: DosTheme,
}

export interface DosProps {
  setTheme(theme: DosTheme): void;
}

declare function Dos(root: HTMLDivElement, options?: DosOptions): DosProps;

document.addEventListener("DOMContentLoaded", () => {
  dos = Dos(document.getElementById("jsdos") as HTMLDivElement, {
    pathPrefix: "js-dos",
    theme: currentTheme,
  });
});

