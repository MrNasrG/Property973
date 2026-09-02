import styled, { css } from "styled-components";

const darkFieldStyles = css`
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;

  &::placeholder {
    color: #a98e96;
  }

  &:focus,
  &:focus-within {
    outline: 2px solid var(--color-brand);
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const lightFieldStyles = css`
  border: 1px solid var(--color-border, #d7dee7);
  background: var(--color-input-bg, #ffffff);
  color: var(--color-text, #0f172a);

  &::placeholder {
    color: #94a3b8;
  }

  &:focus,
  &:focus-within {
    border-color: var(--color-primary, var(--color-brand));
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--color-primary, var(--color-brand)) 20%, transparent);
    outline: none;
  }

  &:disabled {
    background: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const PhoneFieldWrap = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  border-radius: ${({ $variant }) => ($variant === "light" ? "10px" : "8px")};
  margin-bottom: ${({ $variant }) => ($variant === "light" ? "0" : "10px")};
  font-size: ${({ $variant }) => ($variant === "light" ? "14px" : "13px")};
  min-height: ${({ $variant }) => ($variant === "light" ? "40px" : "auto")};

  ${({ $variant }) => ($variant === "light" ? lightFieldStyles : darkFieldStyles)}
`;

export const CountryPickerWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const CountryTrigger = styled.button.attrs({
  suppressHydrationWarning: true,
  type: "button",
})`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 100%;
  min-height: 40px;
  padding: 10px 8px 10px 12px;
  border: 0;
  border-right: ${({ $variant }) =>
    $variant === "light"
      ? "1px solid var(--color-border, #d7dee7)"
      : "1px solid rgba(255, 255, 255, 0.12)"};
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    opacity: 0.75;
  }
`;

export const CountryMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 1300;
  width: min(280px, 88vw);
  max-height: 260px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "light" ? "var(--color-border, #d7dee7)" : "rgba(255, 255, 255, 0.14)"};
  background: ${({ $variant }) => ($variant === "light" ? "#fff" : "#1a0c0f")};
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
`;

export const CountrySearch = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 1px solid
    ${({ $variant }) =>
      $variant === "light" ? "var(--color-border, #d7dee7)" : "rgba(255, 255, 255, 0.12)"};
  background: transparent;
  color: inherit;
  font-size: 12px;
  padding: 10px 12px;
  outline: none;

  &::placeholder {
    color: ${({ $variant }) => ($variant === "light" ? "#94a3b8" : "#a98e96")};
  }
`;

export const CountryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px;
  overflow-y: auto;
`;

export const CountryOption = styled.li`
  button {
    width: 100%;
    border: 0;
    border-radius: 8px;
    background: ${({ $active, $variant }) => {
      if (!$active) return "transparent";
      return $variant === "light" ? "var(--color-brand-soft, #fcf2f3)" : "rgba(255, 255, 255, 0.08)";
    }};
    color: inherit;
    text-align: left;
    padding: 8px 10px;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    &:hover {
      background: ${({ $variant }) =>
        $variant === "light" ? "#f8fafc" : "rgba(255, 255, 255, 0.06)"};
    }
  }
`;

export const CountryName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CountryDialCode = styled.span`
  flex-shrink: 0;
  opacity: 0.75;
`;

export const NationalInput = styled.input.attrs({
  suppressHydrationWarning: true,
})`
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  padding: 10px 12px;
  outline: none;

  &::placeholder {
    color: inherit;
    opacity: 0.55;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const EmptyCountryResults = styled.li`
  padding: 12px;
  font-size: 12px;
  color: ${({ $variant }) => ($variant === "light" ? "#64748b" : "#cfbec3")};
  text-align: center;
`;
