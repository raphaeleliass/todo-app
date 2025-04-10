import CardSpotlights from "@/components/layouts/Home/Card-Spotlights";
import Cta from "@/components/layouts/Home/Cta";
import Hero from "@/components/layouts/Home/Hero";
import Pricing from "@/components/layouts/Home/Pricing";
import Testimonials from "@/components/layouts/Home/Testimonials";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-center overflow-hidden">
        <Hero />
        <CardSpotlights />
        <Testimonials />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
