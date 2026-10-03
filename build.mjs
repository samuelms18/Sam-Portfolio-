// Zero-dependency static site builder.
// Usage: node build.mjs   →   writes the site to /docs (served by GitHub Pages).

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bio, domains, education, experience, exploring, principles, process, projects, site, skills } from './src/content.mjs';
import { mock } from './src/mocks.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'docs');
const SRC = join(ROOT, 'src');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const hasResume = site.resume && existsSync(join(SRC, site.resume));
const socials = Object.entries(site.socials).filter(([, url]) => url);
const socialNames = { linkedin: 'LinkedIn', github: 'GitHub', behance: 'Behance', dribbble: 'Dribbble' };

const warnings = [];
if (!hasResume) warnings.push(`Resume not found at src/${site.resume} — resume buttons are hidden.`);
if (!site.email) warnings.push('site.email is empty — email links are hidden.');
if (!socials.length) warnings.push('No social links set — social icons are hidden.');

const hasPhoto = site.photo && existsSync(join(SRC, site.photo));
if (!hasPhoto) warnings.push(`Photo not found at src/${site.photo} — photo slots are hidden.`);
const showHeroPhoto = site.heroPhoto && hasPhoto;

// Your photo. Only rendered once src/<site.photo> exists.
const portrait = (base) =>
  `<img class="portrait-img" src="${base}${site.photo}" alt="Portrait of ${esc(site.name)}" width="800" height="1000" decoding="async">`;

// ── Shared chrome ────────────────────────────────────────────
function layout({ title, description, base = '', active = '', body, bodyClass = '', path = '' }) {
  const pageTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
  const desc = description || site.intro;
  const nav = [
    ['work.html', 'Work'],
    ['about.html', 'About'],
    ['contact.html', 'Contact'],
  ];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
${site.url && path !== null ? `<meta property="og:url" content="${esc(site.url + path)}">\n<link rel="canonical" href="${esc(site.url + path)}">` : ''}
<meta name="theme-color" content="#0b0b0d">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t;}catch(e){}
try{if(!sessionStorage.getItem('loaded')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('is-loading');setTimeout(function(){d.classList.remove('is-loading')},5000);}}catch(e){}})();</script>
<link rel="stylesheet" href="${base}assets/css/style.css">
<script src="${base}assets/js/main.js" defer></script>
</head>
<body class="${bodyClass}">
<div class="preloader" aria-hidden="true">
  <div class="pl-mark">${esc(site.name)}<i>.</i></div>
  <div class="pl-meta mono"><span>${esc(site.role)}</span><span class="pl-count">000</span></div>
  <div class="pl-bar"><b></b></div>
</div>
<a class="skip" href="#main">Skip to content</a>
<div class="grain" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><div class="cursor-dot"></div><div class="cursor-ring"><span></span></div></div>
<div class="progress" aria-hidden="true"></div>

<header class="nav">
  <a class="brand" href="${base}index.html" aria-label="${esc(site.name)} — home">
    <span class="brand-mark">${esc(site.name)}<i>.</i></span>
    <span class="brand-role">${esc(site.role)}</span>
  </a>
  <nav class="nav-links" aria-label="Primary">
    ${nav.map(([href, label]) => `<a href="${base}${href}"${active === label ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
  </nav>
  <div class="nav-actions">
    ${hasResume ? `<a class="btn btn-sm btn-ghost" href="${base}${site.resume}" download>Resume <span aria-hidden="true">↓</span></a>` : ''}
    <button class="theme-toggle" type="button" aria-label="Toggle light and dark theme"><span class="tt-sun"></span><span class="tt-moon"></span></button>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  ${nav.map(([href, label], i) => `<a href="${base}${href}" style="--i:${i}"><small>${pad(i + 1)}</small>${label}</a>`).join('')}
  <a href="${base}index.html" style="--i:3"><small>04</small>Home</a>
</div>

<main id="main">
${body}
</main>

<footer class="footer">
  <div class="container">
    <p class="footer-cta reveal">Let's make something<br><em>complex feel simple.</em></p>
    <div class="footer-row">
      <div class="footer-links">
        ${site.email ? `<a href="mailto:${esc(site.email)}" class="link-u">${esc(site.email)}</a>` : `<a href="${base}contact.html" class="link-u">Get in touch →</a>`}
        ${socials.map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" class="link-u">${socialNames[k]}</a>`).join('')}
      </div>
      <div class="footer-meta">
        <span>© <span data-year></span> ${esc(site.name)} · Designed &amp; built by ${esc(site.name)}</span>
        <button class="to-top" type="button">Back to top ↑</button>
      </div>
    </div>
  </div>
</footer>
</body>
</html>
`;
}

// ── Reusable blocks ──────────────────────────────────────────
const tags = (list, cls = 'tags') => `<ul class="${cls}">${list.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;

function projectRow(p, i, base) {
  return `
  <a class="proj reveal" href="${base}work/${p.slug}.html" data-cursor="View" style="--h:${p.hue}">
    <div class="proj-media tilt">${mock(p.mock, { hue: p.hue })}</div>
    <div class="proj-info">
      <span class="proj-num">${pad(i + 1)} / ${pad(projects.length)}</span>
      <h3>${esc(p.title)} <em>${esc(p.subtitle)}</em></h3>
      <p>${esc(p.summary)}</p>
      ${tags(p.focus.slice(0, 4))}
      <span class="proj-role">${esc(p.role)} <span class="arrow" aria-hidden="true">→</span></span>
    </div>
  </a>`;
}

function card(p, i, base) {
  return `
  <a class="card reveal" href="${base}work/${p.slug}.html" data-cursor="View" data-cat="${esc(p.category.join('|'))}" style="--h:${p.hue}">
    <div class="card-media tilt">${mock(p.mock, { hue: p.hue })}</div>
    <div class="card-body">
      <div class="card-top"><span class="mono">${pad(i + 1)}</span><span class="mono">${esc(p.domain)}</span></div>
      <h3>${esc(p.title)} <em>${esc(p.subtitle)}</em></h3>
      <p>${esc(p.summary)}</p>
      ${tags(p.tools)}
    </div>
  </a>`;
}

const sectionHead = (num, label, title) => `
  <div class="sec-head reveal">
    <span class="eyebrow"><b>${num}</b> ${label}</span>
    <h2>${title}</h2>
  </div>`;

function experienceList() {
  return `<ol class="timeline">${experience
    .map(
      (e) => `
    <li class="tl-item reveal">
      <div class="tl-period mono">${esc(e.period)}</div>
      <div class="tl-body">
        <h3>${esc(e.company)}</h3>
        <span class="tl-role">${esc(e.role)}</span>
        <p>${esc(e.text)}</p>
        ${e.highlights ? tags(e.highlights, 'tags tags-sm') : ''}
      </div>
    </li>`
    )
    .join('')}</ol>`;
}

function skillsBlock() {
  return `<div class="skills">${skills
    .map(
      (g, i) => `
    <div class="skill-group reveal" style="--d:${i}">
      <h3><span class="mono">${pad(i + 1)}</span>${esc(g.group)}</h3>
      ${tags(g.items, 'chips')}
    </div>`
    )
    .join('')}</div>`;
}

const exploringBlock = () => `
  <div class="exploring reveal">
    <span class="eyebrow"><i class="pulse"></i> Currently exploring</span>
    ${tags(exploring, 'chips chips-outline')}
  </div>`;

const processBlock = () => `
  <ol class="process">${process
    .map(
      (s, i) => `
    <li class="reveal" style="--d:${i}">
      <span class="process-num">${pad(i + 1)}</span>
      <h3>${esc(s.step)}</h3>
      <p>${esc(s.text)}</p>
    </li>`
    )
    .join('')}</ol>`;

const marquee = () => `
  <div class="marquee" aria-label="Domains I design for">
    <div class="marquee-track">${[...domains, ...domains]
      .map((d, i) => `<span${i >= domains.length ? ' aria-hidden="true"' : ''}>${esc(d)}</span><i aria-hidden="true">✦</i>`)
      .join('')}</div>
  </div>`;

const resumeBtn = (base, cls = 'btn btn-ghost') => (hasResume ? `<a class="${cls}" href="${base}${site.resume}" download>Download resume <span aria-hidden="true">↓</span></a>` : '');

// ── Pages ────────────────────────────────────────────────────
function home() {
  const base = '';
  const body = `
<section class="hero${showHeroPhoto ? ' hero--photo' : ''}">
  <canvas class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-readout mono" aria-hidden="true"><span>complexity</span><i class="hero-meter"><b></b></i><span>clarity</span></div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="hero-kicker load" style="--d:0"><span class="status"><i class="pulse"></i>Currently at Caplin Point Laboratories</span></p>
      <h1 class="hero-title" aria-label="${esc(site.intro)}">
        ${(showHeroPhoto ? site.heroLinesPhoto : site.heroLines).map((l, i) => `<span class="line load" style="--d:${i + 1}" aria-hidden="true">${esc(l).replace(/\*(.+?)\*/g, '<em>$1</em>')}</span>`).join('')}
      </h1>
    </div>
    ${
      showHeroPhoto
        ? `<figure class="hero-portrait load" style="--d:2">
      ${portrait(base)}
      <figcaption class="hero-tag mono"><span>${esc(site.name)}</span><span>${esc(site.location)}</span></figcaption>
    </figure>`
        : ''
    }
    <div class="hero-foot load" style="--d:4">
      <p class="hero-sub">${esc(site.role)} — ${esc(site.support)}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary magnetic" href="#work">View selected work <span aria-hidden="true">↓</span></a>
        ${resumeBtn(base)}
      </div>
    </div>
  </div>
  <a class="scroll-cue mono" href="#work" aria-label="Scroll to selected work"><span>Scroll</span><i></i></a>
</section>

${marquee()}

<section class="section" id="work">
  <div class="container">
    ${sectionHead('01', 'Selected work', 'Enterprise products, <em>made human.</em>')}
    <p class="sec-lede reveal">Six projects across manufacturing, finance, insurance, commerce and internal tools. Each case study walks through the problem, my thinking and how the design came together.</p>
    <div class="proj-list">${projects.map((p, i) => projectRow(p, i, base)).join('')}</div>
    <div class="center reveal"><a class="btn btn-ghost" href="work.html">All case studies →</a></div>
  </div>
</section>

<section class="section section-alt" id="about">
  <div class="container about-snap">
    ${sectionHead('02', 'About', 'Designer who <em>speaks developer.</em>')}
    <div class="about-grid">
      <div class="about-copy reveal">
        <p class="lead">${esc(bio[0])}</p>
        <a class="link-u" href="about.html">More about me & how I work →</a>
      </div>
      <dl class="facts reveal">
        <div><dt>Experience</dt><dd>~3 years</dd></div>
        <div><dt>Based in</dt><dd>${esc(site.location)}</dd></div>
        <div><dt>Focus</dt><dd>Enterprise UX, dashboards &amp; data</dd></div>
        <div><dt>Toolkit</dt><dd>Figma → HTML/CSS → AI-assisted build</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('03', 'Process', 'From messy requirements <em>to shipped screens.</em>')}
    ${processBlock()}
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead('04', 'Capabilities', 'What I bring <em>to a team.</em>')}
    ${skillsBlock()}
    ${exploringBlock()}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('05', 'Experience', 'Where I\'ve <em>been building.</em>')}
    ${experienceList()}
  </div>
</section>

<section class="section contact-band">
  <div class="container">
    <span class="eyebrow reveal"><b>06</b> Contact</span>
    <h2 class="huge reveal">Have a complex product?<br><em>Let's talk.</em></h2>
    <div class="hero-ctas reveal">
      <a class="btn btn-primary magnetic" href="contact.html">Start a conversation →</a>
      ${resumeBtn(base)}
    </div>
  </div>
</section>`;
  return layout({ base, body, bodyClass: 'page-home' });
}

function work() {
  const base = '';
  const cats = ['All', ...new Set(projects.flatMap((p) => p.category))];
  const body = `
<section class="page-hero">
  <div class="container">
    <span class="eyebrow load" style="--d:0">Work · ${pad(projects.length)} case studies</span>
    <h1 class="page-title load" style="--d:1">Selected <em>work</em></h1>
    <p class="page-lede load" style="--d:2">Enterprise applications, dashboards and workflow-driven systems — designed to make complicated work feel straightforward.</p>
    <div class="filters load" style="--d:3" role="group" aria-label="Filter projects">
      ${cats.map((c, i) => `<button type="button" class="filter${i === 0 ? ' is-on' : ''}" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('')}
    </div>
  </div>
</section>
<section class="section section-tight">
  <div class="container">
    <div class="cards">${projects.map((p, i) => card(p, i, base)).join('')}</div>
    <p class="note mono reveal">Visuals are schematic recreations — production data and screens are confidential.</p>
  </div>
</section>`;
  return layout({ title: 'Work', description: 'Case studies by Sam — enterprise UX, dashboards and workflow design.', base, active: 'Work', body, path: 'work.html' });
}

function about() {
  const base = '';
  const body = `
<section class="page-hero">
  <div class="container">
    <span class="eyebrow load" style="--d:0">About</span>
    <h1 class="page-title load" style="--d:1">Hi, I'm ${esc(site.name)}<em>.</em></h1>
    <p class="page-lede load" style="--d:2">${esc(site.introAlt)}</p>
  </div>
</section>

<section class="section section-tight">
  <div class="container about-story${hasPhoto ? '' : ' about-story--text'}">
    ${hasPhoto ? `<div class="portrait reveal">${portrait(base)}</div>` : ''}
    <div class="story reveal">
      ${bio.map((p) => `<p>${esc(p)}</p>`).join('')}
      <p>Based in ${esc(site.location)}.</p>
      <div class="hero-ctas">${resumeBtn(base, 'btn btn-primary')}<a class="btn btn-ghost" href="contact.html">Get in touch →</a></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead('01', 'Philosophy', 'How I <em>think about design.</em>')}
    <div class="principles">${principles
      .map(
        (p, i) => `
      <article class="principle reveal" style="--d:${i}">
        <span class="mono">${pad(i + 1)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`
      )
      .join('')}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('02', 'Process', 'My design <em>process.</em>')}
    ${processBlock()}
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead('03', 'Skills', 'Skills &amp; <em>tools.</em>')}
    ${skillsBlock()}
    ${exploringBlock()}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('04', 'Experience', 'Experience<em>.</em>')}
    ${experienceList()}
  </div>
</section>
${
  education.length
    ? `
<section class="section section-alt">
  <div class="container">
    ${sectionHead('05', 'Education', 'Education<em>.</em>')}
    <ol class="timeline">${education
      .map(
        (e) => `
      <li class="tl-item reveal">
        <div class="tl-period mono">${esc(e.year)}</div>
        <div class="tl-body">
          <h3>${esc(e.title)}</h3>
          <span class="tl-role">${esc(e.place)}</span>
          ${e.grade ? `<p>${esc(e.grade)}</p>` : ''}
        </div>
      </li>`
      )
      .join('')}</ol>
  </div>
</section>`
    : ''
}`;
  return layout({ title: 'About', description: `About ${site.name} — ${site.role}.`, base, active: 'About', body, path: 'about.html' });
}

function contact() {
  const base = '';
  const body = `
<section class="page-hero">
  <div class="container">
    <span class="eyebrow load" style="--d:0">Contact</span>
    <h1 class="page-title load" style="--d:1">Let's <em>talk.</em></h1>
    <p class="page-lede load" style="--d:2">Open to UI/UX, Product Design and UI/UX Developer roles — especially enterprise, data-heavy and AI-powered products.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="container contact-grid">
    <div class="contact-info reveal">
      ${site.fullName ? `<p class="mono">${esc(site.fullName)}</p>` : ''}
      ${site.email ? `<a class="contact-email" href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}
      <p>${esc(site.role)}<br>${esc(site.location)}</p>
      ${socials.length ? `<ul class="socials">${socials.map(([k, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener" class="link-u">${socialNames[k]} ↗</a></li>`).join('')}</ul>` : ''}
      ${resumeBtn(base)}
    </div>
    <form class="contact-form reveal" data-endpoint="${esc(site.formEndpoint)}" data-email="${esc(site.email)}" novalidate>
      <label><span>Name</span><input name="name" type="text" autocomplete="name" required></label>
      <label><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
      <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
      <button class="btn btn-primary magnetic" type="submit">Send message →</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;
  return layout({ title: 'Contact', description: `Contact ${site.name}.`, base, active: 'Contact', body, path: 'contact.html' });
}

function caseStudy(p, i) {
  const base = '../';
  const next = projects[(i + 1) % projects.length];
  const sections = [
    [
      'context',
      'Context',
      p.context &&
        `<p class="lead">${esc(p.context)}</p>${
          p.photo ? `<figure class="photo" data-zoom><img src="${esc(p.photo)}" alt="${esc(p.photoAlt || '')}" loading="lazy" decoding="async" width="1600" height="900" onerror="this.remove()"></figure>` : ''
        }`,
    ],
    ['problem', 'Problem', p.problem && `<blockquote class="problem">${esc(p.problem)}</blockquote>`],
    ['role', 'My role', p.myRole && `<p>${esc(p.myRole)}</p>${tags(p.tools, 'chips')}`],
    ['understanding', 'Research & understanding', p.understanding && `<ul class="checks">${p.understanding.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`],
    ['process', 'UX process', p.process && `<ol class="steps">${p.process.map((t, n) => `<li><span class="mono">${pad(n + 1)}</span>${esc(t)}</li>`).join('')}</ol>`],
    [
      'wireframes',
      'Wireframes',
      p.wireframes &&
        `<p>${esc(p.wireframes)}</p><figure class="figure" data-zoom>${mock(p.mock, { hue: p.hue, variant: 'wire' })}<figcaption class="mono">Low-fidelity structure · schematic</figcaption></figure>`,
    ],
    [
      'visual',
      'Visual design',
      p.visual && `<p>${esc(p.visual)}</p><figure class="figure" data-zoom>${mock(p.mock, { hue: p.hue })}<figcaption class="mono">High-fidelity direction · schematic recreation</figcaption></figure>`,
    ],
    ['prototype', 'Prototype', p.prototype && `<p>${esc(p.prototype)}</p>`],
    ['development', 'Development', p.development && `<p>${esc(p.development)}</p>`],
    ['outcome', 'Result', p.outcome && `<ul class="outcomes">${p.outcome.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`],
    ['learnings', 'Learnings', p.learnings && `<p class="lead">${esc(p.learnings)}</p>`],
  ].filter(([, , html]) => html);

  const body = `
<section class="cs-hero" style="--h:${p.hue}">
  <div class="container">
    <a class="back mono load" style="--d:0" href="${base}work.html">← All work</a>
    <span class="eyebrow load" style="--d:0">Case study ${pad(i + 1)} · ${esc(p.domain)}</span>
    <h1 class="page-title load" style="--d:1">${esc(p.title)} <em>${esc(p.subtitle)}</em></h1>
    <p class="page-lede load" style="--d:2">${esc(p.summary)}</p>
    <dl class="cs-meta load" style="--d:3">
      <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
      <div><dt>Tools</dt><dd>${esc(p.tools.join(', '))}</dd></div>
      <div><dt>Domain</dt><dd>${esc(p.domain)}</dd></div>
      <div><dt>Platform</dt><dd>${esc(p.platform)}</dd></div>
    </dl>
    <figure class="figure cs-cover load" style="--d:4" data-zoom>${mock(p.mock, { hue: p.hue })}</figure>
    <p class="note mono">Visuals are schematic recreations — production data and screens are confidential.</p>
  </div>
</section>

<section class="section section-tight">
  <div class="container cs-layout">
    <aside class="cs-toc" aria-label="Case study sections">
      <span class="mono">Contents</span>
      <ol>${sections.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}</ol>
      <div class="cs-focus">
        <span class="mono">Focus</span>
        ${tags(p.focus, 'tags tags-sm')}
      </div>
    </aside>
    <article class="cs-body" style="--h:${p.hue}">
      ${sections
        .map(
          ([id, label, html], n) => `
      <section class="cs-sec reveal" id="${id}">
        <h2><span class="mono">${pad(n + 1)}</span>${label}</h2>
        ${html}
      </section>`
        )
        .join('')}
    </article>
  </div>
</section>

<a class="next-proj" href="${next.slug}.html" data-cursor="Next" style="--h:${next.hue}">
  <div class="container">
    <span class="eyebrow">Next case study</span>
    <span class="next-title">${esc(next.title)} <em>${esc(next.subtitle)}</em> <span class="arrow" aria-hidden="true">→</span></span>
  </div>
</a>

<div class="lightbox" hidden><button type="button" class="lightbox-close" aria-label="Close">×</button><div class="lightbox-stage"></div></div>`;
  return layout({ title: `${p.title} — ${p.subtitle}`, description: p.summary, base, active: 'Work', body, bodyClass: 'page-case', path: `work/${p.slug}.html` });
}

function notFound() {
  const body = `
<section class="page-hero nf">
  <div class="container">
    <span class="eyebrow">404</span>
    <h1 class="page-title">This page took a <em>wrong turn.</em></h1>
    <p class="page-lede">Even the best workflows have edge cases.</p>
    <a class="btn btn-primary" href="index.html">Back home →</a>
  </div>
</section>`;
  // GitHub Pages serves this file at any missing path, so links must be absolute.
  const base = site.url ? new URL(site.url).pathname : '/';
  return layout({ title: 'Not found', base, body: body.replace('href="index.html"', `href="${base}index.html"`), path: null });
}

// ── Write ────────────────────────────────────────────────────
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'work'), { recursive: true });
cpSync(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });

const pages = {
  'index.html': home(),
  'work.html': work(),
  'about.html': about(),
  'contact.html': contact(),
  '404.html': notFound(),
  ...Object.fromEntries(projects.map((p, i) => [`work/${p.slug}.html`, caseStudy(p, i)])),
};
for (const [file, html] of Object.entries(pages)) writeFileSync(join(OUT, file), html);
writeFileSync(join(OUT, '.nojekyll'), '');

console.log(`Built ${Object.keys(pages).length} pages → docs/`);
for (const w of warnings) console.warn(`  ⚠ ${w}`);
