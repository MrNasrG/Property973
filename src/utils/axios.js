import axios from "axios";
import config from "@/config";
import { PATH_AUTH } from "@/routes/path";
import { refreshAccessToken } from "@/services/authRefresh";
import { clearAuthSessionCookie } from "@/utils/authCookie";
import { getAuthToken } from "@/utils/authToken";

const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    withCredentials: false,
});

const redirectToLogin = () => {
    if (typeof window === "undefined") return;
    localStorage.clear();
    clearAuthSessionCookie();
    window.location.href = PATH_AUTH.login;
};

axiosInstance.interceptors.request.use((requestConfig) => {
    const token = getAuthToken();
    if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    requestConfig.withCredentials = false;
    return requestConfig;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isUnauthorized = error.response?.status === 401;
        const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

        if (!isUnauthorized || isRefreshCall || originalRequest?._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const newToken = await refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
        } catch {
            redirectToLogin();
            return Promise.reject(error);
        }
    },
);

export default axiosInstance;
