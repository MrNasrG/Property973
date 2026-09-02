"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IconHeartFilledSvg,
  IconHeartOutlineSvg,
  IconMapFoldedSvg,
  IconMoreHorizontalSvg,
  IconPhoneSvg,
  IconShareNodesSvg,
} from "@/assets";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer";
import CallNowPopup from "@/components/landingPage/realEstateTab/realEstateCardComponent/callNowPopup";
import { useRouter } from "@/i18n/navigation";
import { listFavouritesAction } from "@/redux/favourites/action";
import { fetchPublicListingsAction } from "@/redux/homepage/action";
import { setSelectedListing } from "@/redux/homepage/slice";
import {
  setCallNowPopupOpen,
  setCallNowPopupTargetId,
} from "@/redux/landingPageFilter/slice";
import { PATH_PROPERTY } from "@/routes/path";
import { getAuthToken } from "@/utils/authToken";
import { formatListingPrice } from "@/utils/listingDisplay";
import { useFavouriteToggle } from "@/utils/useFavouriteToggle";

import {
  getListingActionFacts,
  getListingAgentInitials,
  getListingAgentName,
  getListingAmenityChips,
  getListingDetailMeta,
  getListingFinanceEstimate,
  getListingHeroPhotos,
  getListingRegistryRows,
  getListingSpecRows,
  getRelatedListingSummary,
} from "@/utils/listingDetail";

import {
  ActionAmount,
  ActionBar,
  ActionBarInner,
  ActionCta,
  ActionFacts,
  ActionPrice,
  ActionUnit,
  AgentAvatar,
  AgentCta,
  AgentMeta,
  AgentName,
  AgentRow,
  BodyWrap,
  Button,
  Chip,
  EmptyState,
  EmptyTitle,
  FeatureChips,
  FinanceEstimate,
  FinanceRow,
  FinanceRows,
  FinanceText,
  FinanceTitle,
  Hero,
  HeroBadge,
  HeroContent,
  HeroEyebrow,
  HeroFade,
  HeroFrame,
  HeroIconButton,
  HeroIconRow,
  HeroLoc,
  HeroRight,
  HeroStrip,
  HeroTitle,
  LeadText,
  ListingNav,
  ListingNavButton,
  MapPin,
  MediaBox,
  MediaLabel,
  MediaLane,
  Page,
  Panel,
  PhotoPill,
  RegistryStrip,
  RelatedBody,
  RelatedCard,
  RelatedFacts,
  RelatedHead,
  RelatedLoc,
  RelatedPrice,
  RelatedScroll,
  RelatedSection,
  RelatedTitle,
  ReportLine,
  SectionLabel,
  SideBlock,
  SideCol,
  SimilarLoc,
  SimilarMini,
  SimilarPrice,
  SpecFlow,
  SpecKey,
  SpecRow,
  SpecValue,
  Tab,
  TabsRow,
} from "./style";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details & Features" },
  { id: "media", label: "Video & Map" },
  { id: "registry", label: "Registry Info" },
];

const PropertyDetail = ({ listingId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const { isFavourite, isToggling, toggleFavourite } = useFavouriteToggle();

  const { items, selectedListing, isLoading } = useSelector(
    (state) => state.homepageSlice,
  );
  const { callNowPopupOpen, callNowPopupTargetId } = useSelector(
    (state) => state.landingPageFilterSlice,
  );

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      dispatch(fetchPublicListingsAction());
    }
  }, [dispatch, items.length, isLoading]);

  useEffect(() => {
    if (!getAuthToken()) return;
    dispatch(listFavouritesAction({ page: 1, limit: 100 }));
  }, [dispatch]);


  const listing = useMemo(() => {
    if (selectedListing?.id === listingId) return selectedListing;
    return items.find((item) => item.id === listingId) ?? null;
  }, [items, listingId, selectedListing]);

  const currentIndex = useMemo(
    () => items.findIndex((item) => item.id === listingId),
    [items, listingId],
  );

  const openListing = useCallback(
    (nextListing) => {
      if (!nextListing?.id) return;
      dispatch(setSelectedListing(nextListing));
      router.push(PATH_PROPERTY.detail(nextListing.id));
      setActiveTab("overview");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch, router],
  );

  const openCallPopup = useCallback(() => {
    dispatch(setCallNowPopupTargetId(listingId));
    dispatch(setCallNowPopupOpen(true));
  }, [dispatch, listingId]);

  if (!listing) {
    return (
      <>
        <Header />
        <EmptyState>
          <EmptyTitle>{isLoading ? "Loading property…" : "Property not found"}</EmptyTitle>
          {!isLoading && (
            <Button type="button" onClick={() => router.push("/")}>
              Back to listings
            </Button>
          )}
        </EmptyState>
        <Footer />
      </>
    );
  }

  const meta = getListingDetailMeta(listing);
  const heroPhotos = getListingHeroPhotos(listing);
  const actionFacts = getListingActionFacts(listing);
  const specRows = getListingSpecRows(listing);
  const amenityChips = getListingAmenityChips(listing);
  const registryRows = getListingRegistryRows(listing);
  const agentName = getListingAgentName(listing);
  const agentInitials = getListingAgentInitials(agentName);
  const finance = getListingFinanceEstimate(listing);
  const priceLabel = formatListingPrice(listing);
  const isCallPopupOpen =
    callNowPopupOpen && callNowPopupTargetId === listingId;

  const relatedListings = items
    .filter((item) => item.id !== listing.id)
    .slice(0, 6)
    .map(getRelatedListingSummary);

  const similarListings = relatedListings.slice(0, 3);
  const previousListing = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextListing =
    currentIndex >= 0 && currentIndex < items.length - 1
      ? items[currentIndex + 1]
      : null;

  const coverPhoto = heroPhotos[0];
  const mapPhoto = coverPhoto || heroPhotos[1];

  return (
    <Page>
      <Header />

      <Hero>
        <HeroStrip>
          {heroPhotos.length > 0 ? (
            heroPhotos.map((photo, index) => (
              <HeroFrame
                key={`${photo}-${index}`}
                $layout={
                  heroPhotos.length === 1
                    ? "single"
                    : index === 0
                      ? "primary"
                      : "secondary"
                }
              >
                <img src={photo} alt={`${meta.title} photo ${index + 1}`} />
              </HeroFrame>
            ))
          ) : (
            <HeroFrame $layout="single">
              <div style={{ width: "100%", height: "100%", background: "#f1efe8" }} />
            </HeroFrame>
          )}
        </HeroStrip>
        <HeroFade />
        <HeroContent>
          <div>
            <HeroEyebrow>
              <HeroBadge $variant="sale">{meta.purposeLabel}</HeroBadge>
              <HeroBadge $variant="type">{meta.typeLabel}</HeroBadge>
            </HeroEyebrow>
            <HeroTitle>{meta.title}</HeroTitle>
            <HeroLoc>
              <IconMapFoldedSvg aria-hidden width={16} height={16} />
              {meta.location}
            </HeroLoc>
          </div>
          <HeroRight>
            <HeroIconRow>
              <HeroIconButton
                type="button"
                $active={isFavourite(listing.id)}
                aria-label={
                  isFavourite(listing.id)
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                disabled={isToggling(listing.id)}
                onClick={() => toggleFavourite(listing)}
              >
                {isFavourite(listing.id) ? (
                  <IconHeartFilledSvg aria-hidden width={18} height={18} />
                ) : (
                  <IconHeartOutlineSvg aria-hidden width={18} height={18} />
                )}
              </HeroIconButton>

              <HeroIconButton type="button" aria-label="Share listing">
                <IconShareNodesSvg aria-hidden width={18} height={18} />
              </HeroIconButton>
              <HeroIconButton type="button" aria-label="More options">
                <IconMoreHorizontalSvg aria-hidden width={18} height={18} />
              </HeroIconButton>
            </HeroIconRow>
            {meta.photoCount > 1 ? (
              <PhotoPill>
                View all {meta.photoCount} photos
              </PhotoPill>
            ) : null}
          </HeroRight>
        </HeroContent>
      </Hero>

      <ActionBar>
        <ActionBarInner>
          <ActionPrice>
            <ActionAmount>{meta.priceLabel}</ActionAmount>
            <ActionUnit>
              {listing.purpose === "rent" ? "per period" : "total price"}
            </ActionUnit>
          </ActionPrice>
          <ActionFacts>
            {actionFacts.map((fact) => (
              <span key={fact.text}>
                <b>{fact.text}</b>
              </span>
            ))}
          </ActionFacts>
          <ActionCta>
            <Button type="button" onClick={openCallPopup}>
              <IconPhoneSvg aria-hidden width={16} height={16} />
              Call agent
            </Button>
          </ActionCta>
        </ActionBarInner>
      </ActionBar>

      <BodyWrap>
        <div>
          <TabsRow>
            {TABS.map((tab) => (
              <Tab
                key={tab.id}
                type="button"
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Tab>
            ))}
          </TabsRow>

          <Panel $active={activeTab === "overview"}>
            <SectionLabel>About this {meta.typeLabel.toLowerCase()}</SectionLabel>
            <LeadText>
              {listing.description ||
                "No description provided for this listing yet."}
            </LeadText>
            {listing.address ? (
              <LeadText>Address: {listing.address}</LeadText>
            ) : null}

            <ListingNav>
              <ListingNavButton
                type="button"
                disabled={!previousListing}
                onClick={() => openListing(previousListing)}
              >
                ← Previous Listing
              </ListingNavButton>
              <ListingNavButton
                type="button"
                disabled={!nextListing}
                onClick={() => openListing(nextListing)}
              >
                Next Listing →
              </ListingNavButton>
            </ListingNav>
          </Panel>

          <Panel $active={activeTab === "details"}>
            <SectionLabel>Listing Details</SectionLabel>
            <SpecFlow>
              {specRows.map((row) => (
                <SpecRow key={row.label}>
                  <SpecKey>{row.label}</SpecKey>
                  <SpecValue>{row.value}</SpecValue>
                </SpecRow>
              ))}
            </SpecFlow>

            {amenityChips.length > 0 ? (
              <>
                <SectionLabel style={{ marginTop: 34 }}>Features</SectionLabel>
                <FeatureChips>
                  {amenityChips.map((chip) => (
                    <Chip key={chip}>✓ {chip}</Chip>
                  ))}
                </FeatureChips>
              </>
            ) : null}
          </Panel>

          <Panel $active={activeTab === "media"}>
            <SectionLabel>Walkthrough & Location</SectionLabel>
            <MediaLane>
              <MediaBox>
                <MediaLabel>Photo</MediaLabel>
                {coverPhoto ? (
                  <img src={coverPhoto} alt={`${meta.title} preview`} />
                ) : null}
              </MediaBox>
              <MediaBox>
                <MediaLabel>Map</MediaLabel>
                {mapPhoto ? (
                  <img src={mapPhoto} alt={`${meta.title} map preview`} />
                ) : null}
                <MapPin aria-hidden />
              </MediaBox>
            </MediaLane>
          </Panel>

          <Panel $active={activeTab === "registry"}>
            <SectionLabel>Registry & Listing Info</SectionLabel>
            <RegistryStrip>
              {registryRows.map((row) => (
                <div key={row.label}>
                  {row.label} <b>{row.value}</b>
                </div>
              ))}
            </RegistryStrip>
          </Panel>
        </div>

        <SideCol>
          <SideBlock>
            <AgentRow>
              <AgentAvatar aria-hidden>{agentInitials}</AgentAvatar>
              <div>
                <AgentName>{agentName}</AgentName>
                <AgentMeta>Listed {meta.listedAgo.replace(/^Listed\s/, "")}</AgentMeta>
              </div>
            </AgentRow>
            <AgentCta>
              <Button type="button" onClick={openCallPopup}>
                <IconPhoneSvg aria-hidden width={16} height={16} />
                Call
              </Button>
            </AgentCta>
            <ReportLine>
              Seeing something off?{" "}
              <span style={{ color: "var(--color-brand, #ce1126)", fontWeight: 700 }}>
                Report this listing
              </span>
            </ReportLine>
          </SideBlock>

          {listing.purpose === "sale" ? (
            <SideBlock>
              <FinanceTitle>Estimate your payment</FinanceTitle>
              <FinanceText>
                See roughly what this {meta.typeLabel.toLowerCase()} could cost per
                month before reaching out for financing.
              </FinanceText>
              <FinanceRows>
                <FinanceRow>
                  <span>Property price</span>
                  <span>{priceLabel}</span>
                </FinanceRow>
                <FinanceRow>
                  <span>Down payment (25%)</span>
                  <span>BHD {finance.downPayment.toLocaleString()}</span>
                </FinanceRow>
                <FinanceRow>
                  <span>Loan term</span>
                  <span>20 years</span>
                </FinanceRow>
              </FinanceRows>
              <FinanceEstimate>
                <span>Est. monthly</span>
                <b>BHD {finance.monthly.toLocaleString()}</b>
              </FinanceEstimate>
            </SideBlock>
          ) : null}

          {similarListings.length > 0 ? (
            <SideBlock>
              <FinanceTitle>You might also like</FinanceTitle>
              {similarListings.map((item) => (
                <SimilarMini
                  key={item.id}
                  type="button"
                  onClick={() => {
                    const raw = items.find((entry) => entry.id === item.id);
                    if (raw) openListing(raw);
                  }}
                >
                  {item.photoUrl ? (
                    <img src={item.photoUrl} alt={item.title} />
                  ) : (
                    <div
                      style={{
                        width: 64,
                        height: 54,
                        borderRadius: 8,
                        background: "#f1efe8",
                      }}
                    />
                  )}
                  <div>
                    <SimilarPrice>{item.price}</SimilarPrice>
                    <SimilarLoc>
                      {item.location}
                      {item.bedrooms ? ` · ${item.bedrooms} bed` : ""}
                    </SimilarLoc>
                  </div>
                </SimilarMini>
              ))}
            </SideBlock>
          ) : null}
        </SideCol>
      </BodyWrap>

      {relatedListings.length > 0 ? (
        <RelatedSection>
          <RelatedHead>
            <h2>Related Listings</h2>
            <span>See all →</span>
          </RelatedHead>
          <RelatedScroll>
            {relatedListings.map((item) => (
              <RelatedCard
                key={item.id}
                type="button"
                onClick={() => {
                  const raw = items.find((entry) => entry.id === item.id);
                  if (raw) openListing(raw);
                }}
              >
                {item.photoUrl ? (
                  <img src={item.photoUrl} alt={item.title} />
                ) : (
                  <div style={{ height: 150, background: "#f1efe8" }} />
                )}
                <RelatedBody>
                  <RelatedPrice>{item.price}</RelatedPrice>
                  <RelatedTitle>{item.title}</RelatedTitle>
                  <RelatedLoc>{item.location}</RelatedLoc>
                  <RelatedFacts>
                    {item.area ? <span>{item.area}m²</span> : null}
                    {item.bedrooms ? <span>{item.bedrooms} bed</span> : null}
                    {item.wc ? <span>{item.wc} bath</span> : null}
                  </RelatedFacts>
                </RelatedBody>
              </RelatedCard>
            ))}
          </RelatedScroll>
        </RelatedSection>
      ) : null}

      <CallNowPopup
        open={isCallPopupOpen}
        onClose={() => dispatch(setCallNowPopupOpen(false))}
        agentName={agentName}
        agentInitials={agentInitials}
        agentPhone={listing.contactPhone}
      />

      <Footer />
    </Page>
  );
};

export default PropertyDetail;
