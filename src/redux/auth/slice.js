import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPasswordAction,
  loginAction,
  registerAction,
  resetPasswordAction,
  verifyForgotOtpAction,
  verifyOtpAction,
} from "./action";

const initialState = {
  user: null,
  otp: null,
  isLoading: false,
  error: null,
  token: null,
  resetToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setOtp: (state, { payload }) => {
      state.otp = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setResetToken: (state, { payload }) => {
      state.resetToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.otp = payload?.otp ?? payload?.data?.otp ?? null;
        state.token =
          payload?.data?.accessToken ?? payload?.data?.accessToken ?? null;
      })
      .addCase(registerAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload;
        state.otp = payload?.otp ?? payload?.data?.otp ?? null;
        state.token =
          payload?.data?.accessToken ??
          payload?.accessToken ??
          payload?.data?.token ??
          payload?.token ??
          null;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(verifyOtpAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload;
        state.token =
          payload?.accessToken ??
          payload?.token ??
          payload?.data?.accessToken ??
          payload?.data?.token ??
          null;
      })
      .addCase(verifyOtpAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(verifyForgotOtpAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyForgotOtpAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.resetToken =
          payload?.resetToken ?? payload?.data?.resetToken ?? null;
      })
      .addCase(verifyForgotOtpAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(forgotPasswordAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload;
        state.otp = payload?.otp ?? payload?.data?.otp ?? null;
      })
      .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(resetPasswordAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.otp = null;
        state.resetToken = null;
      })
      .addCase(resetPasswordAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authSliceReducer = authSlice.reducer;

export const {
  setUser,
  setIsLoading,
  setError,
  setOtp,
  setToken,
  setResetToken,
} = authSlice.actions;
