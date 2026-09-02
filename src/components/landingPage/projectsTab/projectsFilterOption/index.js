"use client";

import { useState } from "react";

import { IconFilterSlidersSvg } from "@/assets";

import { PROJECT_CITY_OPTIONS } from "./options";
import {
    CityPill,
    CityPillList,
    CityScrollTrack,
    FilterInner,
    FilterRow,
    FilterSection,
    FiltersButton,
    FiltersButtonIcon,
} from "./style";

const ProjectsFilterOption = () => {
    const [selectedCity, setSelectedCity] = useState(PROJECT_CITY_OPTIONS[0]);

    return (
        <FilterSection>
            <FilterInner>
                <FilterRow>
                    <FiltersButton type="button" aria-label="Open filters">
                        <FiltersButtonIcon>
                            <IconFilterSlidersSvg />
                        </FiltersButtonIcon>
                        Filters
                    </FiltersButton>

                    <CityScrollTrack
                        role="toolbar"
                        aria-label="Filter projects by city"
                    >
                        <CityPillList>
                            {PROJECT_CITY_OPTIONS.map((city) => {
                                const active = selectedCity === city;
                                return (
                                    <CityPill
                                        key={city}
                                        type="button"
                                        $active={active}
                                        aria-pressed={active}
                                        onClick={() => setSelectedCity(city)}
                                    >
                                        {city}
                                    </CityPill>
                                );
                            })}
                        </CityPillList>
                    </CityScrollTrack>
                </FilterRow>
            </FilterInner>
        </FilterSection>
    );
};

export default ProjectsFilterOption;
