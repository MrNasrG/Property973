import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { setAuthSessionCookie } from "@/utils/authCookie";
import { persistAuthSession } from "@/utils/authSession";
import { getData, saveData } from "@/utils/storage";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  verifyForgotPasswordOtp,
  verifyOtp,
} from "./services";

const getApiErrorMessage = (result, fallback = "Something went wrong") =>
  result?.message || result?.data?.message || fallback;

const getApiSuccessMessage = (result, fallback) =>
  result?.data?.message || result?.message || fallback;

const isApiFailure = (result) =>
  result?.status === false || result?.data?.success === false;

export const registerAction = createAsyncThunk(
  "authSlice/registerAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await registerUser(payload);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }

      saveData("user", result.data);
      if (result.data?.token) {
        setAuthSessionCookie();
      }
      toast.success(
        getApiSuccessMessage(result, "Account created successfully"),
      );
      return result.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const loginAction = createAsyncThunk(
  "authSlice/loginAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await loginUser(payload);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }

      const data = result.data;
      persistAuthSession(data);

      toast.success(getApiSuccessMessage(result, "Login successful"));
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const verifyOtpAction = createAsyncThunk(
  "authSlice/verifyOtpAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await verifyOtp(payload);
      const data = result?.data;

      if (isApiFailure(result) || data?.success !== true) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }

      const existingUser = getData("user") || {};
      const storedUser =
        persistAuthSession(data, existingUser) ??
        persistAuthSession(data?.data, existingUser);

      if (!storedUser) {
        const message = getApiErrorMessage(result, "OTP verified but no access token returned");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "OTP verified successfully"));
      return { ...storedUser, success: true };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const verifyForgotOtpAction = createAsyncThunk(
  "authSlice/verifyForgotOtpAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await verifyForgotPasswordOtp(payload);
      const data = result?.data;

      if (isApiFailure(result) || data?.success === false) {
        const message = getApiErrorMessage(result, "Invalid OTP");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "OTP verified successfully"));
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const forgotPasswordAction = createAsyncThunk(
  "authSlice/forgotPasswordAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await forgotPassword(payload);
      const data = result?.data;
      if (isApiFailure(result) || data?.success !== true) {
        const message = getApiErrorMessage(result, "Failed to send OTP");
        toast.error(message);
        return rejectWithValue(message);
      }
      toast.success(getApiSuccessMessage(result, "OTP sent to your mobile."));
      return data;
    } catch (err) {
      console.log("err", err);
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      console.log("message", message);
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const resetPasswordAction = createAsyncThunk(
  "authSlice/resetPasswordAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await resetPassword(payload);
      const data = result?.data;
      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);
