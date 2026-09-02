import styled from "styled-components";

import { Link } from "@/i18n/navigation";

/** Top rule matches `Header`: `border-b border-neutral-200/80` — separates main content from footer. */
export const Outer = styled.div`
  width: 100%;
  padding: 1rem 0 2rem;
  border-top: 1px solid rgb(229 229 229 / 0.8);
  background: #f4f7f8;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const Inner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  padding: 0 7px;

  @media (min-width: 641px) {
    padding: 0 32px;
  }

  @media (min-width: 1024px) {
    padding: 0 110px;
  }
`;

export const FooterCard = styled.footer`
  background: #ffffff;
  border: 0.5px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

export const TopBand = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
  padding: 28px 24px;
  border-bottom: 0.5px solid #e8e8e8;

  @media (min-width: 900px) {
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
    padding: 36px 48px;
  }
`;

export const LogoMark = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: var(--color-brand);
  letter-spacing: -0.02em;
`;

export const LogoSub = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: #5f6c72;
  line-height: 1.4;
`;

export const Tagline = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: #5f6c72;
  line-height: 1.6;
  max-width: 42ch;
`;

export const AppRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
  flex-wrap: wrap;
`;

export const AppPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  background: #f9fafb;
  border: 0.5px solid #e5e7eb;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: default;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: var(--color-brand);
    color: var(--color-brand);
  }
`;

export const CtaBox = styled.div`
  background: var(--color-brand);
  border-radius: 12px;
  padding: 24px;
`;

export const CtaText = styled.p`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

export const CtaSub = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.5;
`;

export const CtaLink = styled(Link)`
  display: inline-flex;
  margin-top: 16px;
  padding: 10px 22px;
  background: #ffffff;
  color: var(--color-brand);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

/**
 * Mobile: Search | Services in two columns (shorter scroll), Company full-width below.
 * Desktop: three equal columns.
 */
export const LinksBand = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  column-gap: 14px;
  row-gap: 20px;
  padding: 20px 16px;
  border-bottom: 0.5px solid #e8e8e8;

  & > div:nth-child(3) {
    grid-column: 1 / -1;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 32px;
    row-gap: 0;
    padding: 36px 48px;

    & > div:nth-child(3) {
      grid-column: auto;
    }
  }
`;

export const ColTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (min-width: 900px) {
    margin-bottom: 14px;
  }
`;

export const ColLink = styled.a`
  display: block;
  font-size: 12px;
  color: #5f6c72;
  text-decoration: none;
  margin-bottom: 6px;
  line-height: 1.35;
  transition: color 0.2s ease;

  @media (min-width: 900px) {
    font-size: 13px;
    margin-bottom: 9px;
  }

  &:hover {
    color: var(--color-brand);
  }
`;

/**
 * Mobile: two columns — first three links (Blog, Partners, Terms) in the left column,
 * next three (Contact, Donation, language) in the right (column-fill order).
 * Desktop: single column like other footer sections.
 */
export const CompanyLinkGrid = styled.div`
  @media (max-width: 899px) {
    column-count: 2;
    column-gap: 14px;
  }

  @media (min-width: 900px) {
    column-count: 1;
  }

  & a {
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 24px;
  gap: 16px;

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 16px 48px;
    gap: 12px;
  }
`;

export const Copy = styled.div`
  font-size: 12px;
  color: #5f6c72;
  line-height: 1.6;
`;

export const Socials = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SocialIco = styled.a`
  width: 30px;
  height: 30px;
  border: 0.5px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #5f6c72;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: var(--color-brand);
    color: #ffffff;
    border-color: var(--color-brand);
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border: 0.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #5f6c72;
`;

export const Divider = styled.span`
  width: 0.5px;
  height: 14px;
  background: #e5e7eb;
`;
