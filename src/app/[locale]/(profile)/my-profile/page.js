"use client";

import {
  IconArrowUpRightSvg,
  IconBathPropertySvg,
  IconBedPropertySvg,
  IconBuildingSvg,
  IconCalendarSvg,
  IconCarPropertySvg,
  IconChartSvg,
  IconCheckMarkSvg,
  IconChevronDownSvg,
  IconDashboardSvg,
  IconEditSvg,
  IconHeartFilledSvg,
  IconHelpSvg,
  IconMailSvg,
  IconMapFoldedSvg,
  IconMessageSvg,
  IconPhoneSvg,
  IconPlusSvg,
  IconRulerAreaSvg,
  IconSettingsSvg,
  IconStarFilledSvg,
  IconTrashSvg,
} from "@/assets";

import DashboardHeader from "@/components/dashboardHeader";
import AddPropertyForm from "@/components/owner/AddPropertyForm";
import DeletePropertyModal from "@/components/owner/DeletePropertyModal";
import { useStoredUser } from "@/utils/useStoredUser";
import { useIsClientMounted } from "@/utils/useIsClientMounted";
import {
  AccountField,
  AccountInput,
  AccountLabel,
  AppShell,
  AvatarLg,
  BannerIdentity,
  BannerStat,
  BannerStatLbl,
  BannerStatNum,
  BannerStats,
  BannerTop,
  BtnOutline,
  BtnPrimary,
  Card,
  CardAction,
  CardHead,
  CardTitle,
  ContactLine,
  HeaderBtns,
  IconActionBtn,
  InfoGrid,
  InquiryAvatar,
  InquiryBody,
  InquiryHeader,
  InquiryItem,
  InquiryList,
  InquiryMsg,
  InquiryName,
  InquiryTag,
  InquiryTime,
  Layout,
  Main,
  MetaDivider,
  OwnerMeta,
  OwnerName,
  OwnerNameRow,
  OwnerPropActions,
  OwnerPropBody,
  OwnerPropCard,
  OwnerPropFeature,
  OwnerPropFeatures,
  OwnerPropFooter,
  OwnerPropListed,
  OwnerPropLoc,
  OwnerPropMedia,
  OwnerPropMediaLabel,
  OwnerPropPhotoCount,
  OwnerPropPrice,
  OwnerPropPriceBlock,
  OwnerPropStatus,
  OwnerPropTag,
  OwnerPropTags,
  OwnerPropTitle,
  PageHeader,
  PageSub,
  PageTitle,
  PageWrap,
  ProfileBanner,
  PropEmptyState,
  PropEmptyText,
  PropList,
  RatingBlock,
  RatingLabel,
  RatingReviews,
  RatingValue,
  Sidebar,
  SidebarBadge,
  SidebarBadgeAlert,
  SidebarBrand,
  SidebarBrandIcon,
  SidebarBrandSub,
  SidebarBrandText,
  SidebarBrandTitle,
  SidebarChevron,
  SidebarFooter,
  SidebarFooterItem,
  SidebarItem,
  SidebarItemInner,
  SidebarSectionLabel,
  StarsRow,
  StatCard,
  StatChg,
  StatLbl,
  StatVal,
  StatsRow,
  SrOnly,
  VerifiedBadge,
} from "./style";
import { getUserProfileAction } from "../../../../redux/dashboard/action";
import {
  deleteListingAction,
  listListingsAction,
} from "../../../../redux/listings/action";
import {
  listFavouritesAction,
  removeFavouriteAction,
} from "../../../../redux/favourites/action";
import { getAuthToken } from "@/utils/authToken";
import {
  formatListingPrice,
  getListingCardTitle,
  getListingFeatureItems,
  getListingLocation,
  getListingPurposeTag,
  getListingStatusLabel,
  getListingTypeTag,
} from "@/utils/listingDisplay";
import { PATH_PROPERTY } from "@/routes/path";
import { useRouter } from "@/i18n/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { setUserData } from "../../../../redux/dashboard/slice";


const FEATURE_ICON_MAP = {
  ruler: IconRulerAreaSvg,
  bed: IconBedPropertySvg,
  bath: IconBathPropertySvg,
  car: IconCarPropertySvg,
};

const DEMO_INQUIRIES = [
  {
    id: 1,
    initials: "PK",
    name: "Priya Kapoor",
    message: "Interested in 2BHK — is it pet friendly?",
    time: "10 min ago",
    tag: "New",
    tagVariant: "new",
    bg: "#E1F5EE",
    color: "#085041",
  },
  {
    id: 2,
    initials: "AM",
    name: "Arjun Mehta",
    message: "Can I schedule a visit this Saturday?",
    time: "2 hr ago",
    tag: "Visit",
    tagVariant: "visit",
    bg: "#E6F1FB",
    color: "#0C447C",
  },
  {
    id: 3,
    initials: "SS",
    name: "Sneha Shah",
    message: "Is the 3BHK still available for next month?",
    time: "Yesterday",
    tag: "New",
    tagVariant: "new",
    bg: "#FAEEDA",
    color: "#633806",
  },
  {
    id: 4,
    initials: "RD",
    name: "Ravi Desai",
    message: "Thank you for the quick reply!",
    time: "2 days ago",
    tag: "Replied",
    tagVariant: "replied",
    bg: "#EEEDFE",
    color: "#3C3489",
  },
];

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getFirstName = (name) => {
  if (!name || typeof name !== "string") return "there";
  return name.trim().split(/\s+/)[0] || "there";
};

const MyProfilePage = () => {
  const user = useStoredUser();
  const mounted = useIsClientMounted();
  const dispatch = useDispatch();
  const router = useRouter();
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listingToDelete, setListingToDelete] = useState(null);
  const UserData = useSelector((state) => state.dashboardSlice?.userProfileData);
  const listings = useSelector((state) => state.listingsSlice?.items ?? []);
  const listingsLoading = useSelector((state) => state.listingsSlice?.isLoading);
  const listingsSubmitting = useSelector((state) => state.listingsSlice?.isSubmitting);
  const favourites = useSelector((state) => state.favouritesSlice?.items ?? []);
  const favouritesLoading = useSelector(
    (state) => state.favouritesSlice?.isLoading,
  );
  const favouriteTogglingId = useSelector(
    (state) => state.favouritesSlice?.togglingId,
  );

  const resolvedName = user?.fullName || UserData?.fullName || "Property owner";
  const resolvedEmail = user?.email || UserData?.email || "—";
  const resolvedPhone = user?.mobileNumber || UserData?.mobileNumber || "";
  const displayName = mounted ? resolvedName : "Property owner";
  const firstName = mounted ? getFirstName(resolvedName) : "there";
  const initials = mounted ? getInitials(resolvedName) : "PO";
  const email = mounted ? resolvedEmail : "—";
  const phone = mounted ? resolvedPhone || "—" : "—";
  const showVerifiedBadge = mounted && Boolean(user);

  const GetUserProfile = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await dispatch(getUserProfileAction({ token }));
      if (response.payload?.success === true) {
        dispatch(setUserData(response.payload.data?.user));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const fetchListings = useCallback(async () => {
    if (!getAuthToken()) return;
    await dispatch(listListingsAction({ page: 1, limit: 20 }));
  }, [dispatch]);

  const fetchFavourites = useCallback(async () => {
    if (!getAuthToken()) return;
    await dispatch(listFavouritesAction({ page: 1, limit: 50 }));
  }, [dispatch]);

  useEffect(() => {
    GetUserProfile();
    fetchListings();
    fetchFavourites();
  }, [GetUserProfile, fetchListings, fetchFavourites]);


  const openAddProperty = () => {
    setEditingListing(null);
    setAddPropertyOpen(true);
  };
  const closeAddProperty = () => {
    setAddPropertyOpen(false);
    setEditingListing(null);
  };

  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setAddPropertyOpen(true);
  };

  const handleDeleteListing = (listing) => {
    if (!listing?.id) return;
    setListingToDelete(listing);
  };

  const closeDeleteModal = () => {
    if (listingsSubmitting) return;
    setListingToDelete(null);
  };

  const confirmDeleteListing = async () => {
    if (!listingToDelete?.id) return;
    const result = await dispatch(deleteListingAction(listingToDelete.id));
    if (deleteListingAction.fulfilled.match(result)) {
      setListingToDelete(null);
    }
  };

  const handleRemoveFavourite = async (listing) => {
    if (!listing?.id || favouriteTogglingId === String(listing.id)) return;
    await dispatch(removeFavouriteAction(listing.id));
  };


  const handleOpenFavourite = (listing) => {
    if (!listing?.id) return;
    router.push(PATH_PROPERTY.detail(listing.id));
  };

  const propertyCount = listings.length;
  const favouriteCount = favourites.length;


  return (
    <>
      <DashboardHeader />
      <AddPropertyForm
        open={addPropertyOpen}
        onClose={closeAddProperty}
        contactPhone={user?.mobileNumber || ""}
        listing={editingListing}
        onSuccess={fetchListings}
      />
      <DeletePropertyModal
        open={Boolean(listingToDelete)}
        listing={listingToDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteListing}
        isDeleting={listingsSubmitting}
      />

      <PageWrap>
        <AppShell>
          <Layout>
            <Sidebar>
              <SidebarBrand>
                <SidebarBrandIcon>
                  <IconMapFoldedSvg aria-hidden />
                </SidebarBrandIcon>
                <SidebarBrandText>
                  <SidebarBrandTitle>Property 973</SidebarBrandTitle>
                  <SidebarBrandSub>Bahrain</SidebarBrandSub>
                </SidebarBrandText>
                <SidebarChevron aria-hidden>
                  <IconChevronDownSvg />
                </SidebarChevron>
              </SidebarBrand>

              <SidebarSectionLabel>Overview</SidebarSectionLabel>
              <SidebarItem type="button" $active>
                <IconDashboardSvg aria-hidden />
                My {firstName}
              </SidebarItem>

              <SidebarSectionLabel>Listings</SidebarSectionLabel>
              <SidebarItem type="button">
                <SidebarItemInner>
                  <IconBuildingSvg aria-hidden />
                  My properties
                </SidebarItemInner>
                <SidebarBadge>{propertyCount}</SidebarBadge>
              </SidebarItem>
              <SidebarItem type="button" onClick={openAddProperty}>
                <IconPlusSvg aria-hidden />
                Add property
              </SidebarItem>
              <SidebarItem type="button">
                <SidebarItemInner>
                  <IconHeartFilledSvg aria-hidden />
                  Favourite properties
                </SidebarItemInner>
                <SidebarBadge>{favouriteCount}</SidebarBadge>
              </SidebarItem>

              <SidebarSectionLabel>Activity</SidebarSectionLabel>

              <SidebarItem type="button">
                <SidebarItemInner>
                  <IconMessageSvg aria-hidden />
                  Inquiries
                </SidebarItemInner>
                <SidebarBadgeAlert>5</SidebarBadgeAlert>
              </SidebarItem>
              <SidebarItem type="button">
                <IconCalendarSvg aria-hidden />
                Site visits
              </SidebarItem>
              <SidebarItem type="button">
                <IconChartSvg aria-hidden />
                Analytics
              </SidebarItem>

              <SidebarFooter>
                <SidebarFooterItem type="button">
                  <IconSettingsSvg aria-hidden />
                  Settings
                </SidebarFooterItem>
                <SidebarFooterItem type="button">
                  <IconHelpSvg aria-hidden />
                  Help
                </SidebarFooterItem>
              </SidebarFooter>
            </Sidebar>

            <Main>
              <SrOnly>
                Owner dashboard with sidebar, profile summary, stats, a property card
                styled like the public listings page with edit and delete actions, recent
                inquiries below it, and account information.
              </SrOnly>

              <PageHeader>
                <div>
                  <PageTitle>My profile</PageTitle>
                  <PageSub>
                    Welcome back, {firstName} — here&apos;s your owner dashboard
                  </PageSub>
                </div>
                <HeaderBtns>
                  <BtnOutline type="button">Public view</BtnOutline>
                  <BtnPrimary type="button" onClick={openAddProperty}>
                    <IconPlusSvg aria-hidden /> Add property
                  </BtnPrimary>
                  <BtnOutline type="button">
                    <IconEditSvg aria-hidden /> Edit profile
                  </BtnOutline>
                </HeaderBtns>
              </PageHeader>

              <ProfileBanner>
                <BannerTop>
                  <BannerIdentity>
                    <AvatarLg>{initials}</AvatarLg>
                    <div>
                      <OwnerNameRow>
                        <OwnerName>{displayName}</OwnerName>
                        {showVerifiedBadge && (
                          <VerifiedBadge>
                            <IconCheckMarkSvg aria-hidden />
                            Verified owner
                          </VerifiedBadge>
                        )}
                      </OwnerNameRow>
                      <OwnerMeta>
                        <IconMapFoldedSvg aria-hidden />
                        <span>Location not set</span>
                        <MetaDivider>|</MetaDivider>
                        <span>Member since —</span>
                      </OwnerMeta>
                      <ContactLine>
                        <span>
                          <IconMailSvg aria-hidden />
                          {email}
                        </span>
                        {phone !== "—" && (
                          <span>
                            <IconPhoneSvg aria-hidden />
                            {phone}
                          </span>
                        )}
                      </ContactLine>
                    </div>
                  </BannerIdentity>
                  <RatingBlock>
                    <RatingLabel>Owner rating</RatingLabel>
                    <StarsRow aria-label="4.5 out of 5 stars">
                      <IconStarFilledSvg aria-hidden />
                      <RatingValue>4.5</RatingValue>
                    </StarsRow>
                    <RatingReviews>24 reviews</RatingReviews>
                  </RatingBlock>
                </BannerTop>
                <BannerStats>
                  <BannerStat>
                    <BannerStatNum>{propertyCount}</BannerStatNum>
                    <BannerStatLbl>Properties listed</BannerStatLbl>
                  </BannerStat>
                  <BannerStat>
                    <BannerStatNum>5</BannerStatNum>
                    <BannerStatLbl>Active inquiries</BannerStatLbl>
                  </BannerStat>
                  <BannerStat>
                    <BannerStatNum>2</BannerStatNum>
                    <BannerStatLbl>Currently rented</BannerStatLbl>
                  </BannerStat>
                  <BannerStat>
                    <BannerStatNum>142</BannerStatNum>
                    <BannerStatLbl>Profile views</BannerStatLbl>
                  </BannerStat>
                </BannerStats>
              </ProfileBanner>

              <StatsRow>
                <StatCard>
                  <StatLbl>Total views</StatLbl>
                  <StatVal>142</StatVal>
                  <StatChg>
                    <IconArrowUpRightSvg aria-hidden /> 18 this week
                  </StatChg>
                </StatCard>
                <StatCard>
                  <StatLbl>Inquiries</StatLbl>
                  <StatVal>5</StatVal>
                  <StatChg>2 new today</StatChg>
                </StatCard>
                <StatCard>
                  <StatLbl>Rent earned</StatLbl>
                  <StatVal>₹48k</StatVal>
                  <StatChg $muted>This month</StatChg>
                </StatCard>
                <StatCard>
                  <StatLbl>Favourite properties</StatLbl>
                  <StatVal>{favouriteCount}</StatVal>
                  <StatChg $muted>Saved by you</StatChg>
                </StatCard>
              </StatsRow>


              <Card>
                <CardHead>
                  <CardTitle>My properties</CardTitle>
                  <CardAction type="button">View all</CardAction>
                </CardHead>
                <PropList>
                  {listingsLoading ? (
                    <OwnerPropCard>
                      <OwnerPropBody>
                        <OwnerPropTitle>Loading properties…</OwnerPropTitle>
                      </OwnerPropBody>
                    </OwnerPropCard>
                  ) : listings.length === 0 ? (
                    <PropEmptyState>
                      <PropEmptyText>
                        List a property to reach more buyers
                      </PropEmptyText>
                      <BtnOutline type="button" onClick={openAddProperty}>
                        <IconPlusSvg aria-hidden /> Add property
                      </BtnOutline>
                    </PropEmptyState>
                  ) : (
                    listings.map((listing) => {
                      const coverPhoto = listing?.photos?.[0]?.url;
                      const photoCount = listing?.photos?.length ?? 0;
                      const features = getListingFeatureItems(listing);

                      return (
                        <OwnerPropCard key={listing.id}>
                          <OwnerPropBody>
                            <OwnerPropTags>
                              <OwnerPropTag $brand>
                                {getListingPurposeTag(listing)}
                              </OwnerPropTag>
                              <OwnerPropTag>{getListingTypeTag(listing)}</OwnerPropTag>
                            </OwnerPropTags>
                            <OwnerPropTitle>{getListingCardTitle(listing)}</OwnerPropTitle>
                            <OwnerPropLoc>{getListingLocation(listing)}</OwnerPropLoc>
                            {features.length > 0 && (
                              <OwnerPropFeatures>
                                {features.map((item) => {
                                  const IconComponent = FEATURE_ICON_MAP[item.iconKey];
                                  return (
                                    <OwnerPropFeature key={item.text}>
                                      {IconComponent ? (
                                        <IconComponent aria-hidden />
                                      ) : null}
                                      {item.text}
                                    </OwnerPropFeature>
                                  );
                                })}
                              </OwnerPropFeatures>
                            )}
                            <OwnerPropFooter>
                              <OwnerPropPriceBlock>
                                <OwnerPropPrice>
                                  {formatListingPrice(listing)}
                                </OwnerPropPrice>
                                <OwnerPropListed>Listed recently</OwnerPropListed>
                              </OwnerPropPriceBlock>
                              <OwnerPropActions>
                                <OwnerPropStatus>
                                  • {getListingStatusLabel(listing.status)}
                                </OwnerPropStatus>
                                <IconActionBtn
                                  type="button"
                                  aria-label="Edit property"
                                  onClick={() => handleEditListing(listing)}
                                >
                                  <IconEditSvg aria-hidden />
                                </IconActionBtn>
                                <IconActionBtn
                                  type="button"
                                  $danger
                                  aria-label="Delete property"
                                  disabled={listingsSubmitting}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteListing(listing);
                                  }}
                                >
                                  <IconTrashSvg aria-hidden />
                                </IconActionBtn>
                              </OwnerPropActions>
                            </OwnerPropFooter>
                          </OwnerPropBody>
                          <OwnerPropMedia $photo={coverPhoto || undefined}>
                            {!coverPhoto && (
                              <>
                                <IconBuildingSvg aria-hidden />
                                <OwnerPropMediaLabel>Property photo</OwnerPropMediaLabel>
                              </>
                            )}
                            {photoCount > 0 && (
                              <OwnerPropPhotoCount>
                                1/{photoCount} photos
                              </OwnerPropPhotoCount>
                            )}
                          </OwnerPropMedia>
                        </OwnerPropCard>
                      );
                    })
                  )}
                </PropList>
                {!listingsLoading && listings.length > 0 && listings.length < 2 && (
                  <PropEmptyState>
                    <PropEmptyText>
                      List a second property to reach more buyers
                    </PropEmptyText>
                    <BtnOutline type="button" onClick={openAddProperty}>
                      <IconPlusSvg aria-hidden /> Add property
                    </BtnOutline>
                  </PropEmptyState>
                )}
              </Card>

              <Card>
                <CardHead>
                  <CardTitle>Favourite properties</CardTitle>
                  <CardAction type="button">View all</CardAction>
                </CardHead>
                <PropList>
                  {favouritesLoading ? (
                    <OwnerPropCard>
                      <OwnerPropBody>
                        <OwnerPropTitle>Loading favourites…</OwnerPropTitle>
                      </OwnerPropBody>
                    </OwnerPropCard>
                  ) : favourites.length === 0 ? (
                    <PropEmptyState>
                      <PropEmptyText>
                        Properties you save will appear here
                      </PropEmptyText>
                    </PropEmptyState>
                  ) : (
                    favourites.map((listing) => {
                      const coverPhoto = listing?.photos?.[0]?.url;
                      const photoCount = listing?.photos?.length ?? 0;
                      const features = getListingFeatureItems(listing);
                      const isRemoving = favouriteTogglingId === String(listing.id);


                      return (
                        <OwnerPropCard key={listing.id}>
                          <OwnerPropBody>
                            <OwnerPropTags>
                              <OwnerPropTag $brand>
                                {getListingPurposeTag(listing)}
                              </OwnerPropTag>
                              <OwnerPropTag>{getListingTypeTag(listing)}</OwnerPropTag>
                            </OwnerPropTags>
                            <OwnerPropTitle>{getListingCardTitle(listing)}</OwnerPropTitle>
                            <OwnerPropLoc>{getListingLocation(listing)}</OwnerPropLoc>
                            {features.length > 0 && (
                              <OwnerPropFeatures>
                                {features.map((item) => {
                                  const IconComponent = FEATURE_ICON_MAP[item.iconKey];
                                  return (
                                    <OwnerPropFeature key={item.text}>
                                      {IconComponent ? (
                                        <IconComponent aria-hidden />
                                      ) : null}
                                      {item.text}
                                    </OwnerPropFeature>
                                  );
                                })}
                              </OwnerPropFeatures>
                            )}
                            <OwnerPropFooter>
                              <OwnerPropPriceBlock>
                                <OwnerPropPrice>
                                  {formatListingPrice(listing)}
                                </OwnerPropPrice>
                                <OwnerPropListed>Saved favourite</OwnerPropListed>
                              </OwnerPropPriceBlock>
                              <OwnerPropActions>
                                <IconActionBtn
                                  type="button"
                                  aria-label="View property"
                                  onClick={() => handleOpenFavourite(listing)}
                                >
                                  <IconArrowUpRightSvg aria-hidden />
                                </IconActionBtn>
                                <IconActionBtn
                                  type="button"
                                  $favourite
                                  aria-label="Remove from favourites"
                                  disabled={isRemoving}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleRemoveFavourite(listing);
                                  }}
                                >
                                  <IconHeartFilledSvg aria-hidden />
                                </IconActionBtn>
                              </OwnerPropActions>
                            </OwnerPropFooter>
                          </OwnerPropBody>
                          <OwnerPropMedia
                            $photo={coverPhoto || undefined}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleOpenFavourite(listing)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleOpenFavourite(listing);
                              }
                            }}
                          >
                            {!coverPhoto && (
                              <>
                                <IconBuildingSvg aria-hidden />
                                <OwnerPropMediaLabel>Property photo</OwnerPropMediaLabel>
                              </>
                            )}
                            {photoCount > 0 && (
                              <OwnerPropPhotoCount>
                                1/{photoCount} photos
                              </OwnerPropPhotoCount>
                            )}
                          </OwnerPropMedia>
                        </OwnerPropCard>
                      );
                    })
                  )}
                </PropList>
              </Card>

              <Card>
                <CardHead>
                  <CardTitle>Recent inquiries</CardTitle>

                  <CardAction type="button">View all</CardAction>
                </CardHead>
                <InquiryList>
                  {DEMO_INQUIRIES.map(
                    ({
                      id,
                      initials: inqInitials,
                      name,
                      message,
                      time,
                      tag,
                      tagVariant,
                      bg,
                      color,
                    }) => (
                      <InquiryItem key={id}>
                        <InquiryAvatar $bg={bg} $color={color}>
                          {inqInitials}
                        </InquiryAvatar>
                        <InquiryBody>
                          <InquiryHeader>
                            <InquiryName>{name}</InquiryName>
                            <InquiryTag $variant={tagVariant}>{tag}</InquiryTag>
                          </InquiryHeader>
                          <InquiryMsg>{message}</InquiryMsg>
                          <InquiryTime>{time}</InquiryTime>
                        </InquiryBody>
                      </InquiryItem>
                    ),
                  )}
                </InquiryList>
              </Card>

              <Card>
                <CardHead>
                  <CardTitle>Account information</CardTitle>
                  <BtnOutline type="button">
                    <IconEditSvg aria-hidden /> Edit
                  </BtnOutline>
                </CardHead>
                <InfoGrid>
                  <AccountField>
                    <AccountLabel htmlFor="account-full-name">Full name</AccountLabel>
                    <AccountInput
                      id="account-full-name"
                      type="text"
                      value={displayName}
                      disabled
                      readOnly
                    />
                  </AccountField>
                  <AccountField>
                    <AccountLabel htmlFor="account-email">Email</AccountLabel>
                    <AccountInput
                      id="account-email"
                      type="text"
                      value={email}
                      disabled
                      readOnly
                    />
                  </AccountField>
                </InfoGrid>
              </Card>
            </Main>
          </Layout>
        </AppShell>
      </PageWrap>
    </>
  );
};

export default MyProfilePage;
