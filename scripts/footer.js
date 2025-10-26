function loadFooter() {
    const footerHTML = `
      <footer>
        <ul>
          <li><b>Contact</b></li>
          <li>Email: <a href="mailto:pedarruda@hotmail.com">pedarruda@hotmail.com</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/in/pedro-o-arruda" target="_blank">linkedin.com/in/pedro-o-arruda</a></li>
          <li>Resume: <a href="public/files/Resume_Pedro_Arruda.pdf" download>Download PDF</a></li>
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
  