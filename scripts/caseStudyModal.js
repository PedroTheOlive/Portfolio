document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("caseStudyModal");
    const closeButton = document.getElementById("closeCaseStudy");
    const content = document.getElementById("caseStudyContent");

    if (!modal || !closeButton || !content) return;

    const focusableSelector = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "textarea:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])"
    ].join(", ");

    let lastFocusedElement = null;

    function getFocusableElements() {
        return Array.from(modal.querySelectorAll(focusableSelector))
            .filter(element => element.offsetParent !== null);
    }

    function trapFocus(event) {
        if (event.key !== "Tab" || !modal.classList.contains("active")) return;

        const focusableElements = getFocusableElements();
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    function openCaseStudy(templateId, opener) {
        const template = document.getElementById(templateId);
        if (!template) return;

        lastFocusedElement = opener || document.activeElement;

        // Clone the matching template so you can edit case-study content in HTML.
        content.replaceChildren(template.content.cloneNode(true));
        content.scrollTop = 0;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const heading = content.querySelector("h2");
        if (heading) {
            heading.setAttribute("id", "caseStudyTitle");
        }

        content.focus();
    }

    function closeCaseStudy() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        content.replaceChildren();

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function isInteractiveElement(element) {
        return Boolean(element.closest("a, button, input, textarea, select, summary"));
    }

    document.querySelectorAll("[data-case-study]").forEach(trigger => {
        trigger.addEventListener("click", event => {
            if (isInteractiveElement(event.target) && !event.target.classList.contains("case-study-button")) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            openCaseStudy(trigger.getAttribute("data-case-study"), trigger);
        });

        trigger.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") return;
            if (isInteractiveElement(event.target) && !event.target.classList.contains("case-study-button")) return;

            event.preventDefault();
            event.stopPropagation();
            openCaseStudy(trigger.getAttribute("data-case-study"), trigger);
        });
    });

    closeButton.addEventListener("click", closeCaseStudy);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeCaseStudy();
        }
    });

    document.addEventListener("keydown", event => {
        if (!modal.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeCaseStudy();
            return;
        }

        trapFocus(event);
    });
});
