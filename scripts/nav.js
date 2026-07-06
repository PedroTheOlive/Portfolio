function loadNavbar() {
    // Build the same navigation on every page so updates stay centralized.
    const navbar = `
      <nav class="navbar" aria-label="Primary navigation">
        <div class="nav-container">
          <button class="menu-toggle" id="mobile-menu" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-links">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>

          <ul class="nav-links" id="nav-links">
            <li><a id="Home" href="index.html">Home</a></li>
            <li><a id="Projects" href="projects.html">Projects</a></li>
            <li><a id="Skills" href="skills.html">Skills</a></li>
            <li><a id="Resume" href="public/files/Resume.pdf" download>Resume</a></li>
            <li><a id="Contact" href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;

    const contentDiv = document.querySelector(".content.shadow");
    if (contentDiv) {
        contentDiv.insertAdjacentHTML("afterbegin", navbar);
    } else {
        console.warn("Navbar could not be inserted: .content.shadow not found.");
    }
}

function highlightActivePage() {
    const currentPage = document.getElementById("currentPage");
    const active = currentPage ? currentPage.getAttribute("name") : "";
    const activeLink = active ? document.getElementById(active) : null;

    if (!activeLink) return;

    // CSS handles the active state now; no D3 dependency is needed.
    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
}

function updateContactLinks() {
    // Non-home pages should route Contact back to the homepage contact block.
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    const hasHomepageContact = Boolean(document.getElementById("contact"));
    contactLinks.forEach(link => {
        if (!hasHomepageContact) {
            link.setAttribute("href", "index.html#contact");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    highlightActivePage();
    updateContactLinks();

    const menu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if (menu && navLinks) {
        menu.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("active");
            navLinks.classList.toggle("active", isOpen);
            menu.setAttribute("aria-expanded", String(isOpen));
        });

        // Collapse the mobile menu once a destination is chosen.
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
                navLinks.classList.remove("active");
                menu.setAttribute("aria-expanded", "false");
            });
        });
    }
});
