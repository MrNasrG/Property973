import styled from "styled-components";

/**
 * Horizontal insets match `FilterInner` and the header: 7px · 32px (641+) · 110px (1024+).
 */
export const CardWrapper = styled.div`
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

/** Vertical stack of cards inside one `CardWrapper`. */
export const CardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding-bottom: 20px;

  @media (max-width: 640px) {
    gap: 12px;
    padding-bottom: 16px;
  }
`;

export const EmptyState = styled.p`
  margin: 0;
  padding: 24px 0 32px;
  text-align: center;
  color: #5f6b76;
  font-size: 15px;
  line-height: 1.5;
`;

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #dbe3e6;
  background: #ffffff;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

  @media (max-width: 800px) {
    flex-direction: column;
    max-width: 100%;
  }
`;

export const DetailsColumn = styled.div`
  flex: 1 1 58%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 12px 14px 12px;
  gap: 7px;

  @media (max-width: 800px) {
    order: 2;
    padding: 12px 12px 14px;
  }
`;

export const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
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
        : "var(--color-brand-soft)"};
  color: ${({ $variant }) =>
    $variant === "brand" || $variant === "blue"
      ? "#ffffff"
      : "#5f6c72"};
`;

export const PriceBlock = styled.div`
  text-align: end;
  flex-shrink: 0;
`;

export const PriceMain = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-brand-foreground);
  line-height: 1.15;
`;

export const PriceSub = styled.div`
  margin-top: 1px;
  font-size: 10px;
  font-weight: 500;
  color: #5f6c72;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.3;
  color: #171717;
  letter-spacing: -0.02em;
`;

export const Location = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  color: #5f6c72;
  line-height: 1.35;
`;

export const FeatureBlock = styled.div`
  border-top: 1px solid #e8eef0;
  border-bottom: 1px solid #e8eef0;
  padding: 7px 0;
`;

export const FeatureGrid = styled.div`
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

export const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 2px;
`;

export const AgentBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
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

export const AgentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
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

export const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

export const OutlineButton = styled.button`
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #d8e0e2;
  background: #ffffff;
  color: #5f6c72;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: var(--color-brand-soft);
    border-color: #e2d5d8;
  }
`;

export const PrimaryButton = styled.button`
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: var(--color-brand);
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, filter 0.2s ease;

  &:hover {
    filter: brightness(1.08);
  }
`;

export const MediaColumn = styled.div`
  position: relative;
  flex: 0 0 42%;
  min-width: 0;
  min-height: 220px;
  background: ${({ $photo }) => ($photo ? "#f1efe8" : "var(--color-brand-soft)")};
  background-image: ${({ $photo }) => ($photo ? `url(${$photo})` : "none")};
  background-size: cover;
  background-position: center;
  border-left: 1px solid #e8dfe1;

  @media (max-width: 800px) {
    flex: none;
    width: 100%;
    min-height: 120px;
    max-height: 148px;
    aspect-ratio: 2 / 1;
    border-left: none;
    border-bottom: 1px solid #dbe3e6;
    order: 1;
  }
`;

export const MediaIconWrap = styled.span`
  display: inline-flex;
  line-height: 0;
  opacity: 0.45;

  svg {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 800px) {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const MediaPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #5f6c72;
  font-size: 13px;
  font-weight: 500;

  @media (max-width: 800px) {
    gap: 4px;
    font-size: 11px;
  }
`;

export const MediaOverlayTop = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  z-index: 1;
`;

export const IconCircleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: ${({ $active }) => ($active ? "#ce1126" : "#5f6c72")};
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #ffffff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


export const PhotoCountPill = styled.span`
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(23, 23, 23, 0.88);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  z-index: 1;
`;
