# Nines Media Website

**Progressive Digital Experiences** — [ninesmedia.com](https://www.ninesmedia.com)

## Overview

A clean, minimal multi-page website for Nines Media, built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies — just fast, well-structured front-end code.

## Structure

```
ninesmedia/
├── index.html          # Main SPA entry point (all pages)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Navigation, animations, form handling
└── images/             # Logo and brand assets (add your files here)
```

## Pages

- **Home** — Hero, stats strip, services preview, about teaser, blog preview, CTA
- **About** — Full agency story, approach methodology, values
- **Services** — Detailed breakdown of all 5 services
- **Blog** — 6-post grid with categories
- **Contact** — Contact form + info

## Features

- Single-page app navigation (no page reloads)
- Smooth scroll-triggered reveal animations
- Animated stat counters
- Parallax N-mark on hero
- Responsive mobile menu
- Working contact form (wire up to your backend/Formspree/Netlify Forms)
- Google Partner & META Partner badges
- Full responsive layout (mobile, tablet, desktop)

## Setup

1. Clone the repo
2. Open `index.html` in a browser — no build step needed
3. To deploy: push to GitHub and enable GitHub Pages, or deploy to Netlify/Vercel

## Contact Form

The form in `contact.html` simulates a submission. To wire it up for real:

**Option A — Formspree (easiest)**
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Option B — Netlify Forms**
Add `data-netlify="true"` to the `<form>` tag.

**Option C — Custom backend**
Replace the `await new Promise(...)` mock in `js/main.js` with a real `fetch()` POST.

## Brand

- **Primary font:** Barlow Condensed (display)
- **Body font:** Inter
- **Primary colour:** #0a0a0a
- **Logo:** See `images/` folder

## IMC Media (PTY) LTD T/A Nines Media
