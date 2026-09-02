import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";
import { getRouteProtectionRedirect } from "./utils/routeProtection";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const redirectPath = getRouteProtectionRedirect(request);

  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
