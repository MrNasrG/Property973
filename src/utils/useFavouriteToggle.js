"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "@/i18n/navigation";
import { PATH_AUTH } from "@/routes/path";
import { toggleFavouriteAction } from "@/redux/favourites/action";
import { getAuthToken } from "@/utils/authToken";

/**
 * Toggle a listing in the signed-in user's favourites.
 * Redirects to login when there is no auth token.
 */
export const useFavouriteToggle = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const favouriteIds = useSelector(
    (state) => state.favouritesSlice?.favouriteIds ?? {},
  );
  const togglingId = useSelector((state) => state.favouritesSlice?.togglingId);

  const isFavourite = useCallback(
    (listingId) => Boolean(listingId != null && favouriteIds[String(listingId)]),
    [favouriteIds],
  );

  const isToggling = useCallback(
    (listingId) =>
      Boolean(listingId != null && togglingId === String(listingId)),
    [togglingId],
  );

  const toggleFavourite = useCallback(
    async (listing) => {
      const listingId = listing?.id ?? listing;
      if (listingId == null) return;

      if (!getAuthToken()) {
        router.push(PATH_AUTH.login);
        return;
      }

      const idKey = String(listingId);
      await dispatch(
        toggleFavouriteAction({
          listingId,
          listing: typeof listing === "object" ? listing : null,
          isFavourite: Boolean(favouriteIds[idKey]),
        }),
      );
    },
    [dispatch, favouriteIds, router],
  );


  return { isFavourite, isToggling, toggleFavourite, favouriteIds };
};
