"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
    AGE_LESS_THAN_OPTIONS,
    BEDROOM_OPTIONS,
    FEATURE_CHECKBOXES,
    FEATURE_CHECKBOX_FIELD_IDS,
    FLOOR_OPTIONS,
    getVisibleSearchFilterFields,
    LIVING_ROOM_OPTIONS,
    OCCUPANT_OPTIONS,
    PREMIUM_PERIOD_OPTIONS,
    SEARCH_PURPOSE,
    SEARCH_FILTER_FIELDS as F,
    WC_OPTIONS,
} from "@/constants/searchFiltersConfig";
import {
    initialSearchFiltersState,
    patchSearchFilters,
    resetSearchFilters,
} from "@/redux/searchOptions/slice";

import {
    ActionRow,
    DropdownButton,
    DropdownChevron,
    DropdownMenu,
    DropdownOption,
    DropdownWrap,
    FieldBlock,
    FieldLabel,
    FormWrap,
    GhostButton,
    PillButton,
    PillRow,
    PrimaryButton,
    StyledInput,
    TwoColumn,
} from "@/components/landingPage/dailyRentTab/popUpModels/filtersPopUp/CategoryFilterForm.style";

import {
    AnimatedField,
    FeaturesCheckboxCard,
    FeaturesCheckboxGrid,
    FeaturesCheckboxLabelText,
    FieldErrorText,
    FiltersFormShell,
    FiltersHint,
    StyledTextArea,
    SwitchInput,
    SwitchThumb,
    SwitchTrack,
    ToggleLabelText,
    ToggleRow,
} from "./style";

function validateVisiblePrice(filters, visible) {
    if (!visible.has(F.minPrice) || !visible.has(F.maxPrice)) {
        return null;
    }
    const minRaw = filters.minPrice?.trim?.() ?? "";
    const maxRaw = filters.maxPrice?.trim?.() ?? "";
    if (!minRaw || !maxRaw) return null;
    const min = Number(minRaw);
    const max = Number(maxRaw);
    if (Number.isNaN(min) || Number.isNaN(max)) {
        return "Enter valid numbers for price range.";
    }
    if (min > max) {
        return "Maximum price must be greater than or equal to minimum.";
    }
    return null;
}

function validateVisibleArea(filters, visible) {
    if (!visible.has(F.leastArea) || !visible.has(F.greatestArea)) {
        return null;
    }
    const minRaw = filters.leastArea?.trim?.() ?? "";
    const maxRaw = filters.greatestArea?.trim?.() ?? "";
    if (!minRaw || !maxRaw) return null;
    const min = Number(minRaw);
    const max = Number(maxRaw);
    if (Number.isNaN(min) || Number.isNaN(max)) {
        return "Enter valid numbers for area range.";
    }
    if (min > max) {
        return "Greatest area must be greater than or equal to least area.";
    }
    return null;
}

function PillSelect({ label, name, options, control }) {
    return (
        <FieldBlock>
            <FieldLabel>{label}</FieldLabel>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <PillRow>
                        {options.map((option) => {
                            const str = String(option);
                            const selected = field.value === str;
                            return (
                                <PillButton
                                    key={str}
                                    type="button"
                                    $active={selected}
                                    onClick={() => field.onChange(selected ? null : str)}
                                >
                                    {option}
                                </PillButton>
                            );
                        })}
                    </PillRow>
                )}
            />
        </FieldBlock>
    );
}

function DropdownField({ label, name, options, control, placeholder = "Any" }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        const onPointerOutside = (event) => {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };
        const onFocusOutside = (event) => {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };
        const onEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("pointerdown", onPointerOutside, true);
        document.addEventListener("focusin", onFocusOutside, true);
        window.addEventListener("keydown", onEscape);
        return () => {
            document.removeEventListener("pointerdown", onPointerOutside, true);
            document.removeEventListener("focusin", onFocusOutside, true);
            window.removeEventListener("keydown", onEscape);
        };
    }, []);

    return (
        <FieldBlock ref={rootRef}>
            <FieldLabel>{label}</FieldLabel>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <DropdownWrap>
                        <DropdownButton
                            type="button"
                            $open={open}
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <span>{field.value || placeholder}</span>
                            <DropdownChevron $open={open}>▾</DropdownChevron>
                        </DropdownButton>
                        {open ? (
                            <DropdownMenu>
                                <DropdownOption
                                    type="button"
                                    $active={!field.value}
                                    onClick={() => {
                                        field.onChange("");
                                        setOpen(false);
                                    }}
                                >
                                    Any
                                </DropdownOption>
                                {options.map((option) => {
                                    const value = String(option);
                                    return (
                                        <DropdownOption
                                            key={value}
                                            type="button"
                                            $active={field.value === value}
                                            onClick={() => {
                                                field.onChange(value);
                                                setOpen(false);
                                            }}
                                        >
                                            {option}
                                        </DropdownOption>
                                    );
                                })}
                            </DropdownMenu>
                        ) : null}
                    </DropdownWrap>
                )}
            />
        </FieldBlock>
    );
}

export default function SearchFiltersForm({ purpose, propertyType }) {
    const dispatch = useDispatch();
    const searchFilters = useSelector((state) => state.searchOptionsSlice.searchFilters);

    const visibleList = useMemo(
        () => getVisibleSearchFilterFields(purpose, propertyType),
        [purpose, propertyType],
    );
    const visible = useMemo(() => new Set(visibleList), [visibleList]);

    const [priceError, setPriceError] = useState(null);
    const [areaError, setAreaError] = useState(null);

    const { control, register, reset, watch, handleSubmit } = useForm({
        defaultValues: reduxFiltersToFormValues(searchFilters, visibleList),
    });

    useEffect(() => {
        /* RHF watch subscription — syncs visible fields to Redux without re-rendering every keystroke via useWatch. */
        // eslint-disable-next-line react-hooks/incompatible-library -- intentional RHF watch(callback) subscription
        const subscription = watch((value) => {
            dispatch(patchSearchFilters(formValuesToPatch(value)));
        });
        return () => subscription.unsubscribe();
    }, [watch, dispatch]);

    const onSubmit = handleSubmit(() => {
        const data = watch();
        const patch = formValuesToPatch(data);
        dispatch(patchSearchFilters(patch));
        const merged = { ...initialSearchFiltersState, ...patch };
        const errPrice = validateVisiblePrice(merged, visible);
        const errArea = validateVisibleArea(merged, visible);
        setPriceError(errPrice);
        setAreaError(errArea);
    });

    const onReset = useCallback(() => {
        dispatch(resetSearchFilters());
        reset(reduxFiltersToFormValues({ ...initialSearchFiltersState }, visibleList));
        setPriceError(null);
        setAreaError(null);
    }, [dispatch, reset, visibleList]);

    if (visibleList.length === 0) {
        return (
            <FiltersFormShell>
                <FiltersHint>
                    Filter options for{" "}
                    <strong>{propertyType ?? "this property type"}</strong> with{" "}
                    <strong>{purpose === "sale" ? "sale" : "rent"}</strong> are not configured
                    yet. Choose another combination or check back later.
                </FiltersHint>
            </FiltersFormShell>
        );
    }

    const useRentFeatureGrid =
        visible.has(F.furnished) || visible.has(F.airConditioned);
    const useSaleDropdownPlaceholders =
        purpose === SEARCH_PURPOSE.sale && !useRentFeatureGrid;

    let fieldKeySeed = 0;
    const nextFieldKey = () => {
        fieldKeySeed += 1;
        return `sf-${fieldKeySeed}`;
    };

    /** Renders filters in config order (`visibleList`) — sale vs rent layouts differ via feature bundling. */
    const renderOrderedFields = () => {
        const consumed = new Set();
        /** Non-checkbox rows in list order until Features / Description / toggles. */
        const leadBlocks = [];
        /** Single combined Features body (below title); set when checkbox bundle runs. */
        let featuresInner = null;
        let descriptionBlock = null;
        const toggleBlocks = [];

        const pushPremium = () =>
            leadBlocks.push(
                <AnimatedField key={nextFieldKey()}>
                    <FieldBlock>
                        <FieldLabel>Premiums</FieldLabel>
                        <Controller
                            control={control}
                            name="premiumPeriod"
                            render={({ field }) => (
                                <PillRow>
                                    {PREMIUM_PERIOD_OPTIONS.map(({ value: v, label: lbl }) => {
                                        const selected = field.value === v;
                                        return (
                                            <PillButton
                                                key={v}
                                                type="button"
                                                $active={selected}
                                                onClick={() =>
                                                    field.onChange(selected ? null : v)
                                                }
                                            >
                                                {lbl}
                                            </PillButton>
                                        );
                                    })}
                                </PillRow>
                            )}
                        />
                    </FieldBlock>
                </AnimatedField>,
            );

        const pushPrice = () =>
            leadBlocks.push(
                <AnimatedField key={nextFieldKey()}>
                    <FieldBlock>
                        <FieldLabel>Price</FieldLabel>
                        <TwoColumn>
                            {visible.has(F.minPrice) ? (
                                <StyledInput
                                    type="number"
                                    inputMode="decimal"
                                    placeholder="Minimum Price"
                                    {...register("minPrice")}
                                />
                            ) : null}
                            {visible.has(F.maxPrice) ? (
                                <StyledInput
                                    type="number"
                                    inputMode="decimal"
                                    placeholder="Maximum Price"
                                    {...register("maxPrice")}
                                />
                            ) : null}
                        </TwoColumn>
                        {priceError ? <FieldErrorText>{priceError}</FieldErrorText> : null}
                    </FieldBlock>
                </AnimatedField>,
            );

        const pushArea = () =>
            leadBlocks.push(
                <AnimatedField key={nextFieldKey()}>
                    <FieldBlock>
                        <FieldLabel>Area</FieldLabel>
                        <TwoColumn>
                            <StyledInput
                                type="number"
                                inputMode="decimal"
                                placeholder="Least area"
                                {...register("leastArea")}
                            />
                            <StyledInput
                                type="number"
                                inputMode="decimal"
                                placeholder="Greatest area"
                                {...register("greatestArea")}
                            />
                        </TwoColumn>
                        {areaError ? <FieldErrorText>{areaError}</FieldErrorText> : null}
                    </FieldBlock>
                </AnimatedField>,
            );

        for (const fieldId of visibleList) {
            if (consumed.has(fieldId)) continue;

            if (fieldId === F.minPrice || fieldId === F.maxPrice) {
                consumed.add(F.minPrice);
                consumed.add(F.maxPrice);
                pushPrice();
                continue;
            }

            if (fieldId === F.leastArea || fieldId === F.greatestArea) {
                consumed.add(F.leastArea);
                consumed.add(F.greatestArea);
                pushArea();
                continue;
            }

            if (FEATURE_CHECKBOX_FIELD_IDS.includes(fieldId)) {
                FEATURE_CHECKBOX_FIELD_IDS.forEach((fid) => consumed.add(fid));
                const featItems = FEATURE_CHECKBOXES.filter(({ field }) =>
                    visible.has(field),
                );
                if (featItems.length) {
                    featuresInner = (
                        <FeaturesCheckboxGrid>
                            {featItems.map(({ field: f, label }) => (
                                <FeaturesCheckboxCard key={f}>
                                    <input type="checkbox" {...register(f)} />
                                    <FeaturesCheckboxLabelText>{label}</FeaturesCheckboxLabelText>
                                </FeaturesCheckboxCard>
                            ))}
                        </FeaturesCheckboxGrid>
                    );
                }
                continue;
            }

            switch (fieldId) {
                case F.premiumPeriod:
                    consumed.add(fieldId);
                    pushPremium();
                    break;
                case F.bedrooms:
                    consumed.add(fieldId);
                    leadBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <PillSelect
                                label="Bedrooms"
                                name="bedrooms"
                                options={BEDROOM_OPTIONS}
                                control={control}
                            />
                        </AnimatedField>,
                    );
                    break;
                case F.occupantType:
                    consumed.add(fieldId);
                    leadBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <FieldBlock>
                                <FieldLabel>Family or single</FieldLabel>
                                <Controller
                                    control={control}
                                    name="occupantType"
                                    render={({ field }) => (
                                        <PillRow>
                                            {OCCUPANT_OPTIONS.map(({ value: v, label }) => {
                                                const selected = field.value === v;
                                                return (
                                                    <PillButton
                                                        key={v}
                                                        type="button"
                                                        $active={selected}
                                                        onClick={() =>
                                                            field.onChange(selected ? null : v)
                                                        }
                                                    >
                                                        {label}
                                                    </PillButton>
                                                );
                                            })}
                                        </PillRow>
                                    )}
                                />
                            </FieldBlock>
                        </AnimatedField>,
                    );
                    break;
                case F.livingRooms: {
                    consumed.add(fieldId);
                    const livingLabel =
                        purpose === SEARCH_PURPOSE.sale ? "Living rooms" : "Living Rooms";
                    leadBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <PillSelect
                                label={livingLabel}
                                name="livingRooms"
                                options={LIVING_ROOM_OPTIONS}
                                control={control}
                            />
                        </AnimatedField>,
                    );
                    break;
                }
                case F.wc:
                    consumed.add(fieldId);
                    leadBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <PillSelect
                                label="WC"
                                name="wc"
                                options={WC_OPTIONS}
                                control={control}
                            />
                        </AnimatedField>,
                    );
                    break;
                case F.floor:
                    consumed.add(fieldId);
                    leadBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <DropdownField
                                label="Floor"
                                name="floor"
                                options={FLOOR_OPTIONS}
                                control={control}
                                placeholder={
                                    useSaleDropdownPlaceholders ? "Select Floor" : "Any"
                                }
                            />
                        </AnimatedField>,
                    );
                    break;
                case F.ageLessThan:
                    consumed.add(fieldId);
                    leadBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <DropdownField
                                label="Age less than"
                                name="ageLessThan"
                                options={AGE_LESS_THAN_OPTIONS}
                                control={control}
                                placeholder={
                                    useSaleDropdownPlaceholders
                                        ? "Select Age less than"
                                        : "Any"
                                }
                            />
                        </AnimatedField>,
                    );
                    break;
                case F.description:
                    consumed.add(fieldId);
                    descriptionBlock = (
                        <AnimatedField key={nextFieldKey()}>
                            <FieldBlock>
                                <FieldLabel>Description</FieldLabel>
                                <StyledTextArea
                                    rows={4}
                                    placeholder="Add keywords or notes"
                                    {...register("description")}
                                />
                            </FieldBlock>
                        </AnimatedField>
                    );
                    break;
                case F.listingsWithImagesOnly:
                    consumed.add(fieldId);
                    toggleBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <Controller
                                control={control}
                                name="listingsWithImagesOnly"
                                render={({ field }) => (
                                    <ToggleRow>
                                        <ToggleLabelText>
                                            Listings with Images only
                                        </ToggleLabelText>
                                        <SwitchTrack $on={field.value}>
                                            <SwitchThumb $on={field.value} />
                                            <SwitchInput
                                                type="checkbox"
                                                role="switch"
                                                aria-checked={field.value}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        </SwitchTrack>
                                    </ToggleRow>
                                )}
                            />
                        </AnimatedField>,
                    );
                    break;
                case F.aqarPartnersAssistance:
                    consumed.add(fieldId);
                    toggleBlocks.push(
                        <AnimatedField key={nextFieldKey()}>
                            <Controller
                                control={control}
                                name="aqarPartnersAssistance"
                                render={({ field }) => (
                                    <ToggleRow>
                                        <ToggleLabelText>
                                            I would like assistance from Aqar app partners in field
                                            search.
                                        </ToggleLabelText>
                                        <SwitchTrack $on={field.value}>
                                            <SwitchThumb $on={field.value} />
                                            <SwitchInput
                                                type="checkbox"
                                                role="switch"
                                                aria-checked={field.value}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        </SwitchTrack>
                                    </ToggleRow>
                                )}
                            />
                        </AnimatedField>,
                    );
                    break;
                default:
                    break;
            }
        }

        const out = [...leadBlocks];
        if (featuresInner != null) {
            out.push(
                <AnimatedField key={nextFieldKey()}>
                    <FieldBlock>
                        <FieldLabel>Features</FieldLabel>
                        {featuresInner}
                    </FieldBlock>
                </AnimatedField>,
            );
        }
        if (descriptionBlock != null) out.push(descriptionBlock);
        out.push(...toggleBlocks);
        return out;
    };

    return (
        <FiltersFormShell>
            <FormWrap as="form" onSubmit={onSubmit} noValidate>
                {renderOrderedFields()}
                <ActionRow>
                    <PrimaryButton type="submit">Apply Filters</PrimaryButton>
                    <GhostButton type="button" onClick={onReset}>
                        Reset
                    </GhostButton>
                </ActionRow>
            </FormWrap>
        </FiltersFormShell>
    );
}


function reduxFiltersToFormValues(filters, visibleList) {
    const visible = new Set(visibleList);
    const base = {
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
    };

    if (visible.has(F.premiumPeriod)) base.premiumPeriod = filters.premiumPeriod;
    if (visible.has(F.minPrice)) base.minPrice = filters.minPrice ?? "";
    if (visible.has(F.maxPrice)) base.maxPrice = filters.maxPrice ?? "";
    if (visible.has(F.bedrooms)) base.bedrooms = filters.bedrooms;
    if (visible.has(F.occupantType)) base.occupantType = filters.occupantType;
    if (visible.has(F.livingRooms)) base.livingRooms = filters.livingRooms;
    if (visible.has(F.wc)) base.wc = filters.wc;
    if (visible.has(F.leastArea)) base.leastArea = filters.leastArea ?? "";
    if (visible.has(F.greatestArea)) base.greatestArea = filters.greatestArea ?? "";
    if (visible.has(F.floor)) base.floor = filters.floor ?? "";
    if (visible.has(F.ageLessThan)) base.ageLessThan = filters.ageLessThan ?? "";
    if (visible.has(F.furnished)) base.furnished = filters.furnished;
    if (visible.has(F.carEntrance)) base.carEntrance = filters.carEntrance;
    if (visible.has(F.airConditioned)) base.airConditioned = filters.airConditioned;
    if (visible.has(F.privateRoof)) base.privateRoof = filters.privateRoof;
    if (visible.has(F.inVilla)) base.inVilla = filters.inVilla;
    if (visible.has(F.twoEntrances)) base.twoEntrances = filters.twoEntrances;
    if (visible.has(F.specialEntrance)) base.specialEntrance = filters.specialEntrance;
    if (visible.has(F.description)) base.description = filters.description ?? "";
    if (visible.has(F.listingsWithImagesOnly)) {
        base.listingsWithImagesOnly = filters.listingsWithImagesOnly;
    }
    if (visible.has(F.aqarPartnersAssistance)) {
        base.aqarPartnersAssistance = filters.aqarPartnersAssistance;
    }
    return base;
}

function formValuesToPatch(values) {
    return {
        premiumPeriod: values.premiumPeriod ?? null,
        minPrice: values.minPrice ?? "",
        maxPrice: values.maxPrice ?? "",
        bedrooms: values.bedrooms ?? null,
        occupantType: values.occupantType ?? null,
        livingRooms: values.livingRooms ?? null,
        wc: values.wc ?? null,
        leastArea: values.leastArea ?? "",
        greatestArea: values.greatestArea ?? "",
        floor: values.floor ?? "",
        ageLessThan: values.ageLessThan ?? "",
        furnished: Boolean(values.furnished),
        carEntrance: Boolean(values.carEntrance),
        airConditioned: Boolean(values.airConditioned),
        privateRoof: Boolean(values.privateRoof),
        inVilla: Boolean(values.inVilla),
        twoEntrances: Boolean(values.twoEntrances),
        specialEntrance: Boolean(values.specialEntrance),
        description: values.description ?? "",
        listingsWithImagesOnly: Boolean(values.listingsWithImagesOnly),
        aqarPartnersAssistance: Boolean(values.aqarPartnersAssistance),
    };
}
