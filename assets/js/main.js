// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Active Link Highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__link[href*=${sectionId}]`).classList.add('active-link');
        } else {
            document.querySelector(`.nav__link[href*=${sectionId}]`).classList.remove('active-link');
        }
    });
});

// ScrollReveal Animations
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.home__data, .home__social, .home__map', { interval: 200 });
sr.reveal('.about__img, .about__text', { interval: 200 });
sr.reveal('.skills__subtitle, .skills__text, .skills__data', { interval: 200 });
sr.reveal('.work__item', { interval: 200 });
sr.reveal('.education__container', { interval: 200 });
sr.reveal('.footer__title, .footer__contact, .footer__copy', { interval: 200 });

// Work Item Expand/Collapse
document.querySelectorAll('.work__toggle').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.work__card');
        const action = button.getAttribute('data-action');
        if (action === 'more') {
            card.classList.add('expanded');
            button.textContent = 'Voir moins';
            button.setAttribute('data-action', 'less');
        } else {
            card.classList.remove('expanded');
            button.textContent = 'Voir plus';
            button.setAttribute('data-action', 'more');
        }
    });
});

// Initialize Leaflet Map
const map = L.map('map').setView([50.629250, 3.057256], 12); // Centered on Lille, France
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Custom marker icon
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #3b82f6, #a855f7); width: 30px; height: 30px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});

L.marker([50.629250, 3.057256], { icon: customIcon }).addTo(map)
    .bindPopup('Saad El Aboudi<br>Lille, France')
    .openPopup();