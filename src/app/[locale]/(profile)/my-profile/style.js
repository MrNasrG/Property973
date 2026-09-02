import styled from "styled-components";

const border = "0.5px solid #e8e6e1";
const radiusLg = "12px";
const radiusMd = "8px";
const brand = "var(--color-brand, #ce1126)";
const brandFg = "var(--color-brand-foreground, #8a0a1c)";
const brandSoft = "var(--color-brand-soft, #fcf2f3)";

export const PageWrap = styled.div`
  background: #f5f4f0;
  min-height: calc(100vh - 58px);
`;

export const AppShell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  background: #f5f4f0;
  border-radius: ${radiusLg};
  border: ${border};
  overflow: hidden;
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
`;

export const Layout = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;
  background: #fff;
  border-right: ${border};
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-self: stretch;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px 14px;
  border-bottom: ${border};
  margin-bottom: 14px;
`;

export const SidebarBrandIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: ${radiusMd};
  background: ${brand};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    color: #fff;
  }
`;

export const SidebarBrandText = styled.div`
  min-width: 0;
  flex: 1;
`;

export const SidebarBrandTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  line-height: 1.3;
  color: #1a1a18;
`;

export const SidebarBrandSub = styled.p`
  font-size: 11px;
  color: #9b9a97;
  margin: 0;
  line-height: 1.3;
`;

export const SidebarChevron = styled.span`
  margin-left: auto;
  color: #9b9a97;
  display: flex;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const SidebarSectionLabel = styled.p`
  font-size: 11px;
  font-weight: 500;
  color: #9b9a97;
  margin: 14px 0 6px;
  padding: 0 8px;
  letter-spacing: 0.02em;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const SidebarItem = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: ${radiusMd};
  cursor: pointer;
  font-size: 13.5px;
  color: ${({ $active }) => ($active ? brandFg : "#1a1a18")};
  border: none;
  background: ${({ $active }) => ($active ? brandSoft : "transparent")};
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  margin-bottom: 2px;

  &:hover {
    background: ${({ $active }) => ($active ? brandSoft : "#f5f4f0")};
  }

  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    color: ${({ $active }) => ($active ? brandFg : "#6b6a67")};
  }
`;

export const SidebarItemInner = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SidebarBadge = styled.span`
  margin-left: auto;
  background: #f5f4f0;
  color: #6b6a67;
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  font-weight: 400;
`;

export const SidebarBadgeAlert = styled(SidebarBadge)`
  background: ${brandSoft};
  color: ${brandFg};
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 12px;
  border-top: ${border};
`;

export const SidebarFooterItem = styled(SidebarItem)`
  color: #6b6a67;
  font-size: 13.5px;

  svg {
    color: #6b6a67;
  }
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 20px 24px;
  background: #f5f4f0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #1a1a18;
  margin: 0 0 4px;
`;

export const PageSub = styled.p`
  font-size: 14px;
  color: #6b6a67;
  margin: 0;
`;

export const HeaderBtns = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const BtnOutline = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: ${radiusMd};
  border: 0.5px solid #d3d1cb;
  background: #fff;
  color: #1a1a18;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #f5f4f0;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const BtnPrimary = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: ${radiusMd};
  border: 0.5px solid ${brand};
  background: ${brand};
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;

  &:hover {
    opacity: 0.92;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ProfileBanner = styled.section`
  background: #fff;
  border: ${border};
  border-radius: ${radiusLg};
  padding: 1.25rem;
`;

export const BannerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
`;

export const BannerIdentity = styled.div`
  display: flex;
  gap: 14px;
  min-width: 0;
`;

export const AvatarLg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${brandSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: ${brandFg};
  flex-shrink: 0;
`;

export const OwnerNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

export const OwnerName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a18;
`;

export const OwnerMeta = styled.div`
  font-size: 13px;
  color: #6b6a67;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 6px;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const MetaDivider = styled.span`
  color: #d3d1cb;
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #e1f5ee;
  color: #085041;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 400;

  svg {
    width: 13px;
    height: 13px;
    color: #085041;
  }
`;

export const ContactLine = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6b6a67;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const RatingBlock = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

export const RatingLabel = styled.p`
  font-size: 12px;
  color: #6b6a67;
  margin: 0 0 4px;
`;

export const StarsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const RatingValue = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #1a1a18;
`;

export const RatingReviews = styled.p`
  font-size: 12px;
  color: #6b6a67;
  margin: 2px 0 0;
`;

export const BannerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: ${border};

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const BannerStat = styled.div`
  text-align: center;
`;

export const BannerStatNum = styled.p`
  font-size: 22px;
  font-weight: 500;
  margin: 0;
  color: #1a1a18;
`;

export const BannerStatLbl = styled.p`
  font-size: 12px;
  color: #6b6a67;
  margin: 2px 0 0;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: #eeede8;
  border-radius: ${radiusMd};
  padding: 1rem;
`;

export const StatLbl = styled.p`
  font-size: 13px;
  color: #6b6a67;
  margin: 0 0 6px;
`;

export const StatVal = styled.p`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: #1a1a18;
`;

export const StatChg = styled.p`
  font-size: 12px;
  margin: 4px 0 0;
  color: ${({ $down, $muted }) => {
    if ($down) return "#a32d2d";
    if ($muted) return "#9b9a97";
    return "#0f6e56";
  }};
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const Card = styled.section`
  background: #fff;
  border: ${border};
  border-radius: ${radiusLg};
  padding: 1.25rem;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a18;
  margin: 0;
`;

export const CardAction = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  font-size: 13px;
  color: ${brandFg};
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const OwnerPropCard = styled.article`
  border: ${border};
  border-radius: ${radiusMd};
  overflow: hidden;
  display: flex;

  @media (max-width: 720px) {
    flex-direction: column-reverse;
  }
`;

export const OwnerPropBody = styled.div`
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
`;

export const OwnerPropTags = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const OwnerPropTag = styled.span`
  font-size: 11px;
  font-weight: ${({ $brand }) => ($brand ? 500 : 400)};
  padding: 3px 9px;
  border-radius: 999px;
  background: ${({ $brand }) => ($brand ? brand : "#eeede8")};
  color: ${({ $brand }) => ($brand ? "#fff" : "#6b6a67")};
`;

export const OwnerPropTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 2px;
  color: #1a1a18;
`;

export const OwnerPropLoc = styled.p`
  font-size: 13px;
  color: #6b6a67;
  margin: 0 0 10px;
`;

export const OwnerPropFeatures = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: #6b6a67;
  padding-bottom: 10px;
  border-bottom: ${border};
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const OwnerPropFeature = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const OwnerPropFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
`;

export const OwnerPropPriceBlock = styled.div``;

export const OwnerPropPrice = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${brandFg};
  margin: 0;
`;

export const OwnerPropListed = styled.p`
  font-size: 11px;
  color: #9b9a97;
  margin: 2px 0 0;
`;

export const OwnerPropActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const OwnerPropStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 999px;
  background: #e1f5ee;
  color: #085041;
  margin-right: 4px;
`;

export const IconActionBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #d3d1cb;
  border-radius: ${radiusMd};
  background: #fff;
  cursor: pointer;
  color: ${({ $danger, $favourite }) =>
    $danger || $favourite ? "#a32d2d" : "#1a1a18"};

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background: #f5f4f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const OwnerPropMedia = styled.div`

  width: 200px;
  flex-shrink: 0;
  background: #f1efe8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 6px;
  background-image: ${({ $photo }) => ($photo ? `url(${$photo})` : "none")};
  background-size: cover;
  background-position: center;

  svg {
    width: 32px;
    height: 32px;
    color: #b4b2a9;
  }

  @media (max-width: 720px) {
    width: 100%;
    min-height: 160px;
  }
`;

export const OwnerPropMediaLabel = styled.p`
  font-size: 12px;
  color: #888780;
  margin: 0;
`;

export const OwnerPropPhotoCount = styled.span`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
`;

export const PropEmptyState = styled.div`
  padding: 22px 0 4px;
  text-align: center;
`;

export const PropEmptyText = styled.p`
  font-size: 13px;
  color: #6b6a67;
  margin: 0 0 10px;
`;

export const PropList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const InquiryList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InquiryItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: ${border};
`;

export const InquiryAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

export const InquiryBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const InquiryName = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  color: #1a1a18;
`;

export const InquiryMsg = styled.p`
  font-size: 12px;
  color: #6b6a67;
  margin: 2px 0 0;
  line-height: 1.4;
`;

export const InquiryTime = styled.p`
  font-size: 11px;
  color: #9b9a97;
  margin: 2px 0 0;
`;

export const InquiryTag = styled.span`
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;
  background: ${({ $variant }) => {
    if ($variant === "visit") return "#e6f1fb";
    if ($variant === "replied") return "#eeede8";
    return "#e1f5ee";
  }};
  color: ${({ $variant }) => {
    if ($variant === "visit") return "#0c447c";
    if ($variant === "replied") return "#6b6a67";
    return "#085041";
  }};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const AccountField = styled.div``;

export const AccountLabel = styled.label`
  font-size: 12px;
  color: #6b6a67;
  display: block;
  margin-bottom: 4px;
`;

export const AccountInput = styled.input.attrs({
  suppressHydrationWarning: true,
})`
  width: 100%;
  box-sizing: border-box;
  font-size: 13px;
  padding: 8px 10px;
  border-radius: ${radiusMd};
  border: 0.5px solid #d3d1cb;
  background: #eeede8;
  color: #1a1a18;
  font-family: inherit;
`;

export const SrOnly = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
