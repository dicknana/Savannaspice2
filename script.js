// 1. Loader Logic (Runs immediately when window is ready)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 1000);
    }
});

// 2. All Core Logic (Runs once DOM is loaded)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- WHATSAPP FORM LOGIC ---
    const farmerForm = document.getElementById('farmer-form');
    if (farmerForm) {
        farmerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('farmer_name').value;
            const phone = document.getElementById('farmer_phone').value;
            const loc = document.getElementById('farm_location').value;
            const role = document.getElementById('user_type').value;

            const message = `*🌱 SAVANNA SPICES PORTAL*%0A*Role:* ${role}%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Location:* ${loc}`;
            window.open(`https://wa.me/255743228558?text=${message}`, '_blank');
        });
    }

    // --- MOBILE MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle');
            
            // Toggle body scroll to prevent background scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
        });

        // Close menu when links are clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // --- IMAGE SLIDER ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Auto-play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // --- SCROLL EFFECTS (Navbar Shrink & Liquid Dock) ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        const sections = document.querySelectorAll("section, header");
        const dockItems = document.querySelectorAll(".liquid-dock a");
        let currentSectionId = "";

        // 1. Professional Navbar Shrink
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        // 2. Liquid Dock Highlight
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 250) {
                currentSectionId = section.getAttribute("id");
            }
        });

        dockItems.forEach((item) => {
            item.style.color = "#555"; // Default inactive color
            if (currentSectionId && item.getAttribute("href").includes(currentSectionId)) {
                item.style.color = "#C5A059"; // Savanna Gold active color
            }
        });
    });
});

  