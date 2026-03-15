import Navbar from "@/app/components/ui/Navbar";
import Footer from "@/app/components/ui/Footer";

export default function MarketingLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-[96px] md:pt-[120px]">{children}</main>
      <Footer />
    </>
  );
}
