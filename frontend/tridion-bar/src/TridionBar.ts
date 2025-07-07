
import "./assets/css/style.css";
export class TridionBar {

    public experienceSpaceBaseUrl: string

    constructor(baseUrl: string) {
        this.experienceSpaceBaseUrl = baseUrl;
        this.globalErrorHandlers()
    }

    public init(): void {
        try {
            const actionButtons = document.querySelectorAll<HTMLButtonElement>("button[data-actions-type]")
            actionButtons.forEach(btn => {
                btn.addEventListener("click", (e) => this.initEditorLinks(e));
            })
        } catch (error) {
            this.logError('init', error);
        }
    }

    public initEditorLinks(e: MouseEvent): void {
        try {
           
            const btnType = e.currentTarget as HTMLButtonElement
            const actionType = btnType.dataset.actionsType as string;

            if (!actionType) return;

            if (actionType === "page") {
                const pageId = btnType.dataset.pageId;
                if (pageId) {
                    const url = `${this.experienceSpaceBaseUrl}/${actionType}?item=${pageId}`
                    window.open(url, "_blank")
                }
            } else {
                this.injectEditorLinks("[data-component-id]", "componentId", actionType)
            }
        } catch (error) {
            this.logError('initEditorLinks', error);
        }
    }

    private injectEditorLinks(selector: string, dataKey: string, type: string): void {
        try {
            if (!this.experienceSpaceBaseUrl) return;

            const elements = document.querySelectorAll<HTMLElement>(selector);
            elements.forEach(el => {
                const tcmid = el.dataset[dataKey]
                if (tcmid) {
                    this.createExperienceSpaceEditorLink(el, tcmid, type)
                }
            })
        } catch (error) {
            this.logError('injectLinks', error);
        }
    }

    public static editIconSVG: string = `
            <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" style="height:30px; width:30px" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z">
                </path>
            </svg>
        `;

    public createExperienceSpaceEditorLink(container: HTMLElement, tcmid: string, type: string) {
        try {
            // Check if a edit link already exists
            const existingLink = container.querySelector(`a.xpm-highlight[title="${tcmid}"]`);
            if (existingLink !== null) {
                return this.toggleLink(existingLink)
            }

            const exerienceSpaceLink = document.createElement("a");
            exerienceSpaceLink.href = `${this.experienceSpaceBaseUrl}/${type}?item=${tcmid}&tab=general.content`;
            exerienceSpaceLink.title = tcmid;
            exerienceSpaceLink.target = "_blank";
            exerienceSpaceLink.classList.add("xpm-highlight");
            exerienceSpaceLink.innerHTML = TridionBar.editIconSVG
            container.style.position = "relative"
            container.appendChild(exerienceSpaceLink) // append new link
        } catch (error) {
            this.logError('createExperienceSpaceEditorLink', error);
        }
    }

    public toggleLink(existingLink: Element): void {

        if (existingLink) {
            const shouldShow = existingLink.classList.contains("hide-xpm");

            existingLink.classList.toggle("hide-xpm", !shouldShow);
            existingLink.classList.toggle("show-xpm", shouldShow);

            return;
        }
    }
    public logError(context: string, error: unknown): void {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[${context}] ❌ Error:`, message);
    }
    private globalErrorHandlers(): void {
        window.onerror = (message, source, lineno, colno, error) => {
            this.logError('window.onerror', {
                message,
                source,
                lineno,
                colno,
                error
            });
            return true;
        };

        window.onunhandledrejection = (event) => {
            this.logError('window.onunhandledrejection', event.reason);
        };
    }
}

const tridionBar = new TridionBar((window as any).getExpBaseUrl())
tridionBar.init();