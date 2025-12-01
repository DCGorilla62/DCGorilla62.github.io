/* MOBILE HAMBURGER MENU */
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-button");
    const menu = document.getElementById("mobile-menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.style.display =
                menu.style.display === "block" ? "none" : "block";
        });
    }
});

/* LOAD SECTIONS + INIT LIGHTBOX WHEN GALLERY LOADS */
document.addEventListener("DOMContentLoaded", () => {
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
            .catch(err => console.warn(`Missing section: ${id}`));
    });
});

/* INIT GLIGHTBOX */
function initGalleryLightbox() {
    GLightbox({
        selector: ".glightbox",
        closeOnOutsideClick: true,
        touchNavigation: true,
        loop: true,
        zoomable: true
    });
}

/* LAZY LOAD + SMOOTH FADE-IN */
function enableLazyFadeIn() {
    document.querySelectorAll(".gallery-grid img").forEach(img => {
        img.loading = "lazy";
        img.onload = () => img.classList.add("loaded");
    });
}

// Add fade-in class when images load
// Add fade-in class when images load
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".gallery-grid img").forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.onload = () => img.classList.add("loaded");
        }
    });
});
