import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// For the organization Pages repository, keep `base` unset:
//   https://github.com/SkeinRank/skeinrank.github.io -> https://skeinrank.github.io
// When the custom domain is connected, GitHub Pages will serve the same build at:
//   https://skeinrank.io
export default defineConfig({
  site: 'https://skeinrank.github.io',
  integrations: [
    starlight({
      title: 'SkeinRank',
      description:
        'Open-source terminology control plane that turns messy aliases into governed runtime context for search, RAG, and enterprise knowledge workflows.',
      logo: {
        src: './src/assets/logo.png',
        alt: 'SkeinRank',
      },
      favicon: '/skeinrank-favicon.png',
      customCss: ['./src/styles/custom.css'],
      head: [
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
          attrs: { property: 'og:image', content: 'https://skeinrank.io/skeinrank-og.png' },
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
          attrs: { property: 'og:image:alt', content: 'SkeinRank — terminology control plane for search and RAG' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:title', content: 'SkeinRank — Terminology Control Plane for Search and RAG' },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:description',
            content:
              'Open-source terminology control plane that turns messy aliases into governed runtime context for search, RAG, and enterprise knowledge workflows.',
          },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://skeinrank.io/skeinrank-og.png' },
        },
        {
          tag: 'script',
          attrs: { src: '/header-nav.js', defer: true },
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
          label: 'Start here',
          items: [
            { label: 'Overview', slug: '' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quickstart', slug: 'getting-started/quickstart' },
            { label: 'Docker beta quickstart', slug: 'getting-started/docker-beta-quickstart' },
            { label: 'CLI', slug: 'getting-started/cli' },
            { label: 'Python SDK', slug: 'getting-started/python-sdk' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Mental model', slug: 'concepts/mental-model' },
            { label: 'Side-car model', slug: 'concepts/sidecar-model' },
            { label: 'Profiles, bindings, snapshots', slug: 'concepts/profiles-bindings-snapshots' },
            { label: 'Dictionary JSON', slug: 'concepts/dictionary-json' },
            { label: 'Passport output', slug: 'concepts/passport-output' },
            { label: 'Architecture', slug: 'concepts/architecture' },
            { label: 'Current status', slug: 'concepts/current-status' },
          ],
        },
        {
          label: 'Platform preview',
          items: [
            { label: 'Governance console', slug: 'platform-preview/governance-console' },
            { label: 'Elasticsearch workflow', slug: 'platform-preview/elasticsearch-workflow' },
            { label: 'End-to-end demo', slug: 'platform-preview/end-to-end-demo' },
          ],
        },
        {
          label: 'Reference',
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
