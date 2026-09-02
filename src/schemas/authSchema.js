import * as yup from "yup";

import { phoneNumberField } from "@/schemas/phoneSchema";

const fullNameField = yup
  .string()
  .trim()
  .required("Full name is required")
  .min(2, "Full name must be at least 2 characters");

const emailField = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Enter a valid email address");

const mobileNumberField = phoneNumberField();

const passwordField = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters");

export const loginSchema = yup.object({
  mobileNumber: mobileNumberField,
  password: passwordField,
});

export const registerSchema = yup.object({
  fullName: fullNameField,
  email: emailField,
  mobileNumber: mobileNumberField,
  password: passwordField,
});

const singleOtpDigit = yup
  .string()
  .required("Required")
  .matches(/^\d$/, "Enter one digit");

export const otpSchema = yup.object({
  digit1: singleOtpDigit,
  digit2: singleOtpDigit,
  digit3: singleOtpDigit,
  digit4: singleOtpDigit,
  digit5: singleOtpDigit,
  digit6: singleOtpDigit,
});

export const forgotPasswordSchema = yup.object({
  mobileNumber: mobileNumberField,
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
