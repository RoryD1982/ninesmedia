// ── NAV SCROLL EFFECT ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── SPA NAVIGATION ──
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');

// ── PER-PAGE META DATA ──
const pageMeta = {
  home: {
    title: 'Nines Media | Digital Marketing & AI Agency Johannesburg | Google Ads, PPC & Facebook Marketing',
    description: 'Nines Media is a full-service digital marketing and AI agency in Johannesburg. Google Ads, PPC, Facebook marketing, social media management, branding and web development for South African brands.'
  },
  about: {
    title: 'About Nines Media | Creative & Digital Marketing Agency Johannesburg, Gauteng',
    description: 'Meet Nines Media — a creative and digital marketing agency based in Johannesburg. Google & META certified partner specialising in brand strategy, digital advertising, content creation and AI marketing across South Africa.'
  },
  services: {
    title: 'Digital Marketing Services | Google Ads, PPC, Facebook Ads, Social Media & Branding — Nines Media',
    description: 'Full-service digital marketing from Nines Media Johannesburg: Google Ads management, PPC advertising, Facebook & Meta ads, LinkedIn marketing, social media management, branding, content creation and web development.'
  },
  work: {
    title: 'Our Work | Digital Marketing & Creative Case Studies — Nines Media Johannesburg',
    description: 'See how Nines Media drives real results for South African brands — Google Ads campaigns, Meta advertising, brand identity projects and social media strategies across Johannesburg, Gauteng and beyond.'
  },
  blog: {
    title: 'Digital Marketing Blog | Strategy, Ads, Social Media & Branding Insights — Nines Media',
    description: 'Expert digital marketing insights from the Nines Media team. Google Ads tips, Facebook advertising strategy, social media management advice, branding guidance and AI marketing trends for South African businesses.'
  },
  contact: {
    title: 'Contact Nines Media | Digital Marketing Agency Johannesburg — Get a Free Consultation',
    description: 'Get in touch with Nines Media, Johannesburg\'s leading digital marketing and creative agency. Free consultation for Google Ads, PPC, Facebook marketing, social media, branding and web development.'
  }
};

function updateMeta(pageId) {
  const meta = pageMeta[pageId] || pageMeta.home;
  document.title = meta.title;
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', meta.description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', meta.title);
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', meta.description);
}

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
  // update meta tags for SEO / social sharing
  updateMeta(pageId);
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
navigateTo('home');
setTimeout(initReveal, 100);
