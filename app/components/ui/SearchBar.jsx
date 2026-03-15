"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

const normalize = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function scoreItem(query, item) {
  const nq = normalize(query);
  if (!nq) return -Infinity;
  const cand = [
    item.label,
    ...(Array.isArray(item.altLabels) ? item.altLabels : []),
  ];
  let best = -Infinity;
  for (const c of cand) {
    const nc = normalize(c);
    if (!nc.includes(nq)) continue;
    const s = nc.startsWith(nq)
      ? 100 - (nc.length - nq.length)
      : 10 - (nc.indexOf(nq) || 0);
    if (s > best) best = s;
  }
  return best;
}

function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const re = new RegExp(escapeRegExp(query), "i");
  const m = text.match(re);
  if (!m) return <>{text}</>;
  const i = m.index;
  const j = i + m[0].length;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent underline decoration-2 underline-offset-2">
        {text.slice(i, j)}
      </mark>
      {text.slice(j)}
    </>
  );
}

export default function SearchBar({
  index = [],
  locale,
  placeholder = "Search rings…",
  onNavigate,
  maxResults = 8,
  className = "", // <— NEW
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setCursor(0);
    setQ("");
  }, [pathname]);

  const [debounced, setDebounced] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 120);
    return () => clearTimeout(t);
  }, [q]);

  const results = useMemo(() => {
    const nq = normalize(debounced);
    if (!nq) return [];
    return index
      .map((it) => ({ it, score: scoreItem(nq, it) }))
      .filter((x) => x.score > -Infinity)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((x) => x.it);
  }, [debounced, index, maxResults]);

  useEffect(() => {
    setOpen(results.length > 0 && !!q);
    setCursor(0);
  }, [results.length, q]);

  const go = (path) => {
    router.push(path, { locale });
    onNavigate?.();
  };

  const onKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[cursor];
      if (item) go(item.path);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    const fn = (ev) => {
      if (!open) return;
      const t = ev.target;
      if (
        inputRef.current &&
        !inputRef.current.contains(t) &&
        listRef.current &&
        !listRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  return (
    <div className={`relative w-full min-w-0 ${className}`}>
      <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 ring-1 ring-[#800000]/20 focus-within:ring-2 focus-within:ring-[#800000]/60 transition">
        <Search className="w-4 h-4 text-[#800000]" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => q && results.length && setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[#800000] placeholder:text-[#800000]/60 text-base"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="search-suggest"
          aria-activedescendant={open ? `search-opt-${cursor}` : undefined}
        />
      </div>

      {open && results.length > 0 && (
        <ul
          id="search-suggest"
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 mt-2 max-h-72 overflow-auto rounded-xl border border-[#800000]/20 bg-white/95 shadow-xl backdrop-blur-sm z-50"
        >
          {results.map((it, i) => {
            const active = i === cursor;
            return (
              <li
                id={`search-opt-${i}`}
                key={`${it.category}:${it.path}`}
                role="option"
                aria-selected={active}
                onMouseEnter={() => setCursor(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(it.path)}
                className={[
                  "cursor-pointer px-4 py-2 flex items-center justify-between",
                  active ? "bg-[#800000]/10" : "hover:bg-black/5",
                ].join(" ")}
              >
                <span className="text-[#800000]">
                  <Highlight text={it.label} query={q} />
                </span>
                <span className="text-xs uppercase tracking-wide text-[#800000]/60">
                  {it.category}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
