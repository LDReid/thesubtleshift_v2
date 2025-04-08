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

    // Book Sample Modal
    const bookSampleButton = document.querySelector('.book-sample-button');
    const bookSampleModal = document.querySelector('.book-sample-modal');
    const bookSampleModalClose = document.querySelector('.book-sample-modal-close');
    
    if (bookSampleButton && bookSampleModal) {
        // Open modal when clicking the Read Sample button
        bookSampleButton.addEventListener('click', (e) => {
            e.preventDefault();
            bookSampleModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal with close button
        if (bookSampleModalClose) {
            bookSampleModalClose.addEventListener('click', () => {
                bookSampleModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside content
        bookSampleModal.addEventListener('click', (e) => {
            if (e.target === bookSampleModal) {
                bookSampleModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookSampleModal.classList.contains('active')) {
                bookSampleModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Services Carousel
    const carousels = document.querySelectorAll('.services-carousel-container');
    
    carousels.forEach(container => {
        const carousel = container.querySelector('.services-carousel');
        const carouselPrev = container.querySelector('.carousel-prev');
        const carouselNext = container.querySelector('.carousel-next');
        const cards = container.querySelectorAll('.service-card');
        
        if (carousel && cards.length > 0) {
            // Carousel Navigation
            const cardWidth = cards[0].offsetWidth;
            const gap = 24; // Match the gap from CSS
            
            if (carouselPrev) {
                carouselPrev.addEventListener('click', () => {
                    carousel.scrollBy({
                        left: -(cardWidth + gap),
                        behavior: 'smooth'
                    });
                });
            }
            
            if (carouselNext) {
                carouselNext.addEventListener('click', () => {
                    carousel.scrollBy({
                        left: (cardWidth + gap),
                        behavior: 'smooth'
                    });
                });
            }
            
            // Service modals
            const infoButtons = container.querySelectorAll('.service-info-button');
            const modals = container.querySelectorAll('.service-modal');
            
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
        }
    });

    // Close modals with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.service-modal');
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });

    // Menu Toggle functionality
    const menuToggleButtons = document.querySelectorAll('.menu-toggle');
    const siteWrapper = document.querySelector('.site-wrapper');
    
    if (menuToggleButtons.length > 0 && siteWrapper) {
        // Function to toggle menu state
        const toggleMenu = function() {
            const isMenuOpen = siteWrapper.classList.contains('menu-open');
            const logoIcon = document.querySelector('.logo-icon');
            const siteName = document.querySelector('.site-name');
            
            // Toggle menu state
            menuToggleButtons.forEach(btn => {
                btn.setAttribute('aria-expanded', !isMenuOpen);
            });
            
            siteWrapper.classList.toggle('menu-open');
            
            // Toggle logo classes
            if (!isMenuOpen) {
                document.body.style.overflow = 'hidden';
                if (logoIcon) logoIcon.classList.add('secondary-bg');
                if (siteName) siteName.classList.add('secondary-title');
            } else {
                document.body.style.overflow = '';
                if (logoIcon) logoIcon.classList.remove('secondary-bg');
                if (siteName) siteName.classList.remove('secondary-title');
            }
        };
        
        // Add click event to all toggle buttons
        menuToggleButtons.forEach(button => {
            button.addEventListener('click', toggleMenu);
        });
        
        // Close menu when clicking on a menu item
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const logoIcon = document.querySelector('.logo-icon');
                const siteName = document.querySelector('.site-name');
                
                menuToggleButtons.forEach(btn => {
                    btn.setAttribute('aria-expanded', 'false');
                });
                siteWrapper.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                // Remove logo classes
                if (logoIcon) logoIcon.classList.remove('secondary-bg');
                if (siteName) siteName.classList.remove('secondary-title');
            });
        });
        
        // Allow closing with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && siteWrapper.classList.contains('menu-open')) {
                const logoIcon = document.querySelector('.logo-icon');
                const siteName = document.querySelector('.site-name');
                
                menuToggleButtons.forEach(btn => {
                    btn.setAttribute('aria-expanded', 'false');
                });
                siteWrapper.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                // Remove logo classes
                if (logoIcon) logoIcon.classList.remove('secondary-bg');
                if (siteName) siteName.classList.remove('secondary-title');
            }
        });
    }
}); 
// Blog Category Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const blogPosts = document.querySelectorAll('.blog-list-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = '';
                    post.style.opacity = '1';
                } else {
                    post.style.display = 'none';
                    post.style.opacity = '0';
                }
            });
        });
    });
});