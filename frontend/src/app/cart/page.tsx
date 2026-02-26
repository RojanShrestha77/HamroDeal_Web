"use client";
import React from "react";
import {
  useCart,
  isProductPopulated,
  getProductId,
} from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  RotateCcw,
  Truck,
  ShieldCheck,
  Trash2,
} from "lucide-react";

const CartPage = () => {
  const { cart, loading, removeItem, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated && !loading) router.push("/login");
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
        <div className="text-center">
          <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Add some products to get started!
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateQuantity = async (
    productId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    if (confirm("Remove this item from cart?")) await removeItem(productId);
  };

  const handleClearCart = async () => {
    if (confirm("Clear entire cart?")) await clearCart();
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={handleClearCart}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="flex gap-5 items-start overflow-x-auto">
          {" "}
          {/* ── LEFT: Cart Items list ── */}
          <div
            className="flex flex-col gap-3"
            style={{ flex: 1, minWidth: 380 }}
          >
            {" "}
            {cart.items.map((item) => {
              const productId = getProductId(item.productId);
              const product = isProductPopulated(item.productId)
                ? item.productId
                : null;

              return (
                <div
                  key={productId}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "12px",
                    display: "flex",
                    gap: "12px",
                    background: "#fff",
                  }}
                >
                  {/* Small image ~100x100 */}
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      flexShrink: 0,
                      borderRadius: "10px",
                      overflow: "hidden",
                      background: "#f9fafb",
                      border: "1px solid #f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {product?.images ? (
                      <img
                        src={`http://localhost:5050${product.images}`}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "6px",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#d1d5db", fontSize: "10px" }}>
                        No Image
                      </span>
                    )}
                  </div>

                  {/* Content area — fills remaining width */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Top row: info + price */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      {/* Left info */}
                      <div>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            color: "#111827",
                            marginBottom: "3px",
                            lineHeight: 1.3,
                          }}
                          className="line-clamp-2"
                        >
                          {product?.title || item.title || "Product"}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginBottom: "6px",
                          }}
                        >
                          Rs.{Number(item.price).toLocaleString("en-IN")} each
                        </p>
                        <span
                          style={{
                            display: "inline-block",
                            background: "#f0fdf4",
                            color: "#16a34a",
                            fontSize: "10px",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            border: "1px solid #bbf7d0",
                          }}
                        >
                          In Stock
                        </span>
                      </div>

                      {/* Right price */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            color: "#111827",
                          }}
                        >
                          Rs.
                          {Number(item.price * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Bottom row: qty controls + remove */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "8px",
                      }}
                    >
                      {/* Qty */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() =>
                            handleUpdateQuantity(productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          style={{
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            border: "none",
                            borderRight: "1px solid #e5e7eb",
                            cursor:
                              item.quantity <= 1 ? "not-allowed" : "pointer",
                            opacity: item.quantity <= 1 ? 0.3 : 1,
                            color: "#374151",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            width: 32,
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#111827",
                            userSelect: "none",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(productId, item.quantity + 1)
                          }
                          style={{
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            border: "none",
                            borderLeft: "1px solid #e5e7eb",
                            cursor: "pointer",
                            color: "#374151",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemoveItem(productId)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          color: "#9ca3af",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#9ca3af")
                        }
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* ── RIGHT: Order Summary ── */}
          <div
            style={{ width: 260, flexShrink: 0, position: "sticky", top: 24 }}
          >
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "16px",
                background: "#fff",
              }}
            >
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                Order Summary
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>
                    Items ({cart.itemCount})
                  </span>
                  <span style={{ fontWeight: 500, color: "#111827" }}>
                    Rs.{Number(getCartTotal()).toLocaleString("en-IN")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Shipping</span>
                  <span style={{ fontWeight: 500, color: "#111827" }}>
                    Free
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#111827",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#111827",
                    }}
                  >
                    Rs.{Number(getCartTotal()).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                style={{
                  width: "100%",
                  height: 40,
                  background: "#000",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "13px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "6px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1f2937")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#000")
                }
              >
                Proceed to Checkout
              </button>

              <p
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Taxes calculated at checkout
              </p>

              <Link
                href="/"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "16px",
                  textDecoration: "none",
                }}
              >
                Continue Shopping
              </Link>

              <div
                style={{
                  borderTop: "1px solid #f3f4f6",
                  paddingTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  {
                    icon: <Truck size={12} />,
                    text: "Free shipping",
                  },
                  {
                    icon: <RotateCcw size={12} />,
                    text: "30-day returns",
                  },
                  { icon: <ShieldCheck size={12} />, text: "Secure checkout" },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {icon}
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
