(() => {
  const LIGHTBOX_SELECTOR = '[data-sr-platform-lightbox]';
  const TRIGGER_SELECTOR = '[data-sr-lightbox-src]';
  const COPY_SELECTOR = '[data-sr-copy-button]';

  const setupPlatformLightbox = () => {
    const lightbox = document.querySelector(LIGHTBOX_SELECTOR);
    if (!lightbox || lightbox.dataset.bound === 'true') return;

    const image = lightbox.querySelector('[data-sr-lightbox-image]');
    const closeButton = lightbox.querySelector('[data-sr-lightbox-close]');
    if (!image || !closeButton) return;

    // The Starlight docs shell has its own fixed header/sidebar stacking contexts.
    // Keep the dialog as a direct body child so the fullscreen preview covers the
    // whole viewport instead of being clipped by the markdown/content column.
    if (lightbox.parentElement !== document.body) {
      document.body.appendChild(lightbox);
    }

    lightbox.dataset.bound = 'true';
    let lastTrigger = null;

    const setLocked = (locked) => {
      document.documentElement.classList.toggle('sr-platform-lightbox-lock', locked);
      document.body.classList.toggle('sr-platform-lightbox-lock', locked);
    };

    const focusElement = (element) => {
      if (!element || typeof element.focus !== 'function') return;
      try {
        element.focus({ preventScroll: true });
      } catch {
        element.focus();
      }
    };

    const openLightbox = (trigger) => {
      const src = trigger.getAttribute('data-sr-lightbox-src');
      if (!src) return;

      lastTrigger = trigger;
      image.src = src;
      image.alt = trigger.getAttribute('data-sr-lightbox-alt') || 'SkeinRank console screenshot';
      lightbox.hidden = false;
      setLocked(true);
      requestAnimationFrame(() => lightbox.classList.add('is-open'));
      focusElement(closeButton);
    };

    const closeLightbox = () => {
      if (lightbox.hidden) return;

      lightbox.classList.remove('is-open');
      lightbox.hidden = true;
      image.removeAttribute('src');
      image.alt = '';
      setLocked(false);
      focusElement(lastTrigger);
      lastTrigger = null;
    };

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest(TRIGGER_SELECTOR);
      if (trigger) {
        event.preventDefault();
        openLightbox(trigger);
        return;
      }

      if (target === lightbox || target.closest('[data-sr-lightbox-close]')) {
        event.preventDefault();
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  };

  const copyText = async (text) => {
    if (!navigator.clipboard?.writeText) {
      throw new Error('Clipboard API is not available in this browser context.');
    }

    await navigator.clipboard.writeText(text);
  };

  const setupPlatformCopyButtons = () => {
    document.querySelectorAll(COPY_SELECTOR).forEach((button) => {
      if (button.dataset.bound === 'true') return;
      button.dataset.bound = 'true';

      const defaultLabel = button.textContent || 'Copy';

      button.addEventListener('click', async () => {
        const terminal = button.closest('.sr-platform-terminal');
        const code = terminal?.querySelector('code');
        const commandText = code?.textContent?.trim();
        if (!commandText) return;

        try {
          await copyText(commandText);
          button.textContent = 'Copied';
          window.setTimeout(() => {
            button.textContent = defaultLabel;
          }, 1400);
        } catch {
          button.textContent = 'Copy failed';
          window.setTimeout(() => {
            button.textContent = defaultLabel;
          }, 1800);
        }
      });
    });
  };

  const setupPlatformInteractions = () => {
    setupPlatformLightbox();
    setupPlatformCopyButtons();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPlatformInteractions, { once: true });
  } else {
    setupPlatformInteractions();
  }
})();
