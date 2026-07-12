import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// For the organization Pages repository, keep `base` unset:
//   https://github.com/SkeinRank/skeinrank.github.io -> https://skeinrank.github.io
// Keep every crawl/social URL aligned with the currently verified GitHub Pages domain.
// Switch to https://skeinrank.io only after the custom domain is connected and verified.
export default defineConfig({
  site: 'https://skeinrank.github.io',
  integrations: [
    starlight({
      title: 'SkeinRank',
      description:
        'Open-source terminology governance from coding-agent repositories to runtime search, RAG, and AI-agent workflows.',
      logo: {
        src: './src/assets/logo.png',
        alt: 'SkeinRank',
      },
      favicon: '/favicon.ico',
      customCss: ['./src/styles/custom.css'],
      components: {
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      head: [
        {
          tag: 'link',
          attrs: { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: '/skeinrank-apple-touch-icon.png' },
        },

        {
          tag: 'link',
          attrs: { rel: 'icon', type: 'image/svg+xml', href: '/skeinrank-favicon.svg' },
        },
        {
          tag: 'link',
          attrs: { rel: 'icon', type: 'image/png', href: '/skeinrank-favicon.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#080d1b' },
        },
        {
          tag: 'meta',
          attrs: { name: 'application-name', content: 'SkeinRank' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'SkeinRank' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://skeinrank.github.io/skeinrank-og.png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: 'SkeinRank — terminology governance for coding agents, search, RAG, and AI agents' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:title', content: 'SkeinRank — terminology governance from dev-time to runtime' },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:description',
            content:
              'Open-source terminology governance from coding-agent repositories to runtime search, RAG, and AI-agent workflows.',
          },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://skeinrank.github.io/skeinrank-og.png' },
        },
        {
          tag: 'script',
          attrs: { src: '/header-nav.js', defer: true },
        },
        {
          tag: 'script',
          attrs: { src: '/platform-preview-lightbox.js', defer: true },
        },
      ],
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
        styleOverrides: {
          borderRadius: '0.95rem',
          borderColor: 'rgba(148, 163, 184, 0.22)',
        },
      },
      lastUpdated: true,
      editLink: {
        baseUrl: 'https://github.com/SkeinRank/skeinrank.github.io/edit/main/',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      sidebar: [
        {
          label: 'Documentation',
          items: [
            { label: 'Choose a product', slug: 'docs' },
            { label: 'How they work together', slug: 'docs/ecosystem/how-they-work-together' },
            { label: 'Benchmarks and evidence', slug: 'docs/evidence' },
          ],
        },
        {
          label: 'Agent Lexicon · Dev-time',
          items: [
            { label: 'Overview', slug: 'docs/agent-lexicon' },
            { label: 'Installation', slug: 'docs/agent-lexicon/installation' },
            { label: 'Quickstart', slug: 'docs/agent-lexicon/quickstart' },
            { label: 'Review and publish', slug: 'docs/agent-lexicon/review-publish' },
            { label: 'Agent context', slug: 'docs/agent-lexicon/context' },
            { label: 'Merge and CI checks', slug: 'docs/agent-lexicon/merge-checks' },
            { label: 'MCP server', slug: 'docs/agent-lexicon/mcp' },
            { label: 'CLI reference', slug: 'docs/agent-lexicon/reference' },
          ],
        },
        {
          label: 'SkeinRank · Runtime',
          items: [
            { label: 'Overview', slug: 'docs/skeinrank' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'SDK quickstart', slug: 'getting-started/quickstart' },
            { label: 'Docker beta quickstart', slug: 'getting-started/docker-beta-quickstart' },
            { label: 'CLI', slug: 'getting-started/cli' },
            { label: 'Python SDK', slug: 'getting-started/python-sdk' },
          ],
        },
        {
          label: 'SkeinRank concepts',
          items: [
            { label: 'Mental model', slug: 'concepts/mental-model' },
            { label: 'Side-car model', slug: 'concepts/sidecar-model' },
            { label: 'Sidecar control plane', slug: 'concepts/sidecar-control-plane' },
            { label: 'Profiles, bindings, snapshots', slug: 'concepts/profiles-bindings-snapshots' },
            { label: 'Binding runtime context', slug: 'concepts/bindings-runtime-context' },
            { label: 'Snapshots', slug: 'concepts/snapshots' },
            { label: 'Dictionary JSON', slug: 'concepts/dictionary-json' },
            { label: 'Passport output', slug: 'concepts/passport-output' },
            { label: 'Architecture', slug: 'concepts/architecture' },
            { label: 'Current status', slug: 'concepts/current-status' },
          ],
        },
        {
          label: 'SkeinRank integrations',
          items: [
            { label: 'MCP integration', slug: 'integrations/mcp' },
          ],
        },
        {
          label: 'SkeinRank operations',
          items: [
            { label: 'GitOps delivery', slug: 'ops/gitops-delivery' },
            { label: 'Blue/green rollout', slug: 'ops/blue-green-rollout' },
            { label: 'Enrichment checkpointing', slug: 'ops/checkpointing' },
          ],
        },
        {
          label: 'SkeinRank platform preview',
          items: [
            { label: 'Governance console', slug: 'platform-preview/governance-console' },
            { label: 'Elasticsearch workflow', slug: 'platform-preview/elasticsearch-workflow' },
            { label: 'End-to-end demo', slug: 'platform-preview/end-to-end-demo' },
          ],
        },
        {
          label: 'SkeinRank reference',
          items: [
            { label: 'Python API', slug: 'reference/python-api' },
            { label: 'API integration', slug: 'reference/api-integration' },
            { label: 'REST API', slug: 'reference/rest-api' },
            { label: 'Roadmap', slug: 'reference/roadmap' },
          ],
        },
      ],
    }),
  ],
});
