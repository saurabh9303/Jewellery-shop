"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already signed in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign-in error:", error);
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100">
        <p className="text-amber-700 font-medium animate-pulse">
          Checking authentication…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 px-4">
      {/* Logo + Heading */}
      <div className="flex flex-col items-center mt-15 mb-10 text-center">
        <div className="mb-4">
          <svg
            width="110"
            height="110"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="95" stroke="#D4AF37" strokeWidth="8" fill="white" />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              fill="#B8860B"
              fontSize="48"
              fontFamily="serif"
              fontWeight="bold"
              dy=".3em"
            >
              IJ
            </text>
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              fill="#CDA434"
              fontSize="14"
              fontFamily="serif"
              letterSpacing="3"
            >
              JEWELLERS
            </text>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-amber-800">
          Welcome to Imperial Jewels
        </h1>
        <p className="text-gray-600 mt-2 max-w-sm">
          Sign in to explore handcrafted luxury and exclusive collections.
        </p>
      </div>

      {/* Sign-in Card */}
      <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl px-8 py-8 w-full max-w-sm">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`flex items-center justify-center gap-3 w-full py-3 border rounded-xl transition font-medium
            ${
              loading
                ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-70"
                : "border-gray-300 hover:bg-gray-100"
            }`}
        >
          {loading ? (
            <>
              {/* Spinner */}
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-gray-600">Signing in…</span>
            </>
          ) : (
            <>
              {/* Google Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.23 9.21 3.63l6.84-6.84C35.59 2.5 30.16 0 24 0 14.64 0 6.48 5.3 2.56 13.01l7.98 6.19C12.12 13.03 17.56 9.5 24 9.5z" />
                <path fill="#34A853" d="M46.98 24.55c0-1.64-.15-3.21-.43-4.74H24v9.02h12.94c-.56 2.96-2.24 5.47-4.78 7.16l7.39 5.74C43.63 37.5 46.98 31.6 46.98 24.55z" />
                <path fill="#FBBC05" d="M10.54 28.2a14.5 14.5 0 010-8.4l-7.98-6.19A23.928 23.928 0 000 24c0 3.87.92 7.53 2.56 10.79l7.98-6.19z" />
                <path fill="#4285F4" d="M24 48c6.16 0 11.37-2.03 15.16-5.54l-7.39-5.74c-2.05 1.39-4.69 2.2-7.77 2.2-6.44 0-11.88-3.53-14.46-8.91l-7.98 6.19C6.48 42.7 14.64 48 24 48z" />
              </svg>
              <span className="text-gray-700">Sign in with Google</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-5 leading-relaxed">
          By continuing, you agree to our Terms & Privacy Policy.  
          We never post without your permission.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Imperial Jewels. All rights reserved.
      </footer>
    </div>
  );
}
