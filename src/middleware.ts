import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  

  if (!token) {
    console.log("No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    /*
      Protect all routes except:
      - /login (so users can access the login page)
      - Next.js internals (_next)
      - favicon.ico
      - static assets (images, fonts, static)
    */
    "/((?!login|register|_next|favicon.ico|images|fonts|static).*)",
  ],
};
