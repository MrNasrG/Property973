import { createSlice } from "@reduxjs/toolkit";
import {
    cityFilterOptions as defaultCityFilterOptions,
    listingOptionsFilter,
    propertyOptionsFilter,
} from "@/constants/options";
import {
    formatDateKey,
    getTomorrowDate,
    normalizeDate,
} from "@/utils/globalFunctions";

const todayDate = normalizeDate(new Date());
const tomorrowDate = getTomorrowDate(todayDate);

const initialState = {
    listingOptions: listingOptionsFilter[0],
    propertyOptions: propertyOptionsFilter[0],
   
    selectedCity: null,
    callNowPopupOpen: false,
    callNowPopupTargetId: null,
    /** Project tab grid: id of the card last clicked (for active border). */
    selectedProjectCardId: null,
    isLoading: false,
    error: null,
    cityFilterOptions: defaultCityFilterOptions,

    //daily rent tab
    dailyrentStartDate: formatDateKey(todayDate),
    dailyrentEndDate: formatDateKey(tomorrowDate),
    /** `null` until the user picks a city in the daily-rent city modal (chip shows "Choose city"). */
    dailyrentCity: null,
    cityPopUpOpen: false,
    filtersPopUpOpen: false,
    selectedCityPopUpOptions: null,


    //searches page searchListingType: "rent",
    selectedPropertySearchOption: null,
    selectedRentOrSaleOption: null,
};

const landingPageFilterSlice = createSlice({
    name: "landingPageFilterSlice",
    initialState,
    reducers: {
        setListingOptions: (state, { payload }) => {
            state.listingOptions = payload;
        },
        setPropertyOptions: (state, { payload }) => {
            state.propertyOptions = payload;
        },
        setSelectedPropertySearchOption: (state, { payload }) => {
            state.selectedPropertySearchOption = payload;
        },
        setSelectedRentOrSaleOption: (state, { payload }) => {
            state.selectedRentOrSaleOption = payload;
        },
        setSelectedCity: (state, { payload }) => {
            state.selectedCity = payload;
        },
        setCallNowPopupOpen: (state, { payload }) => {
            state.callNowPopupOpen = payload;
            if (!payload) {
                state.callNowPopupTargetId = null;
            }
        },
        setCallNowPopupTargetId: (state, { payload }) => {
            state.callNowPopupTargetId = payload;
        },
        setSelectedProjectCardId: (state, { payload }) => {
            state.selectedProjectCardId = payload;
        },
        setCityFilterOptions: (state, { payload }) => {
            state.cityFilterOptions = payload;
        },
        //daily rent tab
        setDailyrentStartDate: (state, { payload }) => {
            state.dailyrentStartDate = payload;
        },
        setDailyrentEndDate: (state, { payload }) => {
            state.dailyrentEndDate = payload;
        },
        setCityPopUpOpen: (state, { payload }) => {
            state.cityPopUpOpen = payload;
        },
        setFiltersPopUpOpen: (state, { payload }) => {
            state.filtersPopUpOpen = payload;
        },
        setDailyrentCity: (state, { payload }) => {
            state.dailyrentCity = payload;
        },
        setSelectedCityPopUpOptions: (state, { payload }) => {
            state.selectedCityPopUpOptions = payload;
        },  
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(getUserAction.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(getUserAction.fulfilled, (state, action) => {
    //       state.userData = action.payload;
    //       state.getUserData = action.payload;
    //       state.isLoading = false;
    //       state.error = null;
    //       state.notificationType = action.payload?.data?.notificationType == 1 ? false : true
    //       state.allNotifications = action.payload?.data?.isAllNotificationsEnabled
    //       state.matchNotifications = action.payload?.data?.isMatchNotification
    //       state.likeNotifications = action.payload?.data?.isSuperLikesNotification
    //       // state.imageNotifications = action.payload?.data?.isImageStatusNotification

    //     })
    //     .addCase(getUserAction.rejected, (state, action) => {
    //       state.isLoading = false;
    //       state.error = action.error.message || "Error fetching user data";
    //     })

    // },
});

export const landingPageFilterSliceReducer = landingPageFilterSlice.reducer;

export const {
    setListingOptions,
    setPropertyOptions,
    setSelectedCity,
    setCallNowPopupOpen,
    setCallNowPopupTargetId,
    setSelectedProjectCardId,
    setCityFilterOptions,
    setDailyrentStartDate,
    setDailyrentEndDate,
    setDailyrentCity,
    setFiltersPopUpOpen,
    setSelectedCityPopUpOptions,
    setCityPopUpOpen,
    setSelectedPropertySearchOption,
    setSelectedRentOrSaleOption,
    setIsLoading,
    setError,
} = landingPageFilterSlice.actions;