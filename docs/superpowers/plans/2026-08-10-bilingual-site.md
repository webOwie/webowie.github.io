# webOwie Bilingual Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish webOwie as a crawlable German/English GitHub Pages site with exact language pairs, correct canonical/hreflang metadata, SEO-safe legacy paths, and a complete sitemap.

**Architecture:** Keep GitHub Pages fully static. Use `/de/` and `/en/` language roots, `/` as a neutral gateway, and path-equivalent language switching. Existing root English landing-page paths become compatibility pages pointing to `/en/.../`.

**Tech Stack:** Static HTML5, CSS, JSON-LD, XML sitemap, GitHub Pages.

## Global Constraints

- No forced browser-language redirects.
- Every localized page declares `lang`, canonical, `de`, `en`, and `x-default` alternates.
- German and English copy is localized, not keyword-stuffed literal translation.
- Every language switch targets the exact equivalent page.
- Existing `/docs/`, `/search/`, `/research/`, and `/status/` remain indexable until separately localized.
- GitHub Pages only; no server-side redirects or framework dependencies.

---

### Task 1: Language gateway and localized homepages

**Files:**
- Modify: `index.html`
- Create: `en/index.html`
- Create: `de/index.html`

- [ ] Replace `/` with a neutral DE/EN gateway containing `x-default` metadata and visible language choices.
- [ ] Publish an English homepage under `/en/` with localized navigation and language switch.
- [ ] Publish a German homepage under `/de/` with equivalent content and exact English switch.
- [ ] Verify one H1, unique title/description, absolute canonical and reciprocal hreflang on each page.

### Task 2: Localized SEO landing pages

**Files:**
- Create: `en/local-ai/index.html`
- Create: `de/local-ai/index.html`
- Create: `en/proxmox-automation/index.html`
- Create: `de/proxmox-automation/index.html`
- Create: `en/osint-platform/index.html`
- Create: `de/osint-platform/index.html`
- Create: `en/services/index.html`
- Create: `de/services/index.html`

- [ ] Publish English and German Local AI pages with reciprocal hreflang and Service JSON-LD.
- [ ] Publish English and German Proxmox pages with reciprocal hreflang and Service JSON-LD.
- [ ] Publish English and German OSINT pages with reciprocal hreflang and SoftwareApplication JSON-LD.
- [ ] Publish English and German Services pages with reciprocal hreflang and service-oriented copy.
- [ ] Verify all language switches preserve page intent.

### Task 3: Legacy English handoff

**Files:**
- Modify: `local-ai/index.html`
- Modify: `proxmox-automation/index.html`
- Modify: `osint-platform/index.html`
- Modify: `services/index.html`

- [ ] Convert each legacy root path into a lightweight compatibility page.
- [ ] Canonicalize each compatibility page to its `/en/.../` equivalent.
- [ ] Add visible English and German destination links.
- [ ] Add `noindex,follow` after the localized destination exists in the same deployment.

### Task 4: International sitemap

**Files:**
- Modify: `sitemap.xml`

- [ ] Add `/`, all `/de/` and `/en/` localized pages, and existing neutral technical pages.
- [ ] Add XHTML hreflang alternates for every localized pair.
- [ ] Exclude legacy compatibility paths from the canonical sitemap.
- [ ] Use `lastmod` 2026-08-10 for this bilingual deployment.

### Task 5: Verification and merge

- [ ] Confirm every DE URL has an EN counterpart and vice versa.
- [ ] Confirm reciprocal hreflang and self-referential canonicals.
- [ ] Confirm sitemap XML is structurally valid and contains only canonical/indexable URLs.
- [ ] Open a PR from `feat/bilingual-site` to `main`, review changes, and merge when clean.
