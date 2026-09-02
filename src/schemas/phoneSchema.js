import * as yup from "yup";

import {
  formatMobileNumberForApi,
  getPhoneValidationError,
  normalizeMobileNumber,
  PHONE_VALIDATION_MESSAGE,
} from "@/constants/phoneCountries";

export const phoneNumberField = (requiredMessage = "Mobile number is required") =>
  yup
    .string()
    .trim()
    .transform((value) => formatMobileNumberForApi(normalizeMobileNumber(value)))
    .required(requiredMessage)
    .test("valid-phone", PHONE_VALIDATION_MESSAGE, function validatePhone(value) {
      if (!value) return true;

      const errorMessage = getPhoneValidationError(value);
      if (!errorMessage) return true;

      return this.createError({ message: errorMessage });
    });
