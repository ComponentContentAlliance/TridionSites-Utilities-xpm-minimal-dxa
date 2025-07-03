
const EXPERIENCE_SPACE_URL = window.getExpBaseUrl()

const EXPERIENCE_COMPONENT_URL = `${EXPERIENCE_SPACE_URL}/component`;
const EXPERIENCE_PAGE_URL = `${EXPERIENCE_SPACE_URL}/page`;

function createEditorLink(tcmId, baseUrl, key) {
	const exerienceSpaceLink = document.createElement("a");
	exerienceSpaceLink.href = `${baseUrl}?item=${tcmId}&tab=general.content`;
	exerienceSpaceLink.title = tcmId;
	exerienceSpaceLink.classList.add("xpm-highlight");
	if(key==="pageId"){
		exerienceSpaceLink.style.left = "0px"
	}
	exerienceSpaceLink.innerHTML = '<svg viewBox="64 64 896 896" focusable="false" data-icon="edit" style="height:30px; width:30px" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>';
	exerienceSpaceLink.target = "_blank";
	return exerienceSpaceLink;
}

function appendEditorLink(element, tcmId, baseUrl, dataKey) {
	if (!element.querySelector(".xpm-highlight")) {
		if(!isPositioned(element)){
            element.style.position = "relative"
        }
		element.appendChild(createEditorLink(tcmId, baseUrl, dataKey));
	}
}

function isPositioned(el){
        const position = getComputedStyle(el).position
        return ["absolute", "relative", "fixed"].includes(position)
}
	
function processElement(selector, dataKey, baseUrl) {
	const elements = document.querySelectorAll(selector);
	elements.forEach(el => {
		const tcmId = el.dataset[dataKey];
		if (tcmId) {
			appendEditorLink(el, tcmId, baseUrl, dataKey);
		}
	});
}

const link = document.querySelector('.xpm-highlight');

function attachHoverEvents(el) {
	if (!el || !link) return;
	
	el.addEventListener('mouseenter', () => {
		link.style.opacity = '1';
		link.style.pointerEvents = 'auto';
	});

	el.addEventListener('mouseleave', () => {
		link.style.opacity = '0';
		link.style.pointerEvents = 'none';
	});
}


function initEditorLinks() {
	
	processElement("[data-page-id]", "pageId", EXPERIENCE_PAGE_URL);
	processElement("[data-component-id]", "componentId", EXPERIENCE_COMPONENT_URL);
	
	const componentLayers = document.querySelectorAll('[data-component-id]');
	const pageLayer = document.querySelector('[data-page-id]');
	
	componentLayers.forEach(el => attachHoverEvents(el));
	attachHoverEvents(pageLayer);
}

window.onerror = function(message, url, line, column, error) {

   console.error("An error occurred:", message);

   console.error("URL:", url);

   console.error("Line:", line);

   console.error("Column:", column);

   console.error("Error object:", error);

};

window.addEventListener("load", initEditorLinks);
