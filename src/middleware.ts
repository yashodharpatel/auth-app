import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isPublicPath =
    currentPath === "/" ||
    currentPath === "/login" ||
    currentPath === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    const response = NextResponse.redirect(
      new URL("/profile", request.nextUrl),
    );

    console.log("Already Logged In");
    return response;
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};