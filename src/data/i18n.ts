export const translations = {
  cs: {
    nav: {
      menu: 'Nabídka',
      locations: 'Pobočky',
      about: 'O nás',
      skipToContent: 'Přejít na obsah',
      switchLanguage: 'Přepnout na angličtinu',
    },
    hero: {
      badge: 'Pečeme každé ráno',
      title: 'Kváskový chléb a pečivo z Brna.',
      subtitle: 'Poctivé suroviny, ruční práce — od našich pecí k vám na stůl.',
      cta: 'Zobrazit nabídku',
      findUs: 'Najít pobočku',
      photoAlt: 'Focaccia s olivami a bylinkami čerstvě z pece',
    },
    openNow: {
      open: 'Otevřeno',
      closed: 'Zavřeno',
      closedToday: 'Dnes zavřeno',
      opensAt: 'Otevíráme v',
      closesAt: 'Zavíráme v',
      sunday: 'Neděle — zavřeno',
    },
    menu: {
      title: 'Nabídka',
      subtitle: 'Pečeme denně čerstvé. Populární položky se vyprodají brzy — přijďte včas.',
      all: 'Vše',
      bread: 'Chleby',
      sweets: 'Sladké',
      sandwiches: 'Sendviče',
      whole: 'celý',
      half: 'půlka',
      from: 'od',
      soldOut: 'Vyprodáno',
      available: 'Dostupné',
      currency: 'Kč',
      filterLabel: 'Filtrovat podle kategorie',
    },
    locations: {
      title: 'Pobočky',
      subtitle: 'Navštivte nás v Brně',
      hours: 'Otevírací doba',
      navigate: 'Navigovat',
      call: 'Zavolat',
      mon: 'Po',
      tue: 'Út',
      wed: 'St',
      thu: 'Čt',
      fri: 'Pá',
      sat: 'So',
      sun: 'Ne',
      reviews: 'recenzí',
    },
    about: {
      title: 'O nás',
      story: 'Bread Guy je pekárna v Brně zaměřená na kváskový chléb, focacciu a pečivo. Každý den pečeme z poctivých surovin, bez kompromisů.',
      instagram: 'Sledujte nás na Instagramu',
    },
    footer: {
      tagline: 'A Brno Bakery',
      followUs: 'Sledujte nás',
    },
    gallery: {
      label: 'Fotogalerie našeho pečiva',
      bily: 'Bochník kváskového chleba s křupavou kůrkou',
      focacciaTomato: 'Focaccia s cherry rajčaty a olivami',
      babka: 'Tiramisu babka s mascarpone',
      sandwich: 'Sendviče z domácí focaccie',
      makovyUzlik: 'Makové uzlíky',
      focacciaProsciutto: 'Focaccia s prosciuttem a rukolou',
    },
    sellOutWarning: 'Oblíbené položky se rychle vyprodají. Doporučujeme přijít co nejdříve.',
  },
  en: {
    nav: {
      menu: 'Menu',
      locations: 'Locations',
      about: 'About',
      skipToContent: 'Skip to content',
      switchLanguage: 'Switch to Czech',
    },
    hero: {
      badge: 'Baked fresh every morning',
      title: 'Sourdough bread and pastries from Brno.',
      subtitle: 'Honest ingredients, handmade — from our ovens to your table.',
      cta: 'View Menu',
      findUs: 'Find a Location',
      photoAlt: 'Focaccia with olives and herbs fresh from the oven',
    },
    openNow: {
      open: 'Open',
      closed: 'Closed',
      closedToday: 'Closed today',
      opensAt: 'Opens at',
      closesAt: 'Closes at',
      sunday: 'Sunday — closed',
    },
    menu: {
      title: 'Menu',
      subtitle: 'Baked fresh daily. Popular items sell out early — come early.',
      all: 'All',
      bread: 'Breads',
      sweets: 'Sweets',
      sandwiches: 'Sandwiches',
      whole: 'whole',
      half: 'half',
      from: 'from',
      soldOut: 'Sold out',
      available: 'Available',
      currency: 'Kč',
      filterLabel: 'Filter by category',
    },
    locations: {
      title: 'Locations',
      subtitle: 'Visit us in Brno',
      hours: 'Opening hours',
      navigate: 'Navigate',
      call: 'Call',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
      reviews: 'reviews',
    },
    about: {
      title: 'About',
      story: 'Bread Guy is a Brno bakery focused on sourdough bread, focaccia, and pastries. Every day we bake with honest ingredients, no compromises.',
      instagram: 'Follow us on Instagram',
    },
    footer: {
      tagline: 'A Brno Bakery',
      followUs: 'Follow us',
    },
    gallery: {
      label: 'Photo gallery of our baking',
      bily: 'A loaf of sourdough bread with a crisp crust',
      focacciaTomato: 'Focaccia with cherry tomatoes and olives',
      babka: 'Tiramisu babka with mascarpone',
      sandwich: 'Sandwiches on house-made focaccia',
      makovyUzlik: 'Poppyseed knot rolls',
      focacciaProsciutto: 'Focaccia with prosciutto and arugula',
    },
    sellOutWarning: 'Popular items sell out quickly. We recommend arriving as early as possible.',
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.cs;

export function t(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'cs';
}
