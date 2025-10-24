// ===== Loading screen =====
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const wheel = document.querySelector('.car-wheel');
  if (wheel && loadingScreen) {
    const hide = () => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => (loadingScreen.style.display = 'none'), 600);
    };
    wheel.addEventListener('click', hide);
    setTimeout(hide, 5000);
  }
});

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== Smooth scroll and active link =====
const headerEl = document.querySelector('.header');
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetID = anchor.getAttribute('href');
    const target = document.querySelector(targetID);
    if (!target) return;
    e.preventDefault();
    const headerH = headerEl ? headerEl.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - (headerH + 10);
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-menu a');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (pageYOffset >= top) current = section.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

// ===== Simple reveal animation =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('reveal');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.content-text, .section-image').forEach(el => {
  el.classList.add('will-reveal');
  observer.observe(el);
});

// ===== Header background on scroll =====
window.addEventListener('scroll', () => {
  const hdr = document.querySelector('.header');
  if (!hdr) return;
  if (window.scrollY > 80) {
    hdr.style.background = 'rgba(30,60,114,.96)';
    hdr.style.backdropFilter = 'blur(10px)';
  } else {
    hdr.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    hdr.style.backdropFilter = 'none';
  }
});

// ===== Small helpers =====
document.body.classList.add('loaded');
