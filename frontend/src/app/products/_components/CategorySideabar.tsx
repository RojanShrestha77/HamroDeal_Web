"use client";

interface Category {
  _id: string;
  name: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div>
      <h2>
        <ul>
          <li>
            <button
              onClick={() => onSelectCategory("")}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === ""
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All Products
            </button>
          </li>

          {/* category */}
          {categories.map((category) => (
            <li key={category._id}>
              <button
                onClick={() => onSelectCategory(category._id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedCategory === category._id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
}
