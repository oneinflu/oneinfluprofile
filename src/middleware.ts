import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("influu_token")?.value || null;
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/admin") && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const next = req.nextUrl.pathname + (req.nextUrl.search || "");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
