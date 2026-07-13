import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const requiredAssets = [
  'src/assets/brand/skeinrank-logo-mark.png',
  'src/assets/diagrams/control-plane-overview.jpeg',
  'src/assets/diagrams/domain-model.jpeg',
  'src/assets/diagrams/runtime-request-flow.jpeg',
  'src/assets/diagrams/terminology-as-code-lifecycle.jpeg',
  'src/assets/diagrams/mcp-agent-integration.jpeg',
  'public/assets/skeinrank-control-plane-overview.jpeg',
  'public/assets/skeinrank-runtime-request-flow.jpeg',
];

for (const asset of requiredAssets) {
  assert.ok(existsSync(asset), `${asset} should exist`);
  assert.ok(statSync(asset).size > 10_000, `${asset} should not be an empty placeholder`);
}

const landing = readFileSync('src/components/LandingHome.astro', 'utf8');
assert.match(landing, /sr-diagram-showcase/, 'landing should render the new overview diagram section');
assert.ok(!landing.includes('<div class="sr-hero-proof"'), 'landing should not render the stretched hero proof strip');
assert.ok(!landing.includes('<div class="sr-mobile-flow"'), 'landing should not render the extra mobile flow cards below hero CTAs');
assert.match(landing, /Start with agent-lexicon/, 'landing hero should route the CLI-first CTA into the product docs');
assert.match(landing, /data-copy-target="sr-hero-install-copy"/, 'landing should include a copy action for the hero install command');
assert.match(landing, /data-copy-target="sr-hero-python-copy"/, 'landing should include a copy action for the hero CLI first-run snippet');
assert.match(landing, /<strong>agent-lexicon<\/strong>/, 'landing should label the hero terminal card as an agent-lexicon CLI proof');
assert.match(landing, /sr-code-command">alex<\/span> <span class="sr-code-arg">init/, 'hero CLI snippet should start with an initialization step');
assert.match(landing, /sr-code-comment sr-code-result/, 'CLI quickstart output should be shown as highlighted terminal results');
assert.match(landing, /sr-code-command">alex<\/span> <span class="sr-code-arg">scan<\/span> README\.md docs src/, 'hero code should show a runnable scan command after init');
assert.match(landing, /Snapshot published/, 'hero code should end with a publishable first-run result');
assert.ok(!landing.includes('→ kubernetes postgresql timeout'), 'hero code should not use arrow output syntax');
assert.match(landing, /sr-code-command/, 'install command should use the same syntax-highlighted code window style');
assert.match(landing, /:root\[data-theme='light'\]\) \.sr-hero-code-panel \.sr-code-window/, 'light theme should keep hero code windows dark and readable');
assert.match(landing, /#111827 0%/, 'light theme code windows should use an explicit dark background');
assert.match(landing, /#cc7832/, 'hero code syntax should use a JetBrains-style keyword accent');
assert.match(landing, /#808080/, 'hero code comments should be muted rather than washed out');
assert.match(landing, /sr-terminal-dots/, 'terminal dots should be grouped for precise traffic-light styling');
assert.ok(!landing.includes('<section id="try-sdk"'), 'landing should not duplicate the SDK quickstart below the hero');
assert.ok(!landing.includes('<div class="sr-world-visual"'), 'landing hero should use SDK proof instead of the dense architecture diagram');
assert.match(landing, /sr-trust-strip/, 'landing should include a concise project status strip below the hero');
assert.match(landing, /each invents its own names/, 'hero subtitle should align with the multi-agent terminology drift narrative');
assert.ok(!landing.includes('Domain language control plane for search, RAG &amp; agents'), 'hero should not lead with a heavy control-plane eyebrow');
assert.ok(!landing.includes('<span class="sr-pulse"'), 'hero should not use a status-like pulse indicator before the headline');
assert.match(landing, /Start in the terminal\. Scale to a runtime control plane\./, 'landing should explain the two-product path immediately after the hero');
assert.match(landing, /Embeddings find similarity\. They do not govern your company vocabulary\./, 'landing should avoid weak synonym-style examples and state the product boundary clearly');
assert.match(landing, /SkeinRank is not trying to replace semantic search/, 'language section should position SkeinRank beside semantic search');
assert.match(landing, /canonical terms, aliases, evidence, owners, runtime bindings, and pinned snapshots/, 'language section should describe the governed terminology model');
assert.match(landing, /Make terminology explicit/, 'language section should explain explicit terminology state');
assert.match(landing, /Control where it applies/, 'language section should explain runtime binding scope');
assert.match(landing, /Review change before rollout/, 'language section should explain evidence-backed review before publishing');
assert.match(landing, /Use embeddings to retrieve meaning\. Use SkeinRank to govern the vocabulary that shapes retrieval\./, 'language section should end with the retrieval versus governance distinction');
assert.ok(!landing.includes('The problem nobody owns'), 'landing should not keep the old drift heading');
assert.ok(!landing.includes('When new language lands in docs, search needs a way to keep up.'), 'landing should not keep the old drift headline');
assert.ok(!landing.includes('Enterprise search loses context when terminology is unmanaged.'), 'landing should not keep the duplicated problem headline');
assert.ok(!landing.includes('payments-core'), 'landing should remove the confusing payments-core example');
assert.ok(!landing.includes('payment timeout'), 'landing should remove the confusing payment timeout example');
assert.ok(!landing.includes('the payment thing'), 'landing should remove the confusing payment alias example');
assert.ok(!landing.includes('sr-drift-compare'), 'landing should remove the diagram that implied an unclear mapping');
assert.ok(!landing.includes('sr-problem-solution'), 'landing should remove the duplicated problem section');
assert.ok(!landing.includes('Nobody changed the model — your team did'), 'landing copy should not blame the reader for healthy terminology changes');
assert.ok(!landing.includes('IntersectionObserver'), 'landing motion should avoid scroll observers that can stutter on long pages');
assert.ok(!landing.includes("data-motion='ready'"), 'landing should not hide content behind JavaScript-driven motion state');
assert.ok(!landing.includes('filter: blur(6px)'), 'landing motion should avoid reveal blur filters that can cause jank');
assert.ok(!landing.includes('sr-product-panel-float'), 'hero code panel should not run a permanent floating animation');
assert.match(landing, /sr-soft-rise/, 'landing should keep a lightweight one-shot product motion');
assert.match(landing, /prefers-reduced-motion: no-preference/, 'landing motion should only run when the user has not reduced motion');
assert.match(landing, /prefers-reduced-motion: reduce/, 'landing motion should respect reduced-motion preferences');
assert.match(landing, /padding: 1\.25rem clamp\(1rem, 4\.8vw, 1\.35rem\) 0;/, 'mobile hero should keep readable horizontal gutters');
assert.ok(
  landing.indexOf('Embeddings find similarity. They do not govern your company vocabulary.') < landing.indexOf('From domain language to runtime context'),
  'language layer explanation should appear before architecture details',
);
assert.match(landing, /From terminology governance to verified search behavior\./, 'architecture section should explain the governed runtime workflow');
assert.match(landing, /Read side-car model/, 'overview section should link to the side-car model without duplicating a separate section');
assert.ok(!landing.includes('aria-labelledby="sr-dashboard-title"'), 'landing should not duplicate the side-car model as a separate dashboard section');
assert.match(landing, /Public positioning: usable core, beta governance platform\./, 'status section should state the product maturity honestly near the end');
assert.ok(!/\.sr-feature-card\s*\{[^}]*min-height:\s*100%/s.test(landing), 'feature cards should avoid percentage min-height because Safari can create a cyclic grid height while resizing');
assert.match(landing, /\.sr-feature-card\s*\{[^}]*min-height:\s*0;/s, 'feature cards should use a definite zero minimum so the grid can size rows from content in Safari');
assert.match(landing, /\.sr-feature-card > p\s*\{[^}]*margin-bottom:\s*0\.9rem;/s, 'feature descriptions should keep clear spacing above status badges');
assert.match(landing, /href="https:\/\/pypi.org\/project\/skeinrank\/"[\s\S]*target="_blank"[\s\S]*rel="noreferrer"/, 'external PyPI status link should open in a new tab');
assert.match(landing, /href=\{repoUrl\}[\s\S]*target="_blank"[\s\S]*rel="noreferrer"/, 'external GitHub status link should open in a new tab');
assert.match(landing, /agent-lexicon · PyPI/, 'status strip should link to Agent Lexicon without hard-coding a stale package version');
assert.match(landing, /skeinrank · PyPI/, 'status strip should link to SkeinRank without hard-coding a stale package version');
assert.match(landing, /Zero dependencies/, 'status strip should highlight the dependency-free CLI');
assert.match(landing, /a \+ a::before/, 'status strip should use lightweight inline separators instead of boxed cards');
assert.match(landing, /justify-content: center;[\s\S]*?gap: 0\.45rem 0\.85rem;/, 'mobile status strip should wrap around centered gaps');
assert.match(landing, /\.sr-trust-strip a \+ a::before \{[\s\S]*?display: none;/, 'mobile status strip should hide separators that can wrap onto their own line');
assert.ok(!landing.includes('<span>PyPI</span>'), 'status strip should not render heavy label/value cards');
assert.ok(!landing.includes('grid-template-columns: repeat(4, minmax(0, 1fr))'), 'status strip should not use boxed card grid layout');
assert.match(landing, /controlPlaneOverview/, 'landing should import only the featured control-plane diagram');
assert.match(landing, /From domain language to runtime context/, 'landing should use a user-facing overview heading');
assert.match(landing, /Open architecture docs/, 'landing should link from the overview section to full architecture docs');
assert.ok(!landing.includes('<section class="sr-section sr-diagram-section"'), 'landing should not render a dense four-diagram grid');
assert.ok(!landing.includes('mcpAgentDiagram'), 'landing should keep detailed MCP diagrams in docs instead of the main page');
assert.ok(
  !landing.includes("import dashboardPreview from '../assets/screenshots/dashboard-runtime-control-center-dark.png'"),
  'landing should no longer lead with the old dashboard screenshot import',
);

const architecture = readFileSync('src/content/docs/concepts/architecture.mdx', 'utf8');
assert.match(architecture, /runtimeFlowDiagram/, 'architecture docs should include runtime request flow');
assert.match(architecture, /terminologyLifecycleDiagram/, 'architecture docs should include Terminology-as-Code lifecycle');
assert.match(architecture, /mcpAgentDiagram/, 'architecture docs should include MCP agent integration');

const index = readFileSync('src/content/docs/index.mdx', 'utf8');
assert.match(index, /Domain Language Control Plane/, 'home page metadata should use the updated product positioning');

const headerNav = readFileSync('public/header-nav.js', 'utf8');
assert.ok(!headerNav.includes("label: 'GitHub'"), 'GitHub should not be rendered as a primary nav pill');
assert.match(headerNav, /buildHeaderActions/, 'header should create a right-side action group');
assert.match(headerNav, /sr-header-github-action/, 'GitHub should be a right-side icon action');
assert.match(headerNav, /sr-header-try-sdk/, 'navbar should expose the compact get-started action');
assert.match(headerNav, /rightGroup\.appendChild\(actions\)/, 'navbar actions should mount inside the right-side header group');
assert.match(headerNav, /target = '_blank'/, 'external header GitHub action should open in a new tab');
assert.match(headerNav, /cta\.textContent = 'Get started'/, 'mobile drawer CTA should route into the documentation portal');

const customCss = readFileSync('src/styles/custom.css', 'utf8');
assert.match(customCss, /sr-header-actions/, 'site CSS should style the right-side navbar action group');
assert.match(customCss, /\.sr-product-header \.right-group/, 'site CSS should keep navbar actions aligned in the right group');
assert.match(customCss, /white-space: nowrap;/, 'navbar actions should not wrap into a second row');
assert.match(customCss, /sr-theme-cycle-label/, 'theme toggle should be icon-only');
assert.match(customCss, /display: none;/, 'theme toggle label should be hidden');
assert.match(customCss, /flex: 0 0 5\.25rem/, 'home search should be compact instead of a centered wide field');
assert.match(customCss, /sr-header-try-sdk/, 'site CSS should style the compact get-started navbar CTA');
assert.match(customCss, /:root\[data-theme='light'\] html\.sr-home-page \.sr-home-mobile-menu-panel/, 'light theme mobile drawer should have explicit surface styling');
assert.match(customCss, /:root\[data-theme='light'\] html\.sr-home-page \.sr-home-mobile-drawer-brand/, 'light theme mobile drawer should force readable link colors');

const themeProvider = readFileSync('src/components/ThemeProvider.astro', 'utf8');
assert.match(themeProvider, /: 'dark';/, 'first-time visitors should resolve to the dark theme');
assert.match(themeProvider, /localStorage\.getItem\(storageKey\)/, 'stored theme preferences should still take precedence');

const themeSelect = readFileSync('src/components/ThemeSelect.astro', 'utf8');
assert.match(themeSelect, /const defaultTheme: Theme = 'dark'/, 'theme picker should default to dark without a stored preference');
assert.match(themeSelect, /applyTheme\(loadTheme\(\)\);/, 'initial dark mode should apply without persisting a synthetic user choice');
assert.match(themeSelect, /applyTheme\(parseTheme\(event\.currentTarget\.value\), true\)/, 'explicit theme changes should persist to localStorage');
assert.match(themeSelect, /localStorage\.setItem\(storageKey, theme\)/, 'dark, light, and system choices should all survive reloads');

const astroConfig = readFileSync('astro.config.mjs', 'utf8');
assert.match(astroConfig, /ThemeProvider: '\.\/src\/components\/ThemeProvider\.astro'/, 'Starlight should use the SkeinRank dark-default theme provider');
assert.match(astroConfig, /ThemeSelect: '\.\/src\/components\/ThemeSelect\.astro'/, 'Starlight should use the matching dark-default theme picker');

const expectedSidebarSlugs = [
  'concepts/sidecar-control-plane',
  'concepts/bindings-runtime-context',
  'concepts/snapshots',
  'integrations/mcp',
  'ops/gitops-delivery',
  'ops/blue-green-rollout',
  'ops/checkpointing',
];

for (const slug of expectedSidebarSlugs) {
  assert.match(astroConfig, new RegExp(`slug: ['"]${slug}['"]`), `${slug} should be linked from Starlight sidebar`);
  assert.ok(
    existsSync(`src/content/docs/${slug}.mdx`),
    `${slug} sidebar entry should have a matching docs page`,
  );
}

assert.match(astroConfig, /label: ['"]Agent Lexicon · Dev-time['"]/, 'sidebar should expose Agent Lexicon as a first-class product');
assert.match(astroConfig, /label: ['"]SkeinRank · Runtime['"]/, 'sidebar should expose SkeinRank as a separate runtime product');
assert.match(astroConfig, /label: ['"]SkeinRank integrations['"]/, 'sidebar should keep SkeinRank integrations grouped under the runtime product');
assert.match(astroConfig, /label: ['"]SkeinRank operations['"]/, 'sidebar should keep SkeinRank operations grouped under the runtime product');

const lightboxScript = readFileSync('public/platform-preview-lightbox.js', 'utf8');
assert.match(lightboxScript, /AUTO_IMAGE_SELECTOR = '.sr-diagram-image, .sr-platform-screenshot'/, 'lightbox script should auto-bind diagrams and screenshots');
assert.match(lightboxScript, /createLightbox/, 'lightbox script should create a shared dialog when a page does not provide one');
assert.match(lightboxScript, /srLightboxAutoBound/, 'lightbox script should mark auto-bound image triggers');
assert.match(lightboxScript, /closest\(MANUAL_TRIGGER_SELECTOR\)/, 'auto binding should not make images inside manual lightbox triggers separately focusable');

assert.match(astroConfig, /src: '\/platform-preview-lightbox\.js'/, 'Starlight head should load the shared screenshot lightbox script on every page');

assert.match(customCss, /sr-diagram-image\.sr-lightbox-enabled/, 'site CSS should show diagrams as lightbox-enabled');
assert.match(customCss, /sr-platform-screenshot\.sr-lightbox-enabled/, 'site CSS should show console screenshots as lightbox-enabled');

for (const docsPath of [
  'src/content/docs/concepts/architecture.mdx',
  'src/content/docs/concepts/sidecar-control-plane.mdx',
  'src/content/docs/concepts/bindings-runtime-context.mdx',
  'src/content/docs/integrations/mcp.mdx',
  'src/content/docs/ops/gitops-delivery.mdx',
]) {
  const doc = readFileSync(docsPath, 'utf8');
  assert.match(doc, /class="sr-diagram-image"/, `${docsPath} should mark diagrams as lightbox-enabled images`);
}


const docsPortal = readFileSync('src/content/docs/docs/index.mdx', 'utf8');
assert.match(docsPortal, /One documentation portal\. Two product paths\./, 'docs home should act as a product chooser');
assert.match(docsPortal, /Agent Lexicon/, 'docs home should expose the dev-time product');
assert.match(docsPortal, /SkeinRank/, 'docs home should expose the runtime product');
assert.match(docsPortal, /How the products work together/, 'docs home should link the shared lifecycle');
assert.match(docsPortal, /Benchmarks and evidence/, 'docs home should link the evidence section');
assert.ok(!docsPortal.includes('Explore Agent Lexicon'), 'Agent Lexicon product card should expose one unambiguous CTA');
assert.ok(!docsPortal.includes('Explore SkeinRank'), 'SkeinRank product card should expose one unambiguous CTA');
assert.equal((docsPortal.match(/class="sr-docs-card-primary"/g) ?? []).length, 2, 'docs product cards should render exactly one primary CTA each');

const tableDocs = [
  'src/content/docs/docs/index.mdx',
  'src/content/docs/docs/agent-lexicon/reference.mdx',
  'src/content/docs/docs/ecosystem/how-they-work-together.mdx',
];

for (const docsPath of tableDocs) {
  const doc = readFileSync(docsPath, 'utf8');
  assert.match(doc, /class="sr-doc-table-wrap"/, `${docsPath} should use the responsive documentation table wrapper`);
  assert.match(doc, /<table class="sr-mini-table/, `${docsPath} should render an explicit HTML table in MDX`);
  assert.ok(!/^\|.*\|\n\|[-:| ]+\|/m.test(doc), `${docsPath} should not rely on unsupported pipe-table parsing in MDX`);
}

const newDocsPaths = [
  'src/content/docs/docs/index.mdx',
  'src/content/docs/docs/agent-lexicon/index.mdx',
  'src/content/docs/docs/agent-lexicon/installation.mdx',
  'src/content/docs/docs/agent-lexicon/quickstart.mdx',
  'src/content/docs/docs/agent-lexicon/review-publish.mdx',
  'src/content/docs/docs/agent-lexicon/context.mdx',
  'src/content/docs/docs/agent-lexicon/merge-checks.mdx',
  'src/content/docs/docs/agent-lexicon/mcp.mdx',
  'src/content/docs/docs/agent-lexicon/reference.mdx',
  'src/content/docs/docs/skeinrank/index.mdx',
  'src/content/docs/docs/ecosystem/how-they-work-together.mdx',
  'src/content/docs/docs/evidence/index.mdx',
];

for (const docsPath of newDocsPaths) {
  assert.ok(existsSync(docsPath), `${docsPath} should exist after the documentation architecture refresh`);
}

const lexiconQuickstart = readFileSync('src/content/docs/docs/agent-lexicon/quickstart.mdx', 'utf8');
for (const command of ['alex init', 'alex scan', 'alex review', 'alex publish', 'alex context', 'alex check-merge']) {
  assert.ok(lexiconQuickstart.includes(command), `Agent Lexicon quickstart should include ${command}`);
}

const ecosystem = readFileSync('src/content/docs/docs/ecosystem/how-they-work-together.mdx', 'utf8');
assert.match(ecosystem, /not an automatic synchronization service/, 'ecosystem docs should state the current integration boundary honestly');

const evidence = readFileSync('src/content/docs/docs/evidence/index.mdx', 'utf8');
assert.match(evidence, /0% → 60%/, 'evidence hub should include the strict Agent Lexicon benchmark result');
assert.match(evidence, /10% → 100%/, 'evidence hub should include the compound Agent Lexicon benchmark result');
assert.match(evidence, /P@5 100%/, 'evidence hub should include the Airflow top-five result');
assert.match(evidence, /P@10 90%/, 'evidence hub should include the Airflow top-ten result');
assert.match(evidence, /Human labels were applied after ranking/, 'evidence hub should separate discovery from evaluation labels');

const installation = readFileSync('src/content/docs/getting-started/installation.mdx', 'utf8');
assert.ok(!installation.includes('Website local run'), 'public product installation docs should not contain website contributor instructions');
assert.ok(!installation.includes('GitHub Pages target'), 'public product installation docs should not contain site deployment instructions');

const roadmap = readFileSync('src/content/docs/reference/roadmap.mdx', 'utf8');
assert.ok(!roadmap.includes('Add screenshots of the governance UI'), 'roadmap should not promise screenshots that are already shipped');
assert.ok(!roadmap.includes('Benchmarks or evaluation pages'), 'roadmap should not list benchmark pages as future work after they are published');

assert.ok(!/\.sr-docs-product-card,\s*\n\.sr-evidence-grid > article \{[^}]*min-height:\s*100%/s.test(customCss), 'documentation cards should avoid percentage min-height because Safari can create a cyclic grid height');
assert.match(customCss, /\.sr-docs-product-card,\s*\n\.sr-evidence-grid > article \{[^}]*min-height:\s*0;/s, 'documentation cards should use a definite zero minimum in Safari');
assert.match(customCss, /\.sr-docs-product-grid,\s*\n\.sr-evidence-grid \{[^}]*align-items:\s*stretch;/s, 'documentation card rows should stretch from the grid instead of percentage heights');
assert.ok(!/\.sr-docs-card-primary:hover\s*\{[^}]*transform:/s.test(customCss), 'documentation CTA hover should not move the hit target in Safari');
assert.match(customCss, /sr-docs-product-grid/, 'site CSS should style the two-product documentation chooser');
assert.match(customCss, /sr-lifecycle-flow/, 'site CSS should style the ecosystem lifecycle');
assert.match(customCss, /sr-evidence-grid/, 'site CSS should style benchmark evidence cards');
assert.match(customCss, /sr-doc-table-wrap/, 'site CSS should provide responsive overflow for documentation tables');
assert.match(customCss, /sr-mini-table-wide/, 'site CSS should keep three-column documentation tables readable on narrow screens');
