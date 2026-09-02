"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import { listingOptionsFilter, propertyOptionsFilter } from "@/constants/options";
import {
    setListingOptions,
    setPropertyOptions,
    setSelectedCity,
} from "@/redux/landingPageFilter/slice";

import {
    CityPanelInner,
    CityPanelScroller,
    CityPanelSection,
    CityPanelTitle,
    CityPill,
    CityPillCount,
    CityPillName,
    FilterInner,
    FilterSection,
    FilterToolbarScroll,
    FilterWrapper,
    SegmentButton,
    SegmentGroup,
} from "./style";

const PROPERTY_SEGMENT_KEYS = {
    "All Type": "segment_allType",
    Apartments: "segment_apartments",
    Lands: "segment_lands",
    Villas: "segment_villas",
    Floors: "segment_floors",
    "Commercial Offices": "segment_commercial",
    Farms: "segment_farms",
    "Rest Houses": "segment_restHouses",
};

function propertySegmentLabel(option, t) {
    const trimmed = typeof option === "string" ? option.trim() : option;
    const key = PROPERTY_SEGMENT_KEYS[trimmed];
    return key ? t(key) : trimmed;
}

function formatCount(n, locale) {
    const loc = locale === "ar" ? "ar-SA" : "en-US";
    return n.toLocaleString(loc);
}

const RealEstateFilterOption = () => {
    const t = useTranslations("RealEstateFilter");
    const locale = useLocale();
    const { listingOptions, propertyOptions, selectedCity, cityFilterOptions } =
        useSelector((state) => state.landingPageFilterSlice);
    const cityFilterOptionsData = cityFilterOptions ?? [];
    const [cityPanelOpen, setCityPanelOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <FilterSection>
            <FilterInner>
                <FilterToolbarScroll aria-label={t("filtersToolbarAria")}>
                    <FilterWrapper>
                        <SegmentGroup>
                            {listingOptionsFilter?.map((option) => (
                                <SegmentButton
                                    key={option}
                                    type="button"
                                    $active={listingOptions === option}
                                    onClick={() => dispatch(setListingOptions(option))}
                                >
                                    {option}
                                </SegmentButton>
                            ))}
                        </SegmentGroup>

                        <SegmentGroup>
                            {propertyOptionsFilter?.map((option) => (
                                <SegmentButton
                                    key={option}
                                    type="button"
                                    $active={propertyOptions === option}
                                    onClick={() => dispatch(setPropertyOptions(option))}
                                >
                                    {propertySegmentLabel(option, t)}
                                </SegmentButton>
                            ))}
                        </SegmentGroup>

                        <SegmentGroup>
                            <SegmentButton
                                id="city-filter-toggle"
                                type="button"
                                $active={cityPanelOpen}
                                aria-expanded={cityPanelOpen}
                                aria-controls="city-filter-panel"
                                onClick={() => setCityPanelOpen((open) => !open)}
                            >
                                {t("segment_city")}
                            </SegmentButton>
                        </SegmentGroup>
                    </FilterWrapper>
                </FilterToolbarScroll>
            </FilterInner>

            {cityPanelOpen ? (
                <CityPanelSection
                    id="city-filter-panel"
                    role="region"
                    aria-labelledby="city-filter-toggle"
                    aria-label={t("cityPanelRegion")}
                >
                    <CityPanelInner>
                        <CityPanelTitle>{t("cityPanelTitle")}</CityPanelTitle>
                        <CityPanelScroller>
                            {cityFilterOptionsData.map(({ id, count }) => {
                                const selected = selectedCity === id;
                                return (
                                    <CityPill
                                        key={id}
                                        type="button"
                                        $selected={selected}
                                        onClick={() =>
                                            dispatch(
                                                setSelectedCity(selected ? null : id),
                                            )
                                        }
                                        aria-pressed={selected}
                                        aria-label={t("cityOptionAria", {
                                            city: t(`city_${id}`),
                                            count: formatCount(count, locale),
                                        })}
                                    >
                                        <CityPillName $selected={selected}>
                                            {t(`city_${id}`)}
                                        </CityPillName>
                                        <CityPillCount>
                                            ({formatCount(count, locale)})
                                        </CityPillCount>
                                    </CityPill>
                                );
                            })}
                        </CityPanelScroller>
                    </CityPanelInner>
                </CityPanelSection>
            ) : null}
        </FilterSection>
    );
};

export default RealEstateFilterOption;
