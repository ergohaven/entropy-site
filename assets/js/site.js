(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  const siteHeader = document.querySelector('[data-site-header]');
  const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');

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
  };

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setMenu(false);
  }, { passive: true });

  const updateHeader = () => {
    siteHeader?.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-entropy-demo]').forEach((demo) => {
    const presetButtons = [...demo.querySelectorAll('[data-demo-preset-target]')];
    const layouts = [...demo.querySelectorAll('[data-demo-layout]')];
    const themeButtons = [...demo.querySelectorAll('[data-demo-theme-option]')];
    const actionButtons = [...demo.querySelectorAll('[data-demo-action]')];
    const currentKey = demo.querySelector('[data-demo-current-key]');
    const status = demo.querySelector('[data-demo-status]');
    let selectedKey = null;

    const selectKey = (key) => {
      if (!key) return;

      demo.querySelectorAll('[data-demo-key]').forEach((item) => {
        const isSelected = item === key;
        item.setAttribute('aria-pressed', String(isSelected));
      });

      selectedKey = key;
      currentKey.textContent = key.querySelector('[data-demo-key-label]').textContent;
      status.textContent = '';
    };

    const showLayout = (id) => {
      presetButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.demoPresetTarget === id));
      });

      layouts.forEach((layout) => {
        layout.hidden = layout.dataset.demoLayout !== id;
      });

      const activeLayout = layouts.find((layout) => layout.dataset.demoLayout === id);
      const keys = [...(activeLayout?.querySelectorAll('[data-demo-key]') ?? [])];
      selectKey(keys.find((key) => key.dataset.defaultLabel === 'Q') ?? keys[0]);
    };

    const setDemoTheme = (theme) => {
      demo.dataset.demoTheme = theme;
      themeButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.demoThemeOption === theme));
      });
    };

    presetButtons.forEach((button) => {
      button.addEventListener('click', () => showLayout(button.dataset.demoPresetTarget));
    });

    themeButtons.forEach((button) => {
      button.addEventListener('click', () => setDemoTheme(button.dataset.demoThemeOption));
    });

    demo.addEventListener('click', (event) => {
      const key = event.target.closest('[data-demo-key]');
      if (key && demo.contains(key)) selectKey(key);
    });

    actionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (!selectedKey) return;

        const label = selectedKey.querySelector('[data-demo-key-label]');
        const previous = label.textContent;
        const next = button.dataset.demoAction;
        label.textContent = next;
        currentKey.textContent = next;
        selectedKey.setAttribute('aria-label', `${demo.dataset.selectKeyLabel} ${next}`);
        status.textContent = `${demo.dataset.assignedLabel}: ${previous} → ${next}`;
      });
    });

    const initialPreset = presetButtons.find((button) => button.getAttribute('aria-pressed') === 'true');
    showLayout(initialPreset?.dataset.demoPresetTarget ?? layouts[0]?.dataset.demoLayout);
    setDemoTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  });

})();
