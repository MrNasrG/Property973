"use client";

import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header/Header";
import Footer from "@/components/footer";
import {
    setSelectedRentOrSaleOption,
    setSelectedPropertySearchOption,
} from "@/redux/landingPageFilter/slice";
import { resetSearchFilters } from "@/redux/searchOptions/slice";
import { searchesPropertyTypeOptions } from "@/constants/options";
import BeforeOptionsSelection from "@/components/search/beforeSelection";
import AfterOptionsSelection from "@/components/search/afterSelection";

import {
    ContentShell,
    FilterSelect,
    FilterSelectChevron,
    FilterSelectWrap,
    PageWrapper,
    SearchesSection,
    TopFilterBar,
} from "./styles";

/** Matches disabled placeholder `<option value="">`; keeps Redux `null` until user picks a value. */
const FILTER_SELECT_EMPTY_VALUE = "";

const searchesRentSaleOptions = [
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
];


const SearchesPage = () => {
    const dispatch = useDispatch();
    const {
        selectedRentOrSaleOption,
        selectedPropertySearchOption,
    } = useSelector((state) => state.landingPageFilterSlice);

    const showFilterEmptyState =
        selectedRentOrSaleOption == null || selectedPropertySearchOption == null;

    return (
        <PageWrapper>
            <Header />
            <SearchesSection>
                <ContentShell>
                    <TopFilterBar>
                        <FilterSelectWrap>
                            <FilterSelect
                                aria-label="Listing type"
                                value={selectedRentOrSaleOption ?? FILTER_SELECT_EMPTY_VALUE}
                                onChange={(e) => {
                                    const next = e.target.value;
                                    dispatch(
                                        setSelectedRentOrSaleOption(
                                            next === FILTER_SELECT_EMPTY_VALUE ? null : next,
                                        ),
                                    );
                                    dispatch(resetSearchFilters());
                                }}
                            >
                                <option value={FILTER_SELECT_EMPTY_VALUE} disabled>
                                    Rent or sale
                                </option>
                                {searchesRentSaleOptions.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </FilterSelect>
                            <FilterSelectChevron aria-hidden>▾</FilterSelectChevron>
                        </FilterSelectWrap>

                        <FilterSelectWrap>
                            <FilterSelect
                                aria-label="Property type"
                                value={
                                    selectedPropertySearchOption ?? FILTER_SELECT_EMPTY_VALUE
                                }
                                onChange={(e) => {
                                    const next = e.target.value;
                                    dispatch(
                                        setSelectedPropertySearchOption(
                                            next === FILTER_SELECT_EMPTY_VALUE ? null : next,
                                        ),
                                    );
                                    dispatch(resetSearchFilters());
                                }}
                            >
                                <option value={FILTER_SELECT_EMPTY_VALUE} disabled>
                                    Property type
                                </option>
                                {searchesPropertyTypeOptions.map((propertyType) => (
                                    <option key={propertyType} value={propertyType}>
                                        {propertyType}
                                    </option>
                                ))}
                            </FilterSelect>
                            <FilterSelectChevron aria-hidden>▾</FilterSelectChevron>
                        </FilterSelectWrap>
                    </TopFilterBar>

                    {showFilterEmptyState ? <BeforeOptionsSelection /> : <AfterOptionsSelection />}
                </ContentShell>
            </SearchesSection>
            <Footer />
        </PageWrapper>
    );
};

export default SearchesPage;
