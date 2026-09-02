import {
  formatListedAgo,
  formatListingPrice,
  getListingCardTitle,
  getListingLocation,
  getListingPurposeTag,
  getListingTypeTag,
} from "./listingDisplay";

const capitalize = (value) => {
  if (!value || typeof value !== "string") return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getListingAmenityChips = (listing) => {
  const chips = [];
  if (listing?.furnished) chips.push("Furnished");
  if (listing?.carEntrance) chips.push("Covered car entrance");
  if (listing?.airConditioned) chips.push("Air conditioned");
  if (listing?.privateRoof) chips.push("Private roof");
  if (listing?.inVilla) chips.push("In villa");
  if (listing?.twoEntrances) chips.push("Two entrances");
  if (listing?.specialEntrance) chips.push("Special entrance");
  return chips;
};

export const getListingSpecRows = (listing) =>
  [
    { label: "Property Type", value: capitalize(listing?.propertyType) },
    { label: "Street Direction", value: listing?.streetDirection },
    { label: "Bedrooms", value: listing?.bedrooms },
    { label: "Living Rooms", value: listing?.livingRooms },
    { label: "Bathrooms", value: listing?.wc },
    { label: "Street Width", value: listing?.streetWidth ? `${listing.streetWidth} m` : null },
    { label: "Area", value: listing?.area ? `${listing.area} m²` : null },
    { label: "Age", value: listing?.ageLessThan },
    { label: "Floor", value: listing?.floor },
    { label: "City", value: listing?.city },
    { label: "District", value: listing?.district },
    { label: "Address", value: listing?.address },
    { label: "Listing Kind", value: capitalize(listing?.listingKind) },
    { label: "Purpose", value: getListingPurposeTag(listing) },
  ].filter((row) => row.value != null && row.value !== "");

export const formatRegistryDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB");
};

export const getListingRegistryRows = (listing) =>
  [
    { label: "Listing ID", value: listing?.id },
    { label: "Area on Deed", value: listing?.area ? `${listing.area} m²` : null },
    { label: "Created On", value: formatRegistryDate(listing?.createdAt) },
    { label: "Last Updated", value: formatListedAgo(listing?.updatedAt) },
    { label: "Contact Phone", value: listing?.contactPhone },
    { label: "Inquiries", value: listing?.allowInquiries ? "Allowed" : "Disabled" },
  ].filter((row) => row.value != null && row.value !== "");

export const getListingHeroPhotos = (listing, maxCount = 3) => {
  const urls = (listing?.photos ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((photo) => photo.url)
    .filter(Boolean);

  return urls.slice(0, maxCount);
};

export const getListingActionFacts = (listing) => {
  const facts = [];
  if (listing?.area) facts.push({ icon: "area", text: `${listing.area} m²` });
  if (listing?.bedrooms != null) facts.push({ icon: "bed", text: `${listing.bedrooms} bed` });
  if (listing?.wc != null) facts.push({ icon: "bath", text: `${listing.wc} bath` });

  const amenities = [];
  if (listing?.airConditioned) amenities.push("AC");
  if (listing?.furnished) amenities.push("Furnished");
  if (amenities.length > 0) {
    facts.push({ icon: "amenity", text: amenities.join(" · ") });
  }

  return facts;
};

export const getListingFinanceEstimate = (listing) => {
  const price = Number(listing?.price);
  if (!Number.isFinite(price) || price <= 0) {
    return { downPayment: 0, monthly: 0 };
  }

  const downPayment = Math.round(price * 0.25);
  const loanAmount = price - downPayment;
  const monthly = loanAmount / (20 * 12);

  return {
    downPayment,
    monthly: Math.round(monthly * 10) / 10,
  };
};

export const getListingAgentName = (listing) =>
  listing?.owner?.fullName || listing?.contactName || "Property owner";

export const getListingAgentInitials = (name) => {
  if (!name || typeof name !== "string") return "PO";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const getRelatedListingSummary = (listing) => ({
  id: listing?.id,
  title: getListingCardTitle(listing),
  location: getListingLocation(listing),
  price: formatListingPrice(listing),
  photoUrl: listing?.photos?.[0]?.url || "",
  area: listing?.area,
  bedrooms: listing?.bedrooms,
  wc: listing?.wc,
});

export const getListingDetailMeta = (listing) => ({
  title: getListingCardTitle(listing),
  location: getListingLocation(listing),
  purposeLabel: getListingPurposeTag(listing),
  typeLabel: getListingTypeTag(listing),
  priceLabel: formatListingPrice(listing),
  listedAgo: formatListedAgo(listing?.createdAt),
  photoCount: listing?.photos?.length ?? 0,
});
