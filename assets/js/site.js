/* ============================================================
   MOBILE HAMBURGER MENU
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-button");
    const menu = document.getElementById("mobile-menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            const open = menu.style.display === "block";
            menu.style.display = open ? "none" : "block";
        });
    }
});


/* ============================================================
   LOAD EXTERNAL ARTICLE SECTIONS (Dimension Articles)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const articles = document.querySelectorAll("#main article");
    let loaded = 0;

    articles.forEach(article => {
        const id = article.id;

        fetch(`sections/${id}.html`)
            .then(resp => resp.text())
            .then(html => {
                article.innerHTML = html;
                loaded++;

                // When ALL sections have finished loading → initialize gallery
                if (loaded === articles.length) {
                    initGallery();
                }
            })
            .catch(err => console.warn(`Missing file for article: ${id}`));
    });
});


/* ============================================================
   INITIALIZE GLIGHTBOX (After content loads)
============================================================ */
function initGallery() {
    console.log("Gallery initialized");

    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        closeOnOutsideClick: true,
        openEffect: 'zoom',
        closeEffect: 'zoom'
    });

    /* ============================================================
       FIX — Prevent Dimension from closing article when lightbox is open
    ============================================================= */
    lightbox.on('open', () => {
        document.body.classList.add('glightbox-open');
    });

    lightbox.on('close', () => {
        document.body.classList.remove('glightbox-open');
    });
}
