"use client";
import {
  IconArrowUpRightSvg,
  IconBathPropertySvg,
  IconBedPropertySvg,
  IconBuildingSvg,
  IconCarPropertySvg,
  IconHeartFilledSvg,
  IconHeartOutlineSvg,
  IconMoreHorizontalSvg,
  IconPhoneSvg,
  IconRulerAreaSvg,
  IconShareNodesSvg,
  IconSofaPropertySvg,
} from "@/assets";
import { realEstateCardDefaultListing } from "@/constants/options";
import { useFavouriteToggle } from "@/utils/useFavouriteToggle";
import CallNowPopup from "./callNowPopup";


import {
  ActionButtons,
  AgentBlock,
  AgentMeta,
  AgentName,
  AgentText,
  Avatar,
  Card,
  Description,
  DetailsColumn,
  FeatureBlock,
  FeatureGrid,
  FeatureItem,
  FooterRow,
  IconCircleButton,
  Location,
  MediaColumn,
  MediaIconWrap,
  MediaOverlayTop,
  MediaPlaceholder,
  OutlineButton,
  PhotoCountPill,
  PriceBlock,
  PriceMain,
  PriceSub,
  PrimaryButton,
  Tag,
  Tags,
  Title,
  TopRow,
} from "./style";
import {
  setCallNowPopupOpen,
  setCallNowPopupTargetId,
} from "@/redux/landingPageFilter/slice";
import { useDispatch, useSelector } from "react-redux";

/** `iconKey` values must match `@/constants/options` `realEstateCardFeatureOptions`. */
const FEATURE_ICON_MAP = {
  ruler: IconRulerAreaSvg,
  bed: IconBedPropertySvg,
  bath: IconBathPropertySvg,
  sofa: IconSofaPropertySvg,
  car: IconCarPropertySvg,
};

const RealEstateCardComponent = ({
  listing = {},
  sourceListing = null,
  onViewDetails,
}) => {
  const { callNowPopupOpen, callNowPopupTargetId } = useSelector(
    (state) => state.landingPageFilterSlice,
  );
  const dispatch = useDispatch();
  const { isFavourite, isToggling, toggleFavourite } = useFavouriteToggle();
  const {
    tags,
    priceAnnual,
    priceSub,
    title,
    location,
    features,
    description,
    agentInitials,
    agentName,
    agentPhone,
    agencyName,
    listedAgo,
    photoLabel,
    photoUrl,
  } = { ...realEstateCardDefaultListing, ...listing };
  const popupTargetId = listing?.id || title;
  const listingId = listing?.id;
  const favourited = isFavourite(listingId);
  const isPopupOpenForThisCard =
    callNowPopupOpen && callNowPopupTargetId === popupTargetId;


  return (
    <>
      <Card>
        <DetailsColumn>
          <TopRow>
            <Tags>
              {tags.map((t) => (
                <Tag key={t.label} $variant={t.variant}>
                  {t.label}
                </Tag>
              ))}
            </Tags>
            <PriceBlock>
              <PriceMain>{priceAnnual}</PriceMain>
              <PriceSub>{priceSub}</PriceSub>
            </PriceBlock>
          </TopRow>

          <Title>{title}</Title>
          <Location>{location}</Location>

          <FeatureBlock>
            <FeatureGrid role="list" aria-label="Property features">
              {features.map((item) => {
                const IconComponent = FEATURE_ICON_MAP[item.iconKey];
                return (
                  <FeatureItem key={item.id} role="listitem">
                    {IconComponent ? <IconComponent aria-hidden /> : null}
                    {item.text}
                  </FeatureItem>
                );
              })}
            </FeatureGrid>
          </FeatureBlock>

          <Description>{description}</Description>

          <FooterRow>
            <AgentBlock>
              <Avatar aria-hidden>{agentInitials}</Avatar>
              <AgentText>
                <AgentName>{agentName}</AgentName>
                <AgentMeta>{listedAgo}</AgentMeta>
              </AgentText>
            </AgentBlock>
            <ActionButtons>
              <OutlineButton
                type="button"
                onClick={() => {
                  dispatch(setCallNowPopupTargetId(popupTargetId));
                  dispatch(setCallNowPopupOpen(true));
                }}
                aria-label="Call agent"
              >
                <IconPhoneSvg aria-hidden />
                Call agent
                <IconArrowUpRightSvg aria-hidden />
              </OutlineButton>
              <PrimaryButton type="button" onClick={onViewDetails}>
                View details
                <IconArrowUpRightSvg aria-hidden />
              </PrimaryButton>
            </ActionButtons>
          </FooterRow>
        </DetailsColumn>

        <MediaColumn $photo={photoUrl || undefined}>
          {!photoUrl ? (
            <MediaPlaceholder>
              <MediaIconWrap aria-hidden>
                <IconBuildingSvg width={48} height={48} />
              </MediaIconWrap>
              Property photo
            </MediaPlaceholder>
          ) : null}
          <MediaOverlayTop>
            <IconCircleButton type="button" aria-label="More options">
              <IconMoreHorizontalSvg aria-hidden />
            </IconCircleButton>
            <IconCircleButton
              type="button"
              $active={favourited}
              aria-label={
                favourited ? "Remove from favourites" : "Add to favourites"
              }
              disabled={!listingId || isToggling(listingId)}
              onClick={(event) => {
                event.stopPropagation();
                toggleFavourite(sourceListing || listing);
              }}
            >
              {favourited ? (
                <IconHeartFilledSvg aria-hidden />
              ) : (
                <IconHeartOutlineSvg aria-hidden />
              )}
            </IconCircleButton>

            <IconCircleButton type="button" aria-label="Share">
              <IconShareNodesSvg aria-hidden />
            </IconCircleButton>
          </MediaOverlayTop>
          <PhotoCountPill>{photoLabel}</PhotoCountPill>
        </MediaColumn>
      </Card>
      <CallNowPopup
        open={isPopupOpenForThisCard}
        onClose={() => dispatch(setCallNowPopupOpen(false))}
        agentName={agentName}
        agentInitials={agentInitials}
        agentPhone={agentPhone}
        agencyName={agencyName}
      />
    </>
  );
};

export default RealEstateCardComponent;
