import { getData } from "@/utils/storage";

/** Resolve bearer token from persisted session (supports legacy field names). */
export const getAuthToken = (user = getData("user")) => {
  if (!user || typeof user !== "object") return null;

  const profile = user.user ?? user.profile ?? user.data?.user;

  return (
    user.token ??
    user.accessToken ??
    user.jwt ??
    user.data?.accessToken ??
    user.data?.token ??
    profile?.accessToken ??
    profile?.token ??
    null
  );
};

export const getAuthHeaders = (extraHeaders = {}, token = getAuthToken()) => {
  const headers = { ...extraHeaders };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
