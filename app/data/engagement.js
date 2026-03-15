const NAMES = [
  "Astrae",
  "Aurellia",
  "Beatrix",
  "Blossom",
  "Celestia",
  "Chrysalis",
  "Elara",
  "Freesia",
  "Luminare",
  "Lxia",
  "Magnolia",
  "Novaria",
  "Pavonis",
  "Selena",
  "Stella",
  "Veyla",
  "Xaverius",
  "Zenith",
];

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const ENGAGEMENT_ITEMS = NAMES.map((name, i) => {
  const n = i + 1;
  return {
    slug: slugify(name),
    name,
    image: `/images/catalog/engagement/eng-${n}.svg`,
    alt: `${name} engagement ring`,
    href: `/collection/engagement-rings/${slugify(name)}`,
  };
});

export const ENGAGEMENT_HERO_BY_PAGE = {
  1: {
    src: "/images/collection/engagement/hero-engagement-1.png",
    alt: "Engagement collection — page 1",
  },
  2: {
    src: "/images/collection/engagement/hero-engagement-2.png",
    alt: "Engagement collection — page 2",
  },
};
