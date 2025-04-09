import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const clerk = clerkMiddleware();

const customMiddleware = async (req: NextRequest, event: NextFetchEvent) => {
  console.log("🔍 Middleware triggered on:", req.nextUrl.pathname);

  const clerkResponse = await clerk(req, event);
  if (clerkResponse) return clerkResponse;

  const { userId } = getAuth(req);
  const { pathname } = req.nextUrl;

  console.log("👤 userId:", userId);
  console.log("📍 pathname:", pathname);

  if (userId && pathname === "/") {
    console.log("➡️ Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
};

export default customMiddleware;

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
