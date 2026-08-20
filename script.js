const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");
let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
let curX = mouseX, curY = mouseY;

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateCursor() {
  curX += (mouseX - curX) * 0.14;
  curY += (mouseY - curY) * 0.14;
  cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll("a, button, .skill-card").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("active"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

// Magnetic buttons
document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.16;
    const y = (e.clientY - r.top - r.height / 2) * 0.16;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

// Small parallax effect for hero SVG
const art = document.querySelector(".hero-art");
window.addEventListener("scroll", () => {
  if (!art) return;
  const y = window.scrollY;
  art.style.translate = `0 ${y * 0.08}px`;
});

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();


// Subtle parallax for the hero visual cards
const heroVisual = document.querySelector(".hero-visual-cards");
if (heroVisual && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / innerWidth - .5);
    const y = (e.clientY / innerHeight - .5);
    heroVisual.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
  });
}
