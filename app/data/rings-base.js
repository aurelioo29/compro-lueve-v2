export const PATH_PREFIX = {
  heritage: "/collection/wedding-rings/the-heritage",
  soe: "/collection/wedding-rings/silhouettes-of-earth",
  col: "/collection/wedding-rings/constellation-of-love",
  engagement: "/collection/engagement-rings",
};

export const CATEGORIES = Object.keys(PATH_PREFIX);

// helper slug
export const slug = (s = "") =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
