import Link from "next/link";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Truck,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 pt-6 pb-2">
        <nav className="flex items-center gap-1 text-[0.72rem] text-gray-400">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={11} />
          <span className="text-gray-700 font-medium">Return Policy</span>
        </nav>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center">
              <RotateCcw size={18} className="text-white" />
            </div>
            <span className="text-[0.65rem] font-bold text-gray-400 tracking-widest uppercase">
              Customer Care
            </span>
          </div>
          <h1 className="text-[2rem] font-bold text-gray-900 leading-tight mb-3">
            30-Day Return Policy
          </h1>
          <p className="text-[0.9rem] text-gray-500 leading-relaxed max-w-xl">
            We want you to be completely happy with your purchase. If something
            isn't right, we make it easy to return within 30 days — no fuss.
          </p>
        </div>

        {/* Big highlight card */}
        <div className="bg-black rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={18} className="text-gray-300" />
            <span className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-400">
              Return Window
            </span>
          </div>
          <p className="text-[2rem] font-bold leading-none mb-1">30 Days</p>
          <p className="text-[0.82rem] text-gray-400">
            from the date of delivery to initiate a return
          </p>
        </div>

        {/* Eligible / Not Eligible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={16} className="text-emerald-500" />
              <span className="text-[0.75rem] font-bold text-gray-700 tracking-wide uppercase">
                Eligible for Return
              </span>
            </div>
            <ul className="space-y-2.5">
              {[
                "Item in original, unused condition",
                "Original packaging intact",
                "Tags and labels still attached",
                "Defective or damaged items",
                "Wrong item received",
                "Item significantly different from description",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[0.8rem] text-gray-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={16} className="text-red-400" />
              <span className="text-[0.75rem] font-bold text-gray-700 tracking-wide uppercase">
                Not Eligible
              </span>
            </div>
            <ul className="space-y-2.5">
              {[
                "Used or worn items",
                "Items without original packaging",
                "Perishable goods",
                "Digital products or downloads",
                "Items marked as final sale",
                "Returns after 30 days of delivery",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[0.8rem] text-gray-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How it works — steps */}
        <div className="mb-8">
          <h2 className="text-[1rem] font-bold text-gray-900 mb-4">
            How to Return
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: <MessageCircle size={16} />,
                step: "01",
                title: "Contact the Seller",
                desc: "Message the seller directly through the product page within 30 days of receiving your order.",
              },
              {
                icon: <Package size={16} />,
                step: "02",
                title: "Pack the Item",
                desc: "Repack the item securely in its original packaging with all accessories and tags included.",
              },
              {
                icon: <Truck size={16} />,
                step: "03",
                title: "Ship It Back",
                desc: "Send the item to the seller. Keep your tracking number as proof of return shipment.",
              },
              {
                icon: <RotateCcw size={16} />,
                step: "04",
                title: "Refund Processed",
                desc: "Once the seller receives and inspects the item, your refund will be processed within 5–7 business days.",
              },
            ].map(({ icon, step, title, desc }) => (
              <div
                key={step}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                    {icon}
                  </div>
                  <span className="text-[0.6rem] font-bold text-gray-300">
                    {step}
                  </span>
                </div>
                <div>
                  <p className="text-[0.85rem] font-bold text-gray-900 mb-0.5">
                    {title}
                  </p>
                  <p className="text-[0.78rem] text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund info */}
        <div className="rounded-2xl border border-gray-100 p-6 mb-8 bg-gray-50">
          <h2 className="text-[1rem] font-bold text-gray-900 mb-3">
            Refund Information
          </h2>
          <div className="space-y-2 text-[0.82rem] text-gray-500 leading-relaxed">
            <p>
              Refunds are issued to the{" "}
              <span className="font-semibold text-gray-800">
                original payment method
              </span>{" "}
              used at checkout.
            </p>
            <p>
              Processing time is{" "}
              <span className="font-semibold text-gray-800">
                5–7 business days
              </span>{" "}
              after the seller confirms receipt.
            </p>
            <p>
              Shipping costs are{" "}
              <span className="font-semibold text-gray-800">
                non-refundable
              </span>{" "}
              unless the return is due to a seller error or defective item.
            </p>
            <p>
              For defective or incorrect items, return shipping will be{" "}
              <span className="font-semibold text-gray-800">
                covered by the seller
              </span>
              .
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-black text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[0.9rem] font-bold mb-0.5">
              Need help with a return?
            </p>
            <p className="text-[0.78rem] text-gray-400">
              Message the seller directly from your order page.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 bg-white text-black text-[0.78rem] font-bold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Browse Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
