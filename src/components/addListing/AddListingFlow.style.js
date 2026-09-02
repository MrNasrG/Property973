import styled from "styled-components";



/**
 * Same horizontal shell as real-estate cards and filter bar:
 * max-width 1280px; padding 7px · 32px (641+) · 110px (1024+).
 */
export const PageShell = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
  padding: 18px 7px 28px;

  @media (min-width: 641px) {
    padding: 22px 32px 32px;
  }

  @media (min-width: 1024px) {
    padding: 24px 110px 36px;
  }
`;

export const PageTitle = styled.h1`
  margin: 0 0 20px;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #171717;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  @media (min-width: 641px) {
    font-size: 1.375rem;
    margin-bottom: 24px;
  }
`;

export const RoleRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const RoleCard = styled.button`
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 96px;
  padding: 14px 10px;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--color-brand)" : "#dbe3e6")};
  background: ${({ $active }) =>
    $active ? "var(--color-brand-soft)" : "#ffffff"};
  color: ${({ $active }) => ($active ? "var(--color-brand)" : "#5f6c72")};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 0 0 1px rgba(206, 17, 38, 0.12)" : "0 1px 2px rgba(15, 23, 42, 0.04)"};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

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

export const RoleIconWrap = styled.span`
  display: inline-flex;
  line-height: 0;
  color: currentColor;

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const RoleLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
`;

export const ListSectionTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const ListingStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ListingOption = styled.button`
  position: relative;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 14px 14px 16px;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--color-brand)" : "#dbe3e6")};
  background: ${({ $active }) =>
    $active ? "var(--color-brand-soft)" : "#ffffff"};
  text-align: start;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    top: 10px;
    bottom: 10px;
    width: 4px;
    border-radius: 0 3px 3px 0;
    background: var(--color-brand);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const StepBadge = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-size: 15px;
  font-weight: 700;
  border: 1px solid rgba(206, 17, 38, 0.2);
`;

export const ListingIconTile = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #e8f1ff;
  color: #4f8fe4;
  border: 1px solid #cddff9;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ListingTextBlock = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ListingHint = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  line-height: 1.35;
`;

export const ListingTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  line-height: 1.35;
`;

export const ListingRight = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--color-brand-soft);
  color: var(--color-brand-foreground);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(206, 17, 38, 0.18);
`;

export const ChevronWrap = styled.span`
  display: inline-flex;
  color: #9ca3af;
  line-height: 0;

  [dir="rtl"] & {
    transform: scaleX(-1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
