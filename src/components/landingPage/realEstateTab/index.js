"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "@/i18n/navigation";
import { listFavouritesAction } from "@/redux/favourites/action";
import { fetchPublicListingsAction } from "@/redux/homepage/action";
import { setSelectedListing } from "@/redux/homepage/slice";
import { PATH_PROPERTY } from "@/routes/path";
import { getAuthToken } from "@/utils/authToken";
import { mapListingToRealEstateCard } from "@/utils/listingDisplay";


import RealEstateCardComponent from "./realEstateCardComponent";
import RealEstateFilterOption from "./realEstatefilterOption";
import { CardStack, CardWrapper, EmptyState } from "./realEstateCardComponent/style";

const RealEstateTab = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, isLoading, error } = useSelector((state) => state.homepageSlice);
  const { listingOptions, propertyOptions, selectedCity } = useSelector(
    (state) => state.landingPageFilterSlice,
  );

  useEffect(() => {
    const params = {};

    if (listingOptions) {
      params.purpose = listingOptions.toLowerCase();
    }

    const propertyType =
      typeof propertyOptions === "string" ? propertyOptions.trim() : "";
    if (propertyType) {
      params.propertyType = propertyType;
    }

    if (selectedCity) {
      params.city = selectedCity;
    }

    dispatch(fetchPublicListingsAction(params));
  }, [dispatch, listingOptions, propertyOptions, selectedCity]);

  useEffect(() => {
    if (!getAuthToken()) return;
    dispatch(listFavouritesAction({ page: 1, limit: 100 }));
  }, [dispatch]);


  const handleViewDetails = useCallback(
    (listing) => {
      if (!listing?.id) return;
      dispatch(setSelectedListing(listing));
      router.push(PATH_PROPERTY.detail(listing.id));
    },
    [dispatch, router],
  );

  return (
    <>
      <RealEstateFilterOption />
      <CardWrapper>
        <CardStack>
          {isLoading ? (
            <EmptyState>Loading listings…</EmptyState>
          ) : error ? (
            <EmptyState>{error}</EmptyState>
          ) : items.length === 0 ? (
            <EmptyState>No listings available right now.</EmptyState>
          ) : (
            items.map((listing) => (
              <RealEstateCardComponent
                key={listing.id}
                listing={mapListingToRealEstateCard(listing)}
                sourceListing={listing}
                onViewDetails={() => handleViewDetails(listing)}
              />
            ))

          )}
        </CardStack>
      </CardWrapper>
    </>
  );
};

export default RealEstateTab;
