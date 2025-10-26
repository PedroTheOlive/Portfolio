function loadNavbar() {
    const navbar = `
      <nav class="navbar">
        <div class="nav-container">

          <!-- Hamburger Icon -->
          <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>

          <!-- Nav Links -->
          <ul class="nav-links" id="nav-links">
            <li><a id="Home" href="index.html">Home</a></li>
            <li><a id="Projects" href="projects.html">Projects</a></li>
            <li><a id="Skills" href="skills.html">Skills</a></li>
          </ul>
        </div>
      </nav>
    `;

    // Find the content container and insert navbar right after its opening
    const contentDiv = document.querySelector(".content.shadow");
    if (contentDiv) {
        contentDiv.insertAdjacentHTML("afterbegin", navbar);
    } else {
        console.warn("Navbar could not be inserted: .content.shadow not found.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();

    // --- Active page highlight (your D3 logic preserved) ---
    const active = d3.select("#currentPage").attr("name");
    const pages = ["Home", "Projects", "Skills"];

    for (let i = 0; i < pages.length; i++) {
        if (pages[i] === active) {
            d3.select("#" + pages[i]).style("color", "rgb(255, 0, 255)");
        }
    }

    // --- Mobile hamburger menu toggle --- //
    const menu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if (menu && navLinks) {
        menu.addEventListener("click", () => {
            menu.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }
});
