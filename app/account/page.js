"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if signed in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-700">
        Checking authentication...
      </div>
    );
  }

  // If already logged in, show success or redirect screen
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">
          Welcome, {session.user?.name || "User"} 🎉
        </h1>
        <p className="text-gray-600 mb-6">Redirecting to your dashboard...</p>
      </div>
    );
  }

  // Default: Sign-in UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
        <svg
          width="120"
          height="120"
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
            AJ
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

        <h1 className="mt-4 text-3xl font-semibold text-amber-800">
          Welcome to Abhi Jewellers
        </h1>
        <p className="text-gray-600 mt-2">Sign in to explore exclusive collections</p>
      </div>

      {/* Sign-in Card */}
      <div className="bg-white shadow-lg rounded-2xl px-10 py-8 w-full max-w-sm text-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          {/* Google SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.23 9.21 3.63l6.84-6.84C35.59 2.5 30.16 0 24 0 14.64 0 6.48 5.3 2.56 13.01l7.98 6.19C12.12 13.03 17.56 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.98 24.55c0-1.64-.15-3.21-.43-4.74H24v9.02h12.94c-.56 2.96-2.24 5.47-4.78 7.16l7.39 5.74C43.63 37.5 46.98 31.6 46.98 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.54 28.2a14.5 14.5 0 010-8.4l-7.98-6.19A23.928 23.928 0 000 24c0 3.87.92 7.53 2.56 10.79l7.98-6.19z"
            />
            <path
              fill="#4285F4"
              d="M24 48c6.16 0 11.37-2.03 15.16-5.54l-7.39-5.74c-2.05 1.39-4.69 2.2-7.77 2.2-6.44 0-11.88-3.53-14.46-8.91l-7.98 6.19C6.48 42.7 14.64 48 24 48z"
            />
          </svg>

          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. No spam, ever.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Abhi Jewellers. All rights reserved.
      </footer>
    </div>
  );
}

