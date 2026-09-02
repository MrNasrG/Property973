export const AUTH_COOKIE_NAME = "auth_session";

const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const setAuthSessionCookie = () => {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
};

export const clearAuthSessionCookie = () => {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};
