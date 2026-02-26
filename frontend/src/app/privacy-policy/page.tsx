import React from "react";
import Container from "../components/common/Container";
import { SubTitle } from "../components/ui/text";

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <SubTitle>Introduction</SubTitle>
            <p className="mt-3">
              At HamroDeal, we are committed to protecting your privacy and ensuring the security of your 
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our platform.
            </p>
          </section>

          <section>
            <SubTitle>Information We Collect</SubTitle>
            <p className="mt-3">We collect information that you provide directly to us, including:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Name, email address, and contact information</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communications with customer support</li>
            </ul>
          </section>

          <section>
            <SubTitle>How We Use Your Information</SubTitle>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Provide customer support</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our services and user experience</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </section>

          <section>
            <SubTitle>Information Sharing</SubTitle>
            <p className="mt-3">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Service providers who assist in operating our platform</li>
              <li>Payment processors for transaction processing</li>
              <li>Delivery partners for order fulfillment</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <SubTitle>Data Security</SubTitle>
            <p className="mt-3">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <SubTitle>Your Rights</SubTitle>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Access and update your personal information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <SubTitle>Cookies</SubTitle>
            <p className="mt-3">
              We use cookies and similar technologies to enhance your browsing experience, analyze site 
              traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <SubTitle>Contact Us</SubTitle>
            <p className="mt-3">
              If you have questions about this Privacy Policy or our data practices, please contact us at 
              hamrodeal@gmail.com or call +977 9808990012.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
