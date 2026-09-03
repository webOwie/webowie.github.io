# webOwie // SYS_CORE

Statische GitHub-Pages-Oberfläche für den Coming-Soon-Betrieb mit integriertem Service-Chat in Terminal-Ästhetik.

## Architektur

```text
┌──────────────────────────────────────┐
│ PUBLIC SURFACE                       │
│ index.html · GitHub Pages            │
│ HTML5 · Tailwind CDN · Vanilla JS    │
├──────────────────────────────────────┤
│ CHAT STATE MACHINE                   │
│ Local Simulation Mode                │
│ sichere DOM-Ausgabe                  │
├──────────────────────────────────────┤
│ OPTIONAL EXTERNAL BRIDGE             │
│ Cloudflare Worker / n8n / eigener API│
├──────────────────────────────────────┤
│ PRIVATE CONTROL PLANE                │
│ Agenten · LLMs · Automatisierung     │
│ API-Keys ausschließlich serverseitig │
└──────────────────────────────────────┘
```

GitHub Pages liefert ausschließlich die statische Oberfläche aus. Es existiert kein Serverprozess auf GitHub Pages und damit auch keine sichere Möglichkeit, geheime LLM- oder Provider-Schlüssel im Browser zu halten.

## Stack

- HTML5
- Tailwind CSS via CDN
- Inter und JetBrains Mono
- Vanilla JavaScript
- GitHub Pages
- Optional: kontrollierte Webhook-Bridge

## Chat-Modi

### Local Simulation Mode

Standardzustand:

```js
const WEBHOOK_URL = '';
```

Die Chat-State-Machine erzeugt Antworten vollständig im Browser. Es wird kein Backend angesprochen.

### Webhook Bridge

Für eine produktive Integration wird eine HTTPS-URL gesetzt:

```js
const WEBHOOK_URL = 'https://example.invalid/chat';
```

Der Endpoint muss Browser-CORS-Anfragen explizit für die Pages-Origin erlauben und JSON akzeptieren. Der Client sendet:

```json
{
  "message": "...",
  "timestamp": "ISO-8601",
  "source": "webowie-pages"
}
```

Erwartete Minimalantwort:

```json
{
  "reply": "..."
}
```

Die Bridge besitzt einen Client-Timeout von 12 Sekunden. Fehler führen nicht zu einer stillen Weiterleitung an einen anderen Dienst.

## Sicherheitsmodell

- Keine API-Schlüssel im Repository oder Browser-Code
- Keine direkte LLM-Provider-Anfrage aus der statischen Seite
- DOM-Ausgabe über `textContent`
- Begrenzte Eingabe- und Antwortlängen
- `credentials: 'omit'` für Webhook-Anfragen
- Fehlerbehandlung mit lokalem Fallback-Hinweis
- Der UI-Status behauptet keine echte verschlüsselte Chat-Session

Ein Webhook ist kein Geheimnis. Jede URL, die im statischen JavaScript steht, kann öffentlich eingesehen werden. Authentisierung, Rate-Limits, Abuse-Controls, Provider-Schlüssel und sensible Routing-Logik gehören hinter einen serverseitigen Endpoint.

## Empfohlene Produktionsarchitektur

```text
Browser
  ↓ HTTPS / CORS
Cloudflare Worker oder eigener API-Gateway
  ↓ serverseitige Authentisierung / Rate Limit
n8n oder Agent Gateway
  ↓ private Credentials
LLM / lokale Agenten / Automatisierung
```

Für besonders sensible Systeme sollte die öffentliche Chat-Oberfläche keinen direkten Zugriff auf Infrastruktur-Automatisierung erhalten. Agenten benötigen explizite, minimal privilegierte Tool-Schnittstellen.

## Lokale Vorschau

Kein Build-Schritt erforderlich:

```bash
python3 -m http.server 8080
```

Anschließend `http://localhost:8080` öffnen.

## Repository-Struktur

```text
.
├── index.html        # Coming Soon + Service Chat Core
├── README.md         # Architektur und Betriebsdokumentation
├── CNAME             # Custom Domain
├── assets/           # Statische Assets
├── de/               # Deutsche Inhalte
├── en/               # Englische Inhalte
├── research/         # Research-Surface
└── osint-platform/   # OSINT-Inhalte
```

## GitHub Pages

Die aktuelle Deployment-Strategie muss in den Repository-Einstellungen überprüft werden. Für branchbasiertes Hosting ist die typische Konfiguration:

```text
Settings → Pages
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

Ein Push auf den konfigurierten Pages-Branch triggert die Bereitstellung durch GitHub Pages. Die tatsächliche Propagationszeit liegt außerhalb der Kontrolle der statischen Seite, weil natürlich selbst ein einzelnes HTML-Dokument erst noch durch diverse Ebenen menschlicher Infrastruktur wandern muss.

## Deployment-Workflow

```text
edit
  ↓
static validation
  ↓
commit
  ↓
push to configured Pages branch
  ↓
GitHub Pages deployment
```

Vor dem produktiven Aktivieren eines Webhooks müssen CORS, Rate-Limits, Logging, Datenschutz, Missbrauchsschutz und die serverseitige Geheimnisverwaltung geprüft werden.
