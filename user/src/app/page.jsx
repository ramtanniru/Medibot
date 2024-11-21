import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export const metadata = {
  title: "MediBot",
  description: "Where quality meets care",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <About />
      <FeaturesTab />
      <Integration />
      <CTA />
      <FAQ />
      <Contact />
    </main>
  );
}
