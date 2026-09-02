import { PATH_AUTH } from "@/routes/path";
import { clearAuthSessionCookie } from "@/utils/authCookie";
import { getAuthHeaders } from "@/utils/authToken";
import axiosInstance from "@/utils/axios";
import { getData } from "@/utils/storage";
import { toast } from "react-toastify";

const clearSession = () => {
  localStorage.clear();
  clearAuthSessionCookie();
};

const banAccount = (error) => {
  if (error?.isLoggedOut) {
    clearSession();
    window.location.href = PATH_AUTH.login;
    toast.error("Your account is banned. Contact support for more info.");
  }
};


export const axiosPost = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  const user = getData("user");
  try {
    const result = await axiosInstance.post(url, data, {
      headers: getAuthHeaders({
        "Content-Type": contentType,
      }),
    });
    response.data = result?.data || result?.data?.data;
    response.status = result?.status;
    if (result?.data?.success === false) {
      response.status = false;
      response.message =
        result?.data?.message || "something went wrong";
    }
  } catch (e) {
    if (!e.response?.data?.success) {
      if (e.response?.status === 401) {
        if (e.response?.data?.isLoggedOut) {
          if (user) {
            clearSession();
            window.location.href = PATH_AUTH.login;
          }
        }
      }
    }
    response.status = false;
    response.message =
      e?.response?.data?.message ||
      e?.response?.data?.errors?.[0] ||
      "something went wrong";
    response.data = e?.response?.data || e;
    if (e?.response?.data?.isBanned == true) {
      banAccount(e?.response?.data);
    }
  }
  return response;
};

export const axiosGet = async (
  url,
  params = {},
  contentType = "application/json",
  token
) => {
  let response = {};
  const user = getData("user");

  try {
    const result = await axiosInstance.get(url, {
      headers: getAuthHeaders({
        "Content-Type": contentType,
      }),
      params,
    });
    response.data = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    if (!e.response?.data?.success) {
      if (e.response?.status === 401) {
        if (e.response?.data?.isLoggedOut) {
          if (user) {
            clearSession();
            window.location.href = PATH_AUTH.login;
          }
        }
      }
    }
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
    if (e?.response?.data?.isBanned == true) {
      banAccount(e?.response?.data);
    }
  }
  return response;
};

export const axiosPatch = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  const user = getData("user");
  try {
    const result = await axiosInstance.patch(url, data, {
      headers: getAuthHeaders({
        "Content-Type": contentType,
      }),
    });
    response = result.data;
    response.status = result.data?.status || [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message =
      e?.response?.data?.detail ||
      e?.response?.data?.details ||
      "something went wrong";
    response.data = e;
    if (e?.response?.data?.isBanned == true) {
      banAccount(e?.response?.data);
    }
  }
  return response;
};

export const axiosPut = async (url, data, contentType = "application/json") => {
  let response = {};
  try {
    const result = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": contentType,
      },
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
    if (e?.response?.data?.isBanned == true) {
      banAccount(e?.response?.data);
    }
  }
  return response;
};

export const axiosPostFormData = async (url, formData) => {
  let response = {};
  const user = getData("user");
  try {
    const result = await axiosInstance.post(url, formData, {
      headers: getAuthHeaders(),
    });
    response.data = result?.data || result?.data?.data;
    response.status = result?.status;
    if (result?.data?.success === false) {
      response.status = false;
      response.message =
        result?.data?.message || "something went wrong";
    }
  } catch (e) {
    if (!e.response?.data?.success) {
      if (e.response?.status === 401) {
        if (e.response?.data?.isLoggedOut) {
          if (user) {
            clearSession();
            window.location.href = PATH_AUTH.login;
          }
        }
      }
    }
    response.status = false;
    response.message =
      e?.response?.data?.message ||
      e?.response?.data?.errors?.[0]?.message ||
      e?.response?.data?.errors?.[0] ||
      "something went wrong";
    response.data = e?.response?.data || e;
    if (e?.response?.data?.isBanned == true) {
      banAccount(e?.response?.data);
    }
  }
  return response;
};

export const axiosDelete = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  const user = getData("user");
  try {
    const result = await axiosInstance.delete(url, {
      headers: getAuthHeaders({
        "Content-Type": contentType,
      }),
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
    if (e?.response?.data?.isBanned == true) {
      banAccount(e?.response?.data);
    }
  }
  return response;
};