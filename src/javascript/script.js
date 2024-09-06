$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
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
    handleIntersection(sections.map(section => ({ isIntersecting: true, target: section })));
});
