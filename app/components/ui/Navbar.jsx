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
    [locale],
  );

  const [open, setOpen] = useState(false); // mobile main
  const [openCollection, setOpenCollection] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  // helper: tutup semua panel
  const hardClose = useCallback(() => {
    setOpen(false);
    setOpenCollection(false);
    setOpenServices(false);
  }, []);

  // reset semua panel saat route berubah
  useEffect(() => {
    hardClose();
  }, [pathname, hardClose]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-0 md:px-20">
      {/* ================= BACKDROP ================= */}
      <div className="pointer-events-none absolute inset-0 -z-10 border-b border-black/10 bg-white/55 shadow-sm backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* ================= DESKTOP ================= */}
      <nav className="relative z-10 hidden items-center justify-between gap-20 px-6 py-4 lg:flex">
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
        <ul className="flex items-center gap-14 font-poppins text-2xl font-medium tracking-[0.1em] text-[#800000]">
          {/* About */}
          <li>
            <Link
              href="/about"
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width]
                         after:duration-200 hover:after:w-full"
            >
              {t("about")}
            </Link>
          </li>

          {/* Blogs */}
          <li>
            <Link
              href="/blogs"
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width]
                         after:duration-200 hover:after:w-full"
            >
              {t("blog")}
            </Link>
          </li>

          {/* Collection */}
          <li
            className="group relative
                       before:absolute before:inset-x-0 before:top-full before:block before:h-4 before:content-['']"
          >
            <button
              type="button"
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000]
                         after:transition-[width] after:duration-200 group-hover:after:w-full"
            >
              {t("collection")}
            </button>

            <div
              className="pointer-events-none absolute left-[60%] top-full z-50 w-[150px] -translate-x-1/2 translate-y-1 rounded-lg bg-[#800000]/[0.16] font-futura-dee opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 ease-out
                         group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100
                         group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100
                         md:w-[225px]"
              role="menu"
              aria-label="Collection menu"
            >
              <div className="p-3">
                <Link
                  href="/collection/engagement-rings"
                  locale={locale}
                  onClick={hardClose}
                  className="mb-6 block text-3xl tracking-wide text-[#800000] transition-opacity hover:opacity-90"
                >
                  Engagement Ring
                </Link>

                <div className="my-3 h-[2px] w-full bg-[#800000] transition-opacity" />

                <Link
                  href="/collection/wedding-rings"
                  locale={locale}
                  onClick={hardClose}
                  className="block pl-1 text-3xl tracking-wide text-[#800000] transition-opacity hover:opacity-90"
                >
                  Wedding Ring
                </Link>

                <ul className="mt-3 space-y-3 pl-2 text-2xl tracking-wide text-white">
                  <li>
                    <Link
                      href="/collection/wedding-rings/constellation-of-love"
                      locale={locale}
                      onClick={hardClose}
                      className="block text-[#800000] transition-[text-decoration-color] duration-200 hover:underline underline-offset-4"
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
                      className="block text-[#800000] transition-[text-decoration-color] duration-200 hover:underline underline-offset-4"
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
                      className="block text-[#800000] transition-[text-decoration-color] duration-200 hover:underline underline-offset-4"
                      role="menuitem"
                    >
                      The Heritage
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Services */}
          <li className="group relative before:absolute before:inset-x-0 before:top-full before:block before:h-4 before:content-['']">
            <button
              type="button"
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000]
                         after:transition-[width] after:duration-200 group-hover:after:w-full"
            >
              {t("services")}
            </button>

            <div
              className="pointer-events-none absolute left-1/2 top-full z-50 w-[150px] -translate-x-1/2 translate-y-1 rounded-lg bg-[#800000]/[0.16] font-futura-dee opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 ease-out
                         group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100
                         group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100
                         md:w-[150px]"
              role="menu"
              aria-label="Services menu"
            >
              <ul className="px-4 py-3">
                <li>
                  <Link
                    href="/services/custom-ring"
                    locale={locale}
                    onClick={hardClose}
                    className="block rounded-md text-2xl tracking-wide text-[#800000] transition-colors"
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
            className="w-full max-w-none sm:w-full md:w-full"
          />
        </div>
      </nav>

      {/* ================= MOBILE / TABLET ================= */}
      <nav className="relative z-10 px-4 py-4 lg:hidden">
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
              className="rounded-md p-2 transition-colors hover:bg-black/5 active:bg-black/10"
            >
              <span
                className={`block transition-transform duration-200 ${
                  open ? "rotate-90" : "rotate-0"
                }`}
              >
                {open ? (
                  <X className="h-6 w-6 text-[#800000] opacity-100 transition-opacity duration-150" />
                ) : (
                  <Menu className="h-6 w-6 text-[#800000] opacity-100 transition-opacity duration-150" />
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
                ? "max-h-[60vh] translate-y-0 opacity-100"
                : "max-h-0 -translate-y-2 opacity-0"
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
                  className="block px-4 py-3 font-poppins text-lg font-medium uppercase tracking-widest transition-colors hover:bg-white/5"
                >
                  {t("about")}
                </Link>
              </li>

              {/* Blogs */}
              <li>
                <Link
                  href="/blogs"
                  locale={locale}
                  onClick={hardClose}
                  className="block px-4 py-3 font-poppins text-lg font-medium uppercase tracking-widest transition-colors hover:bg-white/5"
                >
                  {t("blog")}
                </Link>
              </li>

              {/* Collection */}
              <li>
                <div className="flex w-full items-center justify-between px-4 py-3 font-poppins text-lg font-medium uppercase tracking-widest">
                  <button
                    type="button"
                    onClick={() => setOpenCollection((s) => !s)}
                    className="block pr-3 text-left transition-opacity hover:opacity-80"
                  >
                    {t("collection")}
                  </button>

                  <button
                    type="button"
                    aria-expanded={openCollection}
                    aria-controls="collection-submenu"
                    onClick={() => setOpenCollection((s) => !s)}
                    className="rounded-md p-2 transition-colors hover:bg-white/5 active:bg-white/10"
                    aria-label={
                      openCollection
                        ? "Collapse collection"
                        : "Expand collection"
                    }
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
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
                        ? "grid-rows-[1fr] translate-y-0 opacity-100"
                        : "grid-rows-[0fr] -translate-y-1 opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-5 px-4 pb-3 font-futura-dee text-[#E0C698]">
                      <Link
                        href="/collection/engagement-rings"
                        locale={locale}
                        onClick={hardClose}
                        className="block px-1 pt-2 text-xl tracking-wider opacity-90 transition-opacity hover:opacity-100"
                      >
                        Engagement Ring
                      </Link>

                      <div className="my-3 h-px bg-white/80" />

                      <Link
                        href="/collection/wedding-rings"
                        locale={locale}
                        onClick={hardClose}
                        className="block px-1 text-xl tracking-wider opacity-90 transition-opacity hover:opacity-100"
                      >
                        Wedding Ring
                      </Link>

                      <ul className="mt-2 space-y-2 pl-2 text-[19px] normal-case tracking-normal">
                        <li>
                          <Link
                            href="/collection/wedding-rings/constellation-of-love"
                            locale={locale}
                            onClick={hardClose}
                            className="block rounded px-1 py-1 text-white transition-[text-decoration-color] hover:underline underline-offset-4"
                          >
                            Constellation of Love
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/wedding-rings/silhouettes-of-earth"
                            locale={locale}
                            onClick={hardClose}
                            className="block rounded px-1 py-1 text-white transition-[text-decoration-color] hover:underline underline-offset-4"
                          >
                            Silhouettes of Earth
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection/wedding-rings/the-heritage"
                            locale={locale}
                            onClick={hardClose}
                            className="block rounded px-1 py-1 text-white transition-[text-decoration-color] hover:underline underline-offset-4"
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
                <div className="flex w-full items-center justify-between px-4 py-3 font-poppins text-lg font-medium uppercase tracking-widest">
                  <button
                    type="button"
                    onClick={() => setOpenServices((s) => !s)}
                    className="block pr-3 text-left transition-opacity hover:opacity-80"
                  >
                    {t("services")}
                  </button>

                  <button
                    type="button"
                    aria-expanded={openServices}
                    aria-controls="services-submenu"
                    onClick={() => setOpenServices((s) => !s)}
                    className="rounded-md p-2 transition-colors hover:bg-white/5 active:bg-white/10"
                    aria-label={
                      openServices ? "Collapse services" : "Expand services"
                    }
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
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
                        ? "grid-rows-[1fr] translate-y-0 opacity-100"
                        : "grid-rows-[0fr] -translate-y-1 opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 px-4 pb-3 text-[15px] normal-case tracking-normal">
                      <li>
                        <Link
                          href="/services/custom-ring"
                          locale={locale}
                          onClick={hardClose}
                          className="block rounded px-1 py-1 font-futura-dee text-xl tracking-wider opacity-90 transition-opacity hover:opacity-100"
                        >
                          Custom Ring
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>

            <div className="flex items-center justify-center px-4 py-3 font-poppins">
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
