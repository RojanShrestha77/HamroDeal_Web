import ProductHomePage from "../products/Products";
import Link from "next/link";
import BannerCarousel from "./_components/BannerCarousel";

const HomePage = () => {
  return (
    <div>
      <BannerCarousel />

      {/* Featured Products Header */}
      <div className="max-w-screen-xl mx-auto px-6 mt-10 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111]">Featured Products</h2>
          <p className="text-sm text-[#888] mt-1">
            Discover our curated collection
          </p>
        </div>
        <Link
          href="/products"
          className="text-sm font-medium text-[#111] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-white transition-colors duration-200"
        >
          Browse All
        </Link>
      </div>

      <ProductHomePage />
    </div>
  );
};

export default HomePage;
