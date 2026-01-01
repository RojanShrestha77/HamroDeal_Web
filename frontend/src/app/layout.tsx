import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or Poppins
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
