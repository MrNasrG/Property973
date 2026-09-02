import { searchesPropertyTypeOptions } from "@/constants/options";
import { formatMobileNumberForApi } from "@/constants/phoneCountries";
import {
    AGE_LESS_THAN_OPTIONS,
    BEDROOM_OPTIONS,
    FEATURE_CHECKBOXES,
    FLOOR_OPTIONS,
    LIVING_ROOM_OPTIONS,
    OCCUPANT_OPTIONS,
    PREMIUM_PERIOD_OPTIONS,
    SEARCH_PURPOSE,
    normalizePropertyTypeKey,
} from "@/constants/searchFiltersConfig";

/** Owner listing path — matches add-listing flow options. */
export const OWNER_LISTING_KIND = Object.freeze({
    licensed: "licensed",
    marketing: "marketing",
});

export const OWNER_LISTING_KIND_OPTIONS = [
    {
        value: OWNER_LISTING_KIND.licensed,
        label: "With license through Property 973",
        hint: "List a property with platform license issuance",
        badge: "License required",
    },
    {
        value: OWNER_LISTING_KIND.marketing,
        label: "Request marketing from agents",
        hint: "No license — agents market your property",
        badge: "No license",
    },
];

export const LISTING_PURPOSE_OPTIONS = [
    { value: SEARCH_PURPOSE.rent, label: "For rent" },
    { value: SEARCH_PURPOSE.sale, label: "For sale" },
];

export const PROPERTY_TYPE_OPTIONS = searchesPropertyTypeOptions;

export const CITY_OPTIONS = ["Juffair", "Seef", "Saar", "Busaiteen", "Hidd"];

export const STREET_DIRECTION_OPTIONS = [
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

export const WC_OPTIONS = ["1", "2", "3", "4+"];

/** Field ids used by the owner add-property form. */
export const OWNER_PROPERTY_FIELDS = Object.freeze({
    listingKind: "listingKind",
    purpose: "purpose",
    propertyType: "propertyType",
    city: "city",
    district: "district",
    address: "address",
    price: "price",
    premiumPeriod: "premiumPeriod",
    area: "area",
    bedrooms: "bedrooms",
    livingRooms: "livingRooms",
    wc: "wc",
    floor: "floor",
    ageLessThan: "ageLessThan",
    occupantType: "occupantType",
    streetWidth: "streetWidth",
    streetDirection: "streetDirection",
    furnished: "furnished",
    carEntrance: "carEntrance",
    airConditioned: "airConditioned",
    privateRoof: "privateRoof",
    inVilla: "inVilla",
    twoEntrances: "twoEntrances",
    specialEntrance: "specialEntrance",
    description: "description",
    photos: "photos",
    contactPhone: "contactPhone",
    allowInquiries: "allowInquiries",
    aqarPartnersAssistance: "aqarPartnersAssistance",
});

const F = OWNER_PROPERTY_FIELDS;

/** Human-readable field list for owner property listing (grouped). */
export const OWNER_PROPERTY_FIELD_GROUPS = [
    {
        id: "listing",
        title: "Listing type",
        fields: [
            { id: F.listingKind, label: "Listing path", type: "select", required: true },
            { id: F.purpose, label: "Purpose", type: "select", required: true },
            { id: F.propertyType, label: "Property type", type: "select", required: true },
        ],
    },
    {
        id: "location",
        title: "Location",
        fields: [
            { id: F.city, label: "City", type: "select", required: true },
            { id: F.district, label: "District / area", type: "text", required: true },
            { id: F.address, label: "Street address", type: "text", required: false },
        ],
    },
    {
        id: "pricing",
        title: "Pricing",
        fields: [
            { id: F.price, label: "Price (BHD)", type: "number", required: true },
            { id: F.premiumPeriod, label: "Rent period", type: "select", required: false },
        ],
    },
    {
        id: "details",
        title: "Property details",
        fields: [
            { id: F.area, label: "Area (m²)", type: "number", required: true },
            { id: F.bedrooms, label: "Bedrooms", type: "pill", required: false },
            { id: F.livingRooms, label: "Living rooms", type: "pill", required: false },
            { id: F.wc, label: "Bathrooms (WC)", type: "pill", required: false },
            { id: F.floor, label: "Floor", type: "select", required: false },
            { id: F.ageLessThan, label: "Property age", type: "select", required: false },
            { id: F.occupantType, label: "Occupant type", type: "select", required: true },
            { id: F.streetWidth, label: "Street width (m)", type: "number", required: false },
            { id: F.streetDirection, label: "Street direction", type: "select", required: false },
        ],
    },
    {
        id: "features",
        title: "Features & amenities",
        fields: FEATURE_CHECKBOXES.map(({ field, label }) => ({
            id: field,
            label,
            type: "checkbox",
            required: false,
        })),
    },
    {
        id: "media",
        title: "Description & media",
        fields: [
            { id: F.description, label: "Description", type: "textarea", required: true },
            { id: F.photos, label: "Property photos", type: "file", required: false },
        ],
    },
    {
        id: "contact",
        title: "Contact & preferences",
        fields: [
            { id: F.contactPhone, label: "Contact phone", type: "tel", required: true },
            { id: F.allowInquiries, label: "Allow inquiries", type: "toggle", required: false },
            { id: F.aqarPartnersAssistance, label: "Aqar partners assistance", type: "toggle", required: false },
        ],
    },
];

const RESIDENTIAL_TYPES = new Set([
    "apartment",
    "big_flat",
    "villa",
    "small_house",
    "floor",
    "chalet",
    "room",
    "lounge",
]);

const LAND_TYPES = new Set(["land", "farm", "tent"]);

const COMMERCIAL_TYPES = new Set([
    "store",
    "office",
    "warehouse",
    "kiosk",
    "cinema",
    "parking",
    "bank_/_atm",
    "factory",
    "hospital",
    "power_station",
    "communication_tower",
    "complex",
    "tower",
    "hotel",
    "workshop",
    "school",
    "station",
    "others",
]);

function composeOwnerFormKey(purpose, propertyType) {
    const p = typeof purpose === "string" ? purpose.trim().toLowerCase() : "";
    const t = normalizePropertyTypeKey(propertyType);
    return `${p}:${t}`;
}

const RENT_RESIDENTIAL_FIELDS = [
    F.premiumPeriod,
    F.bedrooms,
    F.livingRooms,
    F.wc,
    F.floor,
    F.ageLessThan,
    F.occupantType,
    ...FEATURE_CHECKBOXES.map(({ field }) => field),
];

const SALE_RESIDENTIAL_FIELDS = [
    F.bedrooms,
    F.livingRooms,
    F.wc,
    F.floor,
    F.ageLessThan,
    ...FEATURE_CHECKBOXES.map(({ field }) => field),
];

const RENT_VILLA_FIELDS = [
    ...RENT_RESIDENTIAL_FIELDS,
    F.streetWidth,
    F.streetDirection,
];

const SALE_VILLA_FIELDS = [
    ...SALE_RESIDENTIAL_FIELDS,
    F.streetWidth,
    F.streetDirection,
];

const LAND_FIELDS = [F.streetWidth, F.streetDirection];

const COMMERCIAL_FIELDS = [F.floor, F.ageLessThan, F.carEntrance, F.twoEntrances, F.specialEntrance];

const BASE_FIELDS = [
    F.listingKind,
    F.purpose,
    F.propertyType,
    F.city,
    F.district,
    F.address,
    F.price,
    F.area,
    F.description,
    F.photos,
    F.contactPhone,
    F.allowInquiries,
    F.aqarPartnersAssistance,
];

const VISIBILITY_MATRIX = Object.freeze({
    [`${SEARCH_PURPOSE.rent}:apartment`]: [...BASE_FIELDS, ...RENT_RESIDENTIAL_FIELDS],
    [`${SEARCH_PURPOSE.sale}:apartment`]: [...BASE_FIELDS, ...SALE_RESIDENTIAL_FIELDS],
    [`${SEARCH_PURPOSE.rent}:villa`]: [...BASE_FIELDS, ...RENT_VILLA_FIELDS],
    [`${SEARCH_PURPOSE.sale}:villa`]: [...BASE_FIELDS, ...SALE_VILLA_FIELDS],
});

function getTypeCategory(propertyType) {
    const key = normalizePropertyTypeKey(propertyType);
    if (LAND_TYPES.has(key)) return "land";
    if (COMMERCIAL_TYPES.has(key)) return "commercial";
    if (RESIDENTIAL_TYPES.has(key)) return "residential";
    return "other";
}

export function getVisibleOwnerPropertyFields(purpose, propertyType) {
    const key = composeOwnerFormKey(purpose, propertyType);
    if (VISIBILITY_MATRIX[key]) {
        return VISIBILITY_MATRIX[key];
    }

    const category = getTypeCategory(propertyType);
    const isRent = purpose === SEARCH_PURPOSE.rent;

    if (category === "land") {
        return [...BASE_FIELDS, ...LAND_FIELDS];
    }
    if (category === "commercial") {
        return [...BASE_FIELDS, ...(isRent ? [F.premiumPeriod] : []), ...COMMERCIAL_FIELDS];
    }
    if (category === "residential") {
        return [...BASE_FIELDS, ...(isRent ? RENT_RESIDENTIAL_FIELDS : SALE_RESIDENTIAL_FIELDS)];
    }

    return [...BASE_FIELDS, ...(isRent ? [F.premiumPeriod] : []), F.bedrooms, F.livingRooms, F.wc];
}

export const OWNER_FORM_SELECT_OPTIONS = {
    [F.listingKind]: OWNER_LISTING_KIND_OPTIONS,
    [F.purpose]: LISTING_PURPOSE_OPTIONS,
    [F.propertyType]: PROPERTY_TYPE_OPTIONS.map((value) => ({ value, label: value })),
    [F.city]: CITY_OPTIONS.map((value) => ({ value, label: value })),
    [F.premiumPeriod]: PREMIUM_PERIOD_OPTIONS,
    [F.bedrooms]: BEDROOM_OPTIONS.map((value) => ({ value, label: value })),
    [F.livingRooms]: LIVING_ROOM_OPTIONS.map((value) => ({ value, label: value })),
    [F.wc]: WC_OPTIONS.map((value) => ({ value, label: value })),
    [F.floor]: FLOOR_OPTIONS.map((value) => ({ value, label: value })),
    [F.ageLessThan]: AGE_LESS_THAN_OPTIONS.map((value) => ({ value, label: value })),
    [F.occupantType]: OCCUPANT_OPTIONS,
    [F.streetDirection]: STREET_DIRECTION_OPTIONS.map((value) => ({ value, label: value })),
};

export function getOwnerFormDefaultValues(contactPhone = "") {
    return {
        listingKind: OWNER_LISTING_KIND.licensed,
        purpose: SEARCH_PURPOSE.rent,
        propertyType: "Apartment",
        city: "",
        district: "",
        address: "",
        price: "",
        premiumPeriod: "yearly",
        area: "",
        bedrooms: null,
        livingRooms: null,
        wc: null,
        floor: "",
        ageLessThan: "",
        occupantType: null,
        streetWidth: "",
        streetDirection: "",
        furnished: false,
        carEntrance: false,
        airConditioned: false,
        privateRoof: false,
        inVilla: false,
        twoEntrances: false,
        specialEntrance: false,
        description: "",
        photos: [],
        contactPhone: formatMobileNumberForApi(contactPhone),
        allowInquiries: true,
        aqarPartnersAssistance: false,
    };
}
