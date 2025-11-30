/* ============================================================
   MOBILE HAMBURGER MENU
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-button");
    const menu = document.getElementById("mobile-menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            const isOpen = menu.style.display === "block";
            menu.style.display = isOpen ? "none" : "block";
        });
    }
});

/* ============================================================
   LOAD EXTERNAL ARTICLE SECTIONS (Dimension Articles)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const articles = document.querySelectorAll("#main article");

    articles.forEach(article => {
        const id = article.id;
        fetch(`../../sections/${id}.html`)
            .then(resp => resp.text())
            .then(html => {
                article.innerHTML = html;
            })
            .catch(err => {
                console.error(`Missing file for article: ${id}`);
            });
    });
});
