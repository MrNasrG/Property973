import { createSlice } from "@reduxjs/toolkit";
import { fetchPublicListingsAction } from "./action";

const initialState = {
  items: [],
  pagination: null,
  selectedListing: null,
  isLoading: false,
  error: null,
};

const homepageSlice = createSlice({
  name: "homepageSlice",
  initialState,
  reducers: {
    setSelectedListing: (state, { payload }) => {
      state.selectedListing = payload ?? null;
    },
    clearHomepageListingsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicListingsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicListingsAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload?.items ?? (Array.isArray(payload) ? payload : []);
        state.pagination = payload?.pagination ?? null;
      })
      .addCase(fetchPublicListingsAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? "Failed to load listings";
      });
  },
});

export const homepageSliceReducer = homepageSlice.reducer;

export const { setSelectedListing, clearHomepageListingsError } = homepageSlice.actions;
