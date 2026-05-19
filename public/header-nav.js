(() => {
  const repoUrl = 'https://github.com/SkeinRank/skeinrank';
  const links = [
    {
      label: 'Docs',
      href: '/getting-started/installation/',
      section: 'getting-started',
      description: 'Install guides, concepts, and API reference',
    },
    {
      label: 'Quickstart',
      href: '/getting-started/quickstart/',
      section: 'quickstart',
      description: 'Validate a dictionary and canonicalize terms',
    },
    {
      label: 'Platform Preview',
      href: '/platform-preview/governance-console/',
      section: 'platform-preview',
      description: 'Console workflow, bindings, evidence, and snapshots',
    },
    {
      label: 'GitHub',
      href: repoUrl,
      external: true,
      description: 'Source code, roadmap, and project issues',
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

    if (link.section === 'quickstart') {
      return currentPath === targetPath;
    }

    if (link.section === 'platform-preview') {
      return currentPath.startsWith('/platform-preview');
    }

    if (link.section === 'getting-started') {
      return currentPath !== '/' &&
        currentPath !== '/getting-started/quickstart' &&
        !currentPath.startsWith('/platform-preview');
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
    cta.href = '/getting-started/docker-beta-quickstart/';
    cta.textContent = 'Run Docker beta';

    const note = document.createElement('p');
    note.textContent = 'Open-source side-car for terminology-aware search and RAG workflows.';

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
})();
