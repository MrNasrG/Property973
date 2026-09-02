import styled from "styled-components";

/** Projects tab filter bar — same shell as Real Estate (soft red tint). */
export const FilterSection = styled.section`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: #faf6f6;
  border-bottom: 1px solid var(--color-brand);
  overflow-x: hidden;
`;

export const FilterInner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  min-width: 0;
  box-sizing: border-box;
  padding: 8px 7px;

  @media (min-width: 641px) {
    padding: 8px 32px;
  }

  @media (min-width: 1024px) {
    padding: 8px 110px;
  }
`;

/** Row: Filters (fixed) + scrollable city track. */
export const FilterRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const FiltersButton = styled.button`
  font-family: inherit;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid var(--color-brand);
  border-radius: 6px;
  background: #ffffff;
  color: var(--color-brand);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 14px;
  min-height: 40px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: var(--color-brand-soft);
    border-color: var(--color-brand);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const FiltersButtonIcon = styled.span`
  display: inline-flex;
  width: 16px;
  height: 16px;
  color: currentColor;

  svg {
    display: block;
  }
`;

/** Horizontal scroll for city pills; scrollbar hidden for a cleaner bar. */
export const CityScrollTrack = styled.div`
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CityPillList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  width: max-content;
  min-height: 44px;
`;

export const CityPill = styled.button`
  font-family: inherit;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(206, 17, 38, 0.55)" : "#e5e7eb")};
  border-radius: 6px;
  background: ${({ $active }) =>
    $active ? "var(--color-brand-soft)" : "#ffffff"};
  color: ${({ $active }) =>
    $active ? "var(--color-brand)" : "#1f2937"};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 14px;
  min-height: 40px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease;

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
