import AboutBrand from "@/app/components/ui/AboutBrand";
import AboutStory from "@/app/components/ui/AboutStory";
import WhyShop from "@/app/components/ui/WhyShop";
import React from "react";

export default function AboutPage() {
  return (
    <section>
      {/* About Brand */}
      <AboutBrand />

      {/* About Story */}
      <AboutStory />

      {/* Why Shop */}
      <WhyShop />
    </section>
  );
}
