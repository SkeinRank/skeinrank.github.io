# SkeinRank Website

Public website and documentation portal for the **SkeinRank ecosystem**: Agent Lexicon for repository and coding-agent vocabulary, and SkeinRank for runtime terminology governance in search, RAG, and AI-agent workflows.

## What this site contains

- Ecosystem landing page connecting Agent Lexicon and SkeinRank.
- `/docs/` product chooser with separate dev-time and runtime documentation paths.
- Agent Lexicon quickstarts for scan, review, publish, context, merge checks, and MCP.
- SkeinRank SDK, platform, concepts, operations, and API documentation.
- Shared ecosystem and benchmark evidence sections.
- Platform preview docs for the governance console and Elasticsearch workflow.

## Tech stack

- [Astro](https://astro.build/)
- [Starlight](https://starlight.astro.build/)
- TypeScript
- GitHub Pages

## Local development

This site requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Astro will print the local development URL, usually:

```text
http://localhost:4321
```

## Quality checks

```bash
npm run check
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The site is deployed to GitHub Pages through GitHub Actions.

Deployment workflow:

```text
.github/workflows/deploy.yml
```

The production URL is configured through `astro.config.mjs` and the GitHub Pages custom domain settings.

## Repository structure

```text
src/components/          Landing page components
src/content/docs/        Starlight documentation pages
src/styles/custom.css    Site-wide product and docs styling
public/                  Static assets, icons, robots.txt, social preview image
src/assets/diagrams/      Product/system-design diagrams used by the landing page and docs
src/assets/brand/         Reusable SkeinRank logo assets
.github/workflows/       GitHub Pages deployment workflow
```

## License

This repository contains the public website and documentation for the SkeinRank project. See the main SkeinRank repositories for project source code and licensing details.
