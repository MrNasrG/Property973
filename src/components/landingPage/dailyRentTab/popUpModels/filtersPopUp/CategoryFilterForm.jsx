"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
    ActionRow,
    CheckboxGrid,
    CheckboxItem,
    CheckboxLabelText,
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
    SliderInput,
    SliderValue,
    StyledInput,
    TwoColumn,
} from "./CategoryFilterForm.style";

const OCCUPANT_TYPE = ["Single", "Family"];
const WC = [1, 2, 3, "4+"];
const LIVING_ROOMS = [1, 2, 3, 4, "5+"];
const BEDROOMS = [1, 2, 3, 4, "5+"];
const STREET_DIRECTION_OPTIONS = [
    "North",
    "East",
    "South",
    "West",
    "Northeast",
    "Southeast",
    "Northwest",
    "Southwest",
    "3 Streets",
    "4 Streets",
];
const AGE_OPTIONS = ["New", ...Array.from({ length: 13 }, (_, i) => `${i + 2} Years`), "15+ Years"];
const FLOOR_OPTIONS = ["Ground", "Upper", ...Array.from({ length: 19 }, (_, i) => i + 1), "20+"];

const FEATURE_OPTIONS = {
    furnishedApartment: [
        { name: "furnished", label: "Furnished" },
        { name: "carEntrance", label: "Car entrance" },
        { name: "airConditioned", label: "Air conditioned" },
        { name: "privateRoof", label: "Private roof" },
        { name: "inVilla", label: "In villa" },
        { name: "twoEntrance", label: "Two entrances" },
        { name: "specialEntrance", label: "Special entrance" },
    ],
    furnishedVilla: [
        { name: "stairs", label: "Stairs" },
        { name: "carEntrance", label: "Car entrance" },
        { name: "driverRoom", label: "Driver room" },
        { name: "maidRoom", label: "Maid room" },
        { name: "pool", label: "Pool" },
        { name: "furnished", label: "Furnished" },
        { name: "kitchen", label: "Kitchen" },
        { name: "duplex", label: "Duplex" },
        { name: "basement", label: "Basement" },
        { name: "airConditioned", label: "Air conditioned" },
    ],
    furnishedStudio: [
        { name: "carEntrance", label: "Car entrance" },
        { name: "furnished", label: "Furnished" },
        { name: "airConditioned", label: "Air conditioned" },
        { name: "privateRoof", label: "Private roof" },
        { name: "inVilla", label: "In villa" },
        { name: "twoEntrance", label: "Two entrances" },
        { name: "specialEntrance", label: "Special entrance" },
    ],
    chalet: [
        { name: "familySection", label: "Family section" },
        { name: "pool", label: "Pool" },
        { name: "footballPitch", label: "Football pitch" },
        { name: "volleyballCourt", label: "Volleyball court" },
        { name: "tent", label: "Tent" },
        { name: "kitchen", label: "Kitchen" },
        { name: "playground", label: "Playground" },
    ],
    camp: [
        { name: "familySection", label: "Family section" },
        { name: "playground", label: "Playground" },
        { name: "tent", label: "Tent" },
    ],
};

const CategoryFilterForm = ({ categoryId, onFilter }) => {
    const { control, register, handleSubmit, reset } = useForm({
        defaultValues: {},
    });

    useEffect(() => {
        reset({});
    }, [categoryId, reset]);

    const onSubmit = (data) => {
        onFilter?.(data);
    };

    const renderByCategory = () => {
        switch (categoryId) {
            case "furnished-apartment":
                return (
                    <>
                        <PriceRange register={register} />
                        <DropdownField label="Age Less Than" name="ageLessThan" options={AGE_OPTIONS} control={control} />
                        <DropdownField label="Floor" name="floor" options={FLOOR_OPTIONS} control={control} />
                        <PillSelect label="WC" name="wc" options={WC} control={control} />
                        <PillSelect label="Living Rooms" name="livingRooms" options={LIVING_ROOMS} control={control} />
                        <PillSelect label="Family or Single" name="occupantType" options={OCCUPANT_TYPE} control={control} />
                        <PillSelect label="Bedrooms" name="bedrooms" options={BEDROOMS} control={control} />
                        <CheckboxGroup
                            label="Features"
                            options={FEATURE_OPTIONS.furnishedApartment}
                            register={register}
                        />
                    </>
                );
            case "furnished-villa":
                return (
                    <>
                        <PriceRange register={register} />
                        <RangeSlider label="Street Width" name="streetWidth" min={5} max={50} unit="m" control={control} />
                        <DropdownField
                            label="Street Direction"
                            name="streetDirection"
                            options={STREET_DIRECTION_OPTIONS}
                            control={control}
                        />
                        <DropdownField label="Age Less Than" name="ageLessThan" options={AGE_OPTIONS} control={control} />
                        <AreaRange register={register} />
                        <PillSelect label="WC" name="wc" options={WC} control={control} />
                        <PillSelect label="Living Rooms" name="livingRooms" options={LIVING_ROOMS} control={control} />
                        <PillSelect label="Bedrooms" name="bedrooms" options={BEDROOMS} control={control} />
                        <CheckboxGroup
                            label="Features"
                            options={FEATURE_OPTIONS.furnishedVilla}
                            register={register}
                        />
                    </>
                );
            case "furnished-studio":
                return (
                    <>
                        <PriceRange register={register} />
                        <DropdownField label="Age Less Than" name="ageLessThan" options={AGE_OPTIONS} control={control} />
                        <DropdownField label="Floor" name="floor" options={FLOOR_OPTIONS} control={control} />
                        <PillSelect label="WC" name="wc" options={WC} control={control} />
                        <PillSelect label="Living Rooms" name="livingRooms" options={LIVING_ROOMS} control={control} />
                        <PillSelect label="Family or Single" name="occupantType" options={OCCUPANT_TYPE} control={control} />
                        <PillSelect label="Bedrooms" name="bedrooms" options={BEDROOMS} control={control} />
                        <CheckboxGroup
                            label="Features"
                            options={FEATURE_OPTIONS.furnishedStudio}
                            register={register}
                        />
                    </>
                );
            case "chalet":
                return (
                    <>
                        <PriceRange register={register} />
                        <AreaRange register={register} />
                        <CheckboxGroup label="Features" options={FEATURE_OPTIONS.chalet} register={register} />
                    </>
                );
            case "camp":
                return (
                    <>
                        <PriceRange register={register} />
                        <CheckboxGroup label="Features" options={FEATURE_OPTIONS.camp} register={register} />
                    </>
                );
            case "farm":
            case "hall":
                return (
                    <>
                        <PriceRange register={register} />
                        <AreaRange register={register} />
                    </>
                );
            case "swimming-pool":
                return (
                    <>
                        <PriceRange register={register} />
                        <DateTimeSelection register={register} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <FormWrap>
            {renderByCategory()}
            <ActionRow>
                <PrimaryButton type="button" onClick={handleSubmit(onSubmit)}>
                    Apply Filters
                </PrimaryButton>
                <GhostButton type="button" onClick={() => reset({})}>
                    Reset
                </GhostButton>
            </ActionRow>
        </FormWrap>
    );
};

const RangeSlider = ({ label, name, min, max, unit, control }) => (
    <FieldBlock>
        <FieldLabel>{label}</FieldLabel>
        <Controller
            control={control}
            name={name}
            defaultValue={min}
            render={({ field }) => (
                <>
                    <SliderValue>
                        {field.value}
                        {unit ? ` ${unit}` : ""}
                    </SliderValue>
                    <SliderInput
                        type="range"
                        min={min}
                        max={max}
                        value={field.value ?? min}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                </>
            )}
        />
    </FieldBlock>
);

const CheckboxGroup = ({ label, options, register }) => (
    <FieldBlock>
        <FieldLabel>{label}</FieldLabel>
        <CheckboxGrid>
            {options.map((option) => (
                <CheckboxItem key={option.name}>
                    <input type="checkbox" {...register(option.name)} />
                    <CheckboxLabelText>{option.label}</CheckboxLabelText>
                </CheckboxItem>
            ))}
        </CheckboxGrid>
    </FieldBlock>
);

const DropdownField = ({ label, name, options, control }) => {
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
                defaultValue=""
                render={({ field }) => (
                    <DropdownWrap>
                        <DropdownButton
                            type="button"
                            $open={open}
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <span>{field.value || "Any"}</span>
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
};

const PillSelect = ({ label, name, options, control }) => (
    <FieldBlock>
        <FieldLabel>{label}</FieldLabel>
        <Controller
            control={control}
            name={name}
            defaultValue={null}
            render={({ field }) => (
                <PillRow>
                    {options.map((option) => {
                        const selected = field.value === String(option);
                        return (
                            <PillButton
                                key={String(option)}
                                type="button"
                                $active={selected}
                                onClick={() => field.onChange(selected ? null : String(option))}
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

const AreaRange = ({ register }) => (
    <FieldBlock>
        <FieldLabel>Area (m²)</FieldLabel>
        <TwoColumn>
            <StyledInput type="number" placeholder="Least area" {...register("leastArea")} />
            <StyledInput type="number" placeholder="Greatest area" {...register("greatestArea")} />
        </TwoColumn>
    </FieldBlock>
);

const PriceRange = ({ register }) => (
    <FieldBlock>
        <FieldLabel>Total Price</FieldLabel>
        <TwoColumn>
            <StyledInput type="number" placeholder="Min price" {...register("minPrice")} />
            <StyledInput type="number" placeholder="Max price" {...register("maxPrice")} />
        </TwoColumn>
    </FieldBlock>
);

const DateTimeSelection = ({ register }) => (
    <FieldBlock>
        <FieldLabel>Date and Time</FieldLabel>
        <TwoColumn>
            <StyledInput type="date" {...register("bookingDate")} />
            <StyledInput type="time" {...register("bookingTime")} />
        </TwoColumn>
    </FieldBlock>
);

export default CategoryFilterForm;
