"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccess() {
  const params = useSearchParams();
  const type = params.get("type");
  const router = useRouter();

  const [showDeliveryScreen, setShowDeliveryScreen] = useState(false);

  useEffect(() => {
    // Show delivery progress screen after 2 seconds
    const timer = setTimeout(() => {
      setShowDeliveryScreen(true);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showDeliveryScreen) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="text-xl font-semibold text-amber-700 mt-6 animate-pulse">
          Checking Delivery Status...
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Please wait while we confirm your order
        </p>

        {/* Amazon-style delivery tracker */}
        <div className="mt-10 w-64">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Order Placed</span>
            <span>Processing</span>
            <span>Packed</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-amber-500 animate-progress"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-progress {
            animation: progress 3s linear forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 to-green-100 p-6">
      {/* SUCCESS ICON */}
      <div className="w-24 h-24 bg-green-500 text-white flex items-center justify-center rounded-full shadow-lg animate-bounce-slow">
        <svg
          width="60"
          height="60"
          fill="none"
          stroke="white"
          strokeWidth="5"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* TEXT */}
      <h1 className="text-3xl font-bold text-green-700 mt-6 text-center animate-fade-in">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-gray-700 mt-2 text-center animate-fade-in-delay">
        Payment Type:{" "}
        <b>{type === "online" ? "Online Payment" : "Cash On Delivery"}</b>
      </p>

      <p className="text-gray-600 mt-1 text-sm animate-fade-in-delay">
        Redirecting to delivery status...
      </p>

      {/* Confetti */}
      <div className="confetti"></div>

      {/* Animations */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 1.4s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in {
          animation: fadeIn 0.7s ease forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Confetti Effect */
        .confetti {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: url("https://i.imgur.com/2yaf2wb.gif");
          background-size: cover;
          opacity: 0.85;
          animation: fadeOutConfetti 2s forwards 1.4s;
        }

        @keyframes fadeOutConfetti {
          from { opacity: 0.9; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
