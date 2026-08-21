(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeFavicon = document.querySelector('[data-theme-favicon]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  const siteHeader = document.querySelector('[data-site-header]');
  const siteFooter = document.querySelector('.site-footer');
  const languageMenu = document.querySelector('[data-language-menu]');
  const languageLinks = [...document.querySelectorAll('[data-language-link]')];
  const heroPresetGroups = [...document.querySelectorAll('[data-hero-presets]')];
  const backToTop = document.querySelector('[data-back-to-top]');
  const downloadFlow = document.querySelector('[data-download-flow]');
  const imageLightbox = document.querySelector('[data-image-lightbox]');
  const imageLightboxClose = imageLightbox?.querySelector('[data-image-lightbox-close]');
  const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');
  let activeImageTrigger = null;
  let imageLightboxImage = null;
  let imageLightboxOriginal = null;
  let lastHeaderScrollY = Math.max(window.scrollY, 0);
  let headerScrollFrame = null;
  const headerHideProgress = 0.12;
  const backToTopProgress = 0.35;

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

  const updateThemeFavicon = () => {
    if (!themeFavicon) return;

    themeFavicon.href = root.dataset.theme === 'dark'
      ? themeFavicon.dataset.darkHref
      : themeFavicon.dataset.lightHref;
  };

  const setTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    updateThemeButton();
    updateThemeFavicon();

    if (persist) {
      try {
        localStorage.setItem('entropy-theme', theme);
      } catch (_) {
        // The theme still works when storage is unavailable.
      }
    }
  };

  updateThemeButton();
  updateThemeFavicon();

  themeToggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  darkPreference.addEventListener?.('change', (event) => {
    if (!storedTheme()) setTheme(event.matches ? 'dark' : 'light');
  });

  const storedLanguage = () => {
    try {
      const value = localStorage.getItem('entropy-language');
      return value === 'en' || value === 'ru' ? value : null;
    } catch (_) {
      return null;
    }
  };

  languageLinks.forEach((link) => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem('entropy-language', link.dataset.language);
      } catch (_) {
        // Language links still work when storage is unavailable.
      }
    });
  });

  const currentLanguage = root.lang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
  const russianShortWordPattern = /(^|[\s([{«„"'])((?:а|без|в|во|для|до|за|и|из|изо|или|к|ко|на|над|не|ни|но|о|об|обо|от|ото|по|под|подо|при|про|с|со|у))(?=[ \t]+)[ \t]+/giu;
  const englishShortWordPattern = /(^|[\s([{“‘"'])((?:a|an|and|as|at|but|by|for|from|if|in|into|nor|of|on|onto|or|per|so|the|to|up|via|with|without|yet))(?=[ \t]+)[ \t]+/giu;
  const innerWordHyphenPattern = /([\p{L}\p{N}])-([\p{L}\p{N}])/gu;
  const typographySkipSelector = 'script, style, code, pre, textarea, [data-typography-skip]';

  const bindShortWords = (value, pattern) => {
    let formatted = value;
    let previous;

    do {
      previous = formatted;
      formatted = formatted.replace(pattern, '$1$2\u00A0');
    } while (formatted !== previous);

    return formatted;
  };

  const applyTypography = (scope) => {
    if (!scope) return;

    const textNodes = [];
    const collectTextNode = (node) => {
      if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue?.trim()) return;
      if (node.parentElement?.closest(typographySkipSelector)) return;
      textNodes.push(node);
    };

    if (scope.nodeType === Node.TEXT_NODE) {
      collectTextNode(scope);
    } else {
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) collectTextNode(node);
    }

    const shortWordPattern = currentLanguage === 'ru'
      ? russianShortWordPattern
      : englishShortWordPattern;

    textNodes.forEach((node) => {
      const formatted = bindShortWords(node.nodeValue, shortWordPattern)
        .replace(innerWordHyphenPattern, '$1\u2011$2');
      if (formatted !== node.nodeValue) node.nodeValue = formatted;
    });
  };

  applyTypography(body);

  const typographyObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        applyTypography(mutation.target);
        return;
      }

      mutation.addedNodes.forEach(applyTypography);
    });
  });

  typographyObserver.observe(body, {
    subtree: true,
    childList: true,
    characterData: true
  });

  const englishHomeLink = languageLinks.find((link) => link.dataset.language === 'en');
  const defaultHomePath = englishHomeLink ? new URL(englishHomeLink.href).pathname : null;

  if (defaultHomePath && window.location.pathname === defaultHomePath) {
    const preferredLanguage = storedLanguage()
      || (navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en');
    const preferredLink = languageLinks.find((link) => link.dataset.language === preferredLanguage);

    if (preferredLink && preferredLanguage !== currentLanguage) {
      const target = new URL(preferredLink.href);
      target.search = window.location.search;
      target.hash = window.location.hash;
      window.location.replace(target.href);
      return;
    }
  }

  const initializeHeroPresets = (group) => {
    const tabs = [...group.querySelectorAll('[data-hero-preset-tab]')];
    const panels = [...group.querySelectorAll('[data-hero-preset-panel]')];
    const availableTabs = tabs.filter((tab) => panels.some(
      (panel) => panel.dataset.heroPresetPanel === tab.dataset.heroPresetTab
    ));

    if (!availableTabs.length) return;

    const activatePreset = (tab, focus = false) => {
      const preset = tab.dataset.heroPresetTab;

      availableTabs.forEach((candidate) => {
        const selected = candidate === tab;
        candidate.setAttribute('aria-selected', String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.heroPresetPanel !== preset;
      });

      if (focus) tab.focus();
    };

    availableTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activatePreset(tab));
      tab.addEventListener('keydown', (event) => {
        let nextIndex;

        if (event.key === 'ArrowRight') {
          nextIndex = (index + 1) % availableTabs.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (index - 1 + availableTabs.length) % availableTabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = availableTabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activatePreset(availableTabs[nextIndex], true);
      });
    });

    activatePreset(
      availableTabs.find((tab) => tab.getAttribute('aria-selected') === 'true')
        || availableTabs[0]
    );
  };

  heroPresetGroups.forEach(initializeHeroPresets);

  const formatTemplate = (template, values) => Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template || ''
  );

  const formatFileSize = (bytes) => {
    const size = Number(bytes);
    if (!Number.isFinite(size) || size <= 0) return '';

    return new Intl.NumberFormat(root.lang || undefined, {
      style: 'unit',
      unit: 'megabyte',
      unitDisplay: 'short',
      maximumFractionDigits: 1
    }).format(size / 1_000_000);
  };

  const isTrustedReleaseUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:'
        && url.hostname === 'github.com'
        && url.pathname.startsWith('/ergohaven/entropy/releases/');
    } catch (_) {
      return false;
    }
  };

  const detectPlatform = () => {
    const userAgentDataPlatform = navigator.userAgentData?.platform || '';
    const source = `${userAgentDataPlatform} ${navigator.platform || ''} ${navigator.userAgent || ''}`;

    const isIPadOS = /MacIntel/i.test(navigator.platform || '') && navigator.maxTouchPoints > 1;

    if (isIPadOS || /Android|iPhone|iPad|iPod|Mobile/i.test(source)) return 'other';
    if (/CrOS|Chrome OS|FreeBSD|OpenBSD|NetBSD|DragonFly|\bBSD\b/i.test(source)) return 'other';
    if (/Windows|Win32|Win64/i.test(source)) return 'windows';
    if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(source)) return 'macos';
    if (/Linux|X11/i.test(source)) return 'linux';
    return 'other';
  };

  const initializeDownloadFlow = () => {
    if (!downloadFlow) return;

    const platformSelect = downloadFlow.querySelector('[data-platform-select]');
    const architectureField = downloadFlow.querySelector('[data-architecture-field]');
    const architectureSelect = downloadFlow.querySelector('[data-architecture-select]');
    const manifestElement = downloadFlow.querySelector('[data-download-manifest]');
    const packageName = downloadFlow.querySelector('[data-download-package]');
    const status = downloadFlow.querySelector('[data-download-status]');
    const action = downloadFlow.querySelector('[data-download-action]');
    const actionLabel = downloadFlow.querySelector('[data-download-action-label]');
    const actionIcon = downloadFlow.querySelector('[data-download-action-icon]');
    const releaseNotes = downloadFlow.querySelector('[data-release-notes]');
    const installationInstructions = [
      ...downloadFlow.querySelectorAll('[data-download-instruction]')
    ];
    const fallbackUrl = downloadFlow.dataset.releaseFallback;
    const apiUrl = downloadFlow.dataset.releaseApi;

    if (!platformSelect || !status || !action || !actionLabel || !isTrustedReleaseUrl(fallbackUrl)) {
      return;
    }

    let manifest = {};
    try {
      manifest = JSON.parse(manifestElement?.textContent || '{}');
    } catch (_) {
      manifest = {};
    }

    const detectedPlatform = detectPlatform();
    const detectedOption = platformSelect.querySelector(`option[value="${detectedPlatform}"]`);
    platformSelect.value = detectedOption ? detectedPlatform : 'other';

    let automaticSelection = true;
    let releaseState = 'loading';
    let releaseData = null;
    let releasePageUrl = fallbackUrl;

    const selectedOption = () => platformSelect.options[platformSelect.selectedIndex];

    const updatePlatformSelectLabel = () => {
      [...platformSelect.options].forEach((option) => {
        option.textContent = option.dataset.platformName || option.textContent;
      });

      const option = selectedOption();
      if (!option) return;

      const template = automaticSelection
        ? platformSelect.dataset.detectedTemplate
        : platformSelect.dataset.selectedTemplate;
      option.textContent = formatTemplate(template, {
        platform: option.dataset.platformName || option.textContent
      });
    };

    const setAction = (label, url, directDownload = false) => {
      action.href = isTrustedReleaseUrl(url) ? url : fallbackUrl;
      actionLabel.textContent = label;
      if (actionIcon) {
        actionIcon.hidden = directDownload;
        actionIcon.textContent = directDownload ? '' : '↗';
      }
    };

    const renderDownloadFlow = () => {
      updatePlatformSelectLabel();
      const option = selectedOption();
      const platform = option?.value || 'other';
      const platformName = option?.dataset.platformName || '';
      const platformConfig = manifest[platform];
      const isMac = platform === 'macos';

      downloadFlow.dataset.platform = platform;
      downloadFlow.setAttribute('aria-busy', String(releaseState === 'loading'));
      if (architectureField) architectureField.hidden = !isMac;
      if (architectureSelect) architectureSelect.disabled = !isMac;
      if (packageName) packageName.textContent = option?.dataset.buildTitle || '';
      installationInstructions.forEach((instruction) => {
        instruction.hidden = instruction.dataset.downloadInstruction !== platform;
      });

      if (releaseNotes) releaseNotes.href = releasePageUrl;

      if (releaseState === 'loading') {
        downloadFlow.dataset.state = 'loading';
        status.textContent = status.dataset.loadingText;
        setAction(action.dataset.loadingLabel, fallbackUrl);
        return;
      }

      if (releaseState === 'error') {
        downloadFlow.dataset.state = 'error';
        status.textContent = status.dataset.errorText;
        setAction(action.dataset.releasesLabel, fallbackUrl);
        return;
      }

      if (platform === 'other') {
        downloadFlow.dataset.state = 'unknown';
        status.textContent = status.dataset.unknownText;
        setAction(action.dataset.releasesLabel, releasePageUrl);
        return;
      }

      const variant = isMac
        ? architectureSelect?.value
        : platformConfig?.default_variant;
      const suffix = platformConfig?.variants?.[variant]?.suffix;
      const asset = suffix
        ? releaseData?.assets?.find((candidate) => (
          candidate.name?.endsWith(suffix)
          && isTrustedReleaseUrl(candidate.browser_download_url)
        ))
        : null;

      if (!asset) {
        downloadFlow.dataset.state = 'unavailable';
        status.textContent = formatTemplate(status.dataset.unavailableTemplate, {
          platform: platformName
        });
        setAction(action.dataset.releasesLabel, releasePageUrl);
        return;
      }

      downloadFlow.dataset.state = 'ready';
      const architecture = isMac
        ? architectureSelect?.value || ''
        : option?.dataset.architecture || '';
      status.textContent = formatTemplate(status.dataset.readyTemplate, {
        version: releaseData.tag_name.replace(/^v(?=\d)/i, ''),
        architecture,
        size: formatFileSize(asset.size)
      });
      setAction(
        option?.dataset.actionLabel || action.dataset.releasesLabel,
        asset.browser_download_url,
        true
      );
    };

    const defaultMacVariant = manifest.macos?.default_variant;
    if (architectureSelect && defaultMacVariant) architectureSelect.value = defaultMacVariant;

    platformSelect.addEventListener('change', () => {
      automaticSelection = false;
      renderDownloadFlow();
    });

    architectureSelect?.addEventListener('change', () => {
      renderDownloadFlow();
    });

    renderDownloadFlow();

    let parsedApiUrl = null;
    try {
      parsedApiUrl = new URL(apiUrl);
    } catch (_) {
      // The error state below keeps the release-page fallback usable.
    }

    const trustedApi = parsedApiUrl?.protocol === 'https:'
      && parsedApiUrl.hostname === 'api.github.com'
      && parsedApiUrl.pathname === '/repos/ergohaven/entropy/releases/latest';

    if (!trustedApi) {
      releaseState = 'error';
      renderDownloadFlow();
      return;
    }

    fetch(parsedApiUrl.href, { headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub release request failed: ${response.status}`);
        return response.json();
      })
      .then((release) => {
        if (!release?.tag_name || !Array.isArray(release.assets)) {
          throw new Error('GitHub release response is incomplete');
        }

        releaseData = release;
        releasePageUrl = isTrustedReleaseUrl(release.html_url) ? release.html_url : fallbackUrl;
        releaseState = 'ready';
        renderDownloadFlow();
      })
      .catch(() => {
        releaseState = 'error';
        renderDownloadFlow();
      });
  };

  initializeDownloadFlow();

  const setMenu = (open) => {
    if (!menuToggle || !siteNav) return;

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute(
      'aria-label',
      open ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel
    );
    siteNav.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
    siteHeader?.classList.remove('is-hidden');
    lastHeaderScrollY = Math.max(window.scrollY, 0);
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
    if (!trigger || !imageLightbox) return;

    const source = trigger.dataset.imageSrc;
    const sourceImage = trigger.querySelector('img');
    if (!source || !sourceImage) return;

    activeImageTrigger = trigger;
    imageLightboxImage = document.createElement('img');
    imageLightboxImage.className = 'image-lightbox__image';
    imageLightboxImage.decoding = 'async';
    imageLightboxImage.src = source;
    imageLightboxImage.alt = sourceImage.alt;

    imageLightboxOriginal = document.createElement('a');
    imageLightboxOriginal.className = 'image-lightbox__original';
    imageLightboxOriginal.href = source;
    imageLightboxOriginal.textContent = imageLightbox.dataset.openOriginalLabel || '';

    imageLightbox.append(imageLightboxImage, imageLightboxOriginal);
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
    imageLightboxImage?.remove();
    imageLightboxOriginal?.remove();
    imageLightboxImage = null;
    imageLightboxOriginal = null;
    if (activeImageTrigger?.isConnected) activeImageTrigger.focus();
    activeImageTrigger = null;
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setMenu(false);
    siteHeader?.classList.remove('is-hidden');
    lastHeaderScrollY = Math.max(window.scrollY, 0);
    updateHeader();
  }, { passive: true });

  const updateHeader = () => {
    const scrollY = Math.max(window.scrollY, 0);
    const scrollDelta = scrollY - lastHeaderScrollY;
    const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const backToTopThreshold = Math.max(window.innerHeight, scrollRange * backToTopProgress);

    backToTop?.classList.toggle(
      'is-visible',
      scrollRange > 0 && scrollY >= backToTopThreshold
    );

    if (backToTop) {
      const footerOverlap = siteFooter
        ? Math.max(window.innerHeight - siteFooter.getBoundingClientRect().top, 0)
        : 0;
      backToTop.style.setProperty('--footer-overlap', `${footerOverlap}px`);
    }

    if (siteHeader) {
      const hideThreshold = Math.max(siteHeader.offsetHeight + 24, scrollRange * headerHideProgress);
      const mustStayVisible = scrollY <= hideThreshold
        || body.classList.contains('menu-open')
        || languageMenu?.open
        || siteHeader.matches(':focus-within');

      siteHeader.classList.toggle('is-scrolled', scrollY > 8);

      if (mustStayVisible || scrollDelta < -6) {
        siteHeader.classList.remove('is-hidden');
      } else if (scrollDelta > 6) {
        siteHeader.classList.add('is-hidden');
      }

      if (Math.abs(scrollDelta) > 6 || scrollY <= hideThreshold) {
        lastHeaderScrollY = scrollY;
      }
    }
  };

  const requestHeaderUpdate = () => {
    if (headerScrollFrame !== null) return;

    headerScrollFrame = window.requestAnimationFrame(() => {
      updateHeader();
      headerScrollFrame = null;
    });
  };

  siteHeader?.addEventListener('focusin', () => {
    siteHeader.classList.remove('is-hidden');
  });

  updateHeader();
  window.addEventListener('scroll', requestHeaderUpdate, { passive: true });

})();
