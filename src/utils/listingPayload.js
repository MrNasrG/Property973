import { formatMobileNumberForApi } from "@/constants/phoneCountries";
import { OWNER_PROPERTY_FIELDS as F } from "@/constants/propertyListingFields";

const NUMERIC_FIELDS = new Set([F.price, F.area, F.streetWidth]);
const BOOLEAN_FIELDS = new Set([
  F.furnished,
  F.carEntrance,
  F.airConditioned,
  F.privateRoof,
  F.inVilla,
  F.twoEntrances,
  F.specialEntrance,
  F.allowInquiries,
  F.aqarPartnersAssistance,
]);

const isEmptyValue = (value) =>
  value === null ||
  value === undefined ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

const normalizeFieldValue = (key, value) => {
  if (key === F.contactPhone) {
    return formatMobileNumberForApi(value);
  }

  if (BOOLEAN_FIELDS.has(key)) {
    return Boolean(value);
  }

  if (NUMERIC_FIELDS.has(key)) {
    if (isEmptyValue(value)) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (isEmptyValue(value)) return null;
  return value;
};

/** Build a JSON body for update listing requests. */
export const buildListingBody = (formData, visibleFieldIds = null) => {
  const allowedKeys = visibleFieldIds
    ? new Set(visibleFieldIds)
    : new Set(Object.values(F).filter((key) => key !== F.photos));

  const body = {};

  allowedKeys.forEach((key) => {
    const normalized = normalizeFieldValue(key, formData?.[key]);
    if (normalized !== null) {
      body[key] = normalized;
    }
  });

  return body;
};

const appendFormValue = (formData, key, value) => {
  if (value === null || value === undefined) return;

  if (typeof value === "boolean") {
    formData.append(key, value ? "true" : "false");
    return;
  }

  formData.append(key, String(value));
};

/** Build multipart form data for create listing (photos optional). */
export const buildListingFormData = (
  formData,
  photoFiles = [],
  visibleFieldIds = null,
) => {
  const payload = buildListingBody(formData, visibleFieldIds);
  const multipart = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    appendFormValue(multipart, key, value);
  });

  photoFiles.forEach((file) => {
    if (file instanceof File) {
      multipart.append("photos", file);
    }
  });

  return multipart;
};

export const extractPhotoFiles = (photosValue, fallbackFiles = []) => {
  if (fallbackFiles.length > 0) {
    return fallbackFiles;
  }

  if (photosValue instanceof FileList) {
    return Array.from(photosValue);
  }

  if (Array.isArray(photosValue)) {
    return photosValue.filter((file) => file instanceof File);
  }

  return [];
};
