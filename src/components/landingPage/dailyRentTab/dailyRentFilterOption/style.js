import styled from "styled-components";

export const FilterSection = styled.section`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: #f5f6f7;
  border-bottom: 1px solid #e3e7eb;
  overflow-x: hidden;
`;

export const FilterShell = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  min-width: 0;
  box-sizing: border-box;
  padding: 10px 7px;

  @media (min-width: 641px) {
    padding: 10px 32px;
  }

  @media (min-width: 1024px) {
    padding: 10px 110px;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    gap: 6px;
    overflow-x: hidden;
  }
`;

export const FilterButton = styled.button`
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  border: 1px solid ${({ $active }) => ($active ? "var(--color-brand)" : "#d8dee5")};
  border-radius: 9999px;
  background: ${({ $active }) => ($active ? "var(--color-brand)" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  min-height: 40px;
  padding: 11px 15px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: var(--color-brand);
    background: ${({ $active }) =>
    $active ? "var(--color-brand)" : "var(--color-brand-soft)"};
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--color-brand)")};
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: ${({ $compact }) => ($compact ? "0.76 1 0" : "1.2 1 0")};
    min-width: 0;
    justify-content: center;
    font-size: ${({ $compact }) => ($compact ? "12px" : "13px")};
    min-height: 36px;
    padding: ${({ $compact }) => ($compact ? "8px 7px" : "9px 10px")};
  }
`;

export const FilterButtonIcon = styled.span`
  display: inline-flex;
  width: 14px;
  height: 14px;
  color: currentColor;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const FilterButtonText = styled.span`
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DatePopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(15, 23, 42, 0.36);
  display: grid;
  place-items: center;
  padding: 20px;
`;

export const DatePopupCard = styled.div`
  width: fit-content;
  max-width: calc(100vw - 30px);
  max-height: min(88vh, 720px);
  overflow: hidden;
  padding: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.16);
  display: flex;
  flex-direction: column;

  .rdp {
    --rdp-accent-color: #dc2626;
    --rdp-accent-background-color: #fee2e2;
    --rdp-range_middle-background-color: #fee2e2;
    --rdp-range_middle-color: #b91c1c;
    --rdp-day_button-border-radius: 999px;
    color: #0f172a;
    margin: 0;
  }

  .rdp-root {
    --rdp-accent-color: #dc2626;
    --rdp-accent-background-color: #fee2e2;
  }

  .rdp-caption_label {
    color: #111827;
    font-size: 18px;
    font-weight: 700;
  }

  .rdp-weekday {
    color: #6b7280;
    font-size: 12px;
    font-weight: 600;
  }

  .rdp-day_button {
    color: #111827;
    font-size: 14px;
    font-weight: 600;
  }

  .rdp-day_selected,
  .rdp-day_selected:focus-visible,
  .rdp-day_selected:hover {
    background-color: #dc2626 !important;
    color: #ffffff !important;
  }

  .rdp-button_next,
  .rdp-button_previous {
    color: #dc2626;
  }

  .rdp-months {
    gap: 18px;
  }

  .rdp-day_disabled {
    color: #b7bec7;
    text-decoration: line-through;
    opacity: 0.7;
  }

  .rdp-day_range_start,
  .rdp-day_range_end {
    background: #dc2626 !important;
    color: #ffffff !important;
  }

  .rdp-day_range_middle {
    color: #b91c1c;
    background: #fee2e2;
  }

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

export const DatePopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
`;

export const DatePopupTitle = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
`;

export const DatePopupActions = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const DatePopupCalendarBlock = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const DatePopupMonthsScroller = styled.div`
  overflow-y: auto;
  max-height: min(62vh, 520px);
  padding-right: 2px;

  @media (max-width: 900px) {
    max-height: min(62vh, 500px);

    .rdp-nav {
      display: none;
    }

    .rdp-months {
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export const PopupButton = styled.button`
  border: 1px solid ${({ $primary }) => ($primary ? "var(--color-brand)" : "#d1d5db")};
  background: ${({ $primary }) => ($primary ? "var(--color-brand)" : "#fff")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#1f2937")};
  border-radius: 10px;
  padding: 10px 14px;
  min-height: 38px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    border-color: var(--color-brand);
    background: ${({ $primary }) =>
      $primary ? "var(--color-brand)" : "var(--color-brand-soft)"};
    color: ${({ $primary }) => ($primary ? "#fff" : "var(--color-brand)")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
