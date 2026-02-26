"use client";
import { clearAuthCookies, getAuthToken, getUserData } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const checkAuth = async () => {
    try {
      console.log("🔐 AuthContext: Checking auth...");
      // Check if auth_token cookie exists on client side
      const hasCookie = document.cookie.split(';').some(cookie => 
        cookie.trim().startsWith('auth_token=')
      );
      
      console.log("🔐 AuthContext: Has cookie:", hasCookie);
      
      if (hasCookie) {
        const token = await getAuthToken();
        const userData = await getUserData();
        console.log("🔐 AuthContext: Token exists:", !!token, "User data:", userData);
        setUser(userData);
        setIsAuthenticated(!!token);
      } else {
        console.log("🔐 AuthContext: No auth cookie found");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error("🔐 AuthContext: Error checking auth:", err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      console.log("🔐 AuthContext: Setting loading to false");
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await clearAuthCookies();
      // Clear localStorage as well
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
