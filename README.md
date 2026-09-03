# webOwie // OSINT Core

Static GitHub Pages surface for the webOwie intelligence and infrastructure ecosystem.

## Architecture

```text
┌──────────────────────────────────────────────┐
│ PUBLIC SURFACE                               │
│ index.html · GitHub Pages · CDN Tailwind     │
├──────────────────────────────────────────────┤
│ APPLICATION SURFACES                         │
│ /de · /en · /research · /osint-platform     │
├──────────────────────────────────────────────┤
│ CONTROL PLANE                                │
│ Local AI · OSINT workflows · Proxmox         │
│ automation · controlled network routing      │
└──────────────────────────────────────────────┘
```

The repository intentionally keeps the public landing surface independent from operational control systems. The site contains no build step and can be inspected directly as static HTML.

## Stack

- HTML5
- Tailwind CSS via CDN
- Google Fonts: Inter and JetBrains Mono
- Vanilla JavaScript for the terminal mockup
- GitHub Pages deployment

## Local preview

No dependency installation is required. Open `index.html` directly in a browser or serve the repository with a minimal HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Repository layout

```text
.
├── index.html        # OSINT Core dashboard
├── README.md         # Architecture and deployment notes
├── CNAME             # Custom domain configuration
├── assets/           # Shared static assets
├── de/               # German public surface
├── en/               # English public surface
├── research/         # Research-oriented surface
├── osint-platform/   # OSINT platform content
└── proxmox-automation/
```

Additional directories represent separate public or documentation surfaces and should not be treated as one monolithic application merely because humans enjoy putting unrelated things into one repository.

## GitHub Pages

The repository's default branch is `main`. For a standard branch-based GitHub Pages configuration, publish from:

```text
Branch: main
Folder: / (root)
```

The deployment source can be verified in the repository's **Settings → Pages** configuration. A push to the configured Pages branch updates the static site after GitHub Pages has completed propagation.

## Design constraints

- Dark-first interface based on `slate-950` and `slate-900`
- Cyan and emerald reserved for state and interaction signals
- JetBrains Mono for metrics, commands and system labels
- Inter for prose and interface copy
- Responsive CSS grid layout
- No framework build chain

## Terminal mockup

The terminal component is intentionally non-operational. It accepts a small local command set:

- `help`
- `status`
- `nodes`
- `docs`
- `clear`

It executes nothing and has no backend connection. That distinction is important. A decorative terminal should not quietly mutate infrastructure.

## Deployment workflow

```text
edit
  ↓
validate static HTML
  ↓
commit to configured Pages branch
  ↓
push
  ↓
GitHub Pages propagation
```

For changes to this public surface, keep external dependencies minimal and do not expose internal endpoints, credentials or control-plane topology through the static repository.
