# Langford & Associates — Law Firm Website

A responsive, multi-page website for a fictional corporate law firm, built with vanilla HTML, CSS, and JavaScript.

**Live site:** [https://renanfpina.github.io/law-firm-site/](https://renanfpina.github.io/law-firm-site/)

---

## About

**Langford & Associates** is a fictitious law firm specializing in Corporate Law. The design follows a sophisticated, premium, and corporate aesthetic — dark header/hero with light inner sections.

### Visual Identity

| Role | Color | Hex |
|------|-------|-----|
| Primary (dark background) | Contemporary Blue | `#0F2340` |
| Secondary (decoration) | Soft Gold | `#C9A84C` |
| Neutral light (backgrounds) | Off-white | `#F5F3EE` |
| Main text | Dark Gray | `#1C1C1C` |
| Secondary text | Medium Gray | `#6B6B6B` |

### Typography

| Role | Font | Style |
|------|------|-------|
| Headings | **Playfair Display** | Serif, elegant, classic |
| Body / UI | **Inter** | Sans-serif, readable, modern |

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Hero, Practice Areas (6 cards), Differentials, Contact CTA |
| `about.html` | Firm history, stats grid (20+ / 500+ / 98% / 12), Values, Team |
| `practice-areas.html` | 6 alternating sections: Corporate, M&A, Contracts, Litigation, Compliance, IP |
| `blog.html` | Featured post, article grid, CTA banner |
| `blog-post.html` | Full article with sidebar (author, links, CTA) and related articles |
| `contact.html` | Contact info, map, and accessible form with JS validation |

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, flexbox, grid, responsive design
- **Vanilla JavaScript** — no frameworks or dependencies

### JavaScript Features (`assets/js/main.js`)

- `loadPartial()` — loads shared header/footer via `fetch()`
- `setActiveNav()` — highlights the current page link in the nav
- `initMobileNav()` — hamburger menu with keyboard and Escape key support
- `setFooterYear()` — dynamic year in the footer
- `initContactForm()` — form validation with ARIA live regions

---

## Project Structure

```
law-firm-site/
├── index.html
├── about.html
├── practice-areas.html
├── blog.html
├── blog-post.html
├── contact.html
├── partials/
│   ├── header.html
│   └── footer.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── hero/
        └── team/
```

---

## Image Credits

| File | Description | Source |
|------|-------------|--------|
| `assets/images/hero/hero-bg.jpg` | Minimalist meeting room | Benjamin Child — Unsplash |
| `assets/images/team/attorney-1.jpg` | Senior man in suit (Richard Langford) | Pexels |
| `assets/images/team/attorney-2.jpg` | Professional woman (Margaret Ashford) | Pexels |
| `assets/images/team/attorney-3.jpg` | Man with glasses (Daniel Grant) | Pexels |
