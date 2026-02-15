"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import {
  handleAddToCart,
  handleClearCart,
  handleGetCart,
  handleRemoveFromCart,
  handleUpdateCartItem,
} from "@/lib/actions/cart.action";
import { useRouter } from "next/navigation";
import {
  Cart,
  CartItem,
  getProductId,
  isProductPopulated,
  PopulatedProduct,
  ProductRef,
} from "@/app/cart/schema/cart.schema";

export type { Cart, CartItem, PopulatedProduct, ProductRef };
export { getProductId, isProductPopulated };

// Context props
interface CartContextProps {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<boolean>;
  updateQuantity: (productId: string, quantity: number) => Promise<boolean>;
  removeItem: (productId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  getItemCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await handleGetCart();

      if (result.success) {
        setCart(result.data);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch cart");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (
    productId: string,
    quantity: number,
  ): Promise<boolean> => {
    console.log("🛒 CartContext.addToCart called");
    console.log("Product ID:", productId);
    console.log("Quantity:", quantity);
    console.log("Is Authenticated:", isAuthenticated);

    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      console.log("🌐 Calling handleAddToCart API...");
      setLoading(true);
      setError(null);
      const result = await handleAddToCart(productId, quantity);
      console.log("📨 API Response:", result);

      if (result.success) {
        setCart(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to add to cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (
    productId: string,
    quantity: number,
  ): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await handleUpdateCartItem(productId, quantity);

      if (result.success) {
        setCart(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to update cart");
      console.error("Error updating cart:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (productId: string): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await handleRemoveFromCart(productId);

      if (result.success) {
        setCart(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to remove item");
      console.error("Error removing item:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async (): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await handleClearCart();

      if (result.success) {
        setCart(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to clear cart");
      console.error("Error clearing cart:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get total item count
  const getItemCount = (): number => {
    return cart?.itemCount || 0;
  };

  // Get cart total
  const getCartTotal = (): number => {
    return cart?.total || 0;
  };

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getItemCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
