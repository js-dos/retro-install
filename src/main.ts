import './index.css'

// Theme selector

let dos: DosProps;
let currentTheme: DosOptions["theme"] = (localStorage.getItem("rinst.theme") ?? "aqua") as DosOptions["theme"];
const themeSelect = document.querySelector("#theme-select") as HTMLSelectElement;
function applyTheme(newTheme: DosOptions["theme"]) {
  currentTheme = newTheme;
  localStorage.setItem("rinst.theme", currentTheme);
  document.body.setAttribute("data-theme", currentTheme);
  themeSelect.value = currentTheme;
  if (dos) {
    dos.setTheme(currentTheme);
  }
}
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value as DosOptions["theme"]);
});

// Paginator

let topic: string = "win1x";
let page: number = 1;
let topics = document.getElementById("topics") as HTMLDivElement;
let next = document.getElementById("next") as HTMLButtonElement;
let prev = document.getElementById("prev") as HTMLButtonElement;
let refElements: { [key: string]: HTMLDivElement } = {};
function registerRefElement(keys: string[]) {
  for (const key of keys) {
    refElements[key] = document.querySelector("#" + key) as HTMLDivElement;
    document.body.removeChild(refElements[key]);
  }
}
function mountRefElement(key: string, root: HTMLDivElement) {
  const el = refElements[key];
  el.parentElement?.removeChild(el);
  root.appendChild(el);
}
registerRefElement([]);
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
    const ref = pageEl.getAttribute("data-ref");
    pageEl.style.display = pageEl.id !== pageId ? "none" : "block";
    if (pageEl.id === pageId && ref !== null) {
      mountRefElement(ref, pageEl);
    }
  }

  prev.style.display = page === 1 ? "none" : "block";
  next.style.display = page === visibleEl.childElementCount ? "none" : "block";
}

// js-dos

export interface DosOptions {
    pathPrefix: string,
    theme: "light" | "dark" | "cupcake" | "bumblebee" | "emerald" | "corporate" |
    "synthwave" | "retro" | "cyberpunk" | "valentine" | "halloween" | "garden" |
    "forest" | "aqua" | "lofi" | "pastel" | "fantasy" | "wireframe" | "black" |
    "luxury" | "dracula" | "cmyk" | "autumn" | "business" | "acid" | "lemonade" |
    "night" | "coffee" | "winter",
    lang: "ru" | "en",
    backend: "dosbox" | "dosboxX",
    workerThread: boolean,
    mouseCapture: boolean,
}

export interface DosProps {
    setTheme(theme: DosOptions["theme"]): void;
    setLang(lang: DosOptions["lang"]): void;
    setBackend(lang: DosOptions["backend"]): void;
    setWorkerThread(capture: DosOptions["workerThread"]): void;
    setMouseCapture(capture: DosOptions["mouseCapture"]): void;
}


declare function Dos(root: HTMLDivElement, options?: Partial<DosOptions>): DosProps;

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(currentTheme);
  syncPages();

  dos = Dos(document.getElementById("jsdos") as HTMLDivElement, {
    pathPrefix: "js-dos",
    theme: currentTheme,
    lang: "en",
    backend: "dosboxX",
    mouseCapture: true,
  });
});

