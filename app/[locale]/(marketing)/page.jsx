"use client";

import Modal from "../../components/ui/Modal";
import { useModalOnLoad } from "../../hooks/useModalOnLoad";
import { useTranslations } from "next-intl";
import Hero from "@/app/components/ui/Hero";
import About from "@/app/components/ui/About";
import Discover from "@/app/components/ui/Discover";
import FAQ from "@/app/components/ui/FAQ";
import CustomerExperience from "@/app/components/ui/CustomerExperience";
import CollectionShowcase from "@/app/components/ui/CollectionShowcase";
import PublicWaResponseForm from "@/features/public-wa-response/components/PublicWaResponseForm";

export default function HomePage() {
  const { open, setOpen } = useModalOnLoad();
  const t = useTranslations();

  return (
    <main className="relative min-h-screen">
      <Hero />
      <About />
      <Discover />
      <CollectionShowcase />
      <CustomerExperience />
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

          <PublicWaResponseForm onSuccess={() => setOpen(false)} />
        </div>
      </Modal>
    </main>
  );
}
