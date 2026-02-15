"use client";

import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[50vh] lg:h-[50vh]">
      {/* Background Image */}
      <Image
        src="/imag1.png"
        alt="Home Banner"
        fill
        className="object-cover object-center"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 lg:px-32 text-white">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4">
          Discover Amazing Products
        </h1>
        <p className="text-sm md:text-lg lg:text-xl mb-6 max-w-lg">
          Find the best deals on top-quality products. Upgrade your lifestyle
          today!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-semibold">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
