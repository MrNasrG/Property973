/**
 * Configuration-driven search filter visibility by listing purpose × property type.
 * Keys use normalized lowercase purpose and a normalized property type slug.
 */

export const SEARCH_PURPOSE = {
    rent: "rent",
    sale: "sale",
};

/** Field ids used by Redux `searchFilters` and the conditional form. */
export const SEARCH_FILTER_FIELDS = Object.freeze({
    premiumPeriod: "premiumPeriod",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    bedrooms: "bedrooms",
    occupantType: "occupantType",
    livingRooms: "livingRooms",
    wc: "wc",
    /** Area range (sale apartment, etc.). */
    leastArea: "leastArea",
    greatestArea: "greatestArea",
    floor: "floor",
    ageLessThan: "ageLessThan",
    furnished: "furnished",
    carEntrance: "carEntrance",
    airConditioned: "airConditioned",
    privateRoof: "privateRoof",
    inVilla: "inVilla",
    twoEntrances: "twoEntrances",
    specialEntrance: "specialEntrance",
    description: "description",
    listingsWithImagesOnly: "listingsWithImagesOnly",
    aqarPartnersAssistance: "aqarPartnersAssistance",
});

export const PREMIUM_PERIOD_OPTIONS = [
    { value: "yearly", label: "Yearly" },
    { value: "semi_annual", label: "Semi annual" },
    { value: "quarterly", label: "Quarterly" },
    { value: "monthly", label: "Monthly" },
];

export const BEDROOM_OPTIONS = ["1", "2", "3", "4", "5+"];

export const OCCUPANT_OPTIONS = [
    { value: "single", label: "Single" },
    { value: "family", label: "Family" },
];

export const LIVING_ROOM_OPTIONS = ["1", "2", "3", "4", "5+"];

export const WC_OPTIONS = ["1", "2", "3", "4+"];

export const FLOOR_OPTIONS = [
    "Ground",
    "Upper Ground",
    ...Array.from({ length: 19 }, (_, i) => String(i + 2)),
    "20+",
];

/** Display labels matched to Redux string values */

export const AGE_LESS_THAN_OPTIONS = [
    "New",
    ...Array.from({ length: 14 }, (_, i) => `${i + 2}yrs`),
    "15+yrs",
];

export const FEATURE_CHECKBOXES = [
    { field: SEARCH_FILTER_FIELDS.furnished, label: "Furnished" },
    { field: SEARCH_FILTER_FIELDS.carEntrance, label: "Car entrance" },
    { field: SEARCH_FILTER_FIELDS.airConditioned, label: "Air conditioned" },
    { field: SEARCH_FILTER_FIELDS.privateRoof, label: "Private Roof" },
    { field: SEARCH_FILTER_FIELDS.inVilla, label: "In Villa" },
    { field: SEARCH_FILTER_FIELDS.twoEntrances, label: "Two Entrances" },
    { field: SEARCH_FILTER_FIELDS.specialEntrance, label: "Special Entrance" },
];

/** Checkbox field ids — any visible id from this list triggers feature-bundle logic in the form. */
export const FEATURE_CHECKBOX_FIELD_IDS = FEATURE_CHECKBOXES.map(({ field }) => field);

const RENT_APARTMENT_FIELDS = Object.freeze([
    SEARCH_FILTER_FIELDS.premiumPeriod,
    SEARCH_FILTER_FIELDS.minPrice,
    SEARCH_FILTER_FIELDS.maxPrice,
    SEARCH_FILTER_FIELDS.bedrooms,
    SEARCH_FILTER_FIELDS.occupantType,
    SEARCH_FILTER_FIELDS.livingRooms,
    SEARCH_FILTER_FIELDS.wc,
    SEARCH_FILTER_FIELDS.floor,
    SEARCH_FILTER_FIELDS.ageLessThan,
    SEARCH_FILTER_FIELDS.furnished,
    SEARCH_FILTER_FIELDS.carEntrance,
    SEARCH_FILTER_FIELDS.airConditioned,
    SEARCH_FILTER_FIELDS.privateRoof,
    SEARCH_FILTER_FIELDS.inVilla,
    SEARCH_FILTER_FIELDS.twoEntrances,
    SEARCH_FILTER_FIELDS.specialEntrance,
    SEARCH_FILTER_FIELDS.description,
    SEARCH_FILTER_FIELDS.listingsWithImagesOnly,
    SEARCH_FILTER_FIELDS.aqarPartnersAssistance,
]);

/** Sale × Apartment — order follows design (mock). */
const SALE_APARTMENT_FIELDS = Object.freeze([
    SEARCH_FILTER_FIELDS.bedrooms,
    SEARCH_FILTER_FIELDS.livingRooms,
    SEARCH_FILTER_FIELDS.wc,
    SEARCH_FILTER_FIELDS.minPrice,
    SEARCH_FILTER_FIELDS.maxPrice,
    SEARCH_FILTER_FIELDS.carEntrance,
    SEARCH_FILTER_FIELDS.floor,
    SEARCH_FILTER_FIELDS.ageLessThan,
    SEARCH_FILTER_FIELDS.leastArea,
    SEARCH_FILTER_FIELDS.greatestArea,
    SEARCH_FILTER_FIELDS.privateRoof,
    SEARCH_FILTER_FIELDS.inVilla,
    SEARCH_FILTER_FIELDS.twoEntrances,
    SEARCH_FILTER_FIELDS.specialEntrance,
    SEARCH_FILTER_FIELDS.description,
    SEARCH_FILTER_FIELDS.listingsWithImagesOnly,
    SEARCH_FILTER_FIELDS.aqarPartnersAssistance,
]);

/**
 * Normalize property type labels from selects (e.g. "Apartment", "Big flat") to config keys.
 */
export function normalizePropertyTypeKey(propertyType) {
    if (propertyType == null || typeof propertyType !== "string") {
        return "";
    }
    return propertyType.trim().toLowerCase().replace(/\s+/g, "_");
}

export function composeSearchFiltersKey(purpose, propertyType) {
    const p =
        typeof purpose === "string" ? purpose.trim().toLowerCase() : "";
    const t = normalizePropertyTypeKey(propertyType);
    return `${p}:${t}`;
}

/**
 * Ordered list of visible field ids for Apply / validation.
 */
const VISIBILITY_MATRIX = Object.freeze({
    [`${SEARCH_PURPOSE.rent}:apartment`]: [...RENT_APARTMENT_FIELDS],
    [`${SEARCH_PURPOSE.sale}:apartment`]: [...SALE_APARTMENT_FIELDS],
});

export function getVisibleSearchFilterFields(purpose, propertyType) {
    const key = composeSearchFiltersKey(purpose, propertyType);
    return VISIBILITY_MATRIX[key] ?? [];
}
