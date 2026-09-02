import { PATH_AUTH } from "@/routes/path";
import { routing } from "@/i18n/routing";
import { AUTH_COOKIE_NAME } from "@/utils/authCookie";

/**
 * Routes only accessible when logged in.
 * Add new paths here as the app grows.
 */
export const AUTHENTICATED_ONLY_ROUTES = [PATH_AUTH.myProfile];

/**
 * Routes only accessible before logging in (auth flow).
 * Logged-in users are redirected away from these pages.
 */
export const GUEST_ONLY_ROUTES = [
  PATH_AUTH.login,
  PATH_AUTH.register,
  PATH_AUTH.otp,
  PATH_AUTH.forgotPassword,
];

export const DEFAULT_AUTHENTICATED_REDIRECT = PATH_AUTH.myProfile;
export const DEFAULT_GUEST_REDIRECT = PATH_AUTH.login;

const normalizePath = (pathname) => {
  if (!pathname) return "/";

  const withoutTrailingSlash =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  return withoutTrailingSlash || "/";
};

export const getLocaleFromPathname = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (routing.locales.includes(maybeLocale)) {
    return maybeLocale;
  }

  return routing.defaultLocale;
};

export const stripLocaleFromPathname = (pathname) => {
  const normalized = normalizePath(pathname);
  const segments = normalized.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (routing.locales.includes(maybeLocale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return normalized;
};

const matchesRoute = (pathname, route) =>
  pathname === route || pathname.startsWith(`${route}/`);

export const isRouteInList = (pathname, routes) =>
  routes.some((route) => matchesRoute(pathname, route));

export const isAuthenticatedRequest = (request) =>
  request.cookies.get(AUTH_COOKIE_NAME)?.value === "1";

export const buildLocalizedPath = (path, locale) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (
    locale === routing.defaultLocale &&
    routing.localePrefix === "as-needed"
  ) {
    return normalizedPath;
  }

  return `/${locale}${normalizedPath}`;
};

/**
 * Returns a localized redirect path when access rules apply, otherwise null.
 */
export const getRouteProtectionRedirect = (request) => {
  const pathname = request.nextUrl.pathname;
  const pathWithoutLocale = stripLocaleFromPathname(pathname);
  const isLoggedIn = isAuthenticatedRequest(request);
  const locale = getLocaleFromPathname(pathname);

  if (
    isLoggedIn &&
    isRouteInList(pathWithoutLocale, GUEST_ONLY_ROUTES)
  ) {
    return buildLocalizedPath(DEFAULT_AUTHENTICATED_REDIRECT, locale);
  }

  if (
    !isLoggedIn &&
    isRouteInList(pathWithoutLocale, AUTHENTICATED_ONLY_ROUTES)
  ) {
    return buildLocalizedPath(DEFAULT_GUEST_REDIRECT, locale);
  }

  return null;
};
