document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="ph ph-x"></i>';
        } else {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Gallery Generation
    const imageNames = [
        '01.webp', '02.webp', '03.webp', '04.webp', '05.webp', 
        '06.webp', '07.webp', '08.jpg', '09.jpg', '10.jpg', 
        '11.webp', '12.webp', '13.png', '14.jpg', '15.jpg', 
        '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'
    ];
    const baseUrl = 'https://raw.githubusercontent.com/merttezdzhan/mertphotography.github.io/main/';
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (portfolioGrid) {
        portfolioGrid.innerHTML = imageNames.map((img, index) => `
            <div class="portfolio-item" data-index="${index}">
                <img src="${baseUrl}${img}" alt="Galeri Fotoğrafı ${index + 1}" loading="lazy">
                <div class="portfolio-overlay">
                    <i class="ph ph-magnifying-glass-plus"></i>
                </div>
            </div>
        `).join('');
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const btnPrev = document.querySelector('.lightbox-prev');
    const btnNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    const openLightbox = (index) => {
        currentImageIndex = index;
        lightboxImg.src = `${baseUrl}${imageNames[currentImageIndex]}`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    portfolioGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        }
    });

    const closeLightboxModal = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    const showNext = () => {
        currentImageIndex = (currentImageIndex + 1) % imageNames.length;
        lightboxImg.src = `${baseUrl}${imageNames[currentImageIndex]}`;
    };

    const showPrev = () => {
        currentImageIndex = (currentImageIndex - 1 + imageNames.length) % imageNames.length;
        lightboxImg.src = `${baseUrl}${imageNames[currentImageIndex]}`;
    };

    closeLightbox.addEventListener('click', closeLightboxModal);
    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightboxModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

});
