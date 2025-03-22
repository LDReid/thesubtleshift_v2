// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Accordion functionality
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    function toggleAccordion(trigger, forceState = null) {
        const isExpanded = forceState !== null ? forceState : trigger.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions if we're opening this one
        if (!isExpanded) {
            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger && otherTrigger.getAttribute('aria-expanded') === 'true') {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        trigger.setAttribute('aria-expanded', !isExpanded);
    }
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => toggleAccordion(trigger));
    });
    
    // Open first accordion by default on larger screens
    const firstAccordionTrigger = document.querySelector('.accordion-trigger');
    if (firstAccordionTrigger && window.innerWidth >= 768) {
        setTimeout(() => {
            toggleAccordion(firstAccordionTrigger, false);
        }, 500);
    }

    // Services Carousel
    const servicesCarousel = document.querySelector('.services-carousel');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (servicesCarousel && serviceCards.length > 0) {
        // Carousel Navigation
        const cardWidth = serviceCards[0].offsetWidth;
        const gap = 24; // Match the gap from CSS
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                servicesCarousel.scrollBy({
                    left: -(cardWidth + gap),
                    behavior: 'smooth'
                });
            });
        }
        
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                servicesCarousel.scrollBy({
                    left: (cardWidth + gap),
                    behavior: 'smooth'
                });
            });
        }
        
        // Service modals
        const infoButtons = document.querySelectorAll('.service-info-button');
        const modals = document.querySelectorAll('.service-modal');
        
        infoButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle the modal
                if (modals[index].classList.contains('active')) {
                    modals[index].classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    // Close any open modals first
                    modals.forEach(modal => {
                        modal.classList.remove('active');
                    });
                    
                    // Open this modal
                    modals[index].classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal on background click
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close modals with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = '';
            }
        });
    }
}); 