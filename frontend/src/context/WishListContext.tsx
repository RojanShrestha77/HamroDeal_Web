"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import {
  addToWishlistAction,
  clearWishlistAction,
  getWishlistAction,
  removeFromWishlistAction,
} from "@/lib/actions/wishlist.action";

interface WishlistItem {
  productId: any;
  addedAt: Date;
}

// wishlist interface
interface Wishlist {
  _id: string;
  userId: string;
  items: WishlistItem[];
  itemCount: number;
  createdAt: string;
  updateAt: string;
}

interface WishlistContextProps {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<boolean>;
  removeItem: (productId: string) => Promise<boolean>;
  clearWishlist: () => Promise<boolean>;
  getItemCount: () => number;
  isInWishlist: (porductId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // fetching the wishlist fromteh backend
  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await getWishlistAction();

      if (result.success) {
        setWishlist(result.data);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch wishlist");
      console.error("Error fetching wishlist: ", err);
    } finally {
      setLoading(false);
    }
  };

  // add prdouct ot the wisahlist
  const addToWishlist = async (productId: string): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await addToWishlistAction(productId);

      if (result.success) {
        setWishlist(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to add to wishlist");
      console.error("Error adding to wishlist:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  //   remove product from the wishlist
  const removeItem = async (productId: string): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await removeFromWishlistAction(productId);

      if (result.success) {
        setWishlist(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to remove from wishlist");
      console.error("Error removing from wishlist:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  //   clear entire wishlist
  const clearWishlist = async (): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await clearWishlistAction();
      if (result.success) {
        setWishlist(result.data);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to clear wishlist");
      console.error("Error clearing wishlist:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // get total item count
  const getItemCount = (): number => {
    return wishlist?.itemCount || 0;
  };

  // check if the product is in the wishlist
  const isInWishlist = (productId: string): boolean => {
    if (!wishlist) return false;
    return wishlist.items.some((item: any) => {
      const itemProductId =
        typeof item.productId === "string"
          ? item.productId
          : item.productId._id;
      return itemProductId === productId;
    });
  };

  // fetch wishlist when the user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlist(null);
    }
  }, [isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        fetchWishlist,
        addToWishlist,
        removeItem,
        clearWishlist,
        getItemCount,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context == undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
