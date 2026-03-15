const NAMES_COL = ["Cassiopeia", "Crux", "Cygnus", "Orion", "Perseus", "Pyxis"];
const NAMES_SOE = [
  "Orchid",
  "Camellia",
  "Deep Rooted Tree",
  "Eternal Flame",
  "Acacia",
  "Rain Shower",
];
const NAMES_HERITAGE = [
  "Charlotte",
  "Emma",
  "Florence",
  "Katherine",
  "Victoria",
  "Scarlett",
];

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const COL_ITEMS = NAMES_COL.map((name, i) => {
  const n = i + 1;
  return {
    slug: slugify(name),
    name,
    image: `/images/catalog/wedding/col/col-${n}.png`,
    alt: `${name} constellation of love wedding ring`,
    href: `/collection/wedding-rings/constellation-of-love/${slugify(name)}`,
  };
});

export const SOE_ITEMS = NAMES_SOE.map((name, i) => {
  const n = i + 1;
  return {
    slug: slugify(name),
    name,
    image: `/images/catalog/wedding/soe/soe-${n}.png`,
    alt: `${name} silhouette of earth wedding ring`,
    href: `/collection/wedding-rings/silhouettes-of-earth/${slugify(name)}`,
  };
});

export const HERITAGE_ITEMS = NAMES_HERITAGE.map((name, i) => {
  const n = i + 1;
  return {
    slug: slugify(name),
    name,
    image: `/images/catalog/wedding/heritage/heritage-${n}.png`,
    alt: `${name} the heritage wedding ring`,
    href: `/collection/wedding-rings/the-heritage/${slugify(name)}`,
  };
});

export const WEDDING_HERO = {
  col: {
    src: "/images/collection/wedding/hero-col.png",
    alt: "Constellation of Love wedding collection hero",
  },
  soe: {
    src: "/images/collection/wedding/hero-soe.png",
    alt: "Silhouettes of Earth wedding collection hero",
  },
  heritage: {
    src: "/images/collection/wedding/hero-heritage.png",
    alt: "The Heritage wedding collection hero",
  },
};
