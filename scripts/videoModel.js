document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("projectVideo");
    const closeModal = document.getElementById("closeModal");
  
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
        const videoSrc = card.getAttribute("data-video");
        if (videoSrc.includes("youtube.com")) {
          // Use iframe for YouTube
          const iframe = document.createElement("iframe");
          iframe.src = `${videoSrc}?autoplay=1`;
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.allow = "autoplay; fullscreen";
          video.replaceWith(iframe);
        } else {
          video.src = videoSrc;
          video.load();
        }
  
        modal.classList.add("active");
        document.body.classList.add("blurred");
      });
    });
  
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.classList.remove("blurred");
      video.pause();
      video.src = "";
    });
  
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeModal.click();
      }
    });
  });
  