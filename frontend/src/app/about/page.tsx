import React from "react";
import Container from "../components/common/Container";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Verified Sellers" },
  { value: "50K+", label: "Products Listed" },
  { value: "77", label: "Districts Delivered" },
];

const whyUs = [
  {
    icon: "🛍️",
    title: "Wide Selection",
    description:
      "Thousands of products across electronics, fashion, home, and more — all in one place.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description:
      "Competitive pricing with regular deals and discounts you won't find elsewhere.",
  },
  {
    icon: "🚚",
    title: "Nationwide Delivery",
    description: "Fast and reliable delivery to all 77 districts across Nepal.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description:
      "Multiple payment options with bank-level encryption protecting every transaction.",
  },
  {
    icon: "🤝",
    title: "Verified Sellers",
    description:
      "Every seller is vetted and monitored to ensure authentic products and honest service.",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    description:
      "Hassle-free returns and refunds within 7 days — no questions asked.",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "We operate with full honesty — clear pricing, honest seller ratings, and no hidden fees.",
    color: "bg-blue-50 text-[#0071E3]",
  },
  {
    title: "Quality",
    description:
      "Every product on our platform is carefully vetted. We work closely with sellers to maintain high standards.",
    color: "bg-gray-50 text-gray-700",
  },
  {
    title: "Community",
    description:
      "We support local Nepali sellers and businesses, helping them reach customers across the country.",
    color: "bg-blue-50 text-[#0071E3]",
  },
  {
    title: "Accessibility",
    description:
      "Shopping should be easy and affordable for everyone — from Kathmandu to the most remote districts.",
    color: "bg-gray-50 text-gray-700",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#F5F5F7] border-b border-gray-100">
        <Container className="py-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-white border border-gray-200 px-4 py-1.5 text-xl font-semibold uppercase tracking-widest text-[#0071E3] shadow-sm">
              About Us
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Nepal's Trusted
              <span className="text-[#0071E3]"> Online Marketplace</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-gray-500 max-w-2xl mx-auto">
              HamroDeal connects buyers and sellers across Nepal — making
              quality products accessible, affordable, and delivered right to
              your door. From electronics to fashion, we have it all.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-[#F5F5F7] px-4 py-6 text-center shadow-sm"
              >
                <span className="text-3xl font-bold tracking-tight text-[#0071E3]">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">
                Our Mission
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#1D1D1F]">
                Making online shopping accessible for every Nepali
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                We started HamroDeal with one goal — to build a marketplace that
                truly serves Nepal. Not just Kathmandu, but every corner of the
                country. We connect buyers with quality products at fair prices
                while empowering local and national sellers to grow their
                businesses online.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                We believe shopping should be simple, safe, and satisfying — and
                we work every day to make that a reality for our customers.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-[#F5F5F7] p-10">
              <div className="text-center space-y-2">
                <div className="text-5xl">🇳🇵</div>
                <p className="text-sm font-semibold text-[#1D1D1F]">
                  Proudly Nepali
                </p>
                <p className="text-xs text-gray-400">
                  Built for Nepal, by Nepal
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">
                Why HamroDeal
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#1D1D1F]">
                Everything you need, nothing you don't
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-[#0071E3]/20 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5F5F7] text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">
                Our Values
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#1D1D1F]">
                What we stand for
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-gray-100 bg-[#F5F5F7] p-6 shadow-sm"
                >
                  <p className="text-sm font-bold text-[#1D1D1F]">{v.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#0071E3] px-8 py-12 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white">
              Ready to start shopping?
            </h2>
            <p className="mt-3 text-sm text-blue-100 max-w-md mx-auto">
              Join thousands of happy customers across Nepal who trust HamroDeal
              for their everyday needs.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="/products"
                className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-[#0071E3] transition-colors hover:bg-blue-50"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
