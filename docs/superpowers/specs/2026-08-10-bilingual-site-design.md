# webOwie Bilingual Site Design

## Goal

Build the public GitHub Pages site as a fully bilingual German/English website with stable language-specific URLs, equivalent navigation, SEO-safe internationalization, and preserved search value for the already published English landing pages.

## Architecture

The public site uses separate language roots:

- `/de/` for German
- `/en/` for English
- `/` as a neutral language gateway

Each German page has a direct English equivalent and vice versa. Language switches always target the equivalent page, not the homepage.

## URL Structure

```text
/
├── de/
│   ├── index.html
│   ├── local-ai/
│   ├── proxmox-automation/
│   ├── osint-platform/
│   └── services/
├── en/
│   ├── index.html
│   ├── local-ai/
│   ├── proxmox-automation/
│   ├── osint-platform/
│   └── services/
├── robots.txt
└── sitemap.xml
```

The existing root English URLs `/local-ai/`, `/proxmox-automation/`, and `/osint-platform/` remain available during the transition and point users and crawlers to their `/en/` equivalents through canonical and visible language-aware handoff pages rather than destructive removal.

## Root Gateway

`https://webowie.com/` becomes a language-neutral entry point with the webOwie brand and explicit choices:

- Deutsch
- English

The gateway may detect browser language to visually recommend a choice, but it must not force an automatic redirect. This keeps search engines, shared links, and user choice stable.

The root page uses `hreflang="x-default"` for itself and links to both language homepages.

## Language Switching

Every localized page contains a visible `DE | EN` switch in the global header.

Mappings are exact:

- `/de/` ↔ `/en/`
- `/de/local-ai/` ↔ `/en/local-ai/`
- `/de/proxmox-automation/` ↔ `/en/proxmox-automation/`
- `/de/osint-platform/` ↔ `/en/osint-platform/`
- `/de/services/` ↔ `/en/services/`

## SEO Metadata

Every localized page gets its own:

- `<html lang="de">` or `<html lang="en">`
- localized `<title>`
- localized meta description
- canonical URL for that exact language URL
- Open Graph title/description/URL
- JSON-LD matching that page and language
- alternate `hreflang` links for `de`, `en`, and `x-default`

Example:

```html
<link rel="canonical" href="https://webowie.com/de/local-ai/">
<link rel="alternate" hreflang="de" href="https://webowie.com/de/local-ai/">
<link rel="alternate" hreflang="en" href="https://webowie.com/en/local-ai/">
<link rel="alternate" hreflang="x-default" href="https://webowie.com/">
```

## Content Strategy

German and English content are localized independently rather than translated word-for-word.

### German Search Intent

Primary clusters:

- lokale KI
- KI On-Premise
- selbst gehostete KI
- souveräne KI
- lokale LLM-Infrastruktur
- Proxmox Automatisierung
- Proxmox Verwaltung
- Proxmox Netzwerk-Automatisierung
- OSINT Software
- OSINT Plattform
- Research-Automatisierung
- IT-Infrastruktur Automatisierung

### English Search Intent

Primary clusters:

- local AI infrastructure
- sovereign AI
- on-premise AI
- self-hosted AI
- private AI infrastructure
- Proxmox automation
- Proxmox infrastructure management
- Proxmox network automation
- OSINT platform
- OSINT automation
- research automation
- infrastructure automation

Keyword use must remain natural. No keyword stuffing or unsupported market-leadership claims.

## Content Parity

The German and English sites should expose the same major product areas and navigation structure so users do not encounter a reduced secondary language site.

Content can differ in wording, examples, and keyword targeting where language and market context justify it.

## Sitemap

`sitemap.xml` includes both German and English URLs and language alternates where practical.

At minimum it contains:

- `/`
- `/de/`
- `/en/`
- all localized Local AI pages
- all localized Proxmox pages
- all localized OSINT pages
- all localized Services pages

Existing `/docs/` and `/search/` URLs remain included until separately localized.

## Legacy English URLs

The already published URLs:

- `/local-ai/`
- `/proxmox-automation/`
- `/osint-platform/`

must not simply disappear.

Because GitHub Pages does not provide native server-side HTTP redirect configuration, each legacy path becomes a lightweight compatibility page containing:

- canonical URL pointing to `/en/.../`
- `hreflang` links to German and English equivalents
- immediate visible link to the English page
- optional short client-side redirect after a small delay
- `noindex,follow` only after the `/en/` version has been deployed successfully

This preserves discoverability while consolidating future indexing on `/en/`.

## Shared Visual System

Both language trees use the existing webOwie visual identity: black background, high-contrast typography, cyan accent, minimal technical layout, and the existing logo mark.

The language switch is a compact header control and must remain visible on desktop and mobile.

## Accessibility

- language links have explicit accessible labels
- each page declares the correct document language
- navigation remains keyboard accessible
- current language is identified with `aria-current="page"`
- no automatic redirect traps users

## Testing

Before merge, verify:

1. every DE page returns a matching EN page
2. every EN page returns a matching DE page
3. all canonical URLs are absolute and self-referential
4. all `hreflang` pairs are reciprocal
5. root uses `x-default`
6. no localized internal link points to a missing path
7. sitemap contains all localized URLs
8. legacy English URLs preserve a path to the new English canonical
9. HTML has one H1 per page and unique titles/descriptions
10. GitHub Pages-compatible static HTML only, with no server-side assumptions

## Out of Scope

For this change:

- `/docs/`, `/search/`, `/research/`, and `/status/` are not fully localized unless already trivial to map
- no external translation framework is introduced
- no JavaScript SPA router is introduced
- no geolocation-based language selection
- no forced language redirect

These choices keep the bilingual launch static, crawlable, reliable, and compatible with GitHub Pages.
