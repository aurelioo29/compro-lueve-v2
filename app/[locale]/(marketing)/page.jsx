"use client";

import { useState } from "react";
import Modal from "../../components/ui/Modal";
import { useModalOnLoad } from "../../hooks/useModalOnLoad";
import { useTranslations } from "next-intl";
import Hero from "@/app/components/ui/Hero";
import About from "@/app/components/ui/About";
import Discover from "@/app/components/ui/Discover";
import FAQ from "@/app/components/ui/FAQ";
import CustomerExperience from "@/app/components/ui/CustomerExperience";
import CollectionShowcase from "@/app/components/ui/CollectionShowcase";

const CONTACT_ENABLED = process.env.NEXT_PUBLIC_CONTACT_ENABLED === "true";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const { open, setOpen } = useModalOnLoad();
  const t = useTranslations();

  const open = CONTACT_ENABLED ? modalState.open : false;
  const setOpen = CONTACT_ENABLED ? modalState.setOpen : () => {};

  async function onSubmit(e) {
    e.preventDefault();

    if (!CONTACT_ENABLED) return; // safety
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    setLoading(false);

    if (json.status && json.redirect) {
      window.location.href = json.redirect;
    } else {
      setError(json.message || "Failed to submit");
    }
  }

  return (
    <main className="relative min-h-screen">
      {/* HERO */}
      <Hero />

      {/* ABOUT */}
      <About />

      {/* DISCOVER */}
      <Discover />

      {/* OUR COLLECTION */}
      <CollectionShowcase />

      {/* CUSTOMER EXPERIENCE */}
      <CustomerExperience />

      {/* FAQ */}
      <FAQ />

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="space-y-6 sm:space-y-7">
          <h2
            id="modal-title"
            className="text-center font-minion-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black"
          >
            Send a Message to Get Our Info
          </h2>

          <p id="modal-desc" className="sr-only">
            Fill the form to contact LUEVE via WhatsApp.
          </p>

          <form
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            className="mt-10 sm:mt-16 space-y-6 sm:space-y-10 w-full max-w-md sm:max-w-lg"
            onSubmit={onSubmit}
          >
            {/* Fullname */}
            <div className="text-black font-poppins text-base sm:text-lg">
              <label htmlFor="fullname" className="block">
                Full name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                autoComplete="name"
                placeholder="e.g., Alex Tan"
                className="mt-2 sm:mt-3 w-full border-b-2 border-black bg-transparent focus:outline-none focus:border-black/80 py-2"
                required
              />
            </div>

            {/* Phone */}
            <div className="text-black font-poppins text-base sm:text-lg">
              <label htmlFor="phone" className="block">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+62…"
                className="mt-2 sm:mt-3 w-full border-b-2 border-black bg-transparent focus:outline-none focus:border-black/80 py-2"
                required
              />
            </div>

            {/* Email */}
            <div className="text-black font-poppins text-base sm:text-lg">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-2 sm:mt-3 w-full border-b-2 border-black bg-transparent focus:outline-none focus:border-black/80 py-2"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="mt-8 sm:mt-10 w-full rounded-md bg-[#C5C5C5] px-4 py-3 text-black font-poppins text-base sm:text-lg tracking-widest hover:bg-[#b5b5b5] transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </Modal>
    </main>
  );
}
