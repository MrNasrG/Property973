"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { composeSearchFiltersKey } from "@/constants/searchFiltersConfig";

import SearchFiltersForm from "./SearchFiltersForm";

const AfterOptionsSelection = () => {
    const { selectedRentOrSaleOption, selectedPropertySearchOption } = useSelector(
        (state) => state.landingPageFilterSlice,
    );

    const filterFormKey = useMemo(
        () => composeSearchFiltersKey(selectedRentOrSaleOption, selectedPropertySearchOption),
        [selectedRentOrSaleOption, selectedPropertySearchOption],
    );

    return (
        <SearchFiltersForm
            key={filterFormKey}
            purpose={selectedRentOrSaleOption}
            propertyType={selectedPropertySearchOption}
        />
    );
};

export default AfterOptionsSelection;
