/* ========================================================================
   SITE.JS — Custom Logic Layer for Dimension
   Handles:
     - Mobile Hamburger Menu
     - Safe Header Navigation
     - Section Loader
     - Gallery Lightbox
     - Lazy Fade-in
======================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------
       1) MOBILE HAMBURGER MENU
    ------------------------------------------------------------ */
    const hamburger = document.getElementById("hamburger-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            const open = mobileMenu.style.display === "block";
            mobileMenu.style.display = open ? "none" : "block";
        });
    }

    /* ------------------------------------------------------------
       2) FIX: HEADER LINKS SHOULD OPEN/CLOSE ARTICLES CORRECTLY
          (Dimension default behavior is broken without this)
    ------------------------------------------------------------ */
    const headerLinks = document.querySelectorAll('#site-header a[href^="#"]');

    headerLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const target = this.getAttribute("href"); // "#about", etc.

            if (!target || target === "#") return;

            e.preventDefault();
            e.stopPropagation();

            if (location.hash === target) {
                location.hash = "#";   // closes article
            } else {
                location.hash = target; // opens article
            }
        });
    });

    /* ------------------------------------------------------------
       3) LOAD SECTIONS (sections/about.html, etc.)
          IMPORTANT: This runs AFTER navigation fix
    ------------------------------------------------------------ */
    const articles = document.querySelectorAll("#main article");

    articles.forEach(article => {
        const id = article.id;

        fetch(`sections/${id}.html`)
            .then(resp => resp.text())
            .then(html => {
                article.innerHTML = html;

                if (id === "gallery") {
                    initGalleryLightbox();
                    enableLazyFadeIn();
                }
            })
            .catch(() => console.warn(`Missing section: ${id}`));
    });

    /* ------------------------------------------------------------
       4) LAZY FADE-IN for images loaded immediately on page load
    ------------------------------------------------------------ */
    document.querySelectorAll(".gallery-grid img").forEach(img => {
        if (img.complete) img.classList.add("loaded");
        else img.onload = () => img.classList.add("loaded");
    });

});

/* ========================================================================
   FUNCTIONS
======================================================================== */

/* Lightbox initializer */
function initGalleryLightbox() {
    GLightbox({
        selector: ".glightbox",
        closeOnOutsideClick: true,
        touchNavigation: true,
        loop: true,
        zoomable: true
    });
}

/* Lazy fade-in for dynamically loaded gallery images */
function enableLazyFadeIn() {
    document.querySelectorAll(".gallery-grid img").forEach(img => {
        img.loading = "lazy";
        img.onload = () => img.classList.add("loaded");
    });
}
