import { API_ROUTER } from "@/services/apiRouter";
import { axiosGet } from "@/services/axiosHelper";

export const getPublicListings = (params = {}) =>
  axiosGet(API_ROUTER.PUBLIC_LISTINGS, params);
