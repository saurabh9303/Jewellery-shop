import React from "react";

export const metadata = {
  title: "Terms of Service | Abhi Jewellers",
  description: "Read the terms and conditions for using Abhi Jewellers’ website and services.",
};

export default function TermsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">
        Terms of Service
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Welcome to Abhi Jewellers. By using our website and services, you agree to
          the following terms and conditions.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Use of Website</h2>
          <p className="text-gray-700 leading-relaxed">
            You may browse and purchase jewellery for personal use only. Any fraudulent
            activity or misuse of our website is strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Pricing & Payment</h2>
          <p className="text-gray-700 leading-relaxed">
            Prices are subject to change without notice. Payments must be completed
            through secure and approved payment gateways.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All images, designs, and content on this site are the property of Abhi
            Jewellers and cannot be reproduced without permission.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for delays or losses caused by courier services or
            events beyond our control.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          For questions, contact us at{" "}
          <a href="mailto:support@abhijewellers.com" className="text-amber-700 underline">
            support@abhijewellers.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
