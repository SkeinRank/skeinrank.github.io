(() => {
  const LIGHTBOX_SELECTOR = '[data-sr-platform-lightbox]';
  const MANUAL_TRIGGER_SELECTOR = '[data-sr-lightbox-src]';
  const AUTO_IMAGE_SELECTOR = '.sr-diagram-image, .sr-platform-screenshot';
  const COPY_SELECTOR = '[data-sr-copy-button]';

  const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'sr-platform-lightbox';
    lightbox.dataset.srPlatformLightbox = '';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');
    lightbox.innerHTML = `
      <div class="sr-platform-lightbox-stage">
        <button class="sr-platform-lightbox-close" type="button" data-sr-lightbox-close aria-label="Close image preview">×</button>
        <div class="sr-platform-lightbox-frame">
          <img data-sr-lightbox-image alt="" />
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
  };

  const getLightbox = () => document.querySelector(LIGHTBOX_SELECTOR) || createLightbox();

  const resolveImageSrc = (image) => image.currentSrc || image.getAttribute('src') || image.src || '';

  const getTriggerData = (trigger) => {
    const manualSrc = trigger.getAttribute('data-sr-lightbox-src');
    if (manualSrc) {
      return {
        src: manualSrc,
        alt: trigger.getAttribute('data-sr-lightbox-alt') || 'SkeinRank image preview',
      };
    }

    if (trigger.matches(AUTO_IMAGE_SELECTOR)) {
      return {
        src: resolveImageSrc(trigger),
        alt: trigger.getAttribute('alt') || 'SkeinRank image preview',
      };
    }

    const autoImage = trigger.querySelector?.(AUTO_IMAGE_SELECTOR);
    if (autoImage) {
      return {
        src: resolveImageSrc(autoImage),
        alt: autoImage.getAttribute('alt') || 'SkeinRank image preview',
      };
    }

    return { src: '', alt: '' };
  };

  const setupUniversalImageTriggers = () => {
    document.querySelectorAll(AUTO_IMAGE_SELECTOR).forEach((image) => {
      if (image.dataset.srLightboxAutoBound === 'true') return;
      if (image.closest(MANUAL_TRIGGER_SELECTOR)) return;
      image.dataset.srLightboxAutoBound = 'true';
      image.classList.add('sr-lightbox-enabled');
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Open image preview: ${image.getAttribute('alt') || 'SkeinRank image'}`);
    });
  };

  const setupPlatformLightbox = () => {
    const lightbox = getLightbox();
    if (lightbox.dataset.bound === 'true') return;

    const image = lightbox.querySelector('[data-sr-lightbox-image]');
    const closeButton = lightbox.querySelector('[data-sr-lightbox-close]');
    if (!image || !closeButton) return;

    // The Starlight docs shell has its own fixed header/sidebar stacking contexts.
    // Keep the dialog as a direct body child so the fullscreen preview covers the
    // whole viewport instead of being clipped by markdown/content columns.
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
      const { src, alt } = getTriggerData(trigger);
      if (!src) return;

      lastTrigger = trigger;
      image.src = src;
      image.alt = alt || 'SkeinRank image preview';
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

      const manualTrigger = target.closest(MANUAL_TRIGGER_SELECTOR);
      const autoTrigger = target.closest(AUTO_IMAGE_SELECTOR);
      const trigger = manualTrigger || autoTrigger;
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
      const target = event.target;
      if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
        return;
      }

      if (
        (event.key === 'Enter' || event.key === ' ') &&
        target instanceof Element &&
        target.matches(AUTO_IMAGE_SELECTOR)
      ) {
        event.preventDefault();
        openLightbox(target);
      }
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
    setupUniversalImageTriggers();
    setupPlatformLightbox();
    setupPlatformCopyButtons();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPlatformInteractions, { once: true });
  } else {
    setupPlatformInteractions();
  }
})();
