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
assert.match(landing, /Try SDK/, 'landing hero should expose the SDK-first primary CTA');
assert.match(landing, /data-copy-target="sr-hero-install-copy"/, 'landing should include a copy action for the hero install command');
assert.match(landing, /data-copy-target="sr-hero-python-copy"/, 'landing should include a copy action for the hero Python SDK snippet');
assert.match(landing, /skeinrank\.py/, 'landing should label the hero terminal card as a SkeinRank SDK proof');
assert.match(landing, /sr-code-string/, 'SDK quickstart code should include lightweight syntax highlighting');
assert.match(landing, /sr-code-comment sr-code-result/, 'SDK quickstart output should be shown as highlighted Python comments');
assert.match(landing, /# kubernetes postgresql timeout/, 'hero code should use comment-style output for canonicalize result');
assert.match(landing, /# \[&quot;critical incident&quot;, &quot;kubernetes&quot;, &quot;deployment&quot;\]|# \["critical incident", "kubernetes", "deployment"\]/, 'hero code should use comment-style output for extract result');
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
assert.match(landing, /https:\/\/pypi.org\/project\/skeinrank\/" target="_blank" rel="noreferrer"/, 'external PyPI status link should open in a new tab');
assert.match(landing, /href=\{repoUrl\} target="_blank" rel="noreferrer"/, 'external GitHub status link should open in a new tab');
assert.match(landing, /skeinrank 0\.10\.0/, 'status strip should mention the current PyPI package version');
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
assert.match(headerNav, /sr-header-try-sdk/, 'navbar should expose Try SDK as the primary action');
assert.match(headerNav, /target = '_blank'/, 'external header GitHub action should open in a new tab');
assert.match(headerNav, /cta\.textContent = 'Try SDK'/, 'mobile drawer CTA should point to the SDK path');

const customCss = readFileSync('src/styles/custom.css', 'utf8');
assert.match(customCss, /sr-header-actions/, 'site CSS should style the right-side navbar action group');
assert.match(customCss, /sr-theme-cycle-label/, 'theme toggle should be icon-only');
assert.match(customCss, /display: none;/, 'theme toggle label should be hidden');
assert.match(customCss, /flex: 0 0 5\.25rem/, 'home search should be compact instead of a centered wide field');
assert.match(customCss, /sr-header-try-sdk/, 'site CSS should style the Try SDK navbar CTA');

const astroConfig = readFileSync('astro.config.mjs', 'utf8');
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

assert.match(astroConfig, /label: ['"]Integrations['"]/, 'sidebar should include an Integrations section');
assert.match(astroConfig, /label: ['"]Operations['"]/, 'sidebar should include an Operations section');

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
