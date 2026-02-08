"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProductData, ProductFormSchema } from "../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllCategories } from "@/lib/api/category";
import { toast } from "react-toastify";
import { handleUpdateProduct } from "@/lib/actions/seller/product.action";
import { Controller, useForm } from "react-hook-form";
import { X } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  description: string;
};

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images?: string;
  categoryId: string | { _id: string; name: string };
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.images ? `http://localhost:5050${product.images}` : null,
  );
  const [imageChanged, setImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryId =
    typeof product.categoryId === "string"
      ? product.categoryId
      : product.categoryId._id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductData>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: categoryId,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error: any) {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (
    file: File | null,
    onChange: (file?: File) => void,
  ) => {
    if (file) {
      if (imagePreview && imageChanged) {
        URL.revokeObjectURL(imagePreview);
      }
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setImageChanged(true);
      onChange(file);
    } else {
      if (imagePreview && imageChanged) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      onChange(undefined);
    }
  };

  const handleRemoveImage = (onChange: (file?: File) => void) => {
    if (imagePreview && imageChanged) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageChanged(true);
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imageChanged) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, imageChanged]);

  const onSubmit = async (data: ProductData) => {
    alert("Form submitted!"); // ← Add this first line
    console.log("==================");
    console.log("TEST LOG - CAN YOU SEE THIS?");
    console.log("Data:", data);
    console.log("==================");

    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title.trim());
        formData.append("description", data.description.trim());
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock));
        formData.append("categoryId", data.categoryId);

        // Only append image if it was changed
        if (imageChanged && data.images) {
          formData.append("images", data.images);
        }
        console.log("🟡 ABOUT TO CALL handleUpdateProduct"); // ← Add this

        const response = await handleUpdateProduct(product._id, formData);

        console.log("Product ID:", product._id); // ← Add this
        if (!response.success) {
          throw new Error(response.message || "Failed to update product");
        }
        console.log("🟡 RESPONSE FROM handleUpdateProduct:", response); // ← Add this

        toast.success("Product updated successfully");
        router.push("/seller/products");
      } catch (error: Error | any) {
        console.error("🔴 ERROR in onSubmit:", error); // ← Add this

        toast.error(error.message || "Failed to update product");
        setError(error.message || "Failed to update product");
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-900">
            Product Image
          </label>

          {imagePreview && (
            <div className="relative w-full max-w-sm mb-4">
              <img
                src={imagePreview}
                alt="Product preview"
                className="w-full h-48 object-cover rounded-lg border border-neutral-200"
              />
              <Controller
                name="images"
                control={control}
                render={({ field: { onChange } }) => (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(onChange)}
                    className="absolute -top-2 -right-2 bg-neutral-900 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              />
            </div>
          )}

          <Controller
            name="images"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleImageChange(file, onChange);
                  }}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-3 text-sm font-medium text-neutral-900">
                    Click to change image
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                  {value && (
                    <p className="mt-2 text-xs text-green-600">
                      ✓ New file selected: {value.name}
                    </p>
                  )}
                </label>
              </div>
            )}
          />
          {errors.images && (
            <p className="text-sm text-red-600 mt-1">
              {String(errors.images.message)}
            </p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-900">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            {...register("title")}
            placeholder="e.g., Apple iPhone 16 Pro Max"
          />
          {errors.title?.message && (
            <p className="text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-900">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none min-h-[120px]"
            {...register("description")}
            placeholder="Describe your product in detail..."
          />
          {errors.description?.message && (
            <p className="text-xs text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-900">
              Price (Rs.) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                ₨
              </span>
              <input
                type="number"
                step="0.01"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                {...register("price", {
                  valueAsNumber: true,
                })}
                placeholder="0.00"
              />
            </div>
            {errors.price?.message && (
              <p className="text-xs text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-900">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              {...register("stock", {
                valueAsNumber: true,
              })}
              placeholder="0"
            />
            {errors.stock?.message && (
              <p className="text-xs text-red-600">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-900">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            {...register("categoryId")}
            disabled={loadingCategories}
          >
            <option value="">
              {loadingCategories
                ? "Loading categories..."
                : "Select a category"}
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId?.message && (
            <p className="text-xs text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || pending}
            className="px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting || pending ? "Updating product..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
