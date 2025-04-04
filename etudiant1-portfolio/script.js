
// Création d'un curseur personnalisé
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Effet de traînée du curseur
const cursorTrails = [];
for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    cursorTrails.push({
        element: trail,
        x: 0,
        y: 0
    });
}

// Mise à jour de la position du curseur
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Mise à jour des positions des traînées avec délai
    setTimeout(() => {
        cursorTrails.forEach((trail, index) => {
            const delay = (index + 1) * 50;
            setTimeout(() => {
                trail.x = e.clientX;
                trail.y = e.clientY;
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
            }, delay);
        });
    }, 0);
});

// Effets de survol du curseur
const hoverElements = document.querySelectorAll('a, button, .project-card, .contact-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });
});

// Basculer entre les thèmes clair/sombre
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Vérifier le thème enregistré dans les préférences
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Défilement fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Effet de défilement sur l'en-tête
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Soumission du formulaire de contact
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        subject: contactForm.querySelectorAll('input[type="text"]')[1].value,
        message: contactForm.querySelector('textarea').value
    };
    
    // Ici, vous enverriez normalement les données du formulaire à un serveur
    console.log('Formulaire soumis:', formData);
    
    // Afficher un message de succès
    alert('Message envoyé avec succès ! Je vous répondrai dès que possible.');
    
    // Réinitialiser le formulaire
    contactForm.reset();
});

// Bouton de téléchargement du CV
document.getElementById('download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    // Dans un scénario réel, cela téléchargerait le fichier CV
    alert('Téléchargement du CV... (fonctionnalité à implémenter)');
});

// Animation de l'indicateur de menu
const menuIndicator = document.querySelector('.menu-indicator');
const navLinksItems = document.querySelectorAll('.nav-link');

navLinksItems.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const rect = link.getBoundingClientRect();
        menuIndicator.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
        menuIndicator.style.opacity = '1';
    });
    
    link.addEventListener('mouseleave', () => {
        menuIndicator.style.opacity = '0';
    });
});

// Animation au défilement
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Définir l'état initial pour les éléments animés
document.querySelectorAll('.timeline-item, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Exécuter au chargement et au défilement
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
