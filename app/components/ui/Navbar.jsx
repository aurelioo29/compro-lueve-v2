"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import SearchBar from "./SearchBar";
import { buildRingsIndexFromMessages } from "@/lib/rings-index";
import { usePublicCollectionTree } from "@/features/collection/hooks/usePublicCollectionTree";

function buildCategoryHref(parentSlug, childSlug = null) {
  return childSlug
    ? `/collection/${parentSlug}/${childSlug}`
    : `/collection/${parentSlug}`;
}

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "id" : "en";

  const { data: collectionTreeData } = usePublicCollectionTree();
  const collectionTree = collectionTreeData?.data || [];

  const index = React.useMemo(
    () => buildRingsIndexFromMessages(locale, { withAlt: true }),
    [locale],
  );

  const [open, setOpen] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  const hardClose = useCallback(() => {
    setOpen(false);
    setOpenCollection(false);
    setOpenServices(false);
  }, []);

  useEffect(() => {
    hardClose();
  }, [pathname, hardClose]);

  useEffect(() => {
    if (!open) {
      setOpenCollection(false);
      setOpenServices(false);
    }
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-0 md:px-20">
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

        <ul className="flex items-center gap-14 font-poppins text-2xl font-medium tracking-[0.1em] text-[#800000]">
          <li>
            <Link
              href="/about"
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width] after:duration-200 hover:after:w-full"
            >
              {t("about")}
            </Link>
          </li>

          <li>
            <Link
              href="/blogs"
              locale={locale}
              onClick={hardClose}
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width] after:duration-200 hover:after:w-full"
            >
              {t("blog")}
            </Link>
          </li>

          {/* Collection */}
          <li className="group relative before:absolute before:inset-x-0 before:top-full before:block before:h-4 before:content-['']">
            <button
              type="button"
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width] after:duration-200 group-hover:after:w-full"
            >
              {t("collection")}
            </button>

            <div
              className="pointer-events-none absolute left-[60%] top-full z-50 w-[280px] -translate-x-1/2 translate-y-1 rounded-lg bg-[#800000]/[0.16] font-futura-dee opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
              role="menu"
              aria-label="Collection menu"
            >
              <div className="p-3">
                {collectionTree.length > 0 ? (
                  <div className="space-y-5">
                    {collectionTree.map((parent, parentIndex) => (
                      <div key={parent.id}>
                        <Link
                          href={buildCategoryHref(parent.slug)}
                          locale={locale}
                          onClick={hardClose}
                          className="block text-3xl tracking-wide text-[#800000] transition-opacity hover:opacity-90"
                        >
                          {parent.name}
                        </Link>

                        {parent.children?.length > 0 && (
                          <ul className="mt-3 space-y-3 pl-2 text-2xl tracking-wide text-white">
                            {parent.children.map((child) => (
                              <li key={child.id}>
                                <Link
                                  href={buildCategoryHref(
                                    parent.slug,
                                    child.slug,
                                  )}
                                  locale={locale}
                                  onClick={hardClose}
                                  className="block text-[#800000] transition-[text-decoration-color] duration-200 hover:underline underline-offset-4"
                                  role="menuitem"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}

                        {parentIndex !== collectionTree.length - 1 && (
                          <div className="my-3 h-[2px] w-full bg-[#800000]" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xl text-[#800000]">No collections yet</p>
                )}
              </div>
            </div>
          </li>

          {/* Services */}
          <li className="group relative before:absolute before:inset-x-0 before:top-full before:block before:h-4 before:content-['']">
            <button
              type="button"
              className="relative inline-block uppercase transition-opacity hover:font-semibold hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#800000] after:transition-[width] after:duration-200 group-hover:after:w-full"
            >
              {t("services")}
            </button>

            <div
              className="pointer-events-none absolute left-1/2 top-full z-50 w-[180px] -translate-x-1/2 translate-y-1 rounded-lg bg-[#800000]/[0.16] font-futura-dee opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
              role="menu"
              aria-label="Services menu"
            >
              <ul className="px-4 py-3">
                <li>
                  <Link
                    href="/services/custom-ring"
                    locale={locale}
                    onClick={hardClose}
                    className="block rounded-md text-2xl tracking-wide text-[#800000]"
                    role="menuitem"
                  >
                    Custom Ring
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-4">
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

          <div className="flex items-center gap-2">
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
                  <X className="h-6 w-6 text-[#800000]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#800000]" />
                )}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-3">
          <SearchBar
            index={index}
            locale={locale}
            onNavigate={hardClose}
            placeholder={locale === "id" ? "Cari cincin…" : "Search rings…"}
            className="w-full max-w-none"
          />
        </div>

        <div
          id="mobile-menu"
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-[250ms] ease-out ${
            open
              ? "max-h-[80vh] translate-y-0 opacity-100"
              : "max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <div className="mt-6 rounded-xl bg-[#800000] text-[#E0C698] shadow-lg">
            <ul className="divide-y divide-[#CEA66D]/20">
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
                  className={`grid transition-[grid-template-rows,opacity,transform] duration-[250ms] ease-out ${
                    openCollection
                      ? "grid-rows-[1fr] translate-y-0 opacity-100"
                      : "grid-rows-[0fr] -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-5 px-4 pb-3 font-futura-dee text-[#E0C698]">
                      {collectionTree.length > 0 ? (
                        collectionTree.map((parent, index) => (
                          <div key={parent.id}>
                            <Link
                              href={buildCategoryHref(parent.slug)}
                              locale={locale}
                              onClick={hardClose}
                              className="block px-1 pt-2 text-xl tracking-wider opacity-90 transition-opacity hover:opacity-100"
                            >
                              {parent.name}
                            </Link>

                            {parent.children?.length > 0 && (
                              <ul className="mt-2 space-y-2 pl-2 text-[19px] normal-case tracking-normal">
                                {parent.children.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      href={buildCategoryHref(
                                        parent.slug,
                                        child.slug,
                                      )}
                                      locale={locale}
                                      onClick={hardClose}
                                      className="block rounded px-1 py-1 text-white transition-[text-decoration-color] hover:underline underline-offset-4"
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {index !== collectionTree.length - 1 && (
                              <div className="my-3 h-px bg-white/20" />
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="px-1 pt-2 text-lg opacity-80">
                          No collections yet
                        </p>
                      )}
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
                  className={`grid transition-[grid-template-rows,opacity,transform] duration-[250ms] ease-out ${
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
