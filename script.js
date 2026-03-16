/* =====================================================
   1. GLOBAL FUNCTIONS (Must be outside for HTML to see)
===================================================== */
function toggleModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // Check if it's currently hidden or shown
    const isHidden = modal.style.display === "none" || modal.style.display === "";
    
    if (isHidden) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Stop background scroll
    } else {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scroll
    }
}

// Close modal if user clicks the dark background
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('spice-modal')) {
        e.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

/* =====================================================
   2. MAIN LOGIC (Inside DOMContentLoaded)
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- LOADER ---
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => loader.classList.add('loader-hidden'), 1000);
    }

    // --- WHATSAPP FORM ---
    const farmerForm = document.getElementById('farmer-form');
    if (farmerForm) {
        farmerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const vals = ['farmer_name', 'farmer_phone', 'farm_location', 'user_type'].map(id => document.getElementById(id).value);
            const message = `*🌱 SAVANNA SPICES PORTAL*%0A*Role:* ${vals[3]}%0A*Name:* ${vals[0]}%0A*Phone:* ${vals[1]}%0A*Location:* ${vals[2]}`;
            window.open(`https://wa.me/255743228558?text=${message}`, '_blank');
        });
    }

    // --- MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle');
            document.body.style.overflow = isActive ? 'hidden' : 'initial';
        };
        hamburger.addEventListener('click', toggleMenu);
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', toggleMenu));
    }

    // --- ELITE GALLERY & SCROLL EFFECTS ---
    const eliteSection = document.querySelector('.elite-gallery');
    const eliteItems = document.querySelectorAll('.item');
    const nav = document.querySelector('.navbar');
    const sections = document.querySelectorAll("section, header");
    const dockItems = document.querySelectorAll(".liquid-dock a");
    let isZoomed = false;

    // Zoom Toggle
    eliteItems.forEach(item => {
        item.addEventListener('click', () => {
            isZoomed = !isZoomed;
            item.classList.toggle('zoomed', isZoomed);
            if (eliteSection) eliteSection.classList.toggle('has-zoomed', isZoomed);
        });
    });

    window.addEventListener('scroll', () => {
        const sTop = window.scrollY;

        // Navbar & Dock Logic
        if (nav) nav.classList.toggle('scrolled', sTop > 50);
        let currId = "";
        sections.forEach(s => { if (sTop >= s.offsetTop - 250) currId = s.id; });
        dockItems.forEach(item => {
            const href = item.getAttribute("href");
            item.style.color = (currId && href.includes(currId)) ? "#C5A059" : "#555";
        });

        // --- 3D Spread Logic ---
        if (eliteSection && !isZoomed) {
            const sOffset = eliteSection.offsetTop;
            const sHeight = eliteSection.offsetHeight;
            
            // Speed up factor (* 1.3) to prevent black space feel
            let frac = ((sTop - sOffset) / (sHeight - window.innerHeight)) * 1.3;
            frac = Math.max(0, Math.min(1, frac));

            eliteItems.forEach((item, i) => {
                const off = i - (eliteItems.length - 1) / 2;
                const x = off * (frac * 400); 
                const z = Math.abs(off) * (frac * -150);
                const r = off * (frac * 18);
                item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${r}deg)`;
                item.style.opacity = "1"; 
            });
        }
    });
});
