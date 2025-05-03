document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-menu');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // Remove Menu on Link Click
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav) {
                nav.classList.remove('show');
            }
        });
    });

    // Scroll Sections Active Link
    const sections = document.querySelectorAll('section[id]');
    const scrollActive = () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 58;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else if (navLink) {
                navLink.classList.remove('active-link');
            }
        });
    };
    window.addEventListener('scroll', scrollActive);

    // Dark Mode Toggle
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    };

    // Check Dark Mode Preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Card Toggle for "Voir plus/Voir moins"
    const cardToggles = document.querySelectorAll('.card__toggle');
    cardToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const card = toggle.closest('.card');
            const content = card.querySelector('.card__content');
            const isExpanded = card.classList.contains('expanded');

            // Toggle expanded state
            card.classList.toggle('expanded');
            toggle.textContent = isExpanded ? 'Voir plus' : 'Voir moins';
            toggle.setAttribute('data-action', isExpanded ? 'more' : 'less');

            // Clean up content (remove unnecessary spaces)
            const uls = content.querySelectorAll('ul');
            uls.forEach(ul => {
                ul.style.margin = '0';
                ul.style.padding = '0 0 0 1.2rem';
            });
        });
    });

    // ScrollReveal Animations
    const sr = ScrollReveal({
        origin: 'top',
        distance: '50px',
        duration: 1800,
        delay: 200,
    });

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text');
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 300 });
    sr.reveal('.home__social-icon', { interval: 200 });
    sr.reveal('.skills__data, .card', { interval: 200 });
});