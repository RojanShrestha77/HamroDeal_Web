import HomeBanner from "./_components/HomeBanner";
import ProductHomePage from "../products/Products";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <div className="text-center my-8">
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse All Products
        </Link>
      </div>
      <ProductHomePage />
    </div>
  );
};

export default HomePage;
