import styled, { css } from "styled-components";

const commonInput = css`
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--color-border, #d7dee7);
  border-radius: 10px;
  background: var(--color-input-bg, #ffffff);
  color: var(--color-text, #0f172a);
  font-size: 14px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-primary, var(--color-brand));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary, var(--color-brand)) 20%, transparent);
  }
`;

export const FormWrap = styled.div`
  display: grid;
  gap: 14px;
  padding-bottom: 2px;
`;

export const FieldBlock = styled.div`
  display: grid;
  gap: 8px;
`;

export const FieldLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text, #0f172a);
`;

export const StyledInput = styled.input`
  ${commonInput}
`;

export const SliderValue = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary, var(--color-brand));
`;

export const SliderInput = styled.input`
  width: 100%;
  accent-color: var(--color-primary, var(--color-brand));
`;

export const DropdownWrap = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  ${commonInput}
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  border-color: ${({ $open }) =>
    $open ? "var(--color-primary, var(--color-brand))" : "var(--color-border, #d7dee7)"};
`;

export const DropdownChevron = styled.span`
  font-size: 12px;
  color: var(--color-text, #475569);
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 20;
  border: 1px solid var(--color-border, #d7dee7);
  border-radius: 10px;
  background: var(--color-input-bg, #ffffff);
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.12);
  overflow: auto;
  max-height: 220px;
`;

export const DropdownOption = styled.button`
  width: 100%;
  min-height: 36px;
  border: none;
  border-bottom: 1px solid var(--color-border, #eef2f6);
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--color-primary, var(--color-brand)) 10%, #ffffff)"
      : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--color-primary, var(--color-brand))" : "var(--color-text, #334155)"};
  text-align: left;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: color-mix(in srgb, var(--color-primary, var(--color-brand)) 14%, #ffffff);
    color: var(--color-primary, var(--color-brand));
  }
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 10px;

  @media (min-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const CheckboxItem = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: 36px;
  padding: 6px 10px;
  border: 1px solid var(--color-border, #d7dee7);
  border-radius: 10px;
  background: var(--color-input-bg, #ffffff);
  font-size: 13px;
  color: var(--color-text, #334155);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: var(--color-primary, var(--color-brand));
    background: color-mix(in srgb, var(--color-primary, var(--color-brand)) 8%, #ffffff);
  }

  &:has(input:checked) {
    border-color: var(--color-primary, var(--color-brand));
    background: color-mix(in srgb, var(--color-primary, var(--color-brand)) 10%, #ffffff);
  }

  input {
    flex-shrink: 0;
    accent-color: var(--color-primary, var(--color-brand));
  }
`;

export const CheckboxLabelText = styled.span`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PillButton = styled.button`
  border: 1px solid ${({ $active }) =>
    $active ? "var(--color-primary, var(--color-brand))" : "var(--color-border, #d7dee7)"};
  background: ${({ $active }) =>
    $active ? "var(--color-primary, var(--color-brand))" : "var(--color-input-bg, #ffffff)"};
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--color-text, #334155)")};
  border-radius: 999px;
  min-height: 34px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary, var(--color-brand));
  }
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 2px;
`;

export const PrimaryButton = styled.button`
  min-height: 40px;
  border-radius: 10px;
  border: 1px solid var(--color-primary, var(--color-brand));
  background: var(--color-primary, var(--color-brand));
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const GhostButton = styled.button`
  min-height: 40px;
  border-radius: 10px;
  border: 1px solid var(--color-border, #d7dee7);
  background: transparent;
  color: var(--color-text, #334155);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
