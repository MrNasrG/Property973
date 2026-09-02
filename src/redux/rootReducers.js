import { combineReducers } from "@reduxjs/toolkit";
import { headerApiSliceReducer } from "./header/slice";
import { landingPageFilterSliceReducer } from "./landingPageFilter/slice";
import { addListingApiSliceReducer } from "./addlisting/slice";
import { searchOptionsSliceReducer } from "./searchOptions/slice";
import { authSliceReducer } from "./auth/slice";
import { dashboardSliceReducer } from "./dashboard/slice";
import { listingsSliceReducer } from "./listings/slice";
import { homepageSliceReducer } from "./homepage/slice";
import { favouritesSliceReducer } from "./favourites/slice";



const rootReducer = combineReducers({
    authSlice: authSliceReducer,
    dashboardSlice: dashboardSliceReducer,
    listingsSlice: listingsSliceReducer,
    homepageSlice: homepageSliceReducer,
    favouritesSlice: favouritesSliceReducer,
    headerApiSlice: headerApiSliceReducer,
    landingPageFilterSlice: landingPageFilterSliceReducer,
    addListingApiSlice: addListingApiSliceReducer,
    searchOptionsSlice: searchOptionsSliceReducer,
})


export default rootReducer;