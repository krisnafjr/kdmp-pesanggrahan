// src/app/page.tsx

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import FeaturedProducts from "@/components/FeaturedProducts";
import LatestNews from "@/components/LatestNews";
import Testimonial from "@/components/Testimonial";
import PotensiDesa from "@/components/PotensiDesa";
import CTA from "@/components/CTA";

export default async function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <FeaturedProducts />
      <LatestNews />
      <Testimonial />
      <PotensiDesa />
      <CTA />
    </main>
  );
}