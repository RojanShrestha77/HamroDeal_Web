"use client";
import { deleteProductAction } from "@/lib/actions/seller/product.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images?: string;
  categoryId: {
    _id: string;
    name: string;
  };
  createdAt: string;
};

export default function ProductsTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const del = confirm("Are you sure you want to delete this product");
    if (!del) return;
    setLoading(productId);
    try {
      const result = await deleteProductAction(productId);

      if (result.success) {
        toast.success("Product deletd successfully");
        setProducts(products.filter((p) => p._id !== productId));
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setLoading(null);
    }
  };

  const handleEdit = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    router.push(`/seller/products/edit/${productId}`);
  };

  const handleRowClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products found. Create your first product
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              onClick={() => handleRowClick(product._id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4">
                {product.images ? (
                  <img
                    src={`http://localhost:5050${product.images}`}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                    No Image
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {product.title}
                </div>
                <div className="text-sm text-gray-500 truncate max-w-xs">
                  {product.description}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {product.categoryId?.name || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                Rs. {product.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                Rs. {product.stock}
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <button
                  onClick={(e) => handleEdit(e, product._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, product._id)}
                  disabled={loading === product._id}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  {loading === product._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
