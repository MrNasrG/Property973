"use client";

import { IconHomeSearchSvg } from "@/assets";

import {
    FilterEmptyDescription,
    FilterEmptyIconWrap,
    FilterEmptyState,
    FilterEmptyStepNum,
    FilterEmptyStepPill,
    FilterEmptySteps,
    FilterEmptyStrong,
    FilterEmptyTitle,
} from "./style";


const BeforeOptionsSelection = () => {
    return (
        <FilterEmptyState>
            <FilterEmptyIconWrap aria-hidden="true">
                <IconHomeSearchSvg />
            </FilterEmptyIconWrap>
            <FilterEmptyTitle>
                Start by selecting a listing type
            </FilterEmptyTitle>
            <FilterEmptyDescription>
                Choose <FilterEmptyStrong>Rent</FilterEmptyStrong> or{" "}
                <FilterEmptyStrong>Sale</FilterEmptyStrong>, then pick a
                property category — like Apartment, Villa, or Office — to
                see matching results.
            </FilterEmptyDescription>
            <FilterEmptySteps>
                <FilterEmptyStepPill>
                    <FilterEmptyStepNum aria-hidden="true">1</FilterEmptyStepNum>
                    Pick Rent or Sale
                </FilterEmptyStepPill>
                <FilterEmptyStepPill>
                    <FilterEmptyStepNum aria-hidden="true">2</FilterEmptyStepNum>
                    Choose a property type
                </FilterEmptyStepPill>
                <FilterEmptyStepPill>
                    <FilterEmptyStepNum aria-hidden="true">3</FilterEmptyStepNum>
                    See your results
                </FilterEmptyStepPill>
            </FilterEmptySteps>
        </FilterEmptyState>
    );
}

export default BeforeOptionsSelection;