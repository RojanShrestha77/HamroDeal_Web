import React from "react";
import Image from "next/image";

const dummyProducts = [
  { id: 1, name: "Product 1", price: "$25", image: "/imagedemo.png" },
  { id: 2, name: "Product 2", price: "$30", image: "/imagedemo.png" },
  { id: 3, name: "Product 3", price: "$45", image: "/imagedemo.png" },
  { id: 4, name: "Product 4", price: "$50", image: "/imagedemo.png" },
  { id: 5, name: "Product 5", price: "$35", image: "/imagedemo.png" },
  { id: 6, name: "Product 6", price: "$60", image: "/imagedemo.png" },
  { id: 7, name: "Product 7", price: "$60", image: "/imagedemo.png" },
  { id: 8, name: "Product 8", price: "$60", image: "/imagedemo.png" },
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
              {/* Product Image */}
              <div className="w-full mb-4 rounded overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400} // natural width of image
                  height={300} // natural height of image
                  className="object-contain w-full h-auto" // object-contain keeps full image visible
                />
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
