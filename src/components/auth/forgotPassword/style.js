import styled, { keyframes } from "styled-components";

export {
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  ErrorText,
  Input,
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
} from "@/app/[locale]/(login)/login/style";

export {
  BackLinkButton,
  BackLinkRow,
  OtpDigitInput,
  OtpRow,
} from "@/app/[locale]/(login)/otp/style";

export const VerifyButton = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  width: 100%;
  margin-top: 4px;
  border: 0;
  border-radius: 8px;
  background: var(--color-brand);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 11px 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    background: rgba(255, 255, 255, 0.16);
    color: #a98e96;
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  animation: ${spin} 0.7s linear infinite;
  display: inline-block;
`;

export const OtpSection = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;
