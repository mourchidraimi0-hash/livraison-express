import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const SESSION_COOKIE = "le_session";

type SessionData = { userId: string; role: string; name: string };

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  let session: SessionData | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      session = payload as unknown as SessionData;
    } catch {
      session = null;
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      const url = new URL("/connexion", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/compte")) {
    if (!session) {
      const url = new URL("/connexion", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/compte/:path*"],
};
