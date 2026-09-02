import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ListingServiceError } from "@/services/listingService";
import {
  createListing,
  deleteListing,
  deleteListingPhoto,
  getListing,
  listListings,
  updateListing,
  uploadListingPhotos,
} from "./service";

const getApiErrorMessage = (result, fallback = "Something went wrong") =>
  result?.message || result?.data?.message || fallback;

const getApiSuccessMessage = (result, fallback) =>
  result?.data?.message || result?.message || fallback;

const isApiFailure = (result) =>
  result?.success === false ||
  result?.status === false ||
  result?.data?.success === false;

const unwrapListingResponse = (result) =>
  result?.data?.data ?? result?.data ?? result;

const toRejectPayload = (message, extra = {}) => ({
  message,
  errors: extra.errors ?? [],
  status: extra.status,
  code: extra.code,
});

export const createListingAction = createAsyncThunk(
  "listingsSlice/createListingAction",
  async ({ formData, photoFiles = [] }, { rejectWithValue }) => {
    try {
      const result = await createListing(formData, photoFiles);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to create listing");
        toast.error(message);
        return rejectWithValue(
          toRejectPayload(message, {
            errors: result?.errors ?? result?.data?.errors ?? [],
            status: 422,
          }),
        );
      }

      const listing = unwrapListingResponse(result);
      const successMessage = getApiSuccessMessage(
        result,
        listing?.id
          ? `Listing created successfully (#${listing.id})`
          : "Listing created successfully",
      );
      toast.success(successMessage);
      return listing;
    } catch (err) {
      if (err instanceof ListingServiceError) {
        toast.error(err.message);
        return rejectWithValue(
          toRejectPayload(err.message, {
            errors: err.errors,
            status: err.status,
            code: err.code,
          }),
        );
      }

      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(
          toRejectPayload(err?.response?.data?.message ?? message, {
            errors: err?.response?.data?.errors ?? [],
            status: err?.response?.status,
          }),
        );
      }
      return rejectWithValue(toRejectPayload(message));
    }
  },
);

export const listListingsAction = createAsyncThunk(
  "listingsSlice/listListingsAction",
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await listListings(params);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to load listings");
        return rejectWithValue(message);
      }

      return unwrapListingResponse(result) ?? { items: [], pagination: null };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const getListingAction = createAsyncThunk(
  "listingsSlice/getListingAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await getListing(id);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to load listing");
        return rejectWithValue(message);
      }

      return unwrapListingResponse(result);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  },
);

export const updateListingAction = createAsyncThunk(
  "listingsSlice/updateListingAction",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await updateListing(id, formData);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to update listing");
        toast.error(message);
        return rejectWithValue(
          toRejectPayload(message, {
            errors: result?.errors ?? result?.data?.errors ?? [],
            status: 422,
          }),
        );
      }

      toast.success(getApiSuccessMessage(result, "Listing updated successfully"));
      return unwrapListingResponse(result);
    } catch (err) {
      if (err instanceof ListingServiceError) {
        toast.error(err.message);
        return rejectWithValue(
          toRejectPayload(err.message, {
            errors: err.errors,
            status: err.status,
            code: err.code,
          }),
        );
      }

      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(
          toRejectPayload(err?.response?.data?.message ?? message, {
            errors: err?.response?.data?.errors ?? [],
            status: err?.response?.status,
          }),
        );
      }
      return rejectWithValue(toRejectPayload(message));
    }
  },
);

export const deleteListingAction = createAsyncThunk(
  "listingsSlice/deleteListingAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteListing(id);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to delete listing");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "Listing deleted successfully"));
      return id;
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

export const uploadListingPhotosAction = createAsyncThunk(
  "listingsSlice/uploadListingPhotosAction",
  async ({ id, photoFiles }, { rejectWithValue }) => {
    try {
      const result = await uploadListingPhotos(id, photoFiles);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to upload photos");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "Photos uploaded successfully"));
      return unwrapListingResponse(result);
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

export const deleteListingPhotoAction = createAsyncThunk(
  "listingsSlice/deleteListingPhotoAction",
  async ({ listingId, photoId }, { rejectWithValue }) => {
    try {
      const result = await deleteListingPhoto(listingId, photoId);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to delete photo");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "Photo deleted successfully"));
      return { listingId, photoId };
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
