import React from "react";

export const metadata = {
  title: "FAQs | Abhi Jewellers",
  description: "Frequently asked questions about Abhi Jewellers products and services.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What purity of gold do you offer?",
      a: "We offer gold in 18K, 22K, and 24K purity, each hallmarked for authenticity.",
    },
    {
      q: "Do you sell diamond jewellery?",
      a: "Yes, we provide certified diamond jewellery with IGI or SGL certification.",
    },
    {
      q: "Can I return or exchange jewellery?",
      a: "Yes, items can be exchanged within 7 days of purchase under our return policy.",
    },
    {
      q: "Do you offer custom jewellery designs?",
      a: "Absolutely! Share your design idea, and our expert craftsmen will bring it to life.",
    },
    {
      q: "How do I maintain my gold jewellery?",
      a: "Keep your jewellery in a soft pouch and clean it gently with a mild detergent solution.",
    },
    {
      q: "Do you provide home delivery?",
      a: "Yes, we offer safe and insured home delivery across India.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-amber-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-white"
          >
            <h3 className="text-lg font-semibold text-amber-800">{faq.q}</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
