import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCartButton } from "./_components/AddToCartButton";

async function getProduct(id: string) {
  try {
    const response = await fetch(`http://localhost:5050/api/products/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProduct(id);

  if (!result?.success || !result.data) {
    notFound();
  }

  const product = result.data;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            {product.images ? (
              <img
                src={`http://localhost:5050${product.images}`}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xl">
                  No Image Available
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {product.categoryId?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₨ {product.price}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-gray-600">Availability: </span>
                <span
                  className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {product.sellerId && (
                <div className="mb-4">
                  <span className="text-gray-600">Sold by: </span>
                  <span className="font-medium text-gray-900">
                    {product.sellerId.username || product.sellerId.email}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <AddToCartButton 
                productId={product._id}
                productName={product.title}
                productPrice={product.price}
                productImage={product.images}
                sellerId={product.sellerId?._id || product.sellerId}
                stock={product.stock}
              />

              <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        </div>

        {/* Additional Product Info */}
        <div className="border-t p-8">
          <h2 className="text-2xl font-bold mb-4">Product Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Product ID:</span>
              <p className="font-medium">{product._id}</p>
            </div>
            <div>
              <span className="text-gray-600">Category:</span>
              <p className="font-medium">{product.categoryId?.name || "N/A"}</p>
            </div>
            <div>
              <span className="text-gray-600">Listed on:</span>
              <p className="font-medium">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Last updated:</span>
              <p className="font-medium">
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
