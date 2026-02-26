import React from "react";
import Container from "../components/common/Container";
import { SubTitle } from "../components/ui/text";

export default function TermsConditionsPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <SubTitle>Agreement to Terms</SubTitle>
            <p className="mt-3">
              By accessing and using HamroDeal, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <SubTitle>User Accounts</SubTitle>
            <p className="mt-3">
              To make purchases on HamroDeal, you must create an account. You are responsible for:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and current information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <SubTitle>Product Information</SubTitle>
            <p className="mt-3">
              We strive to provide accurate product descriptions, images, and pricing. However, we do not 
              warrant that product descriptions or other content is accurate, complete, or error-free. 
              We reserve the right to correct errors and update information at any time.
            </p>
          </section>

          <section>
            <SubTitle>Orders and Payments</SubTitle>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>All orders are subject to acceptance and availability</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be received before order processing</li>
              <li>You agree to provide valid payment information</li>
            </ul>
          </section>

          <section>
            <SubTitle>Shipping and Delivery</SubTitle>
            <p className="mt-3">
              Delivery times are estimates and not guaranteed. We are not liable for delays caused by 
              circumstances beyond our control. Risk of loss passes to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <SubTitle>Returns and Refunds</SubTitle>
            <p className="mt-3">
              Our return policy allows returns within 7 days of delivery for eligible products. Items must 
              be unused, in original packaging, and accompanied by proof of purchase. Refunds will be 
              processed within 7-14 business days after receiving the returned item.
            </p>
          </section>

          <section>
            <SubTitle>Prohibited Activities</SubTitle>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Use the platform for any illegal purpose</li>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful code or malware</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Engage in fraudulent activities</li>
            </ul>
          </section>

          <section>
            <SubTitle>Intellectual Property</SubTitle>
            <p className="mt-3">
              All content on HamroDeal, including text, graphics, logos, and images, is the property of 
              HamroDeal or its content suppliers and is protected by intellectual property laws.
            </p>
          </section>

          <section>
            <SubTitle>Limitation of Liability</SubTitle>
            <p className="mt-3">
              HamroDeal shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from your use of the platform or products purchased through it.
            </p>
          </section>

          <section>
            <SubTitle>Governing Law</SubTitle>
            <p className="mt-3">
              These Terms and Conditions are governed by the laws of Nepal. Any disputes shall be subject 
              to the exclusive jurisdiction of the courts of Nepal.
            </p>
          </section>

          <section>
            <SubTitle>Changes to Terms</SubTitle>
            <p className="mt-3">
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting. Your continued use of the platform constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <SubTitle>Contact Information</SubTitle>
            <p className="mt-3">
              For questions about these Terms and Conditions, please contact us at hamrodeal@gmail.com 
              or call +977 9808990012.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
