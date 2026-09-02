"use client";

import {
    IconBathPropertySvg,
    IconBedPropertySvg,
    IconBuildingSvg,
    IconHeartOutlineSvg,
    IconMapFoldedSvg,
    IconRulerAreaSvg,
} from "@/assets";
import { projectCardDefaultListing } from "@/constants/options";
import { setSelectedProjectCardId } from "@/redux/landingPageFilter/slice";
import { useDispatch, useSelector } from "react-redux";

import {
    AgentMeta,
    AgentName,
    AgentText,
    Avatar,
    Body,
    Card,
    CardGrid,
    CardSection,
    Description,
    FeatureItem,
    FeatureRow,
    FooterDivider,
    FooterRow,
    HeartButton,
    LocationRow,
    MediaBlock,
    MediaIconWrap,
    MediaPlaceholder,
    PhotoCountPill,
    PriceMain,
    PriceRow,
    PriceSub,
    Tag,
    Tags,
    TagsOverlay,
    Title,
} from "./style";

const FEATURE_ICON_MAP = {
    ruler: IconRulerAreaSvg,
    bed: IconBedPropertySvg,
    bath: IconBathPropertySvg,
};

const ProjectTabCardComponent = ({ listing = {}, onToggleSave }) => {
    const merged = { ...projectCardDefaultListing, ...listing };
    const {
        id: cardId,
        tags,
        title,
        location,
        priceMain,
        priceSub,
        features,
        description,
        agentInitials,
        agentName,
        listedAgo,
        photoLabel,
    } = merged;

    const dispatch = useDispatch();
    const selectedProjectCardId = useSelector(
        (state) => state.landingPageFilterSlice.selectedProjectCardId,
    );
    const isSelected = selectedProjectCardId === cardId;

    const handleCardActivate = () => {
        dispatch(setSelectedProjectCardId(isSelected ? null : cardId));
    };

    return (
        <Card
            $selected={isSelected}
            tabIndex={0}
            data-selected={isSelected ? "true" : undefined}
            aria-label={`${title}${isSelected ? " — selected" : ""}`}
            onClick={handleCardActivate}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardActivate();
                }
            }}
        >
            <MediaBlock>
                <TagsOverlay>
                    <Tags>
                        {tags.map((t) => (
                            <Tag key={t.label} $variant={t.variant}>
                                {t.label}
                            </Tag>
                        ))}
                    </Tags>
                </TagsOverlay>
                <HeartButton
                    type="button"
                    aria-label="Save to wishlist"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave?.(e);
                    }}
                >
                    <IconHeartOutlineSvg aria-hidden />
                </HeartButton>
                <MediaPlaceholder>
                    <MediaIconWrap>
                        <IconBuildingSvg width={40} height={40} aria-hidden />
                    </MediaIconWrap>
                    Project photo
                </MediaPlaceholder>
                <PhotoCountPill>{photoLabel}</PhotoCountPill>
            </MediaBlock>

            <Body>
                <Title>{title}</Title>
                <LocationRow>
                    <IconMapFoldedSvg width={14} height={14} aria-hidden />
                    <span>{location}</span>
                </LocationRow>

                <PriceRow>
                    <PriceMain>{priceMain}</PriceMain>
                    <PriceSub>{priceSub}</PriceSub>
                </PriceRow>

                <FeatureRow role="list" aria-label="Property highlights">
                    {features.map((item) => {
                        const IconComponent = FEATURE_ICON_MAP[item.iconKey];
                        return (
                            <FeatureItem key={item.id} role="listitem">
                                {IconComponent ? <IconComponent aria-hidden /> : null}
                                {item.text}
                            </FeatureItem>
                        );
                    })}
                </FeatureRow>

                <Description>{description}</Description>

                <FooterDivider />
                <FooterRow>
                    <Avatar aria-hidden>{agentInitials}</Avatar>
                    <AgentText>
                        <AgentName>{agentName}</AgentName>
                        <AgentMeta>{listedAgo}</AgentMeta>
                    </AgentText>
                </FooterRow>
            </Body>
        </Card>
    );
};

export default ProjectTabCardComponent;
export { CardGrid, CardSection };
