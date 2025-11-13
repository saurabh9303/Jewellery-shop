import React from "react";

export const metadata = {
  title: "Shipping & Returns | Abhi Jewellers",
  description: "Learn about shipping and return policies at Abhi Jewellers.",
};

export default function ShippingReturnsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">
        Shipping & Returns
      </h1>

      <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Shipping Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We provide **free insured shipping** across India for all orders. Each
            order is packed securely to prevent damage and shipped through trusted
            logistic partners. Dispatch takes place within 3–5 business days, and
            delivery time depends on your location.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Tracking Orders</h2>
          <p className="text-gray-700 leading-relaxed">
            Once your order is shipped, a tracking ID and link will be shared with
            you via email or SMS, allowing you to monitor your shipment in real time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Return Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We accept returns within 7 days of delivery for unworn and undamaged
            jewellery, accompanied by the original invoice and packaging. Custom-made
            pieces are non-returnable. Refunds are processed within 7–10 business
            days after inspection.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Exchange Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            Customers can exchange jewellery for another piece of equal or higher
            value. Old gold jewellery can also be exchanged for new designs at
            prevailing rates.
          </p>
        </div>
      </div>
    </section>
  );
}
