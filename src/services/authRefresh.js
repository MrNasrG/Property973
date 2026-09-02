import { API_ROUTER } from "@/services/apiRouter";
import axiosInstance from "@/utils/axios";
import { getData, saveData } from "@/utils/storage";

export const getRefreshToken = (user = getData("user")) =>
  user?.refreshToken ?? user?.data?.refreshToken ?? null;

/** Exchange refresh token for a new access token and persist session. */
export const refreshAccessToken = async () => {
  const user = getData("user");
  const refreshToken = getRefreshToken(user);
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const result = await axiosInstance.post(
    API_ROUTER.REFRESH_TOKEN,
    { refreshToken },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    },
  );

  const body = result.data;
  const session = body?.data ?? body;
  const accessToken = session?.accessToken ?? session?.token;

  if (!accessToken) {
    throw new Error(body?.message || "Token refresh failed");
  }

  const profile = session?.user ?? user;
  const storedUser = {
    ...(typeof profile === "object" && profile ? profile : {}),
    ...(typeof user === "object" && user ? user : {}),
    token: accessToken,
    accessToken,
    refreshToken: session?.refreshToken ?? refreshToken,
  };

  saveData("user", storedUser);
  return accessToken;
};
