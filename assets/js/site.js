(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  const siteHeader = document.querySelector('[data-site-header]');
  const languageMenu = document.querySelector('[data-language-menu]');
  const imageLightbox = document.querySelector('[data-image-lightbox]');
  const imageLightboxClose = imageLightbox?.querySelector('[data-image-lightbox-close]');
  const imageLightboxImage = imageLightbox?.querySelector('[data-image-lightbox-image]');
  const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');
  let activeImageTrigger = null;

  const storedTheme = () => {
    try {
      const value = localStorage.getItem('entropy-theme');
      return value === 'light' || value === 'dark' ? value : null;
    } catch (_) {
      return null;
    }
  };

  const updateThemeButton = () => {
    if (!themeToggle) return;

    const isDark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute(
      'aria-label',
      isDark ? themeToggle.dataset.labelLight : themeToggle.dataset.labelDark
    );
  };

  const setTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    updateThemeButton();

    if (persist) {
      try {
        localStorage.setItem('entropy-theme', theme);
      } catch (_) {
        // The theme still works when storage is unavailable.
      }
    }
  };

  updateThemeButton();

  themeToggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  darkPreference.addEventListener?.('change', (event) => {
    if (!storedTheme()) setTheme(event.matches ? 'dark' : 'light');
  });

  const setMenu = (open) => {
    if (!menuToggle || !siteNav) return;

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute(
      'aria-label',
      open ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel
    );
    siteNav.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
    if (!open && languageMenu) languageMenu.open = false;
  };

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
    if (open) {
      window.requestAnimationFrame(() => siteNav?.querySelector('a, summary')?.focus());
    }
  });

  siteNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && languageMenu?.open) {
      languageMenu.open = false;
      languageMenu.querySelector('summary')?.focus();
      return;
    }
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (languageMenu?.open && !languageMenu.contains(event.target)) {
      languageMenu.open = false;
    }
  });

  const closeImageLightbox = () => {
    if (imageLightbox?.open) imageLightbox.close();
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest?.('[data-image-zoom-trigger]');
    if (!trigger || !imageLightbox || !imageLightboxImage) return;

    const source = trigger.dataset.imageSrc;
    const sourceImage = trigger.querySelector('img');
    if (!source || !sourceImage) return;

    activeImageTrigger = trigger;
    imageLightboxImage.src = source;
    imageLightboxImage.alt = sourceImage.alt;
    body.classList.add('image-lightbox-open');
    imageLightbox.showModal();
  });

  imageLightboxClose?.addEventListener('click', closeImageLightbox);

  imageLightbox?.addEventListener('click', (event) => {
    if (event.target === imageLightbox) closeImageLightbox();
  });

  imageLightbox?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeImageLightbox();
  });

  imageLightbox?.addEventListener('close', () => {
    body.classList.remove('image-lightbox-open');
    imageLightboxImage?.removeAttribute('src');
    if (imageLightboxImage) imageLightboxImage.alt = '';
    if (activeImageTrigger?.isConnected) activeImageTrigger.focus();
    activeImageTrigger = null;
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setMenu(false);
  }, { passive: true });

  const updateHeader = () => {
    siteHeader?.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

})();
