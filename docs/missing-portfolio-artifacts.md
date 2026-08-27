# Missing Portfolio Artifacts

Inventory of artifacts referenced in the portfolio that are not currently present in the repository. Organized by priority for portfolio completeness.

---

## Critical — Referenced directly in pages

### Images referenced in `index.html`

| File path | Used in | Status |
|-----------|---------|--------|
| `img/stephan.png` | Hero photo | Exists in repo — verify case matches |
| `img/calm-hero.png` | Featured work card (Case Study 1) | Verify exists |
| `img/syn-joule-eval-framework-01.png` | Featured work card (Case Study 2); also in agentic-ux-practice.html | Verify exists |
| `img/baur-01.png` | Featured work card (Case Study 3); also in baur-field-research.html | Verify exists |
| `img/portfolioHandling.png` | calm-ux-strategy.html | Verify exists |
| `img/syn-analytics-to-design-synthesis-02.png` | calm-ux-strategy.html; also earlier work card | Verify exists |
| `img/ideate-joule-01.png` | agentic-ux-practice.html | Verify exists |
| `img/baur-03.png` | baur-field-research.html | Verify exists |

### Earlier work card images (index.html)

| File path | Work card | Status |
|-----------|-----------|--------|
| `img/complexloans-02.gif` | S/4HANA Complex Loans | Verify exists |
| `img/zeiss-smartzoom-01.png` | Zeiss SmartZoom | Verify exists |
| `img/bbva-01.png` | BBVA Private Wealth | Verify exists |
| `img/bosch-02.jpg` | Bosch Smart Home | Verify exists |
| `img/ctsm-03.png` | SAP iCTSM | Verify exists |

### Client logo images (index.html)

All client logos referenced as `img/clients/*.png`. The following need to be verified:

`sap.png`, `bosch.png`, `zeiss.png`, `bbva.png`, `daimler.png`, `baur.png`, `bbc.png`, `vodafone.png`, `siemens.png`, `helaba.png`, `heidenhain.png`, `citi.png`, `vw.png`, `amg.png`, `ericsson.png`, `neusoft.png`, `toll.png`, `lg.png`

If `img/clients/` directory does not exist, all 18 logos need to be sourced or the clients section needs to fall back gracefully.

---

## Required — Needed for full portfolio function

### CV PDF

| File path | Used in | Notes |
|-----------|---------|-------|
| `cv/stephan-albrecht-cv.pdf` | About section CV card (disabled placeholder) | Not yet added. Button is disabled until this exists. Create `cv/` directory and add final PDF. Update button href and remove `disabled` state when ready. |

---

## Not required for launch — Background documentation

These are supplementary documents not linked from the public-facing portfolio:

| File | Purpose |
|------|---------|
| `docs/google-portfolio-alignment.md` | Internal alignment mapping between portfolio content and Google role requirements |
| `docs/missing-portfolio-artifacts.md` | This file |

---

## Fonts — already present

The following font files are required and should already be in `fonts/`:

- `fonts/72-Black-full.woff`
- `fonts/72-Regular-full.woff`
- `fonts/72-Bold-full.woff`
- `fonts/72-Light-full.woff` (referenced in prior session; not used in current CSS — can be omitted)

Verify all four woff files exist before publishing.

---

## Before publishing checklist

- [ ] Verify all `img/` files listed above exist with correct filenames (case-sensitive on Linux servers)
- [ ] Verify `img/clients/` directory contains all 18 logo files
- [ ] Add `cv/stephan-albrecht-cv.pdf` and update About section CV button
- [ ] Check that `fonts/` directory contains required `.woff` files
- [ ] Test all internal links: case study cards → `work/*.html`; nav links → section anchors
- [ ] Check at 375px, 768px, and 1440px viewport widths
- [ ] Verify no console errors on any page
- [ ] Confirm branch is `portfolio/google-strategic-lead` — do NOT merge or publish without explicit approval
