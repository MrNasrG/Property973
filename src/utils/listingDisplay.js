const PREMIUM_PERIOD_LABELS = {
  yearly: "yearly",
  semi_annual: "semi-annual",
  quarterly: "quarterly",
  monthly: "monthly",
};

export const formatListingPrice = (listing) => {
  if (!listing?.price && listing?.price !== 0) return "—";
  const formatted = Number(listing.price).toLocaleString();
  if (listing.purpose === "rent") {
    const period = PREMIUM_PERIOD_LABELS[listing.premiumPeriod] || "yearly";
    return `BHD ${formatted}/${period}`;
  }
  return `BHD ${formatted}`;
};

export const getListingTitle = (listing) => {
  const purposeLabel = listing?.purpose === "sale" ? "For sale" : "For rent";
  return `${listing?.propertyType || "Property"} · ${purposeLabel}`;
};

export const getListingLocation = (listing) => {
  const parts = [listing?.district, listing?.city].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
};

export const getListingStatusVariant = (status) => {
  switch (status) {
    case "active":
      return "active";
    case "inactive":
      return "rented";
    case "draft":
      return "pending";
    default:
      return "pending";
  }
};

export const getListingStatusLabel = (status) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const capitalize = (value) => {
  if (!value || typeof value !== "string") return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getListingCardTitle = (listing) => {
  const type = capitalize(listing?.propertyType) || "Property";
  const purpose = listing?.purpose === "sale" ? "Sale" : "Rent";
  const place = listing?.district || listing?.city || "";
  return place ? `${type} for ${purpose} ${place}` : `${type} for ${purpose}`;
};

export const getListingPurposeTag = (listing) =>
  listing?.purpose === "sale" ? "For sale" : "For rent";

export const getListingTypeTag = (listing) =>
  capitalize(listing?.propertyType) || "Property";

export const getListingFeatureItems = (listing) => {
  const items = [];
  if (listing?.area) {
    items.push({ iconKey: "ruler", text: `${listing.area} m² area` });
  }
  if (listing?.bedrooms != null) {
    items.push({ iconKey: "bed", text: `${listing.bedrooms} bedrooms` });
  }
  if (listing?.wc != null) {
    items.push({ iconKey: "bath", text: `${listing.wc} bathrooms` });
  }
  const amenities = [];
  if (listing?.carEntrance) amenities.push("Parking");
  if (listing?.airConditioned) amenities.push("AC");
  if (listing?.furnished) amenities.push("Furnished");
  if (amenities.length > 0) {
    items.push({ iconKey: "car", text: amenities.join(" · ") });
  }
  return items;
};

export const getListingCoverPhotoUrl = (listing) =>
  listing?.photos?.[0]?.url || "";

const PREMIUM_PERIOD_SUB_LABELS = {
  yearly: "/annually",
  semi_annual: "/semi-annually",
  quarterly: "/quarterly",
  monthly: "/monthly",
};

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const formatListedAgo = (createdAt) => {
  if (!createdAt) return "Listed recently";

  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "Listed recently";

  const diffMs = Date.now() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Listed today";
  if (diffDays === 1) return "Listed 1 day ago";
  if (diffDays < 7) return `Listed ${diffDays} days ago`;
  if (diffDays < 14) return "Listed 1 week ago";
  if (diffDays < 30) return `Listed ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "Listed 1 month ago";
  return `Listed ${Math.floor(diffDays / 30)} months ago`;
};

export const mapListingToRealEstateCard = (listing) => {
  const photoCount = listing?.photos?.length ?? 0;
  const features = getListingFeatureItems(listing).map((item, index) => ({
    id: `${item.iconKey}-${index}`,
    iconKey: item.iconKey,
    text: item.text,
  }));
  const agentName =
    listing?.owner?.fullName || listing?.contactName || "Property owner";

  return {
    id: listing?.id,
    title: getListingCardTitle(listing),
    location: getListingLocation(listing),
    priceAnnual: formatListingPrice(listing),
    priceSub:
      listing?.purpose === "rent"
        ? PREMIUM_PERIOD_SUB_LABELS[listing?.premiumPeriod] || "/annually"
        : "",
    tags: [
      { label: getListingPurposeTag(listing), variant: "brand" },
      { label: getListingTypeTag(listing), variant: "muted" },
    ],
    features,
    description: listing?.description || "",
    agentName,
    agentInitials: getInitials(agentName),
    agentPhone: listing?.contactPhone || "",
    listedAgo: formatListedAgo(listing?.createdAt),
    photoLabel: photoCount > 0 ? `1/${photoCount} photos` : "No photos",
    photoUrl: getListingCoverPhotoUrl(listing),
  };
};

export const listingToFormValues = (listing, contactPhone = "") => ({
  listingKind: listing?.listingKind ?? "licensed",
  purpose: listing?.purpose ?? "rent",
  propertyType: listing?.propertyType ?? "Apartment",
  city: listing?.city ?? "",
  district: listing?.district ?? "",
  address: listing?.address ?? "",
  price: listing?.price ?? "",
  premiumPeriod: listing?.premiumPeriod ?? "yearly",
  area: listing?.area ?? "",
  bedrooms: listing?.bedrooms ?? null,
  livingRooms: listing?.livingRooms ?? null,
  wc: listing?.wc ?? null,
  floor: listing?.floor ?? "",
  ageLessThan: listing?.ageLessThan ?? "",
  occupantType: listing?.occupantType ?? null,
  streetWidth: listing?.streetWidth ?? "",
  streetDirection: listing?.streetDirection ?? "",
  furnished: Boolean(listing?.furnished),
  carEntrance: Boolean(listing?.carEntrance),
  airConditioned: Boolean(listing?.airConditioned),
  privateRoof: Boolean(listing?.privateRoof),
  inVilla: Boolean(listing?.inVilla),
  twoEntrances: Boolean(listing?.twoEntrances),
  specialEntrance: Boolean(listing?.specialEntrance),
  description: listing?.description ?? "",
  photos: [],
  contactPhone: listing?.contactPhone || contactPhone,
  allowInquiries: listing?.allowInquiries ?? true,
  aqarPartnersAssistance: listing?.aqarPartnersAssistance ?? false,
});
