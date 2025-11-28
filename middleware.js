import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // 1️⃣ ---- SESSION ID MIDDLEWARE ----
  const sessionId = req.cookies.get("sessionId")?.value;
  if (!sessionId) {
    res.cookies.set("sessionId", uuidv4(), { path: "/" });
  }

  // 2️⃣ ---- ADMIN AUTH CHECK ----
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Not logged in → redirect
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Logged in but not admin → redirect
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}

// Only run middleware on admin routes 
export const config = {
  matcher: ["/admin/:path*"],
};

