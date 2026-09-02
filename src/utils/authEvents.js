export const AUTH_SESSION_EVENT = "auth-session-updated";

export const notifyAuthSessionUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
  }
};
