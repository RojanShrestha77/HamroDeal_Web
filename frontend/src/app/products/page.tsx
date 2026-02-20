import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductBrowsePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // state
  const [productState, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter values
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    fetchProducts();
  }, [categories, search, minPrice, maxPrice, sort]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(); //creates emptty container to hold key-value p[airs that will be added to the url]
      // bag is empty {}
      // bag now has { category "shoes"}
      // params.append('Category', 'Shoes');
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("sort", sort);

      const response = await fetch(
        `http://localhost:5050/api/product?${params.toString()}`,
      );
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:500/api/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
  };
}
