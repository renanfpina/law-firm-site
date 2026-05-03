// Langford & Associates — Main JavaScript

// ─── Load HTML partial into an element ───────────────
async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Could not load partial: ${file}`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.warn(e);
  }
}

// ─── Set active nav link based on current page ───────
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// ─── Mobile navigation toggle ────────────────────────
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav   = document.getElementById('site-nav');
  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Open navigation menu' : 'Close navigation menu'
    );
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      siteNav.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      siteNav.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      siteNav.classList.remove('is-open');
      navToggle.focus();
    }
  });
}

// ─── Footer year ─────────────────────────────────────
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ─── Contact form validation ─────────────────────────
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  if (!form) return;

  // ── Helpers ──────────────────────────────────────
  function showError(input, errorEl, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.setAttribute('aria-invalid', 'false');
    errorEl.hidden = true;
    errorEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // ── Field validators ─────────────────────────────
  function validateName() {
    const input   = document.getElementById('name');
    const errorEl = document.getElementById('name-error');
    const val     = input.value.trim();
    if (!val) {
      showError(input, errorEl, 'Full name is required.');
      return false;
    }
    if (val.length < 2) {
      showError(input, errorEl, 'Please enter your full name (at least 2 characters).');
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function validateEmail() {
    const input   = document.getElementById('email');
    const errorEl = document.getElementById('email-error');
    const val     = input.value.trim();
    if (!val) {
      showError(input, errorEl, 'Email address is required.');
      return false;
    }
    if (!isValidEmail(val)) {
      showError(input, errorEl, 'Please enter a valid email address (e.g. name@company.com).');
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function validatePhone() {
    const input   = document.getElementById('phone');
    const errorEl = document.getElementById('phone-error');
    const val     = input.value.trim();
    // Phone is optional — only validate format if filled
    if (val && !/^[\d\s\+\-\(\)]{7,20}$/.test(val)) {
      showError(input, errorEl, 'Please enter a valid phone number.');
      return false;
    }
    // Don't mark as "valid" (green) when empty — it's optional
    if (val) {
      clearError(input, errorEl);
    } else {
      input.classList.remove('is-invalid', 'is-valid');
      input.removeAttribute('aria-invalid');
      errorEl.hidden = true;
    }
    return true;
  }

  function validateArea() {
    const input   = document.getElementById('area');
    const errorEl = document.getElementById('area-error');
    if (!input.value) {
      showError(input, errorEl, 'Please select a practice area.');
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function validateMessage() {
    const input   = document.getElementById('message');
    const errorEl = document.getElementById('message-error');
    const val     = input.value.trim();
    if (!val) {
      showError(input, errorEl, 'Please describe your legal matter.');
      return false;
    }
    if (val.length < 20) {
      showError(input, errorEl, `Please provide more detail (${val.length}/20 characters minimum).`);
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  // ── Inline validation on blur ─────────────────────
  document.getElementById('name').addEventListener('blur', validateName);
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('phone').addEventListener('blur', validatePhone);
  document.getElementById('area').addEventListener('change', validateArea);
  document.getElementById('message').addEventListener('blur', validateMessage);

  // ── Form submit ───────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = [
      validateName(),
      validateEmail(),
      validatePhone(),
      validateArea(),
      validateMessage(),
    ].every(Boolean);

    if (!isValid) {
      // Move focus to first invalid field for screen readers
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate submission — show success message
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ph ph-spinner" aria-hidden="true"></i> Sending…';

    setTimeout(() => {
      form.hidden = true;
      successEl.setAttribute('tabindex', '-1');
      successEl.hidden = false;
      // Move focus to success message so screen reader announces it
      successEl.focus();
    }, 800);
  });
}

// ─── Bootstrap ───────────────────────────────────────
async function init() {
  await Promise.all([
    loadPartial('site-header', 'partials/header.html'),
    loadPartial('site-footer', 'partials/footer.html'),
  ]);
  setActiveNav();
  initMobileNav();
  setFooterYear();
  initContactForm();
}

init();

