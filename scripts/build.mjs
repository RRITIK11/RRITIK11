#!/usr/bin/env node
// Builds the SVG sections of the GitHub profile README, in light and dark themes.
// GitHub strips CSS from README files, so the Apple-style layout lives inside SVG images.
//
// Usage:   node scripts/build.mjs
// Output:  assets/<section>-light.svg and assets/<section>-dark.svg
//
// Edit the CONTENT block below and re-run. No dependencies beyond Node 18+.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'assets');
const WIDTHS = JSON.parse(readFileSync(join(HERE, 'inter-widths.json'), 'utf8'));

/* ───────────────────────────── CONTENT ───────────────────────────── */

const HERO = {
  eyebrow: 'SOFTWARE ENGINEER  ·  BACKEND & AI',
  name: 'Ritik Sharma',
  tagline: 'Backend systems. AI tools. Built to ship.',
  body: [
    'Node.js and TypeScript services, RAG pipelines and browser-automation agents.',
    '1+ year at Oracle building AI and automation tools for Fusion SaaS.',
  ],
};

const STATS = {
  eyebrow: 'AT A GLANCE',
  title: 'The numbers.',
  tiles: [
    // A "\n" forces a line break inside a label.
    ['~2×', 'per-person SQL throughput with RAG text-to-SQL'],
    ['~900', 'validated SQL queries over a 4,000+ table schema'],
    ['330+', 'regression scripts automated,\nthe most on my team'],
    ['~40', 'testers adopted the Chrome extension I built'],
    ['1–2 hrs', 'per impact report, down from\n1–2 weeks (100+ reports)'],
    ['1000+', 'DSA problems solved\nCodeChef 3★  ·  GFG 1788'],
  ],
};

const EXPERIENCE = {
  eyebrow: 'EXPERIENCE',
  title: 'Oracle',
  meta: 'Customer Success Services  ·  Fusion SaaS (HCM, ERP, SCM)  ·  Jun 2025 – Oct 2026',
  footnote: 'Oracle code is internal, so it isn’t on GitHub.',
  cards: [
    {
      tag: 'RAG  ·  TEXT-TO-SQL',
      title: 'Discovery Probe',
      body: 'Co-built per-pillar RAG pipelines (HCM, ERP, SCM) that turn business scenarios into SQL over a 4,000+ table schema: doc scraping, table-aware chunking with contextual headers, embeddings and top-k retrieval. Fixed value-grounding errors by profiling stored column values.',
      stats: [['~2×', 'per-person query throughput'], ['~900', 'validated SQL queries']],
      note: 'Agents weren’t allowed to execute SQL, so every generated query was validated by hand.',
      chips: ['RAG', 'Embeddings', 'SQL', 'BI Publisher'],
    },
    {
      tag: 'AGENTS  ·  BROWSER AUTOMATION',
      title: 'Test Automation Agent',
      body: 'Codex plugin with 61 domain playbooks that completes outdated test scripts, adopted by my team. Extended it to run tests: the LLM only plans while a Node.js runtime of 6 process-isolated workers drives parallel Playwright lanes and verifies every saved value.',
      stats: [['7', 'scenarios run end to end'], ['76', 'automated runtime tests']],
      note: 'Paused the rollout after estimating LLM cost above manual execution; proposed a selector-first design.',
      chips: ['Node.js', 'Playwright', 'Codex', 'Multi-process'],
    },
    {
      tag: 'CHROME EXTENSION',
      title: 'Manual Test Recorder',
      body: 'Manifest V3 extension that captures tester interactions, annotates screenshots and exports Excel evidence through an XLSX writer I built from the OOXML spec with zero dependencies: ZIP container, CRC-32, DrawingML image anchors.',
      stats: [['~40', 'testers adopted it'], ['~25%', 'daily throughput lift (team-reported)']],
      chips: ['JavaScript', 'Manifest V3', 'OOXML', 'ZIP / CRC-32'],
    },
    {
      tag: 'LLM REPORTING',
      title: 'Release Impact Reports',
      body: 'Prepared customer feature-usage and transaction-count data, updated report templates and extended the React UI of an LLM agent that generates customer impact reports as HTML, PPTX, PDF and XLSX.',
      stats: [['100+', 'customer reports delivered'], ['1–2 hrs', 'per report, from 1–2 weeks']],
      chips: ['React', 'LLM agent', 'Data analysis'],
    },
  ],
};

const PROJECTS = [
  {
    file: 'project-algogalaxy',
    tag: 'LIVE  ·  ALGOGALAXY.CO.IN',
    title: 'AlgoGalaxy',
    tagline: 'An online judge that runs untrusted code safely.',
    features: [
      'Process-isolated sandboxes: Linux namespaces and per-submission resource limits',
      'Redis token-bucket rate limiting and result caching',
      'Admin, Moderator and User roles with moderated problem contributions',
      'Dockerized behind Nginx on AWS EC2',
    ],
    note: 'Began as my AlgoUniversity (YC-backed) externship capstone, 2024.',
    chips: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Nginx', 'AWS'],
    cta: 'Visit algogalaxy.co.in ›',
  },
  {
    file: 'project-videotube',
    tag: 'BACKEND  ·  REST API',
    title: 'VideoTube',
    tagline: 'The backend for a YouTube-like video platform.',
    features: [
      'User authentication with hashed passwords',
      'Video upload and comments',
      'Channel subscriptions',
      'Express.js and MongoDB with Mongoose models',
    ],
    note: 'My first major backend project, 2024.',
    chips: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    cta: 'View source ›',
  },
];

const SKILLS = {
  eyebrow: 'TECHNICAL SKILLS',
  title: 'The toolkit.',
  rows: [
    ['Languages', ['TypeScript', 'JavaScript', 'C++', 'Python', 'SQL']],
    ['Backend', ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'REST APIs', 'Redis']],
    ['AI & LLM', ['RAG', 'Embeddings & retrieval', 'Table-aware chunking', 'Prompt engineering', 'Structured output', 'Agent orchestration', 'Human-in-the-loop evaluation', 'LangChain']],
    ['Data', ['MongoDB', 'PostgreSQL', 'MySQL', 'Oracle SQL', 'PL/SQL', 'BI Publisher', 'Prisma', 'pgvector', 'FAISS', 'ChromaDB']],
    ['Automation', ['Playwright', 'Chrome extensions (MV3)', 'Codex', 'Claude Code']],
    ['Frontend', ['React', 'Next.js', 'Tailwind CSS', 'Vite']],
    ['Infra', ['Docker', 'Nginx', 'AWS (EC2, ECR)', 'Linux', 'Git']],
    ['Systems I’ve built', ['Process sandboxing', 'Token-bucket rate limiting', 'Result caching', 'RBAC', 'Multi-process orchestration', 'ZIP / CRC-32 / OOXML writer'], true],
  ],
};

const CONTACT = {
  title: 'Say hello.',
  email: 'sharmaritik5550@gmail.com',
};

/* ───────────────────────────── THEMES ───────────────────────────── */

const THEMES = {
  light: {
    text: '#1d1d1f', sub: '#6e6e73', accent: '#0066cc',
    card: '#f5f5f7', chip: '#e8e8ed', chipText: '#1d1d1f', line: '#d2d2d7',
    hiChip: '#e6f0fb', hiChipText: '#0058b0',
    grad: ['#0071e3', '#8e44e8', '#e5397a'], glow: ['#0071e3', '#e5397a'], glowOpacity: 0.14,
  },
  dark: {
    text: '#f5f5f7', sub: '#a1a1a6', accent: '#2997ff',
    card: '#1c1c1e', chip: '#2c2c2e', chipText: '#f5f5f7', line: '#38383a',
    hiChip: '#0b2a4a', hiChipText: '#6cb6ff',
    grad: ['#2997ff', '#bf5af2', '#ff375f'], glow: ['#2997ff', '#ff375f'], glowOpacity: 0.24,
  },
};

/* ───────────────────────────── PRIMITIVES ───────────────────────────── */

const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Inter, Roboto, 'Helvetica Neue', Arial, sans-serif";
const FONT_DISPLAY = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter Display', 'Segoe UI', Inter, Roboto, 'Helvetica Neue', Arial, sans-serif";
const SAFETY = 1.06; // system fonts vary; leave room so text never touches an edge

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function measure(str, size, weight = 400, ls = 0) {
  const table = WIDTHS[weight] || WIDTHS[400];
  let w = 0, n = 0;
  for (const ch of str) { w += table[ch] ?? 0.62; n++; }
  return w * size + ls * Math.max(0, n - 1);
}

function wrap(str, size, weight, maxWidth, ls = 0) {
  const words = str.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (measure(next, size, weight, ls) * SAFETY <= maxWidth || !line) line = next;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

function text(x, y, str, o = {}) {
  const {
    size = 20, weight = 400, fill = '#000', anchor = 'start', ls = 0, display = false, cls = '',
  } = o;
  return `<text x="${r(x)}" y="${r(y)}" font-family="${display ? FONT_DISPLAY : FONT}" font-size="${size}" font-weight="${weight}"${ls ? ` letter-spacing="${ls}"` : ''}${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''} fill="${fill}"${cls ? ` class="${cls}"` : ''}>${esc(str)}</text>`;
}

const r = (n) => Math.round(n * 10) / 10;

// A horizontal gradient spanning exactly [x1, x2], so gradient text looks the same at any length.
function gradDef(id, t, x1, x2) {
  const [a, b, c] = t.grad;
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${r(x1)}" y1="0" x2="${r(x2)}" y2="0"><stop offset="0" stop-color="${a}"/><stop offset="0.55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
}

// Lays out chips left to right, wrapping at maxWidth. Returns { svg, height }.
function chips(list, x, y, maxWidth, t, o = {}) {
  const { size = 16, h = 36, gap = 10, hi = false } = o;
  const padX = 16;
  let cx = x, cy = y, out = '';
  for (const label of list) {
    const w = measure(label, size, 500) * SAFETY + padX * 2;
    if (cx + w > x + maxWidth && cx > x) { cx = x; cy += h + gap; }
    out += `<rect x="${r(cx)}" y="${r(cy)}" width="${r(w)}" height="${h}" rx="${h / 2}" fill="${hi ? t.hiChip : t.chip}"/>`;
    out += text(cx + w / 2, cy + h / 2 + size * 0.36, label, { size, weight: 500, fill: hi ? t.hiChipText : t.chipText, anchor: 'middle' });
    cx += w + gap;
  }
  return { svg: out, height: cy + h - y };
}

function chipsHeight(list, maxWidth, o = {}) {
  return chips(list, 0, 0, maxWidth, THEMES.light, o).height;
}

const STYLE = '.a{animation:rise .9s cubic-bezier(.2,.7,.2,1) both}.d1{animation-delay:.08s}.d2{animation-delay:.16s}.d3{animation-delay:.24s}.d4{animation-delay:.32s}.d5{animation-delay:.4s}@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.a{animation:none}}';

function svgDoc(w, h, title, defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${r(h)}" viewBox="0 0 ${w} ${r(h)}" role="img" aria-labelledby="title"><title id="title">${esc(title)}</title><style>${STYLE}</style><defs>${defs}</defs>${body}</svg>\n`;
}

function sectionHeader(eyebrow, title, t, y0 = 0) {
  return text(4, y0 + 30, eyebrow, { size: 16, weight: 600, ls: 3, fill: t.accent }) +
    text(2, y0 + 92, title, { size: 52, weight: 700, ls: -1.5, fill: t.text, display: true });
}

/* ───────────────────────────── SECTIONS ───────────────────────────── */

function hero(t) {
  const W = 1200, cx = W / 2;
  let tagSize = 44;
  while (measure(HERO.tagline, tagSize, 600, -1) * SAFETY > W - 120) tagSize -= 1;
  const tagW = measure(HERO.tagline, tagSize, 600, -1);
  const bodyY = 318;
  const H = bodyY + (HERO.body.length - 1) * 34 + 46;
  const defs =
    `<radialGradient id="g1"><stop offset="0" stop-color="${t.glow[0]}" stop-opacity="${t.glowOpacity}"/><stop offset="1" stop-color="${t.glow[0]}" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="g2"><stop offset="0" stop-color="${t.glow[1]}" stop-opacity="${t.glowOpacity * 0.8}"/><stop offset="1" stop-color="${t.glow[1]}" stop-opacity="0"/></radialGradient>` +
    gradDef('tg', t, cx - tagW / 2, cx + tagW / 2);
  const body =
    `<ellipse cx="470" cy="190" rx="380" ry="150" fill="url(#g1)"/>` +
    `<ellipse cx="760" cy="215" rx="360" ry="140" fill="url(#g2)"/>` +
    text(cx, 74, HERO.eyebrow, { size: 17, weight: 600, ls: 3.5, fill: t.accent, anchor: 'middle', cls: 'a' }) +
    text(cx, 186, HERO.name, { size: 108, weight: 700, ls: -3.5, fill: t.text, anchor: 'middle', display: true, cls: 'a d1' }) +
    text(cx, 254, HERO.tagline, { size: tagSize, weight: 600, ls: -1, fill: 'url(#tg)', anchor: 'middle', display: true, cls: 'a d2' }) +
    HERO.body.map((line, i) => text(cx, bodyY + i * 34, line, { size: 23, fill: t.sub, anchor: 'middle', cls: `a d${3 + i}` })).join('');
  return svgDoc(W, H, `${HERO.name}. ${HERO.tagline} ${HERO.body.join(' ')}`, defs, body);
}

function stats(t) {
  const W = 1200, gap = 24, cols = 3, top = 132, pad = 32;
  const tileW = (W - gap * (cols - 1)) / cols;
  const wrapped = STATS.tiles.map(([, label]) => label.split('\n').flatMap((part) => wrap(part, 21, 400, tileW - pad * 2)));
  const maxLines = Math.max(...wrapped.map((l) => l.length));
  wrapped.forEach((lines, i) => { if (lines.length > 2) console.warn(`  note: stat "${STATS.tiles[i][0]}" label wraps to ${lines.length} lines; shorten it to keep tiles compact`); });
  const tileH = 136 + (maxLines - 1) * 30 + 40;
  const rows = Math.ceil(STATS.tiles.length / cols);
  const H = top + rows * tileH + (rows - 1) * gap + 4;
  let defs = '', body = sectionHeader(STATS.eyebrow, STATS.title, t);
  STATS.tiles.forEach(([num, label], i) => {
    const x = (i % cols) * (tileW + gap), y = top + Math.floor(i / cols) * (tileH + gap);
    const nw = measure(num, 64, 700, -2);
    defs += gradDef(`s${i}`, t, x + pad, x + pad + Math.max(nw, 120));
    body += `<g class="a d${(i % 5) + 1}">` +
      `<rect x="${r(x)}" y="${r(y)}" width="${r(tileW)}" height="${r(tileH)}" rx="28" fill="${t.card}"/>` +
      text(x + pad, y + 94, num, { size: 64, weight: 700, ls: -2, fill: `url(#s${i})`, display: true }) +
      wrapped[i].map((line, j) => text(x + pad, y + 136 + j * 30, line, { size: 21, fill: t.sub })).join('') +
      `</g>`;
  });
  return svgDoc(W, H, `${STATS.title} ${STATS.tiles.map(([n, l]) => `${n} ${l.replace(/\n/g, ' ')}`).join('. ')}.`, defs, body);
}

function experienceCardLayout(card, cardW) {
  const pad = 40, inner = cardW - pad * 2;
  const bodyLines = wrap(card.body, 20, 400, inner);
  const statW = (inner - 24) / 2;
  const statLabels = card.stats.map(([, l]) => wrap(l, 16, 400, statW));
  const noteLines = card.note ? wrap(card.note, 16, 400, inner) : [];
  const lastBody = 142 + (bodyLines.length - 1) * 30;
  const statNumY = lastBody + 70;
  const statLabelY = statNumY + 30;
  const statBottom = statLabelY + (Math.max(...statLabels.map((l) => l.length)) - 1) * 22;
  const noteY = statBottom + 36;
  const contentBottom = noteLines.length ? noteY + (noteLines.length - 1) * 23 : statBottom;
  const chipsH = chipsHeight(card.chips, inner, { size: 15, h: 34 });
  const naturalH = contentBottom + 32 + chipsH + 40;
  return { pad, inner, bodyLines, statW, statLabels, noteLines, statNumY, statLabelY, noteY, chipsH, naturalH };
}

function experience(t) {
  const W = 1200, gap = 24, cols = 2, top = 170;
  const cardW = (W - gap) / cols;
  const layouts = EXPERIENCE.cards.map((c) => experienceCardLayout(c, cardW));
  const rowHeights = [];
  for (let i = 0; i < layouts.length; i += cols) {
    rowHeights.push(Math.max(...layouts.slice(i, i + cols).map((l) => l.naturalH)));
  }
  const gridH = rowHeights.reduce((a, b) => a + b, 0) + gap * (rowHeights.length - 1);
  const H = top + gridH + 58;
  let defs = '';
  let body = sectionHeader(EXPERIENCE.eyebrow, EXPERIENCE.title, t) +
    text(4, 134, EXPERIENCE.meta, { size: 21, fill: t.sub });
  let y = top;
  EXPERIENCE.cards.forEach((card, i) => {
    const L = layouts[i], row = Math.floor(i / cols);
    if (i % cols === 0 && i > 0) y += rowHeights[row - 1] + gap;
    const x = (i % cols) * (cardW + gap), h = rowHeights[row];
    let g = `<rect x="${r(x)}" y="${r(y)}" width="${r(cardW)}" height="${r(h)}" rx="28" fill="${t.card}"/>`;
    g += text(x + L.pad, y + 52, card.tag, { size: 14, weight: 600, ls: 2, fill: t.accent });
    g += text(x + L.pad, y + 96, card.title, { size: 32, weight: 700, ls: -0.8, fill: t.text, display: true });
    g += L.bodyLines.map((line, j) => text(x + L.pad, y + 142 + j * 30, line, { size: 20, fill: t.sub })).join('');
    card.stats.forEach(([num, label], k) => {
      const sx = x + L.pad + k * (L.statW + 24);
      const nw = measure(num, 44, 700, -1);
      defs += gradDef(`e${i}${k}`, t, sx, sx + Math.max(nw, 90));
      g += text(sx, y + L.statNumY, num, { size: 44, weight: 700, ls: -1, fill: `url(#e${i}${k})`, display: true });
      g += L.statLabels[k].map((line, j) => text(sx, y + L.statLabelY + j * 22, line, { size: 16, fill: t.sub })).join('');
    });
    g += L.noteLines.map((line, j) => text(x + L.pad, y + L.noteY + j * 23, line, { size: 16, fill: t.sub })).join('');
    g += chips(card.chips, x + L.pad, y + h - 40 - L.chipsH, L.inner, t, { size: 15, h: 34 }).svg;
    body += `<g class="a d${i + 1}">${g}</g>`;
  });
  body += text(W / 2, H - 14, EXPERIENCE.footnote, { size: 17, fill: t.sub, anchor: 'middle' });
  const title = `${EXPERIENCE.title}, ${EXPERIENCE.meta}. ` + EXPERIENCE.cards.map((c) => `${c.title}: ${c.body}`).join(' ');
  return svgDoc(W, H, title, defs, body);
}

// Full-width product card: name, pitch and link on the left; features and stack on the right.
function project(p, t) {
  const W = 1200, pad = 52, leftW = 470, rightX = 600, rightW = W - rightX - pad;
  const taglineLines = wrap(p.tagline, 25, 500, leftW);
  const noteLines = p.note ? wrap(p.note, 17, 400, leftW) : [];
  const tagEnd = 186 + (taglineLines.length - 1) * 35;
  const noteY = tagEnd + 40;
  const leftBottom = (noteLines.length ? noteY + (noteLines.length - 1) * 25 : tagEnd) + 88;

  const featureLines = p.features.map((f) => wrap(f, 20, 400, rightW - 28));
  let fy = 76;
  const featureYs = featureLines.map((lines) => { const y = fy; fy += lines.length * 30 + 16; return y; });
  const chipsY = fy + 10;
  const chipsH = chipsHeight(p.chips, rightW, { size: 15, h: 34 });
  const rightBottom = chipsY + chipsH + pad;
  const H = Math.max(leftBottom, rightBottom);

  const tw = measure(p.title, 58, 700, -2);
  const defs = gradDef('pt', t, pad, pad + tw) +
    `<radialGradient id="pg"><stop offset="0" stop-color="${t.glow[0]}" stop-opacity="${t.glowOpacity * 0.7}"/><stop offset="1" stop-color="${t.glow[0]}" stop-opacity="0"/></radialGradient>`;
  let b = `<rect x="0" y="0" width="${W}" height="${r(H)}" rx="30" fill="${t.card}"/>`;
  b += `<ellipse cx="240" cy="100" rx="240" ry="90" fill="url(#pg)"/>`;
  b += `<g class="a">`;
  b += text(pad, 68, p.tag, { size: 14, weight: 600, ls: 2, fill: t.accent });
  b += text(pad, 134, p.title, { size: 58, weight: 700, ls: -2, fill: 'url(#pt)', display: true });
  b += taglineLines.map((line, j) => text(pad, 186 + j * 35, line, { size: 25, weight: 500, fill: t.text })).join('');
  b += noteLines.map((line, j) => text(pad, noteY + j * 25, line, { size: 17, fill: t.sub })).join('');
  b += text(pad, H - pad + 4, p.cta, { size: 20, weight: 600, fill: t.accent });
  b += `</g><g class="a d1">`;
  p.features.forEach((_, k) => {
    b += `<circle cx="${rightX + 5}" cy="${featureYs[k] - 7}" r="4" fill="${t.accent}"/>`;
    b += featureLines[k].map((line, j) => text(rightX + 26, featureYs[k] + j * 30, line, { size: 20, fill: t.sub })).join('');
  });
  b += chips(p.chips, rightX, chipsY, rightW, t, { size: 15, h: 34 }).svg;
  b += `</g>`;
  const title = `${p.title}: ${p.tagline} ${p.features.join('. ')}.`;
  return svgDoc(W, H, title, defs, b);
}

function projects(t) {
  return PROJECTS.map((p) => [p.file, project(p, t)]);
}

function skills(t) {
  const W = 1200, top = 128, labelW = 280, rowPad = 20;
  const chipW = W - labelW;
  let y = top, body = sectionHeader(SKILLS.eyebrow, SKILLS.title, t);
  SKILLS.rows.forEach(([label, list, hi], i) => {
    const ch = chipsHeight(list, chipW, { size: 16, h: 36 });
    const rowH = rowPad * 2 + ch;
    body += `<g class="a d${(i % 5) + 1}">`;
    body += `<rect x="0" y="${r(y)}" width="${W}" height="1" fill="${t.line}"/>`;
    body += text(4, y + rowPad + 25, label, { size: 21, weight: 600, fill: hi ? t.accent : t.text });
    body += chips(list, labelW, y + rowPad, chipW, t, { size: 16, h: 36, hi }).svg;
    body += `</g>`;
    y += rowH;
  });
  body += `<rect x="0" y="${r(y)}" width="${W}" height="1" fill="${t.line}"/>`;
  const H = y + 4;
  const title = `${SKILLS.title} ` + SKILLS.rows.map(([l, list]) => `${l}: ${list.join(', ')}`).join('. ') + '.';
  return svgDoc(W, H, title, '', body);
}

function contact(t) {
  const W = 1200, H = 200, cx = W / 2;
  const ew = measure(CONTACT.email, 30, 500);
  const defs = gradDef('cg', t, cx - ew / 2, cx + ew / 2);
  const body =
    text(cx, 92, CONTACT.title, { size: 60, weight: 700, ls: -2, fill: t.text, anchor: 'middle', display: true, cls: 'a' }) +
    text(cx, 150, CONTACT.email, { size: 30, weight: 500, fill: 'url(#cg)', anchor: 'middle', cls: 'a d1' });
  return svgDoc(W, H, `${CONTACT.title} ${CONTACT.email}`, defs, body);
}

/* ───────────────────────────── BUILD ───────────────────────────── */

mkdirSync(OUT, { recursive: true });
const written = [];
for (const [mode, t] of Object.entries(THEMES)) {
  const files = [
    ['hero', hero(t)],
    ['stats', stats(t)],
    ['experience', experience(t)],
    ...projects(t),
    ['skills', skills(t)],
    ['contact', contact(t)],
  ];
  for (const [name, svg] of files) {
    const path = join(OUT, `${name}-${mode}.svg`);
    writeFileSync(path, svg);
    written.push(`${name}-${mode}.svg`);
  }
}
console.log(`Wrote ${written.length} files to assets/:\n  ${written.join('\n  ')}`);
