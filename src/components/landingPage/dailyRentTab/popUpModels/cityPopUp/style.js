import styled from "styled-components";

export const CityPopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(15, 23, 42, 0.36);
  display: grid;
  place-items: center;
  padding: 20px;
`;

export const CityPopupCard = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: min(85vh, 560px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.16);
`;

export const CityPopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 14px;
  border-bottom: 1px solid #e8ecf0;
`;

export const CityPopupTitle = styled.h2`
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
`;

export const LocateButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  gap: 8px;
  margin: 0;
  padding: 0 14px;
  min-height: 36px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    color: #64748b;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

/** Keeps label metrics stable next to the SVG (avoids baseline / line-box skew). */
export const LocateLabel = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 1.25;
  font-size: inherit;
  font-weight: inherit;
`;

export const LocateIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  color: var(--color-brand);
  overflow: visible;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 24px;
    min-height: 24px;
    overflow: visible;
    flex-shrink: 0;
  }
`;

export const SearchSection = styled.div`
  padding: 12px 18px 14px;
  background: #f3f4f6;
  border-bottom: 1px solid #e8ecf0;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchIconWrap = styled.span`
  display: inline-flex;
  color: #9ca3af;
  flex-shrink: 0;
  width: 16px;
  height: 16px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const SearchFieldWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
  color: #0f172a;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 14px;
  padding-right: ${({ $showClear }) => ($showClear ? "42px" : "14px")};
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  outline: none;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

  &::placeholder {
    color: #94a3b8;
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: var(--color-brand);
    box-shadow: 0 0 0 2px rgba(206, 17, 38, 0.2);
  }
`;

export const ClearSearchButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-brand);
  cursor: pointer;

  &:hover {
    background: var(--color-brand-soft);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 1px;
  }

  svg {
    display: block;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export const CityList = styled.div`
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  padding-bottom: 8px;
`;

export const CityRow = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 18px;
  border: none;
  border-bottom: 1px solid #eef1f4;
  background: ${({ $selected }) =>
    $selected ? "var(--color-brand-soft)" : "#ffffff"};
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $selected }) =>
      $selected ? "var(--color-brand-soft-strong)" : "#f9fafb"};
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: -2px;
  }
`;

export const CityIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #eef2f6;
  color: ${({ $selected }) => ($selected ? "var(--color-brand)" : "#9ca3af")};
  flex-shrink: 0;

  svg {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

export const CityName = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 15px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  color: ${({ $selected }) => ($selected ? "var(--color-brand)" : "#0f172a")};
`;

export const CityIndicator = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $selected }) => ($selected ? "var(--color-brand)" : "#d1d5db")};

  svg {
    display: block;
    width: 11px;
    height: 11px;
  }
`;
