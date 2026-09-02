import { formatMobileNumberForApi } from "@/constants/phoneCountries";
import { API_ROUTER } from "../../services/apiRouter";
import { axiosPost } from "../../services/axiosHelper";

const withFormattedMobileNumber = (data) => {
  if (!data || typeof data !== "object" || data.mobileNumber == null) {
    return data;
  }

  return {
    ...data,
    mobileNumber: formatMobileNumberForApi(data.mobileNumber),
  };
};

export const registerUser = (data) => {
  return axiosPost(API_ROUTER.REGISTER_USER, withFormattedMobileNumber(data));
};

export const loginUser = (data) => {
  return axiosPost(API_ROUTER.LOGIN_USER, withFormattedMobileNumber(data));
};

export const verifyOtp = (data) => {
  return axiosPost(API_ROUTER.VERIFY_OTP, withFormattedMobileNumber(data));
};

export const forgotPassword = (data) => {
  return axiosPost(API_ROUTER.FORGOT_PASSWORD, withFormattedMobileNumber(data));
};

export const verifyForgotPasswordOtp = (data) => {
  return axiosPost(API_ROUTER.FORGOT_PASSWORD_VERIFY_OTP, withFormattedMobileNumber(data));
};

export const resetPassword = (data) => {
  return axiosPost(API_ROUTER.RESET_PASSWORD, data);
};
