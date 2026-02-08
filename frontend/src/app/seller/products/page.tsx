// Empty - waiting for your implementation
import { getMyProductsAction } from "@/lib/actions/seller/product.action";
import Link from "next/link";
import ProductsTable from "./productsTable";

export default async function Page() {
  const result = await getMyProductsAction();

  if (!result.success) {
    return <div className="p-4">{result.message}</div>;
  }
  return (
    <div>
      <Link
        className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
        href="/seller/products/create"
      >
        Add Product
      </Link>
      <div>
        <ProductsTable initialProducts={result.data || []} />
      </div>
    </div>
  );
}
