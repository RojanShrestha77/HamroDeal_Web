import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or Poppins
import "./globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishListContext";

const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" }); // Replace with Poppins if imported

export const metadata: Metadata = {
  title: "HamroDealWeb - E-Commerce",
  description: "Your final semester project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        <div className="flex flex-col min-h-screen">
          <main>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main>{children}</main>
                    <Footer />
                  </div>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
