import styled from "styled-components";

export const CardSection = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
  padding: 16px 7px 0;

  @media (min-width: 641px) {
    padding: 20px 32px 0;
  }

  @media (min-width: 1024px) {
    padding: 22px 110px 0;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  padding-bottom: 20px;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #dbe3e6;
  background: #ffffff;
  color: #171717;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #c7d2d7;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
  }
`;

export const ListingImage = styled.div`
  position: relative;
  min-height: 168px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c7c3bf;
  border-bottom: 1px solid #2b2f35;

  svg {
    width: 46px;
    height: 46px;
    opacity: 0.95;
  }
`;

export const ListingTopBar = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.96);
  color: #111827;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const HeartButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ $active }) => ($active ? "var(--color-brand)" : "#d7dce3")};
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) => ($active ? "var(--color-brand-soft)" : "#ffffff")};
  color: ${({ $active }) => ($active ? "var(--color-brand)" : "#5f6671")};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.14);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
    color: var(--color-brand);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  padding: 12px 12px 14px;
  background: #ffffff;
`;

export const Title = styled.h3`
  margin: 0;
  color: #171717;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.3;
`;

export const LocationText = styled.p`
  margin: 0;
  color: #5f6c72;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.35;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
  margin: 0;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.35;
`;

export const FeatureItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  color: #4b5563;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 1;
  }
`;

export const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  padding-top: 8px;
`;

export const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PriceMain = styled.span`
  color: var(--color-brand-foreground);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.1;
`;

export const NightsText = styled.span`
  color: #171717;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.15;
`;

export const BookNowButton = styled.button`
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #171717;
  min-height: 40px;
  padding: 10px 18px;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

