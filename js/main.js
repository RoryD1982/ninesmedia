// ── NAV SCROLL EFFECT ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
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

    try {
      const response = await fetch('https://formspree.io/f/xvzjvjyy', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thanks for reaching out — we\'ll be in touch shortly.';
        form.reset();
      } else {
        const data = await response.json();
        formStatus.className = 'form-status error';
        formStatus.textContent = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Please try again or email us directly.';
      }
    } catch (err) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Something went wrong. Please email us at info@ninesmedia.co.za';
    }

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

// ── BLOG EXPAND / COLLAPSE ──
document.querySelectorAll('.blog-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const bodyId = btn.getAttribute('aria-controls');
    const body = document.getElementById(bodyId);
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      body.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Read more →';
    } else {
      body.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Show less ↑';
    }
  });
});

// ── INIT ──
setTimeout(initReveal, 100);
