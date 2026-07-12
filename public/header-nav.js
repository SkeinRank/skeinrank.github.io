(() => {
  const repoUrl = 'https://github.com/SkeinRank';
  const links = [
    {
      label: 'Docs',
      href: '/docs/',
      section: 'docs',
      description: 'Choose Agent Lexicon or SkeinRank documentation',
    },
    {
      label: 'Benchmarks',
      href: '/docs/evidence/',
      section: 'evidence',
      description: 'Reproducible terminology benchmarks and reports',
    },
    {
      label: 'Platform Preview',
      href: '/platform-preview/governance-console/',
      section: 'platform-preview',
      description: 'Console workflow, bindings, evidence, and snapshots',
    },
  ];

  const normalizePath = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      return url.pathname.replace(/\/$/, '') || '/';
    } catch {
      return value;
    }
  };

  const isActive = (link, currentPath) => {
    if (link.external) return false;
    const targetPath = normalizePath(link.href);

    if (link.section === 'evidence') {
      return currentPath.startsWith('/docs/evidence');
    }

    if (link.section === 'platform-preview') {
      return currentPath.startsWith('/platform-preview');
    }

    if (link.section === 'docs') {
      return currentPath !== '/' &&
        !currentPath.startsWith('/platform-preview') &&
        !currentPath.startsWith('/docs/evidence');
    }

    return currentPath === targetPath;
  };

  const buildNav = () => {
    const currentPath = normalizePath(window.location.pathname);
    document.documentElement.classList.toggle('sr-home-page', currentPath === '/');

    const nav = document.createElement('nav');
    nav.className = 'sr-product-nav';
    nav.setAttribute('aria-label', 'Product navigation');

    for (const link of links) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      anchor.className = link.external ? 'sr-product-nav-link sr-product-nav-github' : 'sr-product-nav-link';

      if (link.external) {
        anchor.target = '_blank';
        anchor.rel = 'noreferrer';
        anchor.setAttribute('aria-label', 'Open SkeinRank on GitHub');
      }

      if (isActive(link, currentPath)) {
        anchor.setAttribute('aria-current', 'page');
      }

      nav.appendChild(anchor);
    }

    return nav;
  };

  const makeSvg = (path) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('viewBox', '0 0 24 24');

    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute('d', path);
    svg.appendChild(shape);

    return svg;
  };


  const makeGitHubIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('viewBox', '0 0 24 24');

    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute(
      'd',
      'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.86 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 7c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.16 10.16 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z'
    );
    svg.appendChild(shape);
    return svg;
  };

  const buildHeaderActions = () => {
    const actions = document.createElement('div');
    actions.className = 'sr-header-actions';

    const github = document.createElement('a');
    github.className = 'sr-header-icon-action sr-header-github-action';
    github.href = repoUrl;
    github.target = '_blank';
    github.rel = 'noreferrer';
    github.setAttribute('aria-label', 'Open the SkeinRank organization on GitHub');
    github.title = 'GitHub';
    github.appendChild(makeGitHubIcon());

    const sdk = document.createElement('a');
    sdk.className = 'sr-header-try-sdk';
    sdk.href = '/docs/';
    sdk.textContent = 'Get started';

    actions.append(github, sdk);
    return actions;
  };

  const buildDrawerBrand = (siteTitle) => {
    const brand = document.createElement('a');
    brand.className = 'sr-home-mobile-drawer-brand';
    brand.href = '/';
    brand.setAttribute('aria-label', 'Go to SkeinRank home');

    const logo = siteTitle.querySelector('img');
    if (logo) {
      const image = logo.cloneNode(true);
      image.removeAttribute('width');
      image.removeAttribute('height');
      brand.appendChild(image);
    }

    const name = document.createElement('span');
    name.textContent = 'SkeinRank';
    brand.appendChild(name);

    return brand;
  };

  const buildHomeMobileMenu = (siteTitle) => {
    const currentPath = normalizePath(window.location.pathname);
    const menu = document.createElement('div');
    menu.className = 'sr-home-mobile-menu';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sr-home-mobile-menu-button';
    button.setAttribute('aria-label', 'Open navigation menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'sr-home-mobile-menu-panel');
    button.appendChild(makeSvg('M5 7h14M5 12h14M5 17h14'));

    const panel = document.createElement('div');
    panel.id = 'sr-home-mobile-menu-panel';
    panel.className = 'sr-home-mobile-menu-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'SkeinRank navigation menu');
    panel.hidden = true;

    const drawer = document.createElement('div');
    drawer.className = 'sr-home-mobile-drawer';

    const drawerHeader = document.createElement('div');
    drawerHeader.className = 'sr-home-mobile-drawer-header';
    drawerHeader.appendChild(buildDrawerBrand(siteTitle));

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'sr-home-mobile-drawer-close';
    closeButton.setAttribute('aria-label', 'Close navigation menu');
    closeButton.appendChild(makeSvg('M6 6l12 12M18 6L6 18'));
    drawerHeader.appendChild(closeButton);

    const linkList = document.createElement('nav');
    linkList.className = 'sr-home-mobile-drawer-links';
    linkList.setAttribute('aria-label', 'Mobile product navigation');

    for (const link of links) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = link.external ? 'sr-home-mobile-drawer-link sr-home-mobile-drawer-link-external' : 'sr-home-mobile-drawer-link';

      const label = document.createElement('span');
      label.textContent = link.label;

      const description = document.createElement('em');
      description.textContent = link.description;

      anchor.append(label, description);
      anchor.appendChild(makeSvg(link.external ? 'M7 17L17 7M9 7h8v8' : 'M9 18l6-6-6-6'));

      if (link.external) {
        anchor.target = '_blank';
        anchor.rel = 'noreferrer';
      }

      if (isActive(link, currentPath)) {
        anchor.setAttribute('aria-current', 'page');
      }

      linkList.appendChild(anchor);
    }

    const footer = document.createElement('div');
    footer.className = 'sr-home-mobile-drawer-footer';

    const cta = document.createElement('a');
    cta.className = 'sr-home-mobile-drawer-cta';
    cta.href = '/docs/';
    cta.textContent = 'Get started';

    const note = document.createElement('p');
    note.textContent = 'Open-source terminology governance from coding-agent workflows to runtime search and RAG.';

    footer.append(cta, note);
    drawer.append(drawerHeader, linkList, footer);
    panel.appendChild(drawer);

    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('sr-mobile-menu-open', open);
      document.body.classList.toggle('sr-mobile-menu-open', open);
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;

      if (open) {
        closeButton.focus({ preventScroll: true });
      } else {
        button.focus({ preventScroll: true });
      }
    };

    button.addEventListener('click', () => {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    closeButton.addEventListener('click', () => {
      setOpen(false);
    });

    panel.addEventListener('click', (event) => {
      const target = event.target;
      if (target === panel || (target instanceof Element && target.closest('a'))) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
      }
    });

    menu.append(button, panel);
    return menu;
  };


  const themeCycle = (() => {
    const modes = ['auto', 'light', 'dark'];
    const nextMode = {
      auto: 'light',
      light: 'dark',
      dark: 'auto',
    };
    const labels = {
      auto: 'System theme',
      light: 'Light',
      dark: 'Dark',
    };

    const normalize = (value) => modes.includes(value) ? value : 'auto';

    const makeThemeIcon = (mode) => {
      const template = document.querySelector('#theme-icons');
      const icon = template?.content.querySelector(`.${mode}`)?.cloneNode(true);
      if (icon instanceof SVGElement) return icon;

      const fallback = document.createElement('span');
      fallback.setAttribute('aria-hidden', 'true');
      fallback.textContent = mode === 'dark' ? '☾' : mode === 'light' ? '☼' : '◐';
      return fallback;
    };

    const render = (button, mode) => {
      const normalized = normalize(mode);
      const label = labels[normalized];
      button.replaceChildren();

      const iconWrap = document.createElement('span');
      iconWrap.className = 'sr-theme-cycle-icon';
      iconWrap.appendChild(makeThemeIcon(normalized));

      const text = document.createElement('span');
      text.className = 'sr-theme-cycle-label';
      text.textContent = label;

      button.append(iconWrap, text);
      button.setAttribute('aria-label', `${label}. Click to switch theme.`);
      button.title = 'Click to switch theme';
    };

    const setNativeValue = (select, mode) => {
      const normalized = normalize(mode);
      select.value = normalized;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return normalized;
    };

    const hideNativePicker = (picker, select, nativeLabel) => {
      picker.classList.add('sr-theme-cycle');
      nativeLabel.classList.add('sr-theme-cycle-native');
      nativeLabel.setAttribute('aria-hidden', 'true');
      nativeLabel.hidden = true;
      nativeLabel.style.display = 'none';
      select.setAttribute('tabindex', '-1');

      select.querySelectorAll('option').forEach((option) => {
        if (option.value === 'auto') option.textContent = 'System theme';
      });
    };

    const mountPicker = (picker) => {
      if (!(picker instanceof HTMLElement)) return;

      const select = picker.querySelector('select');
      const nativeLabel = picker.querySelector('label');
      if (!(select instanceof HTMLSelectElement) || !(nativeLabel instanceof HTMLElement)) return;

      hideNativePicker(picker, select, nativeLabel);

      if (picker.dataset.srThemeCycle === 'mounted') return;

      const existingButton = picker.querySelector('.sr-theme-cycle-button');
      if (existingButton instanceof HTMLButtonElement) {
        picker.dataset.srThemeCycle = 'mounted';
        return;
      }

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sr-theme-cycle-button';
      button.dataset.srThemeCycleButton = 'true';
      render(button, select.value || 'auto');

      button.addEventListener('click', () => {
        const current = normalize(select.value || 'auto');
        const next = setNativeValue(select, nextMode[current]);
        render(button, next);
      });

      select.addEventListener('change', () => {
        render(button, select.value || 'auto');
      });

      picker.dataset.srThemeCycle = 'mounted';
      picker.appendChild(button);
    };

    const mount = () => {
      document.querySelectorAll('starlight-theme-select:not([data-sr-theme-cycle="mounted"])').forEach(mountPicker);
    };

    const observe = () => {
      let scheduled = false;
      const observer = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(() => {
          scheduled = false;
          mount();
        });
      });

      const target = document.body || document.documentElement;
      observer.observe(target, {
        childList: true,
        subtree: true,
      });
    };

    return { mount, observe };
  })();

  const mount = () => {
    const currentPath = normalizePath(window.location.pathname);
    document.documentElement.classList.toggle('sr-home-page', currentPath === '/');

    const siteTitle = document.querySelector('.site-title');
    const header = siteTitle?.closest('header') || document.querySelector('header');
    if (!siteTitle || !header) return false;

    if (!document.querySelector('.sr-product-nav')) {
      const nav = buildNav();
      siteTitle.insertAdjacentElement('afterend', nav);
    }

    header.classList.add('sr-product-header');

    if (!header.querySelector('.sr-header-actions')) {
      const rightGroup = header.querySelector('.right-group');
      const actions = buildHeaderActions();

      if (rightGroup instanceof HTMLElement) {
        rightGroup.appendChild(actions);
      } else {
        header.appendChild(actions);
      }
    }

    themeCycle.mount();

    const searchGroup = header.querySelector('site-search')?.parentElement;
    if (currentPath === '/' && searchGroup && !document.querySelector('.sr-home-mobile-menu')) {
      searchGroup.appendChild(buildHomeMobileMenu(siteTitle));
    }

    return true;
  };

  const mounted = mount();
  if (!mounted) {
    window.addEventListener('load', mount, { once: true });
  }

  themeCycle.observe();
})();
