document.addEventListener("DOMContentLoaded", () => {
    // Seleziona tutti gli elementi con la classe .animate-item
    const animatedItems = document.querySelectorAll('.animate-item');
    
    // Funzione per mostrare gli elementi con un ritardo progressivo (Staggered effect)
    const animateOnLoad = () => {
        animatedItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100); // 100ms di ritardo tra un elemento e l'altro
        });
    };

    // Fai partire l'animazione poco dopo il caricamento per evitare scatti
    requestAnimationFrame(() => {
        setTimeout(animateOnLoad, 50);
    });
});