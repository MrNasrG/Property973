import styled from "styled-components";

export const Page = styled.main`
  background: #fbfaf9;
  min-height: 100vh;
  color: #161618;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const Hero = styled.section`
  position: relative;
  height: 62vh;
  min-height: 420px;
  max-height: 620px;
  overflow: hidden;
`;

export const HeroStrip = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const HeroFrame = styled.div`
  flex: ${({ $layout }) => {
    if ($layout === "single") return "1";
    if ($layout === "primary") return "1.8";
    return "1";
  }};
  position: relative;
  overflow: hidden;
  border-left: ${({ $layout }) =>
    $layout === "primary" || $layout === "single" ? "none" : "2px solid #fbfaf9"};
  background: #f1efe8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.94);
  }
`;

export const HeroFade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.55) 100%);
  pointer-events: none;
`;

export const HeroContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 36px 40px 28px;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px 20px;
  }
`;

export const HeroEyebrow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const HeroBadge = styled.span`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 3px;
  background: ${({ $variant }) =>
    $variant === "sale" ? "var(--color-brand, #ce1126)" : "rgba(255,255,255,0.18)"};
  color: #fff;
  backdrop-filter: ${({ $variant }) =>
    $variant === "type" ? "blur(4px)" : "none"};
`;

export const HeroTitle = styled.h1`
  font-size: 32px;
  margin: 0 0 6px;
  font-weight: 800;
  letter-spacing: -0.01em;

  @media (max-width: 700px) {
    font-size: 24px;
  }
`;

export const HeroLoc = styled.div`
  font-size: 14.5px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

export const HeroIconRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const HeroIconButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) =>
    $active ? "var(--color-brand, #ce1126)" : "rgba(255,255,255,0.16)"};
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


export const PhotoPill = styled.span`
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 20px;
`;

export const ActionBar = styled.div`
  position: sticky;
  top: 52px;
  z-index: 30;
  background: #fff;
  border-bottom: 1px solid #eae8ea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
`;

export const ActionBarInner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const ActionPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

export const ActionAmount = styled.span`
  font-size: 26px;
  font-weight: 800;
  color: var(--color-brand, #ce1126);
`;

export const ActionUnit = styled.span`
  font-size: 13px;
  color: #6b6b74;
  font-weight: 600;
`;

export const ActionFacts = styled.div`
  display: flex;
  gap: 22px;
  font-size: 13.5px;
  color: #6b6b74;
  flex-wrap: wrap;

  b {
    color: #161618;
  }
`;

export const ActionCta = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  border-radius: 9px;
  padding: 10px 18px;
  font-weight: 700;
  font-size: 13.5px;
  border: 1px solid #eae8ea;
  background: #fff;
  color: #161618;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    border-color: var(--color-brand, #ce1126);
    color: var(--color-brand, #ce1126);
  }
`;

export const PrimaryButton = styled(Button)`
  background: var(--color-brand, #ce1126);
  border-color: var(--color-brand, #ce1126);
  color: #fff;

  &:hover {
    filter: brightness(1.05);
    color: #fff;
  }
`;

export const WhatsAppButton = styled(Button)`
  background: #1f8a4c;
  border-color: #1f8a4c;
  color: #fff;

  &:hover {
    filter: brightness(1.05);
    color: #fff;
    border-color: #1f8a4c;
  }
`;

export const BodyWrap = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 36px 28px 0;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const TabsRow = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #eae8ea;
  margin-bottom: 28px;
  overflow-x: auto;
`;

export const Tab = styled.button`
  font-size: 14.5px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#161618" : "#6b6b74")};
  padding: 0 0 14px;
  border: none;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "var(--color-brand, #ce1126)" : "transparent")};
  background: none;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
`;

export const Panel = styled.div`
  display: ${({ $active }) => ($active ? "block" : "none")};
`;

export const SectionLabel = styled.h2`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #b8893b;
  margin: 0 0 14px;
`;

export const LeadText = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: #6b6b74;
  margin: 0 0 8px;
  max-width: 620px;
`;

export const SpecFlow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-top: 18px;
`;

export const SpecRow = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 13px 24px 13px 0;
  border-bottom: 1px solid #eae8ea;
  font-size: 14px;

  @media (max-width: 700px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const SpecKey = styled.span`
  color: #6b6b74;
`;

export const SpecValue = styled.span`
  font-weight: 700;
`;

export const FeatureChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

export const Chip = styled.span`
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  background: #eaf7ef;
  color: #1e8e5a;
`;

export const MediaLane = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18px;
  margin-top: 18px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const MediaBox = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: 230px;
  background: #1b1b1f;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MediaLabel = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const MapPin = styled.div`
  position: absolute;
  top: 48%;
  left: 46%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-brand, #ce1126);
  border: 3px solid #fff;
  box-shadow: 0 0 0 6px rgba(200, 16, 46, 0.18);
`;

export const RegistryStrip = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eae8ea;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  font-size: 12.5px;
  color: #6b6b74;

  b {
    display: block;
    color: #161618;
    font-size: 13.5px;
    font-weight: 700;
    margin-top: 2px;
  }
`;

export const ListingNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
  font-size: 13px;
  font-weight: 700;
  color: #6b6b74;
`;

export const ListingNavButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    color: var(--color-brand, #ce1126);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SideCol = styled.aside`
  display: flex;
  flex-direction: column;
`;

export const SideBlock = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #eae8ea;

  &:first-child {
    padding-top: 0;
  }
`;

export const AgentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 14px;
`;

export const AgentAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #161618;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 17px;
  flex-shrink: 0;
`;

export const AgentName = styled.div`
  font-weight: 800;
  font-size: 15px;
`;

export const AgentMeta = styled.div`
  font-size: 12.5px;
  color: #6b6b74;
  margin-top: 2px;
`;

export const AgentCta = styled.div`
  display: flex;
  gap: 10px;

  ${Button} {
    flex: 1;
    justify-content: center;
  }
`;

export const ReportLine = styled.p`
  font-size: 12px;
  color: #6b6b74;
  margin: 14px 0 0;
`;

export const FinanceTitle = styled.h3`
  font-size: 14.5px;
  font-weight: 800;
  margin: 0 0 6px;
`;

export const FinanceText = styled.p`
  font-size: 13px;
  color: #6b6b74;
  line-height: 1.6;
  margin: 0 0 14px;
`;

export const FinanceRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
`;

export const FinanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  span:first-child {
    color: #6b6b74;
  }

  span:last-child {
    font-weight: 700;
  }
`;

export const FinanceEstimate = styled.div`
  background: #161618;
  color: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12.5px;
    opacity: 0.75;
  }

  b {
    font-size: 18px;
    font-weight: 800;
  }
`;

export const SimilarMini = styled.button`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  text-align: left;
  width: 100%;
  font: inherit;
  color: inherit;

  img {
    width: 64px;
    height: 54px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
    background: #f1efe8;
  }
`;

export const SimilarPrice = styled.div`
  font-size: 13.5px;
  font-weight: 800;
  color: var(--color-brand, #ce1126);
`;

export const SimilarLoc = styled.div`
  font-size: 12px;
  color: #6b6b74;
`;

export const RelatedSection = styled.section`
  max-width: 1320px;
  margin: 50px auto 0;
  padding: 36px 28px 70px;
  border-top: 1px solid #eae8ea;
`;

export const RelatedHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;

  h2 {
    font-size: 18px;
    font-weight: 800;
    margin: 0;
  }

  span {
    font-size: 13px;
    color: #6b6b74;
    font-weight: 600;
  }
`;

export const RelatedScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RelatedCard = styled.button`
  flex: 0 0 260px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #eae8ea;
  background: #fff;
  text-align: left;
  padding: 0;
  font: inherit;
  color: inherit;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
    background: #f1efe8;
  }
`;

export const RelatedBody = styled.div`
  padding: 13px 15px 15px;
`;

export const RelatedPrice = styled.div`
  color: var(--color-brand, #ce1126);
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 4px;
`;

export const RelatedTitle = styled.div`
  font-weight: 700;
  font-size: 13.5px;
  margin-bottom: 5px;
`;

export const RelatedLoc = styled.div`
  font-size: 12px;
  color: #6b6b74;
  margin-bottom: 9px;
`;

export const RelatedFacts = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #6b6b74;
  border-top: 1px solid #eae8ea;
  padding-top: 8px;
`;

export const EmptyState = styled.div`
  max-width: 1320px;
  margin: 80px auto;
  padding: 0 28px;
  text-align: center;
  color: #6b6b74;
`;

export const EmptyTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
  color: #161618;
`;
