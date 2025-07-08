class o {
  experienceSpaceBaseUrl;
  constructor(e) {
    this.experienceSpaceBaseUrl = e, this.globalErrorHandlers();
  }
  init() {
    try {
      document.querySelectorAll("button[data-actions-type]").forEach((t) => {
        t.addEventListener("click", (r) => this.initEditorLinks(r));
      });
    } catch (e) {
      this.logError("init", e);
    }
  }
  initEditorLinks(e) {
    try {
      const t = e.currentTarget, r = t.dataset.actionsType;
      if (!r) return;
      if (r === "page") {
        const n = t.dataset.pageId;
        if (n) {
          const i = `${this.experienceSpaceBaseUrl}/${r}?item=${n}`;
          window.open(i, "_blank");
        }
      } else
        this.injectEditorLinks("[data-component-id]", "componentId", r);
    } catch (t) {
      this.logError("initEditorLinks", t);
    }
  }
  injectEditorLinks(e, t, r) {
    try {
      if (!this.experienceSpaceBaseUrl) return;
      document.querySelectorAll(e).forEach((i) => {
        const c = i.dataset[t];
        c && this.createExperienceSpaceEditorLink(i, c, r);
      });
    } catch (n) {
      this.logError("injectLinks", n);
    }
  }
  static editIconSVG = `
            <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" style="height:30px; width:30px" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z">
                </path>
            </svg>
        `;
  createExperienceSpaceEditorLink(e, t, r) {
    try {
      const n = e.querySelector(`a.xpm-highlight[title="${t}"]`);
      if (n !== null)
        return this.toggleLink(n);
      const i = document.createElement("a");
      i.href = `${this.experienceSpaceBaseUrl}/${r}?item=${t}&tab=general.content`, i.title = t, i.target = "_blank", i.classList.add("xpm-highlight"), i.innerHTML = o.editIconSVG, e.style.position = "relative", e.appendChild(i);
    } catch (n) {
      this.logError("createExperienceSpaceEditorLink", n);
    }
  }
  toggleLink(e) {
    if (e) {
      const t = e.classList.contains("hide-xpm");
      e.classList.toggle("hide-xpm", !t), e.classList.toggle("show-xpm", t);
      return;
    }
  }
  logError(e, t) {
    const r = t instanceof Error ? t.message : String(t);
    console.error(`[${e}] ❌ Error:`, r);
  }
  globalErrorHandlers() {
    window.onerror = (e, t, r, n, i) => (this.logError("window.onerror", {
      message: e,
      source: t,
      lineno: r,
      colno: n,
      error: i
    }), !0), window.onunhandledrejection = (e) => {
      this.logError("window.onunhandledrejection", e.reason);
    };
  }
}
const s = new o(window.getExpBaseUrl());
s.init();
export {
  o as TridionBar
};
