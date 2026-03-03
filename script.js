// 1. Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('loader-hidden'), 1000);
});

// 2. Main Logic
document.addEventListener('DOMContentLoaded', () => {
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
    const [hamburger, navMenu] = [document.getElementById('hamburger'), document.getElementById('nav-menu')];
    if (hamburger && navMenu) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle');
            document.body.style.overflow = isActive ? 'hidden' : 'initial';
        };
        hamburger.addEventListener('click', toggleMenu);
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', toggleMenu));
    }

    // --- SLIDER ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let current = 0;
        const move = (dir) => {
            slides[current].classList.remove('active');
            current = (current + dir + slides.length) % slides.length;
            slides[current].classList.add('active');
        };
        document.getElementById('nextBtn')?.addEventListener('click', () => move(1));
        document.getElementById('prevBtn')?.addEventListener('click', () => move(-1));
        setInterval(() => move(1), 5000);
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
            eliteSection.classList.toggle('has-zoomed', isZoomed);
        });
    });

    window.addEventListener('scroll', () => {
        const sTop = window.scrollY;

        // Navbar & Dock Logic
        if (nav) nav.classList.toggle('scrolled', sTop > 50);
        let currId = "";
        sections.forEach(s => { if (sTop >= s.offsetTop - 250) currId = s.id; });
        dockItems.forEach(item => item.style.color = (currId && item.getAttribute("href").includes(currId)) ? "#C5A059" : "#555");

        // --- 3D Spread Logic ---
        if (eliteSection && !isZoomed) {
            const sOffset = eliteSection.offsetTop;
            const sHeight = eliteSection.offsetHeight;
            
            // This math makes the animation reach 100% (frac = 1) 
            // much faster, so you don't scroll through "empty" space.
            let frac = (sTop - sOffset) / (sHeight - window.innerHeight);
            frac = Math.max(0, Math.min(1, frac));

            eliteItems.forEach((item, i) => {
                const off = i - (eliteItems.length - 1) / 2;
                
                const x = off * (frac * 400); 
                const z = Math.abs(off) * (frac * -150);
                const r = off * (frac * 18);
                
                item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${r}deg)`;
                // Removed the transparency logic so they stay solid
                item.style.opacity = "1"; 
            });
        }
    });
});
