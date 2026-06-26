$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Modal de seleção de idioma do currículo
    const cvOverlay = document.getElementById('cv_modal_overlay');

    function openCvModal() {
        cvOverlay.classList.add('active');
    }

    function closeCvModal() {
        cvOverlay.classList.remove('active');
    }

    document.getElementById('cv_trigger_desktop')?.addEventListener('click', openCvModal);
    document.getElementById('cv_trigger_mobile')?.addEventListener('click', () => {
        $('#mobile_menu').removeClass('active');
        openCvModal();
    });
    document.getElementById('cv_modal_close')?.addEventListener('click', closeCvModal);

    cvOverlay?.addEventListener('click', function(event) {
        if (event.target === cvOverlay) {
            closeCvModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCvModal();
        }
    });

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    // Intersection Observer callback
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeIndex = Array.from(sections).indexOf(entry.target);
                navItems.forEach((navItem, index) => {
                    navItem.classList.toggle('active', index === activeIndex);
                });
            }
        });
    }

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, {
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial check to handle when the page loads
    handleIntersection(Array.from(sections).map(section => ({ isIntersecting: true, target: section })));
});
