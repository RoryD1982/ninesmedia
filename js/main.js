// ── NAV SCROLL EFFECT ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── SPA NAVIGATION ──
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  navLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
  // close mobile menu
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');

  // trigger reveals
  setTimeout(initReveal, 50);
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// ── HAMBURGER ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ── SCROLL REVEAL ──
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ── STAT COUNTER ANIMATION ──
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    formStatus.className = 'form-status';

    // Simulate form submission (replace with actual endpoint)
    await new Promise(r => setTimeout(r, 1200));

    formStatus.className = 'form-status success';
    formStatus.textContent = 'Thanks for reaching out — we\'ll be in touch shortly.';
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
}

// ── OBSERVE STATS SECTION ──
const statsSection = document.querySelector('.stats-strip');
if (statsSection) {
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObs.disconnect();
    }
  }, { threshold: 0.4 });
  statsObs.observe(statsSection);
}

// ── N MARK PARALLAX ──
const heroN = document.querySelector('.hero-n-mark');
if (heroN) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroN.style.transform = `translateY(${y * 0.15}px)`;
  });
}

// ── INIT ──
navigateTo('home');
setTimeout(initReveal, 100);
