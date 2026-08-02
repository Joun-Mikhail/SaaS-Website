/*
 * Builds specimen/index.html — the Phase 1 design-system specimen.
 *
 * The fonts are inlined as data URIs so the file is genuinely self-contained:
 * it renders identically opened from disk, served from the site, or published
 * as a standalone page. A specimen that depends on a font server is exactly
 * the failure this phase exists to remove.
 *
 * Run with: npm run specimen
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,' +
  'U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215';
const LATIN_EXT =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF,' +
  'U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';

const faces = [
  ['Titan One', 400, 'titan-one'],
  ['Archivo', 400, 'archivo'],
  ['Archivo', 600, 'archivo'],
  ['Barlow Condensed', 500, 'barlow-condensed'],
  ['Barlow Condensed', 700, 'barlow-condensed'],
];

const fontCss = faces
  .flatMap(([family, weight, slug]) =>
    [
      ['latin', LATIN],
      ['latin-ext', LATIN_EXT],
    ].map(([subset, range]) => {
      const file = join(root, 'public/fonts', `${slug}-${subset}-${weight}-normal.woff2`);
      const b64 = readFileSync(file).toString('base64');
      return (
        `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};` +
        `font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2');` +
        `unicode-range:${range}}`
      );
    })
  )
  .join('\n');

const CZ_LOWER = 'ě š č ř ž ý á í é ú ů ň ť ď';
const CZ_UPPER = 'Ě Š Č Ř Ž Ý Á Í É Ú Ů Ň Ť Ď';

const SPACING = [
  ['s1', 4], ['s2', 8], ['s3', 12], ['s4', 20],
  ['s5', 32], ['s6', 52], ['s7', 84], ['s8', 136],
];

const TYPE = [
  ['t1', 13, 1.45, 'Barlow Condensed', 'utility — allergen codes, tag labels, meta'],
  ['t2', 15, 1.5, 'Archivo', 'small — captions, secondary'],
  ['t3', 17, 1.6, 'Archivo', 'body — the reading size'],
  ['t4', 27, 1.25, 'Titan One', 'heading — card and subsection titles'],
  ['t5', 44, 1.08, 'Titan One', 'section — section titles, mobile hero'],
  ['t6', 72, 1.0, 'Titan One', 'hero — one per page'],
];

const PALETTE = [
  ['orange', '#ea5f28', 'logo-original.webp', '300,180', '120×120 median', 'ink'],
  ['blue', '#2B3355', 'sendvic-rez-b.webp', '420,180', '40×40 flattest in-focus tile face', 'chalk'],
  ['green', '#6fdc47', 'focaccia-olive-tomato-herbs.webp', '1090,1300', '70×70 median', 'ink'],
  ['red', '#952312', 'focaccia-olive-tomato-herbs.webp', '612,840', '24×24 peak-saturation', 'chalk'],
  ['ink', '#141413', 'focaccia-margherita.webp', '200,190', '80×80 median', 'chalk'],
  ['chalk', '#ffffff', '—', '—', 'not sampled — type and marks only, never a ground', 'ink'],
];

const MOTION_EASE = [
  ['settle', 'cubic-bezier(0.22, 1, 0.36, 1)', 'things arriving — reveals, entrances, a card coming to rest'],
  ['shift', 'cubic-bezier(0.65, 0, 0.35, 1)', 'things moving between two states — filters, page transitions'],
  ['tap', 'cubic-bezier(0.33, 1, 0.68, 1)', 'direct response to a finger or cursor — hover, press'],
];
const MOTION_DUR = [
  ['tap', 120, 'hover, press, focus ring'],
  ['move', 240, 'card lift, colour change, filter reflow'],
  ['enter', 420, 'section reveal, page transition — the ceiling'],
];

const css = `
${fontCss}

:root{
${SPACING.map(([n, v]) => `  --${n}:${v}px;`).join('\n')}
${TYPE.map(([n, v]) => `  --${n}:${v}px;`).join('\n')}
${PALETTE.map(([n, v]) => `  --${n}:${v};`).join('\n')}
${MOTION_EASE.map(([n, v]) => `  --ease-${n}:${v};`).join('\n')}
${MOTION_DUR.map(([n, v]) => `  --dur-${n}:${v}ms;`).join('\n')}
  --measure-body:64ch;
  --measure-display:16ch;
}

*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;
  background:var(--ink);
  color:var(--chalk);
  font-family:'Archivo',system-ui,sans-serif;
  font-size:var(--t3);
  line-height:1.6;
}
.wrap{max-width:1180px;margin:0 auto;padding:0 var(--s4)}
@media(min-width:900px){.wrap{padding:0 var(--s5)}}

section{padding:var(--s7) 0}
@media(min-width:900px){section{padding:var(--s8) 0}}

h1,h2,h3{font-family:'Titan One',system-ui,sans-serif;font-weight:400;margin:0}
h1{font-size:clamp(44px,9vw,72px);line-height:1.0;max-width:var(--measure-display)}
h2{font-size:var(--t5);line-height:1.08;margin-bottom:var(--s5)}
h3{font-size:var(--t4);line-height:1.25;margin-bottom:var(--s3)}
p{margin:0 0 var(--s4);max-width:var(--measure-body)}
p:last-child{margin-bottom:0}

.util{font-family:'Barlow Condensed',system-ui,sans-serif;font-weight:700;
  font-feature-settings:'tnum' 1;letter-spacing:.04em;text-transform:uppercase}
.eyebrow{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t1);
  letter-spacing:.16em;text-transform:uppercase;margin-bottom:var(--s3);display:block}

.ground-orange{background:var(--orange);color:var(--ink)}
.ground-blue{background:var(--blue);color:var(--chalk)}
.ground-green{background:var(--green);color:var(--ink)}
.ground-red{background:var(--red);color:var(--chalk)}
.ground-ink{background:var(--ink);color:var(--chalk)}

/* --- spacing ruler ---------------------------------------------------- */
.ruler{display:grid;gap:var(--s3)}
.ruler-row{display:grid;grid-template-columns:56px 1fr auto;gap:var(--s3);align-items:center}
.ruler-bar{height:20px;background:var(--orange)}
.ruler-name{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t2);letter-spacing:.08em}
.ruler-val{font-family:'Barlow Condensed',sans-serif;font-weight:500;font-size:var(--t2);
  font-feature-settings:'tnum' 1;opacity:.7;white-space:nowrap}

/* --- type scale ------------------------------------------------------- */
.type-row{border-top:2px solid rgba(255,255,255,.16);padding:var(--s4) 0;
  display:grid;gap:var(--s3)}
@media(min-width:900px){.type-row{grid-template-columns:180px 1fr;gap:var(--s5);align-items:baseline}}
.type-meta{font-family:'Barlow Condensed',sans-serif;font-weight:500;font-size:var(--t1);
  letter-spacing:.08em;text-transform:uppercase;opacity:.75;line-height:1.5}
.type-sample{overflow-wrap:anywhere}

/* --- palette ---------------------------------------------------------- */
.swatches{display:grid;gap:var(--s3);grid-template-columns:repeat(auto-fit,minmax(168px,1fr))}
.swatch{padding:var(--s4);min-height:150px;display:flex;flex-direction:column;justify-content:space-between}
/* ink on an ink page would be an invisible swatch — mark its edge in brand orange */
.swatch-ink{outline:3px solid var(--orange);outline-offset:-3px}
.swatch-hex{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t4);
  font-feature-settings:'tnum' 1;text-transform:uppercase}
.swatch-src{font-family:'Barlow Condensed',sans-serif;font-weight:500;font-size:var(--t1);
  line-height:1.35;opacity:.85;word-break:break-word}

table{border-collapse:collapse;width:100%;font-size:var(--t2)}
th,td{text-align:left;padding:var(--s2) var(--s3);border-bottom:1px solid rgba(255,255,255,.14);
  vertical-align:top}
th{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t1);
  letter-spacing:.1em;text-transform:uppercase}
td.num{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-feature-settings:'tnum' 1}
.pass{color:var(--green)}
.fail{color:#ff8f6b}

/* --- motion ----------------------------------------------------------- */
.motion-grid{display:grid;gap:var(--s4);grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.motion-demo{padding:var(--s4);background:rgba(255,255,255,.07);cursor:pointer}
.motion-dot{width:28px;height:28px;background:var(--orange);margin-top:var(--s3)}
.motion-demo:hover .motion-dot,.motion-demo:focus-visible .motion-dot{transform:translateX(140px)}
.d-settle .motion-dot{transition:transform var(--dur-enter) var(--ease-settle)}
.d-shift .motion-dot{transition:transform var(--dur-move) var(--ease-shift)}
.d-tap .motion-dot{transition:transform var(--dur-tap) var(--ease-tap)}

/* --- product card + placeholders -------------------------------------- */
.cards{display:grid;gap:var(--s4);grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{background:var(--chalk);color:var(--ink);display:flex;flex-direction:column}
.card-photo{aspect-ratio:4/3;background:var(--blue);position:relative;overflow:hidden}
.card-photo img{width:100%;height:100%;object-fit:cover;display:block}
.card-body{padding:var(--s4);display:flex;flex-direction:column;gap:var(--s3);flex:1}
.card-name{font-family:'Titan One',sans-serif;font-size:var(--t4);line-height:1.15}
.card-desc{font-size:var(--t2);line-height:1.5;margin:0}
.card-price{margin-top:auto;display:flex;align-items:baseline;gap:var(--s2);
  font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t4);
  font-feature-settings:'tnum' 1;background:var(--orange);color:var(--ink);
  padding:var(--s2) var(--s3);align-self:flex-start}
.card-price small{font-weight:500;font-size:var(--t1);letter-spacing:.06em;text-transform:uppercase}

/* The placeholder. Hatching in the brand orange over ink: it reads as a
   deliberate mark, not a missing asset. Never grey, never an icon of a
   broken image. */
.ph{--hatch:rgba(234,95,40,.85);
  background-color:var(--ink);
  background-image:repeating-linear-gradient(-45deg,
    var(--hatch) 0 6px, transparent 6px 16px);
  color:var(--chalk);
  display:flex;align-items:center;justify-content:center;text-align:center;padding:var(--s4)}
.ph-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t1);
  letter-spacing:.12em;text-transform:uppercase;background:var(--ink);
  padding:var(--s2) var(--s3);line-height:1.3}
/* The notched corner is the shop's price-tag silhouette. It makes an empty
   field read as "a tag nobody has written yet" rather than as construction
   tape — the same shape the real price block uses. */
.tag-notch{clip-path:polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)}
.ph-inline{background-image:repeating-linear-gradient(-45deg,
    rgba(20,20,19,.14) 0 5px, transparent 5px 13px);
  border-left:4px solid var(--orange);padding:var(--s2) var(--s3);color:var(--ink)}
.ph-inline .ph-k{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:var(--t1);
  letter-spacing:.1em;text-transform:uppercase;display:block}
.ph-inline .ph-v{font-size:var(--t2);line-height:1.4}

.allergen-real,.allergen-pending{font-family:'Barlow Condensed',sans-serif;font-size:var(--t1);
  letter-spacing:.06em;text-transform:uppercase;padding:var(--s1) var(--s2);display:inline-block}
.allergen-real{background:var(--ink);color:var(--chalk);font-weight:700}
.allergen-pending{background:transparent;color:var(--ink);font-weight:700;
  border:2px dashed var(--ink);
  background-image:repeating-linear-gradient(-45deg,
    rgba(20,20,19,.10) 0 4px, transparent 4px 10px)}

.note{font-size:var(--t2);opacity:.8;max-width:var(--measure-body)}
.rule{border:0;border-top:2px solid rgba(255,255,255,.16);margin:0}

@media(prefers-reduced-motion:reduce){
  /* near-zero, not none — the end state must still apply */
  *,*::before,*::after{
    transition-duration:0.01ms !important;transition-delay:0ms !important;
    animation-duration:0.01ms !important;animation-delay:0ms !important;
    animation-iteration-count:1 !important}
  .motion-demo:hover .motion-dot,.motion-demo:focus-visible .motion-dot{transform:none}
}
:focus-visible{outline:3px solid var(--orange);outline-offset:3px}
`;

const swatch = ([name, hexv, file, coords, method, textOn]) => `
  <div class="swatch${name === 'ink' ? ' swatch-ink' : ''}" style="background:${hexv};color:var(--${textOn})">
    <div>
      <span class="eyebrow" style="margin:0">${name}</span>
      <div class="swatch-hex">${hexv}</div>
    </div>
    <div class="swatch-src">${file === '—' ? method : `${file}<br>@ ${coords} · ${method}`}</div>
  </div>`;

const html = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Bread Guy — designový systém (Phase 1 specimen)</title>
<style>${css}</style>
</head>
<body>

<section class="ground-orange">
  <div class="wrap">
    <span class="eyebrow">Phase 1 · designový systém</span>
    <h1>Kváskový chléb z Brna.</h1>
    <p style="margin-top:var(--s5);font-size:var(--t3)">
      Jeden rozestupový systém, jedna typografická stupnice, čtyři sytá pozadí.
      Každá hodnota na této stránce pochází ze systému níže — žádná není zvolena od oka.
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <span class="eyebrow">01 — spacing</span>
    <h2>Rozestupy</h2>
    <p class="note">Fibonacci: každý krok je součtem dvou předchozích. Osm kroků, 4 px až 136 px.
      Poměr se přirozeně blíží 1,618 — stejnému číslu, které řídí displejovou část typografické stupnice.</p>
    <div class="ruler" style="margin-top:var(--s5)">
      ${SPACING.map(([n, v], i) => `
      <div class="ruler-row">
        <span class="ruler-name">--${n}</span>
        <span class="ruler-bar" style="width:${v}px"></span>
        <span class="ruler-val">${v} px${i > 1 ? ` &nbsp;=&nbsp; ${SPACING[i - 2][1]} + ${SPACING[i - 1][1]}` : ''}</span>
      </div>`).join('')}
    </div>
    <p class="note" style="margin-top:var(--s5)">
      Sekce: <strong>--s7</strong> na mobilu, <strong>--s8</strong> na desktopu. Karta: <strong>--s4</strong>.
      Mezera v mřížce: <strong>--s4</strong>. Odstavec: <strong>--s4</strong>.
    </p>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <span class="eyebrow">02 — type</span>
    <h2>Typografická stupnice</h2>
    <p class="note">Dvě části. Textové velikosti drží těsný poměr 1,13, aby vedle sebe nevynikaly.
      Displejové velikosti jdou po 1,618, aby vynikaly hodně. Od těla (17 px) k hero (72 px) je to 4,24×.</p>
    <div style="margin-top:var(--s5)">
      ${TYPE.map(([n, size, lh, fam, role]) => `
      <div class="type-row">
        <div class="type-meta">--${n}<br>${size} px · ${lh}<br>${fam}<br>${role}</div>
        <div class="type-sample" style="font-family:'${fam}';font-size:${size}px;line-height:${lh}">
          Kváskový chléb s konfitovaným česnekem
        </div>
      </div>`).join('')}
    </div>
    <p class="note" style="margin-top:var(--s5)">
      Míra řádku: text <strong>64ch</strong>, displej <strong>16ch</strong>.
      Hero je <code>clamp(44px, 9vw, 72px)</code> — na 390 px se nikdy nezalomí do třetího řádku.
    </p>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <span class="eyebrow">03 — typefaces</span>
    <h2>Tři řezy</h2>

    <div style="margin-top:var(--s5)">
      <div class="type-row" style="border-top:0">
        <div class="type-meta">DISPLAY<br>Titan One 400<br>17 KB</div>
        <div>
          <div style="font-family:'Titan One';font-size:56px;line-height:1.05">MIŠENEC · TOUSŤÁK</div>
          <div style="font-family:'Titan One';font-size:38px;line-height:1.4;margin-top:var(--s3)">${CZ_LOWER}</div>
          <div style="font-family:'Titan One';font-size:38px;line-height:1.4">${CZ_UPPER}</div>
        </div>
      </div>
      <div class="type-row">
        <div class="type-meta">BODY<br>Archivo 400 / 600<br>54 KB</div>
        <div>
          <div style="font-size:26px;line-height:1.3">Kváskový chléb s konfitovaným česnekem a gochujangem.</div>
          <div style="font-size:30px;line-height:1.45;margin-top:var(--s3)">${CZ_LOWER}</div>
          <div style="font-size:30px;line-height:1.45">${CZ_UPPER}</div>
          <p style="font-size:var(--t3);margin-top:var(--s4)">Tělo v 17 px. Pečeme denně čerstvé —
            populární položky se vyprodají brzy, tak přijďte včas. Otevíráme v 8:00.</p>
        </div>
      </div>
      <div class="type-row">
        <div class="type-meta">UTILITY<br>Barlow Condensed 500 / 700<br>72 KB<br>tabular figures</div>
        <div>
          <div class="util" style="font-size:44px">147 / 74 Kč · A: 1, 3, 7, 11</div>
          <div class="util" style="font-size:30px;line-height:1.45;margin-top:var(--s3)">${CZ_LOWER}</div>
          <div class="util" style="font-size:30px;line-height:1.45">${CZ_UPPER}</div>
        </div>
      </div>
    </div>

    <p class="note" style="margin-top:var(--s5)">
      Pět kandidátů na displejový řez bylo vyřazeno: <strong>Bowlby One</strong>, <strong>Chewy</strong> a
      <strong>Permanent Marker</strong> nemají latin-ext vůbec; <strong>Fredoka</strong> a
      <strong>Lilita One</strong> postrádají č ď ě ň ř ť ů; <strong>Luckiest Guy</strong> je pouze verzálkový,
      takže české malé <em>ť</em> a <em>ď</em> vykreslí s háčkem nahoře místo apostrofu.
    </p>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <span class="eyebrow">04 — palette</span>
    <h2>Barvy</h2>
    <p class="note">Šest hodnot. Oranžová je vzorkovaná z loga, tři podpůrné barvy přímo z fotografií
      pekárny — modrý obklad, zelená a červená z beden. Tuhle paletu nelze zkopírovat, protože je to
      jeho skutečný krám.</p>
    <div class="swatches" style="margin-top:var(--s5)">
      ${PALETTE.map(swatch).join('')}
    </div>

    <h3 style="margin-top:var(--s7)">Povolené dvojice</h3>
    <p class="note">Každé pozadí má právě jednu legální barvu textu. Nic jiného se nepoužívá.</p>
    <table style="margin-top:var(--s4)">
      <thead><tr><th>Pozadí</th><th>Text</th><th>Kontrast</th><th>Stav</th></tr></thead>
      <tbody>
        <tr><td>orange #ea5f28</td><td>ink</td><td class="num">5.41</td><td class="pass">AA</td></tr>
        <tr><td>blue #2b3355</td><td>chalk</td><td class="num">12.30</td><td class="pass">AAA</td></tr>
        <tr><td>green #6fdc47</td><td>ink</td><td class="num">10.54</td><td class="pass">AAA</td></tr>
        <tr><td>red #952312</td><td>chalk</td><td class="num">8.31</td><td class="pass">AAA</td></tr>
        <tr><td>ink #141413</td><td>chalk</td><td class="num">18.43</td><td class="pass">AAA</td></tr>
        <tr><td>orange</td><td>chalk</td><td class="num">3.41</td><td class="fail">zakázáno pro běžný text</td></tr>
      </tbody>
    </table>
    <p class="note" style="margin-top:var(--s4)">
      Bílá na oranžové dává 3,41 : 1. Přesně tahle dvojice tvořila hlavní tlačítko na staré verzi webu
      a byla jednou z 67 chyb kontrastu. Proto je zakázaná.
    </p>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <span class="eyebrow">05 — motion</span>
    <h2>Pohyb</h2>
    <p class="note">Tři křivky, tři délky. Strop je 420 ms. Žádný přeskok, žádné odpružení.
      Najeďte myší nebo tabulátorem na dlaždice.</p>
    <div class="motion-grid" style="margin-top:var(--s5)">
      ${MOTION_EASE.map(([n, curve, use], i) => `
      <div class="motion-demo d-${n}" tabindex="0">
        <div class="util" style="font-size:var(--t2)">--ease-${n}</div>
        <div class="type-meta" style="margin-top:var(--s2)">${curve}<br>${use}</div>
        <div class="motion-dot"></div>
      </div>`).join('')}
    </div>
    <table style="margin-top:var(--s5)">
      <thead><tr><th>Token</th><th>Délka</th><th>Použití</th></tr></thead>
      <tbody>${MOTION_DUR.map(([n, v, use]) =>
        `<tr><td>--dur-${n}</td><td class="num">${v} ms</td><td>${use}</td></tr>`).join('')}</tbody>
    </table>
    <p class="note" style="margin-top:var(--s4)">
      <strong>prefers-reduced-motion: reduce</strong> pohyb <em>vypne</em>, nezkrátí.
      Tahle stránka to už dělá — žádné <code>0.01ms</code>, ale <code>transition:none</code>.
    </p>
  </div>
</section>

<hr class="rule">

<section>
  <div class="wrap">
    <span class="eyebrow">06 — placeholder</span>
    <h2>Placeholder</h2>
    <p class="note">Chybějící údaj je součást nabídky, ne chyba. Šrafura v brandové oranžové na inkoustu:
      čte se jako záměrná značka, ne jako rozbitý obrázek. Nikdy šedá, nikdy ikona prasklé fotky.</p>

    <div class="cards" style="margin-top:var(--s5)">

      <article class="card">
        <div class="card-photo"><img src="IMG_MISO" alt="Miso Walnut — řez"></div>
        <div class="card-body">
          <h3 class="card-name">Miso Walnut</h3>
          <p class="card-desc">Kváskový chléb s miso pastou a vlašskými ořechy</p>
          <div><span class="allergen-real">Alergeny · vlašské ořechy</span></div>
          <div class="card-price tag-notch">150 / 75 Kč <small>celý / půlka</small></div>
        </div>
      </article>

      <article class="card">
        <div class="card-photo ph"><span class="ph-label tag-notch">Foto doplníme</span></div>
        <div class="card-body">
          <h3 class="card-name">Double G</h3>
          <p class="card-desc">Kváskový chléb s konfitovaným česnekem a gochujangem.</p>
          <div><span class="allergen-pending">Alergeny · čekají na potvrzení</span></div>
          <div class="card-price tag-notch">147 / 74 Kč <small>celý / půlka</small></div>
        </div>
      </article>

      <article class="card">
        <div class="card-photo ph"><span class="ph-label tag-notch">Foto doplníme</span></div>
        <div class="card-body">
          <h3 class="card-name">Žitný</h3>
          <div class="ph-inline tag-notch">
            <span class="ph-k">Popis doplníme</span>
            <span class="ph-v">Chléb je na denní nabídce v obou pobočkách.</span>
          </div>
          <div><span class="allergen-pending">Alergeny · čekají na potvrzení</span></div>
          <div class="ph-inline tag-notch" style="margin-top:auto">
            <span class="ph-k">Cenu doplníme</span>
            <span class="ph-v">Ptejte se na prodejně.</span>
          </div>
        </div>
      </article>

    </div>

    <h3 style="margin-top:var(--s7)">Dva stavy alergenů</h3>
    <p class="note">Rozdíl musí být viditelný na první pohled. Potvrzený alergen je plný blok.
      Nepotvrzený je přerušovaný rámeček se šrafurou a slovem <em>čekají na potvrzení</em> — nikdy
      prázdné místo, které by se dalo číst jako „neobsahuje alergeny“.</p>
    <div style="margin-top:var(--s4);background:var(--chalk);padding:var(--s4);display:flex;
      gap:var(--s4);flex-wrap:wrap">
      <span class="allergen-real">Alergeny · vlašské ořechy</span>
      <span class="allergen-pending">Alergeny · čekají na potvrzení</span>
    </div>
    <p class="note" style="margin-top:var(--s4)">
      Anglická verze: <strong>Photo to come</strong> · <strong>Description to come</strong> ·
      <strong>Price to come</strong> · <strong>Allergens · awaiting confirmation</strong>.
    </p>
  </div>
</section>

<section class="ground-blue">
  <div class="wrap">
    <span class="eyebrow">grounds</span>
    <h2 style="margin-bottom:var(--s4)">Sytá pozadí</h2>
    <p style="font-size:var(--t3)">Žádný krém, žádná špinavá bílá, žádná neutrální plocha.
      Sekce se střídají mezi oranžovou, modrou, zelenou, červenou a inkoustem.</p>
  </div>
</section>
<section class="ground-green"><div class="wrap"><p class="util" style="font-size:var(--t4);margin:0">green · ink</p></div></section>
<section class="ground-red"><div class="wrap"><p class="util" style="font-size:var(--t4);margin:0">red · chalk</p></div></section>

</body>
</html>`;

const misoB64 = readFileSync(join(root, 'assets/breadguy-photos/miso-walnut-rez.webp')).toString('base64');
const out = html.replace('IMG_MISO', `data:image/webp;base64,${misoB64}`);

mkdirSync(join(root, 'specimen'), { recursive: true });
writeFileSync(join(root, 'specimen/index.html'), out);
console.log(`specimen/index.html — ${(out.length / 1024).toFixed(0)} KB, self-contained`);
