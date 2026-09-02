"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

import {
    AppPill,
    AppRow,
    Badge,
    BadgeRow,
    Bottom,
    ColLink,
    ColTitle,
    CompanyLinkGrid,
    Copy,
    CtaBox,
    CtaLink,
    CtaSub,
    CtaText,
    Divider,
    FooterCard,
    Inner,
    LinksBand,
    LogoMark,
    LogoSub,
    Outer,
    SocialIco,
    Socials,
    Tagline,
    TopBand,
} from "./style";

const SOCIALS = [
    { key: "socialFacebook", label: "f" },
    { key: "socialLinkedIn", label: "in" },
    { key: "socialX", label: "𝕏" },
    { key: "socialYouTube", label: "▶" },
    { key: "socialInstagram", label: "◎" },
    { key: "socialSnapchat", label: "S" },
    { key: "socialTikTok", label: "♪" },
];

const Footer = () => {
    const t = useTranslations("Footer");
    const locale = useLocale();
    const pathname = usePathname();
    const year = new Date().getFullYear();

    const otherLocale = locale === "ar" ? "en" : "ar";
    const languageLabel = locale === "ar" ? "English" : "عربي";

    return (
        <Outer>
            <Inner>
                <FooterCard aria-label={t("ariaLabel")}>
                    <TopBand>
                        <div>
                            <LogoMark>
                                <Image
                                    src="/vision-2030.svg"
                                    alt="Vision 2030"
                                    width={420}
                                    height={130}
                                    className="h-16 w-auto shrink-0 md:h-20"
                                />
                            </LogoMark>
                            <LogoSub>{t("logoSub")}</LogoSub>
                            <Tagline>{t("tagline")}</Tagline>
                            {/* <AppRow>
                                <AppPill>{t("googlePlay")}</AppPill>
                                <AppPill>{t("appStore")}</AppPill>
                                <AppPill>{t("appGallery")}</AppPill>
                            </AppRow> */}
                        </div>
                        <CtaBox>
                            <CtaText>{t("ctaTitle")}</CtaText>
                            <CtaSub>{t("ctaSub")}</CtaSub>
                            <CtaLink href="/add-listing">{t("ctaButton")}</CtaLink>
                        </CtaBox>
                    </TopBand>

                    {/* <LinksBand>
                        <div>
                            <ColTitle>{t("colSearch")}</ColTitle>
                            <ColLink href="#">{t("searchApartmentsRent")}</ColLink>
                            <ColLink href="#">{t("searchApartmentsSale")}</ColLink>
                            <ColLink href="#">{t("searchVillasRent")}</ColLink>
                            <ColLink href="#">{t("searchVillasSale")}</ColLink>
                            <ColLink href="#">{t("searchFloorsRent")}</ColLink>
                            <ColLink href="#">{t("searchLandsSale")}</ColLink>
                            <ColLink href="#">{t("searchRentJuffair")}</ColLink>
                            <ColLink href="#">{t("searchRentSeef")}</ColLink>
                        </div>
                        <div>
                            <ColTitle>{t("colServices")}</ColTitle>
                            <ColLink href="#">{t("svcPay")}</ColLink>
                            <ColLink href="#">{t("svcEjar")}</ColLink>
                            <ColLink href="#">{t("svcPromote")}</ColLink>
                            <ColLink href="#">{t("svcCalculator")}</ColLink>
                            <ColLink href="#">{t("svcStats")}</ColLink>
                            <ColLink as={Link} href="/daily-rent">
                                {t("svcDailyRent")}
                            </ColLink>
                            <ColLink as={Link} href="/map">
                                {t("svcMapSearch")}
                            </ColLink>
                        </div>
                        <div>
                            <ColTitle>{t("colCompany")}</ColTitle>
                            <CompanyLinkGrid>
                                <ColLink href="#">{t("coBlog")}</ColLink>
                                <ColLink href="#">{t("coPartners")}</ColLink>
                                <ColLink href="#">{t("coTerms")}</ColLink>
                                <ColLink href="#">{t("coContact")}</ColLink>
                                <ColLink href="#">{t("coDonation")}</ColLink>
                                <ColLink
                                    as={Link}
                                    href={pathname}
                                    locale={otherLocale}
                                    prefetch={false}
                                    style={
                                        locale === "ar"
                                            ? undefined
                                            : { fontFamily: "var(--font-noto-arabic), system-ui, sans-serif" }
                                    }
                                >
                                    {languageLabel}
                                </ColLink>
                            </CompanyLinkGrid>
                        </div>
                    </LinksBand> */}

                    <Bottom>
                        <Copy>
                            {t("copyright", { year })}
                            <br />
                            {t("licenseLine")}
                        </Copy>
                        <Socials>
                            {SOCIALS.map(({ key, label }) => (
                                <SocialIco
                                    key={key}
                                    href="#"
                                    aria-label={t(key)}
                                    title={t(key)}
                                >
                                    {label}
                                </SocialIco>
                            ))}
                        </Socials>
                        <BadgeRow>
                            <Badge>{t("badgeVat")}</Badge>
                            <Divider aria-hidden />
                            <Badge>{t("badgeMinistry")}</Badge>
                        </BadgeRow>
                    </Bottom>
                </FooterCard>
            </Inner>
        </Outer>
    );
}

export default Footer;

