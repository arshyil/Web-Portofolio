// Smooth fade-in animation on scroll
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Ganti ikon (☰ jadi ✖)
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { Accept: "application/json" },
  });
  if (response.ok) {
    alert("Message sent successfully!");
    form.reset();
  } else {
    alert("Failed to send message. Please try again.");
  }
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll(".bar span");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const span = entry.target;
        const skillPercent = span.getAttribute("data-skill");
        span.style.width = skillPercent;
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

const navLinksAll = document.querySelectorAll(".nav-links a");
const sectionsAll = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sectionsAll.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ===== TYPED TEXT EFFECT =====
const typedText = document.querySelector(".typed-text");
const words = ["Front-End Developer", "UI Designer", "IT Support"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
    typedText.textContent = currentWord.substring(0, charIndex);
  } else {
    charIndex++;
    typedText.textContent = currentWord.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1500); // pause sebelum hapus
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300); // pause sebelum ketik kata berikutnya
  } else {
    setTimeout(type, isDeleting ? 50 : 100); // kecepatan ketik
  }
}

type();

// ========== PARTICULAR ANNIMATION ===========
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
  }
  draw() {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Smooth page transition effect
const links = document.querySelectorAll('a[href^="#"]');
const overlay = document.getElementById('page-transition');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      overlay.classList.add('active'); // mulai animasi fade out

      setTimeout(() => {
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        overlay.classList.remove('active'); // fade in overlay hilang
      }, 300); // 300ms delay biar animasi terlihat
    }
  });
});

// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.5s ease-out";

  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// ====== DARK MODE =====
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Ganti ikon
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});
