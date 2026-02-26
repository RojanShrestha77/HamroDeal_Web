"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { use, useEffect, useState } from "react";
import ProductReviews from "@/app/review/_component/ProductReview";
import { createOrGetConversationAction } from "@/lib/actions/conversation.action";
import {
  ChevronRight,
  MessageCircle,
  Share2,
  Truck,
  RotateCcw,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { AddToCartButton } from "./_components/AddToCartButton";
import { getProductReviewsAction } from "@/lib/actions/review.action";

async function getProduct(id: string) {
  try {
    const response = await fetch(`http://localhost:5050/api/products/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messagingLoading, setMessagingLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("reviews");
  const [reviewData, setReviewData] = useState<{
    avgRating: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProduct(id);
      if (!result?.success || !result.data) notFound();
      setProduct(result.data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchReviewData = async () => {
      const result = await getProductReviewsAction(id, 1, 1); // Just fetch 1 review to get stats
      if (result.success) {
        setReviewData({
          avgRating: result.avgRating || 0,
          total: result.pagination?.total || 0,
        });
      }
    };

    if (id) {
      fetchReviewData();
    }
  }, [id]);

  const handleMessageSeller = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const sellerId = product.sellerId?._id || product.sellerId;
    if (!sellerId || sellerId === user._id) return;
    setMessagingLoading(true);
    try {
      const result = await createOrGetConversationAction(sellerId);
      if (result.success && result.data)
        router.push(`/messages/${result.data._id}`);
    } finally {
      setMessagingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-7 h-7 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!product) notFound();

  const images: string[] = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];
  const activeImage = images[selectedImage];
  const maxQty = product.stock || 1;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-5 pb-2">
        <nav className="flex items-center gap-1 text-[0.72rem] text-gray-400">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={11} />
          <span>{product.categoryId?.name || "Products"}</span>
          <ChevronRight size={11} />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row gap-10">
          {/* ── LEFT: Image + thumbnails ── */}
          <div className="md:w-[48%] flex gap-3">
            {/* Main image — fixed height container with object-contain */}
            <div
              className="flex-1 rounded-2xl overflow-hidden bg-[#f5f5f3]"
              style={{ height: 480 }}
            >
              {activeImage ? (
                <img
                  src={`http://localhost:5050${activeImage}`}
                  alt={product.title}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-300 text-sm">No Image</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-col gap-2 w-[64px] shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all bg-[#f5f5f3] ${
                      selectedImage === i
                        ? "border-black"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <img
                      src={`http://localhost:5050${img}`}
                      alt=""
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product info ── */}
          <div className="md:w-[52%] flex flex-col">
            {/* Category tag */}
            <span className="inline-block self-start bg-gray-100 text-gray-500 text-[0.62rem] font-bold px-2.5 py-0.5 rounded-md tracking-widest uppercase mb-3">
              {product.categoryId?.name || "Product"}
            </span>

            {/* Title */}
            <h1
              style={{ fontSize: "1.65rem" }}
              className=" font-bold text-gray-900 leading-snug mb-2"
            >
              {product.title}
            </h1>

            {/* Stars */}
            {reviewData && reviewData.total > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(reviewData.avgRating)
                          ? "fill-amber-400"
                          : "fill-gray-200"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[0.72rem] text-gray-400">
                  ({reviewData.avgRating.toFixed(1)} from {reviewData.total}{" "}
                  {reviewData.total === 1 ? "Review" : "Reviews"})
                </span>
              </div>
            )}

            {/* Price + stock */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[1.8rem] font-bold text-gray-900">
                Rs.{Number(product.price).toLocaleString("en-IN")}
              </span>
              <span
                className={`text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-[0.83rem] text-gray-500 leading-relaxed mb-5 pb-5 border-b border-gray-100">
              {product.description}
            </p>

            {/* Seller */}
            {product.sellerId && (
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs uppercase shrink-0">
                  {
                    (product.sellerId.username ||
                      product.sellerId.email ||
                      "S")[0]
                  }
                </div>
                <div>
                  <span className="text-[0.6rem] text-gray-400 uppercase tracking-widest block font-semibold">
                    Sold by
                  </span>
                  <span className="font-semibold text-gray-800 text-[0.8rem]">
                    {product.sellerId.username || product.sellerId.email}
                  </span>
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart row */}
            <div className="flex items-stretch gap-3 mb-3">
              <div className="flex flex-col gap-2 flex-1">
                {/* Quantity row */}
                <div className="flex items-center gap-3">
                  <span className="text-[0.78rem] font-medium text-gray-600 whitespace-nowrap">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-10 text-center text-[0.85rem] font-semibold text-gray-900 select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(maxQty, q + 1))
                      }
                      className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="[&>button]:!bg-black [&>button]:!text-white [&>button]:!border-black [&>button]:!rounded-xl [&>button]:w-full [&>button]:h-11 [&>button]:text-[0.82rem] [&>button]:font-bold">
                  {/* Add to Cart */}
                  <AddToCartButton
                    productId={product._id}
                    productName={product.title}
                    productPrice={product.price}
                    productImage={product.images}
                    sellerId={product.sellerId?._id || product.sellerId}
                    stock={product.stock}
                    quantity={quantity}
                    hideQuantity={true}
                    className="w-full h-12 bg-black text-white text-[0.82rem] font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  />
                </div>
              </div>
            </div>

            {/* Message Seller */}
            <button
              onClick={handleMessageSeller}
              disabled={messagingLoading}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 text-gray-500 text-[0.8rem] font-medium hover:border-black hover:text-black transition-all mb-5"
            >
              <MessageCircle size={14} />
              {messagingLoading ? "Opening chat..." : "Message Seller"}
            </button>

            {/* SKU / category / share */}
            <div className="text-[0.73rem] text-gray-400 space-y-1.5 mb-5 pb-5 border-b border-gray-100">
              <div>
                <span className="text-gray-600 font-semibold">Category: </span>
                {product.categoryId?.name || "N/A"}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-600 font-semibold">Share: </span>
                <Share2
                  size={11}
                  className="cursor-pointer hover:text-black transition-colors"
                />
              </div>
            </div>

            {/* Delivery cards */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 bg-gray-50">
              <div className="flex items-start gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Truck size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-bold text-gray-900">
                    Free Delivery
                  </p>
                  <p className="text-[0.72rem] text-gray-400 mt-0.5">
                    Enter your address for free Delivery Availability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <RotateCcw size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-bold text-gray-900">
                    Return Delivery
                  </p>
                  <p className="text-[0.72rem] text-gray-400 mt-0.5">
                    Free 30 Days Delivery Returns.{" "}
                    <Link
                      href="/returns-policy"
                      className="text-black font-medium cursor-pointer hover:underline"
                    >
                      Details
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-12 border-b border-gray-200">
          <div className="flex">
            {(["details", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-[0.82rem] font-semibold capitalize border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 pb-16">
          {activeTab === "details" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Product ID", value: product._id },
                { label: "Category", value: product.categoryId?.name || "N/A" },
                {
                  label: "Listed on",
                  value: new Date(product.createdAt).toLocaleDateString(),
                },
                {
                  label: "Last updated",
                  value: new Date(product.updatedAt).toLocaleDateString(),
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[0.62rem] text-gray-400 tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-[0.82rem] font-semibold text-gray-800 break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <ProductReviews productId={product._id} currentUserId={user?._id} />
          )}
        </div>
      </div>
    </div>
  );
}
