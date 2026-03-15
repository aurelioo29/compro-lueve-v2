import { CATEGORIES, PATH_PREFIX, slug } from "@/app/data/rings-base";
import en from "@/messages/en.json";
import id from "@/messages/id.json";

const messagesByLocale = { en, id };

function keyToLabel(key = "") {
  return key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Build index dari messages (en/id) DAN (opsional) tambahkan altLabels dari locale lain
 * biar pencarian tetap “nemu” meskipun user ngetik pakai bahasa seberang.
 */
export function buildRingsIndexFromMessages(
  locale = "en",
  opts = { withAlt: true }
) {
  const cur = messagesByLocale[locale] || en;
  const other = locale === "en" ? messagesByLocale.id : messagesByLocale.en;

  const out = [];

  for (const cat of CATEGORIES) {
    const details = cur?.[cat]?.details || {};
    for (const key of Object.keys(details)) {
      const node = details[key] || {};
      const display = node.displayName || keyToLabel(key);
      const path = `${PATH_PREFIX[cat]}/${slug(key)}/`;

      const item = {
        label: display, // label sesuai locale aktif
        path,
        category: cat,
      };

      if (opts.withAlt && other?.[cat]?.details?.[key]) {
        const altNode = other[cat].details[key];
        const alt = altNode.displayName || keyToLabel(key);
        // sisipkan label alternatif untuk pencarian lintas bahasa
        item.altLabels = [alt];
      }

      out.push(item);
    }
  }

  // urutkan biar rapi
  out.sort((a, b) => a.label.localeCompare(b.label));
  return out;
}
