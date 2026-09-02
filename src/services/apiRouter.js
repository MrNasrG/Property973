export const API_ROUTER = {
  // LOGIN_USER: "/auth/register",
  REGISTER_USER: "/auth/register",
  LOGIN_USER: "/auth/login",
  VERIFY_OTP: "/auth/otp/verify",
  FORGOT_PASSWORD: "/auth/forgot-password",
  FORGOT_PASSWORD_VERIFY_OTP: "/auth/forgot-password/verify-otp",
  RESET_PASSWORD: "/auth/reset-password",

  // Dashboard
  GET_USER_PROFILE: "/auth/me",
  REFRESH_TOKEN: "/auth/refresh",

  // Owner property listings
  CREATE_LISTING: "/listings",
  LISTINGS: "/listings",
  PUBLIC_LISTINGS: "/listings/public",
  LISTING_BY_ID: (id) => `/listings/${id}`,
  LISTING_PHOTOS: (id) => `/listings/${id}/photos`,
  LISTING_PHOTO_BY_ID: (listingId, photoId) => `/listings/${listingId}/photos/${photoId}`,

  // Favourites (wishlist)
  FAVOURITES: "/favourites",
  FAVOURITE_BY_LISTING_ID: (listingId) => `/favourites/${listingId}`,
};

