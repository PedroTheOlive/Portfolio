document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("videoModal");
    const closeModal = document.getElementById("closeModal");
    const videoFrame = modal ? modal.querySelector(".video-frame") : null;
    const originalVideo = document.getElementById("projectVideo");

    if (!modal || !closeModal || !videoFrame || !originalVideo) return;

    const focusableSelector = [
        "a[href]",
        "button:not([disabled])",
        "video[controls]",
        "iframe",
        "[tabindex]:not([tabindex='-1'])"
    ].join(", ");

    let lastFocusedElement = null;

    function isYouTubeUrl(src) {
        return /youtube\.com|youtu\.be/.test(src);
    }

    function getYouTubeEmbedUrl(src) {
        if (src.includes("embed")) return src;

        try {
            const url = new URL(src);
            const videoId = url.hostname.includes("youtu.be")
                ? url.pathname.slice(1)
                : url.searchParams.get("v");

            return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : src;
        } catch (error) {
            return src;
        }
    }

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

    function resetPlayer() {
        const iframe = videoFrame.querySelector("iframe");
        const video = videoFrame.querySelector("video");

        if (iframe) iframe.remove();

        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
        } else {
            videoFrame.appendChild(originalVideo);
        }
    }

    function openModal(src, opener) {
        if (!src) return;

        lastFocusedElement = opener || document.activeElement;
        resetPlayer();

        if (isYouTubeUrl(src)) {
            // YouTube videos need an iframe so closing the modal can stop playback.
            const video = videoFrame.querySelector("video");
            if (video) video.remove();

            const iframe = document.createElement("iframe");
            iframe.src = getYouTubeEmbedUrl(src);
            iframe.title = "Project video";
            iframe.allow = "autoplay; fullscreen; picture-in-picture";
            iframe.allowFullscreen = true;
            videoFrame.appendChild(iframe);
        } else {
            // Local project demos reuse the existing video element.
            const video = videoFrame.querySelector("video") || originalVideo;
            if (!video.parentElement) videoFrame.appendChild(video);
            video.src = src;
            video.load();
            video.play().catch(() => {
                // Browsers may block autoplay until the user presses play.
            });
        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        closeModal.focus();
    }

    function closeVideoModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        resetPlayer();

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    document.querySelectorAll(".project-vid").forEach(card => {
        card.addEventListener("click", event => {
            event.stopPropagation();
            openModal(card.getAttribute("data-video"), card);
        });
    });

    closeModal.addEventListener("click", closeVideoModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeVideoModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (!modal.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeVideoModal();
            return;
        }

        trapFocus(event);
    });
});
