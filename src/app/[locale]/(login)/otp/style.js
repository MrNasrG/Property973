import styled from "styled-components";

export {
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  ErrorText,
  Label,
  LoginCard,
  LoginShell,
  PrimaryButton,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
} from "../login/style";

export const OtpRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const OtpDigitInput = styled.input.attrs({
  suppressHydrationWarning: true,
  inputMode: "numeric",
  maxLength: 1,
  autoComplete: "one-time-code",
})`
  width: 42px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 0;

  &:focus {
    outline: 2px solid var(--color-brand);
    outline-offset: 1px;
  }
`;

export const BackLinkRow = styled.p`
  margin: 12px 0 0;
  text-align: center;
  font-size: 12px;
  color: #cfbec3;
`;

export const BackLinkButton = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  border: 0;
  background: none;
  padding: 0;
  margin-left: 4px;
  color: var(--color-brand);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #fff;
  }
`;
