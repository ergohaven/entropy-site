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
    const presetToggle = demo.querySelector('[data-demo-presets-toggle]');
    const presetMenu = demo.querySelector('[data-demo-presets-menu]');
    const picker = demo.querySelector('[data-demo-picker]');
    const pickerClose = demo.querySelector('[data-demo-picker-close]');
    const layer = demo.querySelector('[data-demo-layers]');
    const layerLabel = demo.querySelector('[data-demo-layer-label]');
    const previousLayer = demo.querySelector('[data-demo-layer-previous]');
    const nextLayer = demo.querySelector('[data-demo-layer-next]');
    const status = demo.querySelector('[data-demo-status]');
    const layerNames = layer?.dataset.demoLayers.split('|') ?? [];
    let activeLayer = 0;
    let selectedKey = null;

    const selectKey = (key) => {
      if (!key) return;

      demo.querySelectorAll('[data-demo-key]').forEach((item) => {
        const isSelected = item === key;
        item.setAttribute('aria-pressed', String(isSelected));
      });

      selectedKey = key;
      status.textContent = '';
    };

    const setPresetMenu = (open) => {
      presetMenu.hidden = !open;
      presetToggle.setAttribute('aria-expanded', String(open));
      if (open) {
        const activePreset = presetButtons.find((button) => button.getAttribute('aria-checked') === 'true');
        requestAnimationFrame(() => (activePreset ?? presetButtons[0])?.focus());
      }
    };

    const closePicker = (restoreFocus = true) => {
      if (picker.hidden) return;
      picker.hidden = true;
      if (restoreFocus) selectedKey?.focus();
    };

    const openPicker = (key) => {
      selectKey(key);
      picker.hidden = false;
      requestAnimationFrame(() => pickerClose.focus());
    };

    const showLayout = (id) => {
      presetButtons.forEach((button) => {
        button.setAttribute('aria-checked', String(button.dataset.demoPresetTarget === id));
      });

      layouts.forEach((layout) => {
        layout.hidden = layout.dataset.demoLayout !== id;
      });

      demo.querySelectorAll('[data-demo-key]').forEach((key) => {
        key.setAttribute('aria-pressed', 'false');
      });
      selectedKey = null;
      setPresetMenu(false);
    };

    const setDemoTheme = (theme) => {
      demo.dataset.demoTheme = theme;
      themeButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.demoThemeOption === theme));
      });
    };

    const setLayer = (index) => {
      activeLayer = Math.max(0, Math.min(index, layerNames.length - 1));
      layerLabel.textContent = layerNames[activeLayer];
      previousLayer.disabled = activeLayer === 0;
      nextLayer.disabled = activeLayer === layerNames.length - 1;
    };

    presetToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setPresetMenu(presetMenu.hidden);
    });

    presetButtons.forEach((button) => {
      button.addEventListener('click', () => {
        showLayout(button.dataset.demoPresetTarget);
        presetToggle.focus();
      });
    });

    themeButtons.forEach((button) => {
      button.addEventListener('click', () => setDemoTheme(button.dataset.demoThemeOption));
    });

    demo.addEventListener('click', (event) => {
      const key = event.target.closest('[data-demo-key]');
      if (key && demo.contains(key)) openPicker(key);
    });

    actionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (!selectedKey) return;

        const label = selectedKey.querySelector('[data-demo-key-label]');
        const previous = label.textContent;
        const next = button.dataset.demoAction;
        label.textContent = next;
        selectedKey.setAttribute('aria-label', `${demo.dataset.selectKeyLabel} ${next}`);
        status.textContent = `${demo.dataset.assignedLabel}: ${previous} → ${next}`;
        closePicker();
      });
    });

    pickerClose.addEventListener('click', () => closePicker());
    picker.addEventListener('click', (event) => {
      if (event.target === picker) closePicker();
    });
    previousLayer.addEventListener('click', () => setLayer(activeLayer - 1));
    nextLayer.addEventListener('click', () => setLayer(activeLayer + 1));

    document.addEventListener('click', (event) => {
      if (!event.target.closest('[data-demo-presets-menu], [data-demo-presets-toggle]')) {
        setPresetMenu(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && !picker.hidden) {
        const focusable = [...picker.querySelectorAll('button:not(:disabled)')];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }

      if (event.key === 'Escape') {
        if (!picker.hidden) {
          closePicker();
        } else if (!presetMenu.hidden) {
          setPresetMenu(false);
          presetToggle.focus();
        }
      }
    });

    const initialPreset = presetButtons.find((button) => button.getAttribute('aria-checked') === 'true');
    showLayout(initialPreset?.dataset.demoPresetTarget ?? layouts[0]?.dataset.demoLayout);
    setLayer(0);
    setDemoTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  });

})();
