import { createSlice } from "@reduxjs/toolkit";
import {
  createListingAction,
  deleteListingAction,
  getListingAction,
  listListingsAction,
  updateListingAction,
} from "./action";

const initialState = {
  items: [],
  pagination: null,
  selectedListing: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
};

const listingsSlice = createSlice({
  name: "listingsSlice",
  initialState,
  reducers: {
    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },
    clearListingsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listListingsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listListingsAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload?.items ?? (Array.isArray(payload) ? payload : []);
        state.pagination = payload?.pagination ?? null;
      })
      .addCase(listListingsAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? "Failed to load listings";
      })
      .addCase(getListingAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListingAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedListing = payload ?? null;
      })
      .addCase(getListingAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? "Failed to load listing";
      })
      .addCase(createListingAction.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createListingAction.fulfilled, (state, { payload }) => {
        state.isSubmitting = false;
        if (payload) {
          state.items = [payload, ...state.items];
        }
      })
      .addCase(createListingAction.rejected, (state, { payload }) => {
        state.isSubmitting = false;
        state.error = payload ?? "Failed to create listing";
      })
      .addCase(updateListingAction.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateListingAction.fulfilled, (state, { payload }) => {
        state.isSubmitting = false;
        if (!payload?.id) return;
        state.items = state.items.map((item) =>
          item.id === payload.id ? payload : item,
        );
        if (state.selectedListing?.id === payload.id) {
          state.selectedListing = payload;
        }
      })
      .addCase(updateListingAction.rejected, (state, { payload }) => {
        state.isSubmitting = false;
        state.error = payload ?? "Failed to update listing";
      })
      .addCase(deleteListingAction.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(deleteListingAction.fulfilled, (state, { payload: id }) => {
        state.isSubmitting = false;
        state.items = state.items.filter((item) => item.id !== id);
        if (state.selectedListing?.id === id) {
          state.selectedListing = null;
        }
      })
      .addCase(deleteListingAction.rejected, (state, { payload }) => {
        state.isSubmitting = false;
        state.error = payload ?? "Failed to delete listing";
      });
  },
});

export const listingsSliceReducer = listingsSlice.reducer;

export const { clearSelectedListing, clearListingsError } = listingsSlice.actions;
