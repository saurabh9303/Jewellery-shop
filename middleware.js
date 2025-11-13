import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(req) {
  const res = NextResponse.next();
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    res.cookies.set("sessionId", uuidv4(), { path: "/" });
  }
  return res;
}
