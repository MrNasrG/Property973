"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    CloseIconSvg,
    IconBuildingSvg,
    IconCheckSmallSvg,
    IconCrosshairSvg,
    SearchIconSvg,
} from "@/assets";
import { setCityPopUpOpen, setDailyrentCity } from "@/redux/landingPageFilter/slice";

import {
    CityIconWrap,
    CityIndicator,
    CityList,
    CityName,
    CityPopupCard,
    CityPopupHeader,
    CityPopupOverlay,
    CityPopupTitle,
    CityRow,
    ClearSearchButton,
    LocateButton,
    LocateIcon,
    LocateLabel,
    SearchFieldWrap,
    SearchIconWrap,
    SearchInput,
    SearchRow,
    SearchSection,
} from "./style";
import { cityPopUpOptions } from "@/constants/options";

/** Ids that should not use simple title-casing from `id` (see `cityFilterOptions` in Redux / `constants/options.js`). */
const CITY_LABEL_OVERRIDES = {
    khobar: "Al Khobar",
};

/** Display label for a city row — the list itself comes from `cityFilterOptions`, not from this map. */
function getCityLabel(id) {
    if (!id || typeof id !== "string") {
        return "";
    }
    const key = id.trim();
    if (CITY_LABEL_OVERRIDES[key]) {
        return CITY_LABEL_OVERRIDES[key];
    }
    return key
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
}

/** Renders only while open so local UI state (e.g. search) resets when the modal closes. */
const CityPopUpDialogContent = () => {
    const dispatch = useDispatch();
    const { dailyrentCity } = useSelector((state) => state.landingPageFilterSlice);
    const [searchQuery, setSearchQuery] = useState("");

    const close = useCallback(() => {
        dispatch(setCityPopUpOpen(false));
    }, [dispatch]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalTouchAction = document.body.style.touchAction;
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.touchAction = originalTouchAction;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [close]);

    const filteredOptions = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) {
            return cityPopUpOptions;
        }
        return cityPopUpOptions.filter((city) => {
            const label = getCityLabel(city.id);
            return label.toLowerCase().includes(q);
        });
    }, [searchQuery]);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            close();
        }
    };

    const handleSelectCity = (cityId) => {
        const label = getCityLabel(cityId);
        if (!label) {
            return;
        }
        const selected = isCitySelected(cityId);
        dispatch(setDailyrentCity(selected ? null : label));
        close();
    };

    const isCitySelected = (cityId) => {
        const label = getCityLabel(cityId);
        if (!label || !dailyrentCity) {
            return false;
        }
        return dailyrentCity.trim().toLowerCase() === label.toLowerCase();
    };

    return (
        <CityPopupOverlay onClick={handleOverlayClick}>
            <CityPopupCard
                role="dialog"
                aria-modal="true"
                aria-labelledby="city-popup-title"
                onClick={(e) => e.stopPropagation()}
            >
                <CityPopupHeader>
                    <CityPopupTitle id="city-popup-title">Choose city</CityPopupTitle>
                    <LocateButton type="button">
                        <LocateIcon aria-hidden="true">
                            <IconCrosshairSvg />
                        </LocateIcon>
                        <LocateLabel>Locate me</LocateLabel>
                    </LocateButton>
                </CityPopupHeader>

                <SearchSection>
                    <SearchRow>
                        <SearchIconWrap aria-hidden="true">
                            <SearchIconSvg />
                        </SearchIconWrap>
                        <SearchFieldWrap>
                            <SearchInput
                                type="text"
                                inputMode="search"
                                enterKeyHint="search"
                                role="searchbox"
                                placeholder="Search city..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoComplete="off"
                                aria-label="Search city"
                                $showClear={Boolean(searchQuery.trim())}
                            />
                            {searchQuery.trim() ? (
                                <ClearSearchButton
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <CloseIconSvg />
                                </ClearSearchButton>
                            ) : null}
                        </SearchFieldWrap>
                    </SearchRow>
                </SearchSection>

                <CityList role="listbox" aria-label="Cities">
                    {filteredOptions.map((city) => {
                        const label = getCityLabel(city.id);
                        if (!label) {
                            return null;
                        }
                        const selected = isCitySelected(city.id);
                        return (
                            <CityRow
                                key={city.id}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                $selected={selected}
                                onClick={() => handleSelectCity(city.id)}
                            >
                                <CityIconWrap $selected={selected} aria-hidden="true">
                                    <IconBuildingSvg />
                                </CityIconWrap>
                                <CityName $selected={selected}>{label}</CityName>
                                <CityIndicator $selected={selected} aria-hidden="true">
                                    {selected ? <IconCheckSmallSvg /> : null}
                                </CityIndicator>
                            </CityRow>
                        );
                    })}
                </CityList>
            </CityPopupCard>
        </CityPopupOverlay>
    );
};

const CityPopUpModel = () => {
    const cityPopUpOpen = useSelector(
        (state) => state.landingPageFilterSlice.cityPopUpOpen,
    );
    if (!cityPopUpOpen) {
        return null;
    }
    return <CityPopUpDialogContent />;
};

export default CityPopUpModel;
