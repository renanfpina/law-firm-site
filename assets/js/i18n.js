// ─── i18n — Multi-language support ──────────────────
// Exposes: window.initI18n(), window.getTranslation(key), window.getTranslations()

(function (global) {

  // ── Config ──────────────────────────────────────────
  const SUPPORTED_LANGS = ['en-us', 'pt-br'];
  const DEFAULT_LANG    = 'en-us';
  const LS_KEY          = 'lang';

  // Currently loaded translations object
  let _translations = {};

  // ── Resolve dot-notation key ─────────────────────────
  // e.g. resolve({nav:{home:'Home'}}, 'nav.home') → 'Home'
  function resolve(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc !== null && acc !== undefined ? acc[key] : undefined;
    }, obj);
  }

  // ── Simple string interpolation ──────────────────────
  // e.g. interpolate('Min {count} chars', { count: 5 }) → 'Min 5 chars'
  function interpolate(str, vars) {
    if (!vars || typeof str !== 'string') return str;
    return str.replace(/\{(\w+)\}/g, function (_, key) {
      return vars[key] !== undefined ? vars[key] : '{' + key + '}';
    });
  }

  // ── Detect preferred language ────────────────────────
  function detectLang() {
    var stored = localStorage.getItem(LS_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;

    var browser = (navigator.language || '').toLowerCase();
    if (browser.startsWith('pt')) return 'pt-br';

    return DEFAULT_LANG;
  }

  // ── Fetch locale JSON ────────────────────────────────
  function loadLocale(lang) {
    return fetch('assets/i18n/' + lang + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load locale: ' + lang);
        return res.json();
      });
  }

  // ── Apply translations to DOM ────────────────────────
  function applyTranslations(t) {
    _translations = t;

    // [data-i18n] → textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = resolve(t, el.dataset.i18n);
      if (val !== undefined) el.textContent = val;
    });

    // [data-i18n-html] → innerHTML (for content containing HTML tags like <br>)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = resolve(t, el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    // [data-i18n-attr="attr:key"] → sets HTML attribute
    // Supports multiple pairs separated by spaces: "aria-label:key1 placeholder:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.dataset.i18nAttr.trim().split(/\s+/).forEach(function (pair) {
        var parts = pair.split(':');
        var attr  = parts[0];
        var key   = parts.slice(1).join(':'); // handles keys that may contain ':'
        var val   = resolve(t, key);
        if (val !== undefined) el.setAttribute(attr, val);
      });
    });
  }

  // ── Update <html lang> attribute ─────────────────────
  function setHtmlLang(lang) {
    document.documentElement.lang = lang;
  }

  // ── Update aria-pressed on switcher buttons ──────────
  function setSwitcherState(lang) {
    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  // ── Language switcher click handlers ─────────────────
  function initLangSwitcher() {
    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.dataset.lang;
        if (lang === localStorage.getItem(LS_KEY)) return;

        loadLocale(lang)
          .then(function (t) {
            applyTranslations(t);
            setHtmlLang(lang);
            localStorage.setItem(LS_KEY, lang);
            setSwitcherState(lang);
          })
          .catch(function (e) {
            console.warn('i18n: Failed to switch language', e);
          });
      });
    });
  }

  // ── Public API ────────────────────────────────────────

  /**
   * Get a translation string by dot-notation key.
   * Optionally interpolate variables: getTranslation('validation.messageTooShort', { count: 5 })
   */
  global.getTranslation = function (key, vars) {
    var val = resolve(_translations, key);
    if (val === undefined) return key;
    return interpolate(val, vars);
  };

  /**
   * Get the full translations object (for advanced usage).
   */
  global.getTranslations = function () {
    return _translations;
  };

  /**
   * Initialize i18n: detect language, load locale, apply to DOM, set up switcher.
   * Must be called AFTER HTML partials are loaded (header/footer).
   * Returns a Promise that resolves when done.
   */
  global.initI18n = function () {
    var lang = detectLang();

    return loadLocale(lang)
      .then(function (t) {
        applyTranslations(t);
        setHtmlLang(lang);
        localStorage.setItem(LS_KEY, lang);
        setSwitcherState(lang);
        initLangSwitcher();
      })
      .catch(function (e) {
        console.warn('i18n: Failed to initialize', e);
      });
  };

}(window));
