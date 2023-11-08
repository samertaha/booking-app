import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  // get token from user
  const token = req.cookies.get("user-token")?.value;

  // validate if the user is authenticated
  const varifiedToken =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (req.nextUrl.pathname.startsWith("/login") && !varifiedToken) {
    return;
  }
  const url = req.url;

  if (url.includes("/login") && varifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!varifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
