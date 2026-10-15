import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Categorías",
};

export default function CategoriesPage() {
  return (
    <div className="bg-app text-app min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Categories expanded />
      </main>
      <Footer />
    </div>
  );
}
