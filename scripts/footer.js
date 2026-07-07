function loadFooter() {
    // Keep contact details consistent across every page.
    const footerHTML = `
      <footer id="site-footer">
        <ul>
          <li><b>Contact</b></li>
          <li>Email: <a href="mailto:pedarruda@hotmail.com" aria-label="Email Pedro Arruda">pedarruda@hotmail.com</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/in/pedro-o-arruda" target="_blank" rel="noopener" aria-label="Visit Pedro Arruda on LinkedIn">linkedin.com/in/pedro-o-arruda</a></li>
          <li>Resume: <a href="public/files/Resume.pdf" download aria-label="Download resume as a PDF">Download PDF</a></li>
        </ul>
      </footer>
    `;

    const contentDiv = document.querySelector(".content.shadow");
    if (contentDiv) {
      contentDiv.insertAdjacentHTML("beforeend", footerHTML);
    } else {
      console.warn("Footer could not be inserted: .content.shadow not found.");
    }
}

document.addEventListener("DOMContentLoaded", loadFooter);
