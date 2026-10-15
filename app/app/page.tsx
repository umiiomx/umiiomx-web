import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-app text-app min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
}
