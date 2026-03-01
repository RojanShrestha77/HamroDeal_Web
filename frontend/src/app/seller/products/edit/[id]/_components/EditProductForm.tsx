"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProductData, ProductFormSchema } from "../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllCategories } from "@/lib/api/category";
import { toast } from "react-toastify";
import { handleUpdateProduct } from "@/lib/actions/seller/product.action";
import { Controller, useForm } from "react-hook-form";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  images?: string | string[];
  categoryId: string | { _id: string; name: string };
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Convert existing images to array
  const existingImages = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];
  
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    existingImages.map((img) => `http://localhost:5050${img}`)
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleImagesChange = (
    files: FileList | null,
    onChange: (files: File[]) => void,
    currentFiles: File[]
  ) => {
    if (files) {
      const newFiles = Array.from(files);
      const combinedFiles = [...currentFiles, ...newFiles].slice(0, 5);

      const newPreviews = combinedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      // Revoke old object URLs (only for newly created ones)
      if (imageChanged) {
        imagePreviews.forEach((preview) => {
          if (preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
          }
        });
      }

      setImagePreviews(newPreviews);
      setCurrentImageIndex(0);
      setImageChanged(true);
      onChange(combinedFiles);
    }
  };

  const handleRemoveImage = (
    index: number,
    onChange: (files: File[]) => void,
    currentFiles: File[]
  ) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke the removed preview if it's a blob URL
    if (imagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]);
    }

    setImagePreviews(newPreviews);

    if (currentImageIndex >= newPreviews.length && newPreviews.length > 0) {
      setCurrentImageIndex(newPreviews.length - 1);
    } else if (newPreviews.length === 0) {
      setCurrentImageIndex(0);
    }

    setImageChanged(true);
    onChange(newFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imagePreviews.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === imagePreviews.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    return () => {
      // Only revoke blob URLs, not server URLs
      imagePreviews.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreviews]);

  const onSubmit = async (data: ProductData) => {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title.trim());
        formData.append("description", data.description.trim());
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock));
        formData.append("categoryId", data.categoryId);

        // Only append images if they were changed
        if (imageChanged && data.images) {
          data.images.forEach((image) => {
            formData.append("images", image);
          });
        }

        const response = await handleUpdateProduct(product._id, formData);

        if (!response.success) {
          throw new Error(response.message || "Failed to update product");
        }

        toast.success("Product updated successfully");
        router.push("/seller/products");
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to update product");
        setError(error.message || "Failed to update product");
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Images */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-900">
            Product Images ({imagePreviews.length}/5){" "}
            <span className="text-red-500">*</span>
          </label>

          {/* Image Carousel */}
          {imagePreviews.length > 0 && (
            <div className="relative w-full mb-4">
              {/* Main Image Display */}
              <div className="relative w-full h-96 bg-neutral-100 rounded-lg overflow-hidden">
                <img
                  src={imagePreviews[currentImageIndex]}
                  alt={`Product preview ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Remove Current Image Button */}
                <Controller
                  name="images"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveImage(currentImageIndex, onChange, value)
                      }
                      className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                />

                {/* Navigation Arrows */}
                {imagePreviews.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {imagePreviews.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {imagePreviews.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {imagePreviews.map((preview, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                          : "border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      <img
                        src={preview}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* File Input */}
          <Controller
            name="images"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                {(value?.length || 0) < 5 && (
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={(e) => {
                        handleImagesChange(e.target.files, onChange, value || []);
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
                        {(value?.length || 0) === 0
                          ? "Click to upload images"
                          : `Add more images (${value?.length || 0}/5)`}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        PNG, JPG, WEBP up to 5MB each
                      </p>
                    </label>
                  </div>
                )}
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
