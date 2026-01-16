"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccess({ paymentType }) {
  const router = useRouter();
  const [step, setStep] = useState("success"); // success | processing

  // If paymentType not provided, fallback to COD
  const type = paymentType || "cod";

  useEffect(() => {
    const t1 = setTimeout(() => setStep("processing"), 1200);
    const t2 = setTimeout(() => router.push("/dashboard"), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [router]);

  /* ---------------- PROCESSING SCREEN ---------------- */
  if (step === "processing") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <div className="w-14 h-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-6" />

        <h2 className="text-xl font-semibold text-slate-800">
          Preparing your order
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Verifying payment & delivery details
        </p>

        {/* Progress */}
        <div className="w-72 mt-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Placed</span>
            <span>Processing</span>
            <span>Packed</span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 animate-progress" />
          </div>
        </div>

        <style jsx>{`
          .animate-progress {
            width: 0%;
            animation: progress 3s ease forwards;
          }
          @keyframes progress {
            to {
              width: 100%;
            }
          }
        `}</style>
      </main>
    );
  }

  /* ---------------- SUCCESS SCREEN ---------------- */
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full animate-scale-in">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto bg-emerald-500 text-white flex items-center justify-center rounded-full shadow-lg mb-6">
          <svg
            width="42"
            height="42"
            fill="none"
            stroke="white"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Order Confirmed
        </h1>

        <p className="text-slate-600 text-sm mb-4">
          Payment method:{" "}
          <span className="font-semibold text-slate-800">
            {type === "online" ? "Online Payment" : "Cash on Delivery"}
          </span>
        </p>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-medium">
          You’ll be redirected to your dashboard shortly
        </div>
      </div>

      <style jsx>{`
        .animate-scale-in {
          animation: scaleIn 0.4s ease forwards;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
