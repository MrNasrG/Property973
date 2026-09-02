/**
 * Phone country definitions for mobile inputs.
 * Each entry defines dial code and national-number length bounds (digits only, no leading 0).
 *
 * @typedef {{
 *   code: string;
 *   name: string;
 *   dialCode: string;
 *   minLength: number;
 *   maxLength: number;
 *   nationalNumberPattern?: RegExp;
 * }} PhoneCountry
 */

/** @type {PhoneCountry[]} */
export const PHONE_COUNTRIES = [
  { code: "BH", name: "Bahrain", dialCode: "+973", minLength: 8, maxLength: 8 },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", minLength: 9, maxLength: 9 },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", minLength: 9, maxLength: 9 },
  { code: "KW", name: "Kuwait", dialCode: "+965", minLength: 8, maxLength: 8 },
  { code: "QA", name: "Qatar", dialCode: "+974", minLength: 8, maxLength: 8 },
  { code: "OM", name: "Oman", dialCode: "+968", minLength: 8, maxLength: 8 },
  { code: "JO", name: "Jordan", dialCode: "+962", minLength: 8, maxLength: 9 },
  { code: "LB", name: "Lebanon", dialCode: "+961", minLength: 7, maxLength: 8 },
  { code: "IQ", name: "Iraq", dialCode: "+964", minLength: 10, maxLength: 10 },
  { code: "YE", name: "Yemen", dialCode: "+967", minLength: 9, maxLength: 9 },
  { code: "EG", name: "Egypt", dialCode: "+20", minLength: 10, maxLength: 10 },
  { code: "IN", name: "India", dialCode: "+91", minLength: 10, maxLength: 10, nationalNumberPattern: /^[6-9]\d{9}$/ },
  { code: "PK", name: "Pakistan", dialCode: "+92", minLength: 10, maxLength: 10 },
  { code: "BD", name: "Bangladesh", dialCode: "+880", minLength: 10, maxLength: 10 },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", minLength: 9, maxLength: 9 },
  { code: "PH", name: "Philippines", dialCode: "+63", minLength: 10, maxLength: 10 },
  { code: "MY", name: "Malaysia", dialCode: "+60", minLength: 9, maxLength: 10 },
  { code: "SG", name: "Singapore", dialCode: "+65", minLength: 8, maxLength: 8 },
  { code: "ID", name: "Indonesia", dialCode: "+62", minLength: 9, maxLength: 11 },
  { code: "CN", name: "China", dialCode: "+86", minLength: 11, maxLength: 11 },
  { code: "JP", name: "Japan", dialCode: "+81", minLength: 10, maxLength: 10 },
  { code: "KR", name: "South Korea", dialCode: "+82", minLength: 9, maxLength: 10 },
  { code: "TR", name: "Turkey", dialCode: "+90", minLength: 10, maxLength: 10 },
  { code: "IR", name: "Iran", dialCode: "+98", minLength: 10, maxLength: 10 },
  { code: "GB", name: "United Kingdom", dialCode: "+44", minLength: 10, maxLength: 10 },
  { code: "DE", name: "Germany", dialCode: "+49", minLength: 10, maxLength: 11 },
  { code: "FR", name: "France", dialCode: "+33", minLength: 9, maxLength: 9 },
  { code: "IT", name: "Italy", dialCode: "+39", minLength: 9, maxLength: 10 },
  { code: "ES", name: "Spain", dialCode: "+34", minLength: 9, maxLength: 9 },
  { code: "NL", name: "Netherlands", dialCode: "+31", minLength: 9, maxLength: 9 },
  { code: "US", name: "United States", dialCode: "+1", minLength: 10, maxLength: 10 },
  { code: "CA", name: "Canada", dialCode: "+1", minLength: 10, maxLength: 10 },
  { code: "AU", name: "Australia", dialCode: "+61", minLength: 9, maxLength: 9 },
  { code: "NZ", name: "New Zealand", dialCode: "+64", minLength: 8, maxLength: 10 },
  { code: "ZA", name: "South Africa", dialCode: "+27", minLength: 9, maxLength: 9 },
  { code: "NG", name: "Nigeria", dialCode: "+234", minLength: 10, maxLength: 10 },
  { code: "KE", name: "Kenya", dialCode: "+254", minLength: 9, maxLength: 9 },
  { code: "RU", name: "Russia", dialCode: "+7", minLength: 10, maxLength: 10 },
];

export const DEFAULT_PHONE_COUNTRY_CODE = "BH";

export const PHONE_VALIDATION_MESSAGE = "Enter a valid mobile number";

export const normalizeMobileNumber = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, "") : value;

/** @param {string} code */
export const getCountryByCode = (code) =>
  PHONE_COUNTRIES.find((country) => country.code === code) ?? null;

/** @param {string} dialCode */
export const getCountryByDialCode = (dialCode) =>
  PHONE_COUNTRIES.find((country) => country.dialCode === dialCode) ?? null;

export const getDefaultPhoneCountry = () =>
  getCountryByCode(DEFAULT_PHONE_COUNTRY_CODE) ?? PHONE_COUNTRIES[0];

/** @param {PhoneCountry} country */
export const getPhoneValidationMessage = (country) => {
  if (country.minLength === country.maxLength) {
    return `Enter a valid ${country.name} mobile number (${country.minLength} digits)`;
  }

  return `Enter a valid ${country.name} mobile number (${country.minLength}-${country.maxLength} digits)`;
};

/** @param {PhoneCountry} country @param {string} nationalNumber */
export const buildFullPhoneNumber = (country, nationalNumber) => {
  const digits = String(nationalNumber ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return `${country.dialCode}${digits}`;
};

/**
 * @param {string | undefined | null} value
 * @param {string} [fallbackCountryCode]
 * @returns {{ country: PhoneCountry; nationalNumber: string } | null}
 */
export const parsePhoneNumber = (value, fallbackCountryCode = DEFAULT_PHONE_COUNTRY_CODE) => {
  const normalized = normalizeMobileNumber(value ?? "");
  if (!normalized) return null;

  const sortedCountries = [...PHONE_COUNTRIES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length,
  );

  for (const country of sortedCountries) {
    if (normalized.startsWith(country.dialCode)) {
      return {
        country,
        nationalNumber: normalized.slice(country.dialCode.length),
      };
    }
  }

  if (/^\d+$/.test(normalized)) {
    const fallbackCountry = getCountryByCode(fallbackCountryCode) ?? getDefaultPhoneCountry();
    return {
      country: fallbackCountry,
      nationalNumber: normalized,
    };
  }

  return null;
};

/**
 * Ensures the value sent to APIs includes the selected country dial code
 * combined with the national number (E.164-style, e.g. +97312345678).
 *
 * @param {string | undefined | null} value
 * @param {string} [fallbackCountryCode]
 */
export const formatMobileNumberForApi = (
  value,
  fallbackCountryCode = DEFAULT_PHONE_COUNTRY_CODE,
) => {
  const normalized = normalizeMobileNumber(value ?? "");
  if (!normalized) return "";

  const parsed = parsePhoneNumber(normalized, fallbackCountryCode);
  if (!parsed?.nationalNumber) return normalized;

  return buildFullPhoneNumber(parsed.country, parsed.nationalNumber);
};

/** @param {string} nationalPart @param {PhoneCountry} country */
export const isValidNationalNumber = (nationalPart, country) => {
  if (!/^\d+$/.test(nationalPart)) return false;

  if (nationalPart.length < country.minLength || nationalPart.length > country.maxLength) {
    return false;
  }

  if (country.nationalNumberPattern) {
    return country.nationalNumberPattern.test(nationalPart);
  }

  return true;
};

/** @param {string | undefined | null} value */
export const isValidPhoneNumber = (value) => {
  const normalized = normalizeMobileNumber(value ?? "");
  if (!normalized) return false;

  const parsed = parsePhoneNumber(normalized);
  if (!parsed) return false;

  return isValidNationalNumber(parsed.nationalNumber, parsed.country);
};

/** @param {string | undefined | null} value */
export const getPhoneValidationError = (value) => {
  const normalized = normalizeMobileNumber(value ?? "");
  if (!normalized) return PHONE_VALIDATION_MESSAGE;

  const parsed = parsePhoneNumber(normalized);
  if (!parsed) return PHONE_VALIDATION_MESSAGE;

  if (isValidNationalNumber(parsed.nationalNumber, parsed.country)) {
    return null;
  }

  return getPhoneValidationMessage(parsed.country);
};
