import { getVisibleOwnerPropertyFields } from "@/constants/propertyListingFields";
import { API_ROUTER } from "@/services/apiRouter";
import axiosInstance from "@/utils/axios";
import { getAuthToken } from "@/utils/authToken";
import { buildListingFormData, extractPhotoFiles } from "@/utils/listingPayload";

export class ListingServiceError extends Error {
  constructor(message, { status, errors, code } = {}) {
    super(message);
    this.name = "ListingServiceError";
    this.status = status;
    this.errors = errors ?? [];
    this.code = code;
  }
}

const parseApiError = (error, fallbackMessage) => {
  const status = error?.response?.status;
  const body = error?.response?.data ?? {};
  const message = body?.message || fallbackMessage;
  const errors = Array.isArray(body?.errors) ? body.errors : [];

  if (status === 401) {
    return new ListingServiceError(message || "Authorization token missing.", {
      status,
      errors,
      code: "AUTH_REQUIRED",
    });
  }

  if (status === 422) {
    return new ListingServiceError(message || "Validation failed", {
      status,
      errors,
      code: "VALIDATION_FAILED",
    });
  }

  if (status === 413) {
    return new ListingServiceError(message || "File too large", {
      status,
      errors,
      code: "PAYLOAD_TOO_LARGE",
    });
  }

  if (status === 415) {
    return new ListingServiceError(message || "Unsupported image type", {
      status,
      errors,
      code: "UNSUPPORTED_MEDIA",
    });
  }

  return new ListingServiceError(message, { status, errors, code: "REQUEST_FAILED" });
};

/**
 * Create an owner property listing.
 * Always sends multipart/form-data (photos optional).
 */
export const createListing = async (formData, photoFiles = []) => {
  const accessToken = getAuthToken();
  if (!accessToken) {
    throw new ListingServiceError("Please log in to submit a listing.", {
      status: 401,
      code: "AUTH_REQUIRED",
    });
  }

  const files = extractPhotoFiles(formData?.photos, photoFiles);
  const visibleFields = getVisibleOwnerPropertyFields(
    formData?.purpose,
    formData?.propertyType,
  );
  const multipart = buildListingFormData(formData, files, visibleFields);

  try {
    const result = await axiosInstance.post(API_ROUTER.CREATE_LISTING, multipart, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: false,
    });

    return result.data;
  } catch (error) {
    throw parseApiError(error, "Failed to create listing");
  }
};
