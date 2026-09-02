import styled from "styled-components";

/**
 * Horizontal insets match `FilterInner`, header, and `realEstateCardComponent` `CardWrapper`:
 * 7px · 32px (641+) · 110px (1024+). Bottom spacing matches real estate `CardStack`.
 */
export const CardSection = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
  padding: 18px 7px 0;

  @media (min-width: 641px) {
    padding: 20px 32px 0;
  }

  @media (min-width: 1024px) {
    padding: 22px 110px 0;
  }
`;

/** Three columns at desktop; same gutter as real estate card stack (14px / 12px mobile). */
export const CardGrid = styled.div`
  display: grid;
  width: 100%;
  align-items: stretch;
  box-sizing: border-box;
  gap: 14px;
  padding-bottom: 20px;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 641px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    gap: 12px;
    padding-bottom: 16px;
  }
`;

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  border-radius: 10px;
  border-style: solid;
  border-width: ${({ $selected }) => ($selected ? "2px" : "1px")};
  border-color: ${({ $selected }) =>
    $selected ? "var(--color-brand)" : "#dbe3e6"};
  background: #ffffff;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 0 0 3px var(--color-brand-soft), 0 4px 14px rgba(206, 17, 38, 0.14)"
      : "0 1px 2px rgba(15, 23, 42, 0.04)"};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const MediaBlock = styled.div`
  position: relative;
  width: 100%;
  min-height: 148px;
  aspect-ratio: 16 / 10;
  background: var(--color-brand-soft);
  border-bottom: 1px solid #e8dfe1;
`;

export const TagsOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 48px;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  pointer-events: none;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.25;
  white-space: nowrap;
  background: ${({ $variant }) =>
    $variant === "brand"
      ? "var(--color-brand)"
      : $variant === "blue"
        ? "#2563eb"
        : "rgba(255, 255, 255, 0.92)"};
  color: ${({ $variant }) =>
    $variant === "brand" || $variant === "blue"
      ? "#ffffff"
      : "#5f6c72"};
  border: ${({ $variant }) =>
    $variant === "brand" || $variant === "blue"
      ? "none"
      : "1px solid rgba(219, 227, 230, 0.95)"};
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #5f6c72;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const MediaIconWrap = styled.span`
  display: inline-flex;
  line-height: 0;
  opacity: 0.45;

  svg {
    width: 40px;
    height: 40px;
  }
`;

export const MediaPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #5f6c72;
  font-size: 12px;
  font-weight: 500;
`;

export const PhotoCountPill = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(23, 23, 23, 0.88);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px 14px;
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.3;
  color: #171717;
  letter-spacing: -0.02em;
`;

export const LocationRow = styled.p`
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: #5f6c72;
  line-height: 1.35;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
    opacity: 0.85;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
`;

export const PriceMain = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-brand-foreground);
  line-height: 1.15;
`;

export const PriceSub = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #5f6c72;
`;

export const FeatureRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
  row-gap: 5px;
  font-size: 10px;
  font-weight: 500;
  color: #5f6c72;

  svg {
    flex-shrink: 0;
    opacity: 0.88;
  }
`;

export const FeatureItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 10px;
  line-height: 1.45;
  color: #5f6c72;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FooterDivider = styled.div`
  height: 1px;
  background: #e8eef0;
  margin-top: 2px;
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding-top: 2px;
`;

export const Avatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--color-brand);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const AgentName = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #171717;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AgentMeta = styled.span`
  font-size: 9px;
  font-weight: 500;
  color: #5f6c72;
`;

export const AgentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
`;
