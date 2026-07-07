document.addEventListener("DOMContentLoaded", () => {
    // 1. Fetch dei dati dal file JSON
    fetch('menu.json')
        .then(response => {
            if (!response.ok) throw new Error("Errore nel caricamento del menu");
            return response.json();
        })
        .then(data => {
            buildMenu(data.menu);
            setupScrollAnimations();
        })
        .catch(error => console.error("Errore:", error));
});

function buildMenu(menuData) {
    const navContainer = document.getElementById('categoryNav');
    const menuContainer = document.getElementById('menuContainer');

    // Icona Peperoncino (Emoji scalata e posizionata)
    const spicyIcon = `<span class="icon-spicy">🌶️</span>`;

    menuData.forEach(category => {
        // A. Crea il link nella Navigazione Sticky
        const navLink = document.createElement('a');
        navLink.href = `#${category.categoryId}`;
        navLink.className = 'nav-link';
        navLink.textContent = category.categoryName;
        
        // Scroll morbido al click
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(category.categoryId);
            // Offset per calcolare l'altezza della navbar sticky
            const offset = 60; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
        navContainer.appendChild(navLink);

        // B. Crea la Sezione del Menu
        const section = document.createElement('section');
        section.id = category.categoryId;
        section.className = 'category-section';

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = category.categoryName;
        section.appendChild(title);

        // C. Popola i piatti
        category.items.forEach(item => {
            const article = document.createElement('article');
            article.className = 'menu-item';
            
            // Gestione "Piatto del Giorno"
            let specialHtml = '';
            if (item.piattoDelGiorno) {
                article.classList.add('item-special');
                specialHtml = `<span class="special-label">Il piatto del giorno</span>`;
            }

            // Gestione Badges (Novità e Piccante)
            let badgesHtml = '';
            if (item.novita) badgesHtml += `<span class="badge-new">Novità</span>`;
            if (item.piccante) badgesHtml += spicyIcon;

            // Template Literals per impaginare il singolo piatto
            article.innerHTML = `
                ${specialHtml}
                <div class="item-header">
                    <h3 class="item-name">
                        ${item.name} ${badgesHtml}
                    </h3>
                    <div class="item-dots"></div>
                    <span class="item-price">€${item.price}</span>
                </div>
                <p class="item-ingredients">${item.ingredients}</p>
            `;
            section.appendChild(article);
        });

        menuContainer.appendChild(section);
    });
}

// 2. Animazioni di Scroll (Fade In)
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.category-section');
    
    // Intersection Observer per rivelare le sezioni man mano che si scrolla
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima solo la prima volta
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Scatta quando il 10% della sezione è visibile
        rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => observer.observe(section));
}