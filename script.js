window.addEventListener('load', () => {
    // Force scroll to top on reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.nav-link');

    // Check if we should skip the loader (URL param only)
    const skipLoader = new URLSearchParams(window.location.search).has('noloader');

    if (skipLoader && preloader) {
        // Instant show for returning users - skip preloader entirely
        preloader.style.display = 'none';
        if (mainContent) mainContent.classList.add('loaded');
        document.body.style.overflowY = 'auto';

        // Make the NAVBAR logo static (no animation)
        const headerLogoPath = document.querySelector('.header-logo .logo-path');
        const headerBrandName = document.querySelector('.header-logo .brand-name');
        
        if (headerLogoPath) {
            headerLogoPath.style.animation = 'none';
            headerLogoPath.style.strokeDashoffset = '0';
        }
        if (headerBrandName) {
            headerBrandName.style.animation = 'none';
            headerBrandName.style.opacity = '1';
            headerBrandName.style.transform = 'translateY(0)';
        }

        const header = document.querySelector('.site-header');
        if (header) {
            header.style.transition = 'none';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }
    } else {
        // Wait for the 4s animation cycle to complete
        setTimeout(() => {
            // Fade out preloader
            if (preloader) preloader.classList.add('fade-out');
            
            // Show main content
            if (mainContent) mainContent.classList.add('loaded');
            
            // Remove preloader from DOM after fade
            setTimeout(() => {
                if (preloader) preloader.style.display = 'none';
                document.body.style.overflowY = 'auto'; // Enable scrolling
            }, 1000);
        }, 4000);
    }

    // Mobile Menu Logic
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Auto-close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (toggle) toggle.classList.remove('active');
            if (nav) nav.classList.remove('active');
        });
    });

    // Siri Society Slideshow Logic
    const societySlideshow = document.querySelector('#society .slideshow-container');
    if (societySlideshow) {
        const images = Array.from({length: 12}, (_, i) => `${i + 1}.jpg`);
        let currentSlide = 0;

        // Create and inject slide elements
        images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.backgroundImage = `url('assets/images/siri_society/${img}')`;
            societySlideshow.appendChild(slide);
        });

        const slides = societySlideshow.querySelectorAll('.slide');
        
        if (slides.length > 0) {
            // Activate first slide
            slides[0].classList.add('active');

            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 3000);
        }
    }
});
