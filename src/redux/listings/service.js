import { API_ROUTER } from "@/services/apiRouter";
import { createListing as createListingRequest } from "@/services/listingService";
import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPostFormData,
} from "@/services/axiosHelper";
import {
  buildListingBody,
  buildListingFormData,
  extractPhotoFiles,
} from "@/utils/listingPayload";
import { getVisibleOwnerPropertyFields } from "@/constants/propertyListingFields";

export { createListingRequest as createListingApi };

export const createListing = createListingRequest;

export const listListings = (params = {}) => axiosGet(API_ROUTER.LISTINGS, params);

export const getListing = (id) => axiosGet(API_ROUTER.LISTING_BY_ID(id));

export const updateListing = (id, formData) => {
  const visibleFields = getVisibleOwnerPropertyFields(
    formData?.purpose,
    formData?.propertyType,
  );
  return axiosPatch(
    API_ROUTER.LISTING_BY_ID(id),
    buildListingBody(formData, visibleFields),
  );
};

export const deleteListing = (id) => axiosDelete(API_ROUTER.LISTING_BY_ID(id));

export const uploadListingPhotos = (id, photoFiles = []) => {
  const formData = new FormData();
  photoFiles.forEach((file) => {
    if (file instanceof File) {
      formData.append("photos", file);
    }
  });
  return axiosPostFormData(API_ROUTER.LISTING_PHOTOS(id), formData);
};

export const deleteListingPhoto = (listingId, photoId) =>
  axiosDelete(API_ROUTER.LISTING_PHOTO_BY_ID(listingId, photoId));
