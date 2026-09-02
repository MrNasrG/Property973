import styled from "styled-components";

/** Clips any stray overflow; inner track scrolls horizontally. Matches Projects tab shell. */
export const FilterSection = styled.section`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: #faf6f6;
  border-bottom: 1px solid var(--color-brand);
  overflow-x: hidden;
`;

/**
 * Same horizontal inset as the header shell and listing cards:
 * `px-1.5` (7px) · `min-[641px]:px-8` (32px) · `lg:px-[110px]`.
 */
export const FilterInner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  min-width: 0;
  box-sizing: border-box;
  padding: 8px 7px;
  display: block;

  @media (min-width: 641px) {
    padding: 8px 32px;
  }

  @media (min-width: 1024px) {
    padding: 8px 110px;
  }
`;

/** Scrolls the filter controls when they exceed the content width. */
export const FilterToolbarScroll = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 4px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0;
  border-radius: 8px;
  background: transparent;
  width: max-content;
  margin: 0;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const SegmentGroup = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: stretch;
  background: #ffffff;
  border: 1px solid #d8e0e2;
  border-radius: 6px;
  overflow: hidden;
`;

/** Selected state matches Projects tab city pills: soft tint, brand outline, same label color as Filters. */
export const SegmentButton = styled.button`
  font-family: inherit;
  border: none;
  border-right: 1px solid #d8e0e2;
  background: ${({ $active }) =>
    $active ? "var(--color-brand-soft)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--color-brand)" : "#1f2937")};
  box-shadow: ${({ $active }) =>
    $active ? "inset 0 0 0 1px rgba(206, 17, 38, 0.55)" : "none"};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 14px;
  min-height: 40px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
  white-space: nowrap;
  /* Radius on segments so inset shadow / fill follow the group curve (fixes square “All Type” corners). */
  border-radius: 0;

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-right: none;
  }

  &:hover {
    background: var(--color-brand-soft);
    color: var(--color-brand);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const CityPanelSection = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  border-top: 1px solid #e8dfe1;
  background: #ffffff;
`;

export const CityPanelInner = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 7px 16px;

  @media (min-width: 641px) {
    padding: 14px 32px 18px;
  }

  @media (min-width: 1024px) {
    padding: 14px 110px 18px;
  }
`;

export const CityPanelTitle = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-brand);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const CityPanelScroller = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (min-width: 640px) {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #e5e7eb transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #e5e7eb;
      border-radius: 4px;
    }
  }
`;

export const CityPill = styled.button`
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  min-height: 46px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $selected }) => ($selected ? "var(--color-brand)" : "#e5e7eb")};
  background: ${({ $selected }) =>
    $selected ? "var(--color-brand-soft)" : "#ffffff"};
  cursor: pointer;
  text-align: center;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 0 1px rgba(206, 17, 38, 0.12)" : "none"};

  @media (min-width: 640px) {
    flex: 0 0 auto;
    min-width: min(140px, 100%);
    justify-content: flex-start;
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

export const CityPillName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $selected }) =>
    $selected ? "var(--color-brand)" : "#1f2937"};
  line-height: 1.2;
`;

export const CityPillCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  white-space: nowrap;
`;
