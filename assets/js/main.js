// Dark mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDarkMode);
});

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Highlight the current section
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*=${sectionId}]`);

        if (!navLink) {
            return;
        }

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
});

// Subtle, one-time scroll animations
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '28px',
        duration: 900,
        delay: 80,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false
    });

    sr.reveal('.home__data, .home__visual', { interval: 120 });
    sr.reveal('.home__highlights > div', { interval: 80 });
    sr.reveal('.section-heading, .about__lead, .about__copy', { interval: 100 });
    sr.reveal('.skills__data', { interval: 70 });
    sr.reveal('.work__item', { interval: 80 });
    sr.reveal('.project-card', { interval: 100 });
    sr.reveal('.card', { interval: 100 });
}

// Experience details
document.querySelectorAll('.work__toggle').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.work__card');
        const showMore = button.getAttribute('data-action') === 'more';

        card.classList.toggle('expanded', showMore);
        button.textContent = showMore ? 'View less' : 'View more';
        button.setAttribute('data-action', showMore ? 'less' : 'more');
    });
});
