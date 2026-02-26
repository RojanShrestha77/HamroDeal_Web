import React from "react";
import Container from "../components/common/Container";
import { SubTitle } from "../components/ui/text";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function HelpPage() {
  const helpTopics = [
    {
      title: "Getting Started",
      items: [
        "How to create an account",
        "Browsing and searching products",
        "Adding items to cart",
        "Completing your first order"
      ]
    },
    {
      title: "Orders & Payments",
      items: [
        "Payment methods",
        "Order confirmation",
        "Tracking your order",
        "Modifying or canceling orders"
      ]
    },
    {
      title: "Shipping & Delivery",
      items: [
        "Delivery areas and times",
        "Shipping costs",
        "Delivery issues",
        "Missing or damaged items"
      ]
    },
    {
      title: "Returns & Refunds",
      items: [
        "Return policy",
        "How to initiate a return",
        "Refund processing time",
        "Exchange options"
      ]
    }
  ];

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        
        <div className="mb-12">
          <p className="text-gray-700 mb-6">
            Welcome to the HamroDeal Help Center. Find answers to common questions or contact our 
            support team for assistance.
          </p>
        </div>

        {/* Help Topics */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {helpTopics.map((topic, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <SubTitle>{topic.title}</SubTitle>
              <ul className="mt-4 space-y-2">
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 hover:text-shop_light_green cursor-pointer">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <SubTitle>Quick Links</SubTitle>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <Link href="/faq" className="text-shop_light_green hover:underline">
              → Frequently Asked Questions
            </Link>
            <Link href="/privacy-policy" className="text-shop_light_green hover:underline">
              → Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-shop_light_green hover:underline">
              → Terms & Conditions
            </Link>
            <Link href="/about" className="text-shop_light_green hover:underline">
              → About Us
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="border-t border-gray-200 pt-8">
          <SubTitle>Contact Support</SubTitle>
          <p className="mt-3 text-gray-700 mb-6">
            Can't find what you're looking for? Our customer support team is here to help.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-shop_light_green mt-1" />
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-600">hamrodeal@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-shop_light_green mt-1" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-600">+977 9808990012</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-shop_light_green mt-1" />
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-gray-600">Thamel, Kathmandu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-shop_light_green mt-1" />
              <div>
                <p className="font-semibold">Working Hours</p>
                <p className="text-gray-600">Sun-Fri: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
