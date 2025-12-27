import React from "react";

const dummyProducts = [
  { id: 1, name: "Product 1", price: "$25" },
  { id: 2, name: "Product 2", price: "$30" },
  { id: 3, name: "Product 3", price: "$45" },
  { id: 4, name: "Product 4", price: "$50" },
  { id: 5, name: "Product 5", price: "$35" },
  { id: 6, name: "Product 6", price: "$60" },
];

const Products = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Image placeholder */}
              <div className="h-40 w-full bg-gray-200 mb-4 flex items-center justify-center">
                <span className="text-gray-500">Image</span>
              </div>

              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.price}</p>

              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
