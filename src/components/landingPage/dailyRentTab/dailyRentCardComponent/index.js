"use client";

import { useState } from "react";

import {
    IconBathLineSvg,
    IconBuildingSvg,
    IconBedLineSvg,
    IconHeartOutlineSvg,
    IconRulerAreaSvg,
    IconSofaPropertySvg,
} from "@/assets";

import {
    Card,
    CardBody,
    CardFooter,
    CardGrid,
    CardSection,
    FeatureItem,
    FeatureList,
    HeartButton,
    ListingBadge,
    ListingImage,
    ListingTopBar,
    PriceMain,
    PriceWrap,
    Title,
    BookNowButton,
    LocationText,
    NightsText,
} from "./style";
import { dailyRentCardDemoListings } from "@/constants/options";

const DETAIL_ICON_MAP = [
    IconRulerAreaSvg,
    IconBedLineSvg,
    IconBathLineSvg,
    IconSofaPropertySvg,
];


const DailyRentCardComponent = () => {
    // const [savedIds, setSavedIds] = useState([]);
    // console.log("savedIds", savedIds);

    // const handleToggleSave = (listingId) => {
    //     setSavedIds((prev) =>
    //         prev.includes(listingId)
    //             ? prev.filter((id) => id !== listingId)
    //             : [...prev, listingId],
    //     );
    // };

    return (
        <CardSection>
            <CardGrid>
                {dailyRentCardDemoListings.map((item) => {
                    const Icon = item.icon;
                    {/* const isSaved = savedIds.includes(item.id); */ }
                    return (
                        <Card key={item.id}>
                            <ListingImage>
                                <ListingTopBar>
                                    <ListingBadge>{item.badge}</ListingBadge>
                                    <HeartButton
                                        type="button"
                                    // $active={isSaved}
                                    // aria-label={
                                    //     isSaved
                                    //         ? "Remove from favorites"
                                    //         : "Add to favorites"
                                    // }
                                    // aria-pressed={isSaved}
                                    // onClick={() => handleToggleSave(item.id)}
                                    >
                                        <IconHeartOutlineSvg aria-hidden />
                                    </HeartButton>
                                </ListingTopBar>
                                <Icon aria-hidden />
                            </ListingImage>

                            <CardBody>
                                <Title>{item.title}</Title>
                                <LocationText>{item.location}</LocationText>
                                <FeatureList role="list" aria-label="Listing details">
                                    {item.details.split("·").map((detail, idx) => {
                                        const Icon = DETAIL_ICON_MAP[idx];
                                        return (
                                            <FeatureItem key={`${item.id}-${detail.trim()}`} role="listitem">
                                                {Icon ? <Icon aria-hidden /> : null}
                                                {detail.trim()}
                                            </FeatureItem>
                                        );
                                    })}
                                </FeatureList>

                                <CardFooter>
                                    <PriceWrap>
                                        <PriceMain>{item.price}</PriceMain>
                                        <NightsText>{item.nights}</NightsText>
                                    </PriceWrap>
                                    <BookNowButton type="button">Book now</BookNowButton>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    );
                })}
            </CardGrid>
        </CardSection>
    );
};

export default DailyRentCardComponent;