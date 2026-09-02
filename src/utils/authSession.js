import { setAuthSessionCookie } from "@/utils/authCookie";
import { notifyAuthSessionUpdated } from "@/utils/authEvents";
import { getAuthToken } from "@/utils/authToken";
import { getData, saveData } from "@/utils/storage";

const readTokenFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  const session = payload.data ?? payload;
  const profile = session?.user ?? payload.user;

  return (
    session?.accessToken ??
    session?.token ??
    session?.access_token ??
    profile?.accessToken ??
    profile?.token ??
    payload.accessToken ??
    payload.token ??
    null
  );
};

const readRefreshTokenFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  const session = payload.data ?? payload;

  return (
    session?.refreshToken ??
    session?.refresh_token ??
    payload.refreshToken ??
    null
  );
};

const readProfileFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  const session = payload.data ?? payload;
  const profile = session?.user ?? payload.user;

  if (profile && typeof profile === "object") {
    return profile;
  }

  if (session && typeof session === "object" && !readTokenFromPayload(payload)) {
    return session;
  }

  return null;
};

/** Persist login/OTP session to localStorage and return the stored user. */
export const persistAuthSession = (apiData, existingUser = getData("user") || {}) => {
  const token = readTokenFromPayload(apiData);
  if (!token) return null;

  const profile = readProfileFromPayload(apiData);
  const refreshToken =
    readRefreshTokenFromPayload(apiData) ?? existingUser?.refreshToken ?? null;

  const storedUser = {
    ...(typeof existingUser === "object" ? existingUser : {}),
    ...(profile && typeof profile === "object" ? profile : {}),
    token,
    accessToken: token,
    refreshToken,
    fullName:
      profile?.fullName ??
      apiData?.fullName ??
      apiData?.data?.fullName ??
      existingUser?.fullName,
    mobileNumber:
      profile?.mobileNumber ??
      apiData?.mobileNumber ??
      apiData?.data?.mobileNumber ??
      existingUser?.mobileNumber,
  };

  saveData("user", storedUser);
  setAuthSessionCookie();
  return storedUser;
};

export const hasAuthSession = (user = getData("user")) => Boolean(getAuthToken(user));
