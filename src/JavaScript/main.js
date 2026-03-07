/* ==============================================
   main.js — Animations & interactions portfolio
   ============================================== */

/* ---- MATRIX CANVAS ---- */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let drops = [];

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = Math.floor(canvas.width / 18);
  drops = Array.from({ length: cols }, () => Math.random() * -canvas.height);
}

const chars = '01アイウエオカキクケコサシスセソタチツテトABCDEF{}[]<>/\\';

function drawMatrix() {
  ctx.fillStyle = 'rgba(5,11,20,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00d4ff';
  ctx.font = '13px Share Tech Mono, monospace';
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 18, y);
    drops[i] += 18;
    if (drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
  });
}

initMatrix();
setInterval(drawMatrix, 60);
window.addEventListener('resize', initMatrix);


/* ---- TYPING EFFECT ---- */
const phrases = [
  'Cybersécurité & Réseaux',
  'Administration systèmes',
  'Cloud AWS | Infrastructure',
  "En quête d'un stage 2026",
];
let pIdx = 0, cIdx = 0, deleting = false;
const output = document.getElementById('typing-output');

function type() {
  const current = phrases[pIdx];
  if (!deleting) {
    output.textContent = current.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    output.textContent = current.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();


/* ---- NAV HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ---- SCROLL REVEALS ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => revealObserver.observe(el));


/* ---- ACTIVE NAV LINK ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent-cyan)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
