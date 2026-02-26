import React from "react";
import Container from "../components/common/Container";
import { SubTitle } from "../components/ui/text";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function ContactPage() {
  return (
    <Container className="py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        
        <p className="text-gray-700 mb-12">
          Have a question or need assistance? We'd love to hear from you. Fill out the form below 
          or reach out to us directly.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <SubTitle>Send us a Message</SubTitle>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input id="name" type="text" placeholder="Your name" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="+977 98XXXXXXXX" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input id="subject" type="text" placeholder="How can we help?" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shop_light_green"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <SubTitle>Get in Touch</SubTitle>
            
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-shop_light_green/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-shop_light_green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600 mt-1">
                    Thamel, Kathmandu<br />
                    Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-shop_light_green/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-shop_light_green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 mt-1">+977 9808990012</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-shop_light_green/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-shop_light_green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 mt-1">hamrodeal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-shop_light_green/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-shop_light_green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Working Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Sunday - Friday<br />
                    10:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Map Location</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
