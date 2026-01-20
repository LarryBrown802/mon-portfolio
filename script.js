// Smooth Scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation simple au scroll (apparition des éléments)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// On cible tous les éléments qui doivent apparaître
// Note : il faut ajouter un style initial dans le CSS pour que ça marche
// Pour faire simple ici, on applique l'effet directement
document.querySelectorAll('.project-card, .skill-category, .about-text').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});
/* =========================================
   GESTION DES MODALES PROJETS
   ========================================= */

// Sélection des éléments du DOM
const modalOverlay = document.getElementById('project-modal');
const modalHeaderContainer = modalOverlay.querySelector('.modal-header');
const modalBodyContainer = modalOverlay.querySelector('.modal-body');
const closeBtn = modalOverlay.querySelector('.modal-close-btn');
const projectCards = document.querySelectorAll('.card-interactive');

// Fonction pour ouvrir la modale
function openModal(card) {
    // 1. Récupérer le contenu caché dans la carte cliquée
    const hiddenDetails = card.querySelector('.project-hidden-details');
    
    // 2. Extraire les deux parties (header et body)
    const headerContent = hiddenDetails.querySelector('.modal-header-content').innerHTML;
    const bodyContent = hiddenDetails.querySelector('.modal-body-content').innerHTML;

    // 3. Injecter le contenu dans le conteneur de la modale
    modalHeaderContainer.innerHTML = headerContent;
    modalBodyContainer.innerHTML = bodyContent;

    // 4. Afficher la modale avec animation
    modalOverlay.style.display = 'flex';
    // Petit délai pour permettre la transition CSS (opacity/transform)
    setTimeout(() => {
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open'); // Empêche le scroll du body
    }, 10);
}

// Fonction pour fermer la modale
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Attendre la fin de l'animation CSS avant de masquer complètement
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        // Nettoyer le contenu pour éviter des glitchs à la réouverture
        modalHeaderContainer.innerHTML = '';
        modalBodyContainer.innerHTML = '';
    }, 300); // Doit correspondre à la durée de transition CSS (0.3s)
}

// --- Écouteurs d'événements ---

// 1. Clic sur une carte projet
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        openModal(card);
    });
});

// 2. Clic sur le bouton fermer (la croix)
closeBtn.addEventListener('click', closeModal);

// 3. Clic en dehors de la modale (sur l'overlay sombre)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// 4. Touche Echap du clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});