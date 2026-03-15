"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import SearchBar from "./SearchBar";
import { buildRingsIndexFromMessages } from "@/lib/rings-index";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "id" : "en";
  const index = React.useMemo(
    () => buildRingsIndexFromMessages(locale, { withAlt: true }),
    [locale]
  );

  const [open, setOpen] = useState(false); // mobile main
  const [openCollection, setOpenCollection] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  // === HOVER LOCK: cegah dropdown muncul lagi setelah navigasi desktop ===
  const [hoverLock, setHoverLock] = useState(false);

  // helper: tutup semua panel (dipakai di mobile & klik link)
  const hardClose = useCallback(() => {
    setOpen(false);
    setOpenCollection(false);
    setOpenServices(false);
  }, []);

  // KUNCI hover setiap kali route berubah + reset semua panel
  useEffect(() => {
    hardClose();
    setHoverLock(true);
  }, [pathname, hardClose]);

  // ===================== RENDER =====================
  return (
    <header
      key={pathname} // remount untuk hard reset state jika dibutuhkan
      className="fixed inset-x-0 top-0 z-50 px-0 md:px-20"
    >
      {/* ================= BACKDROP ================= */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white/55 backdrop-blur-md border-b border-black/10 shadow-sm [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* ================= DESKTOP ================= */}
      <nav
        className="hidden lg:flex items-center justify-between px-6 py-4 gap-20 relative z-10"
        onMouseLeave={() => setHoverLock(false)}
      >
        <Link href="/" locale={locale} className="block" onClick={hardClose}>
          <div className="relative h-24 w-[180px]">
            <Image
              src="/images/logo/lueve-logo.svg"
              alt="LUEVE"
              fill
              sizes="120px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-14 text-[#800000] font-poppins font-medium text-2xl tracking-[0.1em]">
          {/* About */}
          <li>
            <Link
              href="/about"
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:opacity-70 hover:font-semibold
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width]
                         after:duration-200 hover:after:w-full"
            >
              {t("about")}
            </Link>
          </li>

          {/* Collection (MEGA MENU) */}
          <li
            className="relative group
                       before:content-[''] before:absolute before:inset-x-0 before:top-full
                       before:h-4 before:block"
          >
            <h1
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:opacity-70 hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width] after:duration-200 group-hover:after:w-full"
            >
              {t("collection")}
            </h1>

            {/* panel */}
            <div
              className={[
                "pointer-events-none opacity-0 translate-y-1",
                !hoverLock
                  ? "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0"
                  : "",
                "absolute left-[60%] -translate-x-1/2 top-full w-[150px] md:w-[225px] z-50 rounded-lg bg-[#800000]/[0.16] shadow-xl backdrop-blur-sm transition-all duration-200 ease-out font-futura-dee",
              ].join(" ")}
              role="menu"
              aria-label="Collection menu"
            >
              <div className="p-3">
                <Link
                  href="/collection/engagement-rings"
                  locale={locale}
                  onClick={hardClose}
                  className="block text-3xl mb-6 font-futura-dee tracking-wide hover:opacity-90 transition-opacity text-[#800000]"
                >
                  Engagement Ring
                </Link>
                <div className="h-[2px] w-full bg-[#800000] my-3 transition-opacity" />

                <Link
                  href="/collection/wedding-rings"
                  locale={locale}
                  onClick={hardClose}
                  className="block text-3xl pl-1 font-futura-dee tracking-wide hover:opacity-90 transition-opacity text-[#800000]"
                >
                  Wedding Ring
                </Link>

                <ul className="space-y-3 tracking-wide text-2xl text-white pl-2 mt-3">
                  <li>
                    <Link
                      href="/collection/wedding-rings/constellation-of-love"
                      locale={locale}
                      onClick={hardClose}
                      className="block hover:underline underline-offset-4 transition-[text-decoration-color] duration-200 text-[#800000]"
                      role="menuitem"
                    >
                      Constellation of Love
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collection/wedding-rings/silhouettes-of-earth"
                      locale={locale}
                      onClick={hardClose}
                      className="block hover:underline underline-offset-4 transition-[text-decoration-color] duration-200 text-[#800000]"
                      role="menuitem"
                    >
                      Silhouettes of Earth
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collection/wedding-rings/the-heritage"
                      locale={locale}
                      onClick={hardClose}
                      className="block hover:underline underline-offset-4 transition-[text-decoration-color] duration-200 text-[#800000]"
                      role="menuitem"
                    >
                      The Heritage
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Services (DROPDOWN KECIL) */}
          <li className="relative group before:content-[''] before:absolute before:inset-x-0 before:top-full before:h-4 before:block">
            <h1
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:opacity-70 hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width] after:duration-200 group-hover:after:w-full"
            >
              {t("services")}
            </h1>

            <div
              className={[
                "pointer-events-none opacity-0 translate-y-1",
                !hoverLock
                  ? "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0"
                  : "",
                "absolute left-1/2 -translate-x-1/2 top-full w-[150px] md:w-[150px] z-50 rounded-lg bg-[#800000]/[0.16] shadow-xl backdrop-blur-sm transition-all duration-200 ease-out font-futura-dee",
              ].join(" ")}
              role="menu"
              aria-label="Services menu"
            >
              <ul className="px-4 py-3">
                <li>
                  <Link
                    href="/services/custom-ring"
                    locale={locale}
                    onClick={hardClose}
                    className="block text-2xl tracking-wide rounded-md transition-colors text-[#800000]"
                    role="menuitem"
                  >
                    Custom Ring
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        {/* Language toggle + Search */}
        <div className="flex items-center gap-4">
          {/* <Link
            href={pathname || "/"}
            locale={other}
            prefetch={false}
            onClick={hardClose}
            className="group inline-flex items-center gap-3 rounded-full px-3.5 py-1 bg-[#800000] text-[#CEA66D] shadow-sm font-poppins hover:brightness-[1.05] active:scale-[0.98] transition-all"
          >
            <span className="text-md font-semibold">
              {other === "en" ? t("lang.id") : t("lang.en")}
            </span>
            <span className="relative w-[30px] h-[30px] overflow-hidden">
              <Image
                src={
                  other === "en"
                    ? "/icons/flags/id-ID.svg"
                    : "/icons/flags/en-US.svg"
                }
                alt={other === "en" ? "English" : "Indonesian"}
                fill
                sizes="30px"
                className="object-cover"
              />
            </span>
          </Link> */}

          <SearchBar
            index={index}
            locale={locale}
            onNavigate={hardClose}
            placeholder={locale === "id" ? "Cari cincin…" : "Search rings…"}
            className="w-full sm:w-full md:w-full max-w-none"
          />
        </div>
      </nav>

      {/* ================= MOBILE / TABLET ================= */}
      <nav className="lg:hidden px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" locale={locale} className="block" onClick={hardClose}>
            <div className="relative h-14 w-[110px]">
              <Image
                src="/images/logo/lueve-logo.svg"
                alt="LUEVE"
                fill
                sizes="110px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* right controls */}
          <div className="flex items-center gap-2">
            {/* <Link
              href={pathname || "/"}
              locale={other}
              prefetch={false}
              onClick={hardClose}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#800000] text-[#CEA66D]
                         hover:brightness-[1.05] active:scale-[0.98] transition-all"
            >
              <span className="text-xs font-semibold font-poppins">
                {other === "en" ? t("lang.id") : t("lang.en")}
              </span>
              <span className="relative w-[25px] h-[25px] overflow-hidden">
                <Image
                  src={
                    other === "en"
                      ? "/icons/flags/id-ID.svg"
                      : "/icons/flags/en-US.svg"
                  }
                  alt={other === "en" ? "English" : "Indonesian"}
                  fill
                  sizes="30px"
                  className="object-cover"
                />
              </span>
            </Link> */}

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-black/5 active:bg-black/10 transition-colors"
            >
              <span
                className={`block transition-transform duration-200 ${
                  open ? "rotate-90" : "rotate-0"
                }`}
              >
                {open ? (
                  <X className="w-6 h-6 text-[#800000] transition-opacity duration-150 opacity-100" />
                ) : (
                  <Menu className="w-6 h-6 text-[#800000] transition-opacity duration-150 opacity-100" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* SearchBar di baris sendiri (full width) */}
        <div className="mt-3">
          <SearchBar
            index={index}
            locale={locale}
            onNavigate={hardClose}
            placeholder={locale === "id" ? "Cari cincin…" : "Search rings…"}
            className="w-full max-w-none"
          />
        </div>

        {/* Panel slide down */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-[250ms] ease-out
            ${
              open
                ? "max-h-[60vh] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }`}
        >
          <div className="mt-6 rounded-xl bg-[#800000] text-[#E0C698] shadow-lg">
            <ul className="divide-y divide-[#CEA66D]/20">
              {/* About */}
              <li>
                <Link
                  href="/about"
                  locale={locale}
                  onClick={hardClose}
                  className="block px-4 py-3 uppercase tracking-widest font-poppins text-lg font-medium hover:bg-white/5 transition-colors"
                >
                  {t("about")}
                </Link>
              </li>

              {/* Collection */}
              <li>
                <div className="w-full px-4 py-3 flex items-center justify-between uppercase tracking-widest font-poppins text-lg font-medium">
                  <h1
                    locale={locale}
                    onClick={hardClose}
                    className="block pr-3 hover:opacity-80 transition-opacity"
                  >
                    {t("collection")}
                  </h1>

                  <button
                    type="button"
                    aria-expanded={openCollection}
                    aria-controls="collection-submenu"
                    onClick={() => setOpenCollection((s) => !s)}
                    className="p-2 rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
                    aria-label={
                      openCollection
                        ? "Collapse collection"
                        : "Expand collection"
                    }
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openCollection ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <div
                  id="collection-submenu"
                  className={`grid transition-[grid-template-rows,opacity,transform] duration-[250ms] ease-out
                    ${
                      openCollection
                        ? "grid-rows-[1fr] opacity-100 translate-y-0"
                        : "grid-rows-[0fr] opacity-0 -translate-y-1"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-3 space-y-5 text-[#E0C698] font-futura-dee">
                      <Link
                        href="/collection/engagement-rings"
                        locale={locale}
                        onClick={hardClose}
                        className="block px-1 pt-2 opacity-90 tracking-wider text-xl hover:opacity-100 transition-opacity"
                      >
                        Engagement Ring
                      </Link>
                      <div className="h-px my-3 bg-white/80" />
                      <Link
                        href="/collection/wedding-rings"
                        locale={locale}
                        onClick={hardClose}
                        className="block px-1 opacity-90 tracking-wider text-xl hover:opacity-100 transition-opacity"
                      >
                        Wedding Ring
                      </Link>

                      <ul className="mt-2 space-y-2 text-[19px] normal-case tracking-normal pl-2">
                        <li>
                          <Link
                            href="/collection/wedding-rings/constellation-of-love"
                            locale={locale}
                            onClick={hardClose}
                            className="block px-1 py-1 rounded text-white hover:underline underline-offset-4 transition-[text-decoration-color]"
                          >
                            Constellation of Love
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/wedding-rings/silhouettes-of-earth"
                            locale={locale}
                            onClick={hardClose}
                            className="block px-1 py-1 rounded text-white hover:underline underline-offset-4 transition-[text-decoration-color]"
                          >
                            Silhouettes of Earth
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/wedding-rings/the-heritage"
                            locale={locale}
                            onClick={hardClose}
                            className="block px-1 py-1 rounded text-white hover:underline underline-offset-4 transition-[text-decoration-color]"
                          >
                            The Heritage
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              {/* Services */}
              <li>
                <div className="w-full px-4 py-3 flex items-center justify-between uppercase tracking-widest font-poppins text-lg font-medium">
                  <h1
                    locale={locale}
                    onClick={hardClose}
                    className="block pr-3 hover:opacity-80 transition-opacity"
                  >
                    {t("services")}
                  </h1>

                  <button
                    type="button"
                    aria-expanded={openServices}
                    aria-controls="services-submenu"
                    onClick={() => setOpenServices((s) => !s)}
                    className="p-2 rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
                    aria-label={
                      openServices ? "Collapse services" : "Expand services"
                    }
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openServices ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <div
                  id="services-submenu"
                  className={`grid transition-[grid-template-rows,opacity,transform] duration-[250ms] ease-out
                    ${
                      openServices
                        ? "grid-rows-[1fr] opacity-100 translate-y-0"
                        : "grid-rows-[0fr] opacity-0 -translate-y-1"
                    }`}
                >
                  <div className="overflow-hidden">
                    <ul className="px-4 pb-3 space-y-2 text-[15px] normal-case tracking-normal">
                      <li>
                        <Link
                          href="/services/custom-ring"
                          locale={locale}
                          onClick={hardClose}
                          className="block px-1 py-1 rounded font-futura-dee tracking-wider text-xl hover:opacity-100 opacity-90 transition-opacity"
                        >
                          Custom Ring
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>

            <div className="px-4 py-3 flex items-center justify-center font-poppins">
              <span className="text-xs opacity-70">
                © LUEVE {new Date().getFullYear()}. All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
