"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const WEDDING_TABS = [
  {
    href: "/collection/wedding-rings/constellation-of-love",
    label: "Constellation of Love",
  },
  {
    href: "/collection/wedding-rings/silhouettes-of-earth",
    label: "Silhouette of Earth",
  },
  { href: "/collection/wedding-rings/the-heritage", label: "The Heritage" },
];

function normalize(p = "") {
  const noSlash = p.replace(/\/+$/, "");
  return noSlash.replace(/^\/(en|id)(?=\/)/, "");
}

export default function WeddingTabs() {
  const pathname = usePathname();
  const current = normalize(pathname);

  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6">
      <h1 className="mt-19 text-center font-poppins text-[#800000] text-2xl md:text-3xl">
        Wedding
      </h1>

      <ul className="my-12 flex justify-center text-center gap-x-10 md:gap-x-24 font-poppins text-[#800000] md:mr-[105px]">
        {WEDDING_TABS.map((it) => {
          const href = normalize(it.href);
          // pakai startsWith biar aktif juga di sub-route /the-heritage/*
          const active = current === href || current.startsWith(href + "/");

          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={[
                  "text-[9px] md:text-2xl transition-opacity hover:opacity-80",
                  active
                    ? "font-semibold underline-offset-4 decoration-2"
                    : "font-normal",
                ].join(" ")}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
