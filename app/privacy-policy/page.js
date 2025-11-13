import React from "react";

export const metadata = {
  title: "Privacy Policy | Abhi Jewellers",
  description: "Our privacy policy explaining how we protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">
        Privacy Policy
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Abhi Jewellers values your privacy. This policy outlines how we collect,
          use, and protect your personal information while providing you our services.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Data Collection</h2>
          <p className="text-gray-700 leading-relaxed">
            We collect personal details like your name, contact number, address, and
            payment information only to process your orders efficiently and securely.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Data Protection</h2>
          <p className="text-gray-700 leading-relaxed">
            All transactions are encrypted, and we use secure servers to safeguard your
            personal data from unauthorized access or disclosure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-3">Third-Party Sharing</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your data. Limited data may be shared with trusted
            logistics or payment partners for order fulfillment.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          By using our website, you consent to the collection and use of information
          in accordance with this policy.
        </p>
      </div>
    </section>
  );
}
