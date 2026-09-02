import { API_ROUTER } from "@/services/apiRouter";
import { axiosDelete, axiosGet, axiosPost } from "@/services/axiosHelper";

export const listFavourites = (params = {}) =>
  axiosGet(API_ROUTER.FAVOURITES, params);

export const addFavourite = (listingId) =>
  axiosPost(API_ROUTER.FAVOURITES, { listingId });

export const removeFavourite = (listingId) =>
  axiosDelete(API_ROUTER.FAVOURITE_BY_LISTING_ID(listingId));
