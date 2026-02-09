import React from "react";
import Products from "@/app/products/Products"; // import your existing Products component

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8">Dashboard</h1>
      {/* Show products here */}
      <Products /> {/* reuses the same component */}
    </div>
  );
};

export default DashboardPage;
