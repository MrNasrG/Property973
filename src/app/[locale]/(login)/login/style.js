import styled from "styled-components";

export const LoginShell = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 24px 12px;
  background: radial-gradient(circle at 12% 10%, #3f0d18 0%, #210910 42%, #12070a 100%);
`;

export const CityBackdrop = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  filter: saturate(0.72) brightness(0.82);

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const LoginCard = styled.section`
  position: relative;
  z-index: 1;
  width: min(360px, 100%);
  border-radius: 16px;
  background: rgba(26, 12, 15, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32);
  padding: 24px 22px 18px;
  color: #f8eef0;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

export const BrandIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--color-brand);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
`;

export const BrandName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const BrandSubtext = styled.div`
  font-size: 11px;
  color: #ccbcc1;
`;

export const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  margin: 0 0 16px;
  font-size: 12px;
  color: #cfbec3;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 11px;
  color: #cfbec3;
`;

export const Input = styled.input.attrs({
  suppressHydrationWarning: true,
})`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  padding: 10px 12px;
  color: #fff;
  font-size: 13px;
  margin-bottom: 10px;

  &::placeholder {
    color: #a98e96;
  }

  &:focus {
    outline: 2px solid var(--color-brand);
    outline-offset: 1px;
  }
`;

export const ErrorText = styled.p`
  margin: -6px 0 10px;
  color: #ff9ea8;
  font-size: 11px;
`;

export const PasswordFieldWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;

  input {
    margin-bottom: 0;
    padding-right: 38px;
  }
`;

export const PasswordToggleButton = styled.button.attrs({
  suppressHydrationWarning: true,
  type: "button",
})`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
  color: #cfbec3;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const ForgotPasswordRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -4px 0 12px;
`;

export const ForgotPasswordButton = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  border: 0;
  background: none;
  padding: 0;
  color: var(--color-brand);
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const PrimaryButton = styled.button.attrs({
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
`;

export const ModeToggleRow = styled.p`
  margin: 12px 0 0;
  text-align: center;
  font-size: 12px;
  color: #cfbec3;
`;

export const ModeToggleButton = styled.button.attrs({
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

export const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 10px;
  color: #b39ba3;
  font-size: 11px;

  span {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.14);
  }
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
`;

export const SocialButton = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  flex: 1;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #eadce0;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;
`;

export const StatsRow = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 12px;
  display: flex;
  justify-content: space-around;
`;

export const StatBox = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: #cfbec3;
`;
