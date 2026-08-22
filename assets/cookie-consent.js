(() => {
  'use strict';

  const STORAGE_KEY = 'webowie_consent_v1';
  const lang = (document.documentElement.lang || navigator.language || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';
  const copy = {
    de: {
      title: 'Datenschutz-Einstellungen',
      text: 'Diese Website verwendet notwendige lokale Speicherfunktionen. Optionale Dienste werden erst nach deiner Zustimmung aktiviert.',
      necessary: 'Nur notwendige',
      accept: 'Alle akzeptieren',
      settings: 'Einstellungen',
      close: 'Schließen'
    },
    en: {
      title: 'Privacy settings',
      text: 'This website uses necessary local storage. Optional services are activated only after your consent.',
      necessary: 'Necessary only',
      accept: 'Accept all',
      settings: 'Settings',
      close: 'Close'
    }
  }[lang];

  function readConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (_) {
      return null;
    }
  }

  function saveConsent(level) {
    const value = { level, timestamp: new Date().toISOString(), version: 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    window.webOwieConsent = value;
    window.dispatchEvent(new CustomEvent('webowie:consent', { detail: value }));
    document.getElementById('webowie-consent')?.remove();
  }

  function enableDeferredServices(level) {
    if (level !== 'all') return;
    document.querySelectorAll('script[type="text/plain"][data-consent="optional"]').forEach((oldScript) => {
      const script = document.createElement('script');
      [...oldScript.attributes].forEach((attr) => {
        if (attr.name !== 'type' && attr.name !== 'data-consent') script.setAttribute(attr.name, attr.value);
      });
      script.textContent = oldScript.textContent;
      oldScript.replaceWith(script);
    });
  }

  function renderBanner() {
    if (document.getElementById('webowie-consent')) return;

    const style = document.createElement('style');
    style.textContent = `
      #webowie-consent{position:fixed;inset:auto 0 0 0;z-index:2147483647;background:#090d12;color:#f5f5f5;border-top:1px solid #55dce8;box-shadow:0 -12px 40px rgba(0,0,0,.45);font:15px/1.5 system-ui,sans-serif}
      #webowie-consent .woc-inner{max-width:1100px;margin:auto;padding:18px 22px;display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap}
      #webowie-consent .woc-copy{max-width:760px}
      #webowie-consent strong{display:block;font-size:1rem;margin-bottom:4px}
      #webowie-consent p{margin:0;color:#c8cdd2}
      #webowie-consent .woc-actions{display:flex;gap:10px;flex-wrap:wrap}
      #webowie-consent button{appearance:none;border:1px solid #55dce8;background:#0d171a;color:#f5f5f5;padding:10px 14px;cursor:pointer;font:inherit}
      #webowie-consent button[data-primary]{background:#55dce8;color:#050505;font-weight:700}
      #webowie-consent button:focus-visible{outline:3px solid #f5f5f5;outline-offset:2px}
      @media(max-width:640px){#webowie-consent .woc-inner{align-items:stretch}#webowie-consent .woc-actions{width:100%}#webowie-consent button{flex:1}}
    `;
    document.head.appendChild(style);

    const banner = document.createElement('section');
    banner.id = 'webowie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', copy.title);
    banner.innerHTML = `
      <div class="woc-inner">
        <div class="woc-copy"><strong>${copy.title}</strong><p>${copy.text}</p></div>
        <div class="woc-actions">
          <button type="button" data-consent-choice="necessary">${copy.necessary}</button>
          <button type="button" data-primary data-consent-choice="all">${copy.accept}</button>
        </div>
      </div>`;

    banner.addEventListener('click', (event) => {
      const button = event.target.closest('[data-consent-choice]');
      if (!button) return;
      const level = button.dataset.consentChoice;
      saveConsent(level);
      enableDeferredServices(level);
    });

    document.body.appendChild(banner);
  }

  const existing = readConsent();
  window.webOwieConsent = existing;
  if (existing) {
    enableDeferredServices(existing.level);
    return;
  }

  if (document.body) renderBanner();
  else document.addEventListener('DOMContentLoaded', renderBanner, { once: true });
})();
