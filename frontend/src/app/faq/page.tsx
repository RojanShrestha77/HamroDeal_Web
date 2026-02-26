"use client";

import React from "react";
import Container from "../components/common/Container";
import { SubTitle } from "../components/ui/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, mobile banking, and cash on delivery for eligible orders."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically takes 2-5 business days within Kathmandu Valley and 5-10 business days for other areas of Nepal."
    },
    {
      question: "Can I return or exchange products?",
      answer: "Yes, we offer returns and exchanges within 7 days of delivery for most products. Items must be unused and in original packaging."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order from your account dashboard."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your personal and payment information."
    },
    {
      question: "Do you offer warranties on products?",
      answer: "Many products come with manufacturer warranties. Warranty details are specified on individual product pages."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via email at hamrodeal@gmail.com, call us at +977 9808990012, or visit our Contact Us page."
    }
  ];

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <SubTitle>Still have questions?</SubTitle>
          <p className="mt-3 text-gray-700">
            If you couldn't find the answer you're looking for, please don't hesitate to contact our 
            customer support team. We're here to help!
          </p>
        </div>
      </div>
    </Container>
  );
}
