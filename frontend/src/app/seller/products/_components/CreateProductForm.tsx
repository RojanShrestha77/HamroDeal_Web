"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProductData, ProductFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllCategories } from "@/lib/api/category";
import { toast } from "react-toastify";
import { handleCreateProduct } from "@/lib/actions/seller/product.action";
import { Controller, useForm } from "react-hook-form";
import { X } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  description: string;
};

export default function ProductCreatePage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductData>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onSubmit", // Only validate on submit
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
    },
  });

  const watchedValues = watch();

  // fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error: any) {
        toast.error("Failed to load category");
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
      // Revoke previous preview URL if exists
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      console.log("📸 Image selected:", file.name, file.type, file.size);
      onChange(file);
    } else {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      onChange(undefined);
    }
  };

  const handleRemoveImage = (onChange: (file?: File) => void) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ✅ UPDATED: Match user form pattern exactly
  const onSubmit = async (data: ProductData) => {
    console.log("🚀 Form submitted with data:", data);
    console.log("🖼️ Image data:", data.images);
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("title", data.title.trim());
        formData.append("description", data.description.trim());
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock));
        formData.append("categoryId", data.categoryId);

        // ✅ Append single image
        if (data.images) {
          formData.append("images", data.images);
        }

        console.log("📤 Sending FormData:");
        for (let [key, value] of formData.entries()) {
          console.log(
            `  ${key}:`,
            value instanceof File ? `File: ${value.name}` : value,
          );
        }

        const response = await handleCreateProduct(formData);

        if (!response.success) {
          throw new Error(response.message || "Create product failed");
        }

        reset();
        handleRemoveImage(() => {});
        toast.success("Product created successfully");
        router.push("/seller/products");
      } catch (error: Error | any) {
        toast.error(error.message || "Create product failed");
        setError(error.message || "Create product failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Create New Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-900">
                Product Image <span className="text-red-500">*</span>
              </label>

              {/* Image Preview */}
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

              {/* File Input */}
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
                        console.log("🔍 File selected:", file);
                        handleImageChange(file, onChange);
                      }}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer block"
                    >
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
                        Click to upload image
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                      {value && (
                        <p className="mt-2 text-xs text-green-600">
                          ✓ File selected: {value.name}
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
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                {...register("title")}
                placeholder="e.g., Apple iPhone 16 Pro Max"
              />
              {errors.title?.message && (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40 resize-none min-h-[120px]"
                {...register("description")}
                placeholder="Describe your product in detail..."
              />
              {errors.description?.message && (
                <p className="text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Price (Rs.) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {errors.price?.message && (
                  <p className="text-xs text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                  {...register("stock", { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.stock?.message && (
                  <p className="text-xs text-red-600">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
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
                <p className="text-xs text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || pending}
              className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting || pending
                ? "Creating product..."
                : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
