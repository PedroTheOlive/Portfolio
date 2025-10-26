document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;
  
    // Clone gallery content twice for seamless looping
    gallery.innerHTML += gallery.innerHTML;
    gallery.innerHTML += gallery.innerHTML;
  
    let scrollSpeed = 0.5; // Adjust scroll speed here (positive = right, negative = left)
  
    function loopScroll() {
      gallery.scrollLeft += scrollSpeed;
  
      // When reaching near the end of the scrollable width, reset seamlessly
      if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
        gallery.scrollLeft = 0;
      }
  
      requestAnimationFrame(loopScroll);
    }
  
    loopScroll();
  
    // Pause when user hovers or touches the gallery
    let isPaused = false;
  
    gallery.addEventListener("mouseenter", () => (isPaused = true));
    gallery.addEventListener("mouseleave", () => (isPaused = false));
    gallery.addEventListener("touchstart", () => (isPaused = true));
    gallery.addEventListener("touchend", () => (isPaused = false));
  
    function smoothScroll() {
      if (!isPaused) {
        gallery.scrollLeft += scrollSpeed;
        if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
          gallery.scrollLeft = 0;
        }
      }
      requestAnimationFrame(smoothScroll);
    }
  
    // start smooth looping
    smoothScroll();
  });
  