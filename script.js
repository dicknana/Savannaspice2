document.getElementById('farmer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('farmer_name').value;
    const phone = document.getElementById('farmer_phone').value;
    const loc = document.getElementById('farm_location').value;
    const role = document.getElementById('user_type').value;

    const message = `*🌱 SAVANNA SPICES PORTAL*%0A*Role:* ${role}%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Location:* ${loc}`;
    window.open(`https://wa.me/255743228558?text=${message}`, '_blank');
});

// Auto-activate Navigation Icons
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section, header");
  const navItems = document.querySelectorAll(".dock-item");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").includes(current)) {
      item.classList.add("active");
    }
  });
});
// Image Slider Logic
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Auto-play slider every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);
