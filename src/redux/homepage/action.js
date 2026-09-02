import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getPublicListings } from "./service";

const unwrapListingResponse = (result) =>
  result?.data?.data ?? result?.data ?? result;

const isApiFailure = (result) =>
  result?.success === false ||
  result?.status === false ||
  result?.data?.success === false;

export const fetchPublicListingsAction = createAsyncThunk(
  "homepageSlice/fetchPublicListingsAction",
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await getPublicListings({
        page: 1,
        limit: 12,
        sort: "-createdAt",
        ...params,
      });

      if (isApiFailure(result)) {
        const message =
          result?.message ||
          result?.data?.message ||
          "Failed to load listings";
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
