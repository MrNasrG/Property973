import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { addFavourite, listFavourites, removeFavourite } from "./service";

const getApiErrorMessage = (result, fallback = "Something went wrong") =>
  result?.message || result?.data?.message || fallback;

const getApiSuccessMessage = (result, fallback) =>
  result?.data?.message || result?.message || fallback;

const isApiFailure = (result) =>
  result?.success === false ||
  result?.status === false ||
  result?.data?.success === false;

const unwrapResponse = (result) => result?.data?.data ?? result?.data ?? result;

export const listFavouritesAction = createAsyncThunk(
  "favouritesSlice/listFavouritesAction",
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await listFavourites(params);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to load favourites");
        return rejectWithValue(message);
      }

      return unwrapResponse(result) ?? { items: [], pagination: null };
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

export const addFavouriteAction = createAsyncThunk(
  "favouritesSlice/addFavouriteAction",
  async ({ listingId, listing = null }, { rejectWithValue }) => {
    try {
      const result = await addFavourite(listingId);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to add favourite");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "Added to favourites"));
      const payload = unwrapResponse(result);
      return {
        listingId,
        listing: payload?.listing ?? payload ?? listing,
      };
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

export const removeFavouriteAction = createAsyncThunk(
  "favouritesSlice/removeFavouriteAction",
  async (listingId, { rejectWithValue }) => {
    try {
      const result = await removeFavourite(listingId);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result, "Failed to remove favourite");
        toast.error(message);
        return rejectWithValue(message);
      }

      toast.success(getApiSuccessMessage(result, "Removed from favourites"));
      return listingId;
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

export const toggleFavouriteAction = createAsyncThunk(
  "favouritesSlice/toggleFavouriteAction",
  async ({ listingId, listing = null, isFavourite }, { dispatch, rejectWithValue }) => {
    if (!listingId) {
      return rejectWithValue("Listing id is required");
    }

    if (isFavourite) {
      const result = await dispatch(removeFavouriteAction(listingId));
      if (removeFavouriteAction.rejected.match(result)) {
        return rejectWithValue(result.payload);
      }
      return { listingId, isFavourite: false };
    }

    const result = await dispatch(addFavouriteAction({ listingId, listing }));
    if (addFavouriteAction.rejected.match(result)) {
      return rejectWithValue(result.payload);
    }
    return { listingId, isFavourite: true, listing: result.payload?.listing };
  },
);
