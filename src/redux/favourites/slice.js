import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteAction,
  listFavouritesAction,
  removeFavouriteAction,
} from "./action";

const toIdKey = (id) => (id == null ? null : String(id));

const resolveListing = (item) => {
  if (!item || typeof item !== "object") return null;
  if (item.listing && typeof item.listing === "object") {
    return {
      ...item.listing,
      favouritedAt: item.createdAt ?? item.favouritedAt,
    };
  }
  return item?.id != null ? item : null;
};

const normalizeFavouriteItems = (payload) => {
  const rawItems = payload?.items ?? (Array.isArray(payload) ? payload : []);
  return rawItems.map(resolveListing).filter((item) => item?.id != null);
};


const initialState = {
  items: [],
  favouriteIds: {},
  pagination: null,
  isLoading: false,
  togglingId: null,
  error: null,
};

const favouritesSlice = createSlice({
  name: "favouritesSlice",
  initialState,
  reducers: {
    clearFavouritesError: (state) => {
      state.error = null;
    },
    clearFavourites: (state) => {
      state.items = [];
      state.favouriteIds = {};
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listFavouritesAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const items = normalizeFavouriteItems(payload);
        state.items = items;
        state.favouriteIds = Object.fromEntries(
          items.map((item) => [toIdKey(item.id), true]),
        );
        state.pagination = payload?.pagination ?? null;
      })
      .addCase(listFavouritesAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? "Failed to load favourites";
      })
      .addCase(addFavouriteAction.pending, (state, { meta }) => {
        state.togglingId = toIdKey(meta.arg?.listingId);
        state.error = null;
      })
      .addCase(addFavouriteAction.fulfilled, (state, { payload }) => {
        state.togglingId = null;
        const listingId = toIdKey(payload?.listingId);
        if (!listingId) return;

        state.favouriteIds[listingId] = true;

        const listingObj = resolveListing(payload?.listing);
        if (
          listingObj?.id != null &&
          !state.items.some((item) => toIdKey(item.id) === toIdKey(listingObj.id))
        ) {
          state.items = [listingObj, ...state.items];
        }
      })
      .addCase(addFavouriteAction.rejected, (state, { payload }) => {
        state.togglingId = null;
        state.error = payload ?? "Failed to add favourite";
      })
      .addCase(removeFavouriteAction.pending, (state, { meta }) => {
        state.togglingId = toIdKey(meta.arg);
        state.error = null;
      })
      .addCase(removeFavouriteAction.fulfilled, (state, { payload: listingId }) => {
        state.togglingId = null;
        const idKey = toIdKey(listingId);
        if (!idKey) return;
        delete state.favouriteIds[idKey];
        state.items = state.items.filter((item) => toIdKey(item.id) !== idKey);
      })

      .addCase(removeFavouriteAction.rejected, (state, { payload }) => {
        state.togglingId = null;
        state.error = payload ?? "Failed to remove favourite";
      });
  },
});

export const favouritesSliceReducer = favouritesSlice.reducer;

export const { clearFavouritesError, clearFavourites } = favouritesSlice.actions;
