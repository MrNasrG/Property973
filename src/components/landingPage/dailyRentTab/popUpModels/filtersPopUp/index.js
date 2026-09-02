"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    IconBookingCampSvg,
    IconBookingChaletSvg,
    IconBookingFarmSvg,
    IconBookingFurnishedApartmentSvg,
    IconBookingFurnishedStudioSvg,
    IconBookingFurnishedVillaSvg,
    IconBookingHallSvg,
    IconBookingSwimmingPoolSvg,
    CloseIconSvg,
} from "@/assets";
import { setFiltersPopUpOpen } from "@/redux/landingPageFilter/slice";
import {
    CategoryButton,
    CategoryIcon,
    CategoryLabel,
    CategoryGrid,
    DrawerHeader,
    FiltersDrawer,
    FiltersOverlay,
    HeaderLeft,
    HeaderTitle,
    IconButton,
    Panel,
    Track,
    Viewport,
} from "./style";
import CategoryFilterForm from "./CategoryFilterForm";

const BOOKING_TYPE_OPTIONS = [
    { id: "furnished-apartment", title: "Furnished Apartment for Booking", icon: IconBookingFurnishedApartmentSvg },
    { id: "furnished-villa", title: "Furnished Villa for Booking", icon: IconBookingFurnishedVillaSvg },
    { id: "furnished-studio", title: "Furnished Studio for Booking", icon: IconBookingFurnishedStudioSvg },
    { id: "chalet", title: "Chalet for Booking", icon: IconBookingChaletSvg },
    { id: "camp", title: "Camp for Booking", icon: IconBookingCampSvg },
    { id: "farm", title: "Farm for Booking", icon: IconBookingFarmSvg },
    { id: "hall", title: "Hall for Booking", icon: IconBookingHallSvg },
    { id: "swimming-pool", title: "Swimming Pool for Booking", icon: IconBookingSwimmingPoolSvg },
];

const BackArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const FiltersPopUp = () => {
    const dispatch = useDispatch();
    const filtersPopUpOpen = useSelector(
        (state) => state.landingPageFilterSlice.filtersPopUpOpen,
    );
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const close = useCallback(() => {
        dispatch(setFiltersPopUpOpen(false));
        setSelectedCategoryId(null);
    }, [dispatch]);

    useEffect(() => {
        if (!filtersPopUpOpen) {
            return undefined;
        }
        const originalOverflow = document.body.style.overflow;
        const originalTouchAction = document.body.style.touchAction;
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.touchAction = originalTouchAction;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [close, filtersPopUpOpen]);

    const selectedCategory = useMemo(
        () => BOOKING_TYPE_OPTIONS.find((item) => item.id === selectedCategoryId) ?? null,
        [selectedCategoryId],
    );

    if (!filtersPopUpOpen) {
        return null;
    }

    return (
        <FiltersOverlay
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    close();
                }
            }}
        >
            <FiltersDrawer role="dialog" aria-modal="true" aria-labelledby="daily-rent-filters-title">
                <DrawerHeader>
                    <HeaderLeft>
                        {selectedCategory ? (
                            <IconButton
                                type="button"
                                aria-label="Back to booking type options"
                                onClick={() => setSelectedCategoryId(null)}
                            >
                                <BackArrowIcon />
                            </IconButton>
                        ) : null}
                        <HeaderTitle id="daily-rent-filters-title">
                            {selectedCategory ? selectedCategory.title : "Filters"}
                        </HeaderTitle>
                    </HeaderLeft>

                    <IconButton type="button" aria-label="Close filters popup" onClick={close}>
                        <CloseIconSvg />
                    </IconButton>
                </DrawerHeader>

                <Viewport>
                    <Track $showForm={Boolean(selectedCategory)}>
                        <Panel>
                            <CategoryGrid>
                                {BOOKING_TYPE_OPTIONS.map((option) => (
                                    <CategoryButton
                                        key={option.id}
                                        type="button"
                                        $active={option.id === selectedCategoryId}
                                        onClick={() => setSelectedCategoryId(option.id)}
                                    >
                                        <CategoryIcon aria-hidden="true">
                                            <option.icon />
                                        </CategoryIcon>
                                        <CategoryLabel>{option.title}</CategoryLabel>
                                    </CategoryButton>
                                ))}
                            </CategoryGrid>
                        </Panel>

                        <Panel>
                            {selectedCategory ? (
                                <CategoryFilterForm
                                    categoryId={selectedCategoryId}
                                    onFilter={(data) => console.log(data)}
                                />
                            ) : null}
                        </Panel>
                    </Track>
                </Viewport>
            </FiltersDrawer>
        </FiltersOverlay>
    );
};

export default FiltersPopUp;