# Sam — Portfolio

Personal portfolio for **Sam, UI/UX Designer & UI/UX Developer**.
Dark, futuristic and elegant by default, with a light-theme toggle, a 3D "complexity → clarity" hero, a custom cursor, scroll reveals and a full case-study page for each project.

## Structure

```
src/
  content.mjs        ← ALL text lives here: bio, projects, case studies, skills, experience, links
  mocks.mjs          ← schematic UI illustrations (stand-ins for confidential screens)
  assets/
    css/style.css    ← design tokens (colours, fonts) at the top
    js/main.js       ← theme, cursor, 3D hero, reveals, filters, lightbox, contact form
    favicon.svg
build.mjs            ← zero-dependency static site generator
docs/                ← generated site (what GitHub Pages serves) — don't edit by hand
```

Pages (clean URLs): **/** · **/work/** (filterable grid) · **/work/<project>/** (6 case studies) · **/about/** · **/contact/** · 404. Old `.html` addresses redirect to these.

## Edit → build → preview

```bash
# 1. edit src/content.mjs (or CSS/JS in src/assets)
node build.mjs                     # 2. regenerate /docs (needs Node 18+)
npx serve docs                     # 3. preview at http://localhost:3000
# or: cd docs && python3 -m http.server 8000
```

The build prints a warning for anything that's still missing. Empty links (email, socials, resume) are **hidden automatically**, so the site never shows dead icons.

## Publish on GitHub Pages (free)

1. Merge this branch into `main`.
2. Repo → **Settings → Pages** → *Deploy from a branch* → `main` / `/docs` → Save.
3. Live at **https://samuelms18.github.io/Sam-Portfolio-/** (set as `site.url` in `content.mjs`).

## Content checklist — what Sam still needs to add

| Item | Where |
|---|---|
| ~~Professional email~~ ✓ | `site.email` in `src/content.mjs` |
| LinkedIn (Behance & Dribbble ✓) | `site.socials` |
| Resume PDF | save as `src/assets/Sam-Resume.pdf` |
| Profile photo | save as `src/assets/img/sam.jpg` — it appears in the hero and on About automatically |
| Full name (shown on Contact only) | `site.fullName` |
| ~~Education~~ ✓ · certifications (optional) | `education` array in `content.mjs` |
| Contact form delivery (optional) | create a free [Formspree](https://formspree.io) form → paste the endpoint into `site.formEndpoint`. Without it the form opens an email draft. |
| **Review every case study's copy** | `projects` in `content.mjs`. It's drafted from your brief and contains no invented metrics, but make sure each line matches what really happened. |
| Real screens (where you're allowed to share them) | add `image` support or replace mocks; blur sensitive data first |

Search the repo for `TODO(Sam)` to find every placeholder.

## Images

| Image | Size & format | Where it's used | Status |
|---|---|---|---|
| **Portrait** | 4:5 portrait, at least 1200 × 1500 px, JPG. Plain or softly blurred background, good light, shoulders-up | Hero (arched frame) + About | Hidden until you add `src/assets/img/sam.jpg` |
| **Case-study context photos** (1 per project) | 16:9 landscape, at least 1600 × 900 px | Context section of each case study | Random stock from picsum.photos — set `photo` per project in `content.mjs` |
| **Project screens** (3–6 per project) | Cover 16:10 at least 2400 px wide; key screens, wireframes, flows. PNG. Blur confidential data | Wireframes / Visual design sections | Schematic mocks drawn in code |
| **Social share image** (optional) | 1200 × 630 px | Link previews on LinkedIn/WhatsApp | Not set |

Turn the hero portrait off with `heroPhoto: false` in `content.mjs`.

## Design system (quick reference)

- **Type:** Instrument Serif (italic accents) · Hanken Grotesk (UI/body) · JetBrains Mono (labels)
- **Colour:** ink `#0b0b0d` / bone `#ede9e1` / amber signal `#e8b04a` (light theme: `#f3efe7` / `#151413` / `#a86610`)
- **Per-project hue:** each project has a `hue` that tints its titles, mock and case-study accents
- **Motion:** respects `prefers-reduced-motion`; the custom cursor and tilt only run on mouse/trackpad devices
