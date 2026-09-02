import { createSlice } from "@reduxjs/toolkit";

/** Initial nested search filter state — keys align with `searchFiltersConfig.SEARCH_FILTER_FIELDS`. */
export const initialSearchFiltersState = Object.freeze({
    premiumPeriod: null,
    minPrice: "",
    maxPrice: "",
    bedrooms: null,
    occupantType: null,
    livingRooms: null,
    wc: null,
    leastArea: "",
    greatestArea: "",
    floor: "",
    ageLessThan: "",
    furnished: false,
    carEntrance: false,
    airConditioned: false,
    privateRoof: false,
    inVilla: false,
    twoEntrances: false,
    specialEntrance: false,
    description: "",
    listingsWithImagesOnly: false,
    aqarPartnersAssistance: false,
});

const initialState = {
    headerTabOptions: 0,
    addButtonPopUp: false,
    isLoading: false,
    error: null,
    searchFilters: { ...initialSearchFiltersState },
};

const searchOptionsSlice = createSlice({
    name: "searchOptionsSlice",
    initialState,
    reducers: {
        setHeaderTabOptions: (state, { payload }) => {
            state.headerTabOptions = payload;
        },
        setAddButtonPopUp: (state, { payload }) => {
            state.addButtonPopUp = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        patchSearchFilters: (state, { payload }) => {
            if (!payload || typeof payload !== "object") return;
            Object.assign(state.searchFilters, payload);
        },
        resetSearchFilters: (state) => {
            state.searchFilters = { ...initialSearchFiltersState };
        },
        setPremiumPeriod: (state, { payload }) => {
            state.searchFilters.premiumPeriod = payload;
        },
        setMinPrice: (state, { payload }) => {
            state.searchFilters.minPrice = payload ?? "";
        },
        setMaxPrice: (state, { payload }) => {
            state.searchFilters.maxPrice = payload ?? "";
        },
        setBedrooms: (state, { payload }) => {
            state.searchFilters.bedrooms = payload;
        },
        setOccupantType: (state, { payload }) => {
            state.searchFilters.occupantType = payload;
        },
        setLivingRooms: (state, { payload }) => {
            state.searchFilters.livingRooms = payload;
        },
        setWc: (state, { payload }) => {
            state.searchFilters.wc = payload;
        },
        setLeastArea: (state, { payload }) => {
            state.searchFilters.leastArea = payload ?? "";
        },
        setGreatestArea: (state, { payload }) => {
            state.searchFilters.greatestArea = payload ?? "";
        },
        setFloor: (state, { payload }) => {
            state.searchFilters.floor = payload ?? "";
        },
        setAgeLessThan: (state, { payload }) => {
            state.searchFilters.ageLessThan = payload ?? "";
        },
        setFurnished: (state, { payload }) => {
            state.searchFilters.furnished = Boolean(payload);
        },
        setCarEntrance: (state, { payload }) => {
            state.searchFilters.carEntrance = Boolean(payload);
        },
        setAirConditioned: (state, { payload }) => {
            state.searchFilters.airConditioned = Boolean(payload);
        },
        setPrivateRoof: (state, { payload }) => {
            state.searchFilters.privateRoof = Boolean(payload);
        },
        setInVilla: (state, { payload }) => {
            state.searchFilters.inVilla = Boolean(payload);
        },
        setTwoEntrances: (state, { payload }) => {
            state.searchFilters.twoEntrances = Boolean(payload);
        },
        setSpecialEntrance: (state, { payload }) => {
            state.searchFilters.specialEntrance = Boolean(payload);
        },
        setDescription: (state, { payload }) => {
            state.searchFilters.description = typeof payload === "string" ? payload : "";
        },
        setListingsWithImagesOnly: (state, { payload }) => {
            state.searchFilters.listingsWithImagesOnly = Boolean(payload);
        },
        setAqarPartnersAssistance: (state, { payload }) => {
            state.searchFilters.aqarPartnersAssistance = Boolean(payload);
        },
    },
});

export const searchOptionsSliceReducer = searchOptionsSlice.reducer;

export const {
    setHeaderTabOptions,
    setAddButtonPopUp,
    setIsLoading,
    setError,
    patchSearchFilters,
    resetSearchFilters,
    setPremiumPeriod,
    setMinPrice,
    setMaxPrice,
    setBedrooms,
    setOccupantType,
    setLivingRooms,
    setWc,
    setLeastArea,
    setGreatestArea,
    setFloor,
    setAgeLessThan,
    setFurnished,
    setCarEntrance,
    setAirConditioned,
    setPrivateRoof,
    setInVilla,
    setTwoEntrances,
    setSpecialEntrance,
    setDescription,
    setListingsWithImagesOnly,
    setAqarPartnersAssistance,
} = searchOptionsSlice.actions;
