"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import OtpForm from "@/components/auth/OtpForm";
import Footer from "@/components/footer/index";
import Header from "@/components/Header/Header";
import { FormProvider } from "@/components/hook-form";
import PhoneInput from "@/components/phone/PhoneInput";
import { useRouter } from "@/i18n/navigation";
import { forgotPasswordAction } from "@/redux/auth/action";
import { PATH_AUTH } from "@/routes/path";
import { formatMobileNumberForApi } from "@/constants/phoneCountries";
import { forgotPasswordSchema } from "@/schemas/authSchema";

import {
  BackLinkButton,
  BackLinkRow,
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
  OtpSection,
  Spinner,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
  VerifyButton,
} from "./style";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMobile, setSubmittedMobile] = useState("");
  const [mobileMasked, setMobileMasked] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { mobileNumber: "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const isVerifyDisabled = !isValid || isSubmitting;

  const onSubmit = async ({ mobileNumber }) => {
    const formattedMobile = formatMobileNumberForApi(mobileNumber);
    setIsSubmitting(true);
    try {
      const response = await dispatch(
        forgotPasswordAction({ mobileNumber: formattedMobile }),
      ).unwrap();

      setSubmittedMobile(
        formatMobileNumberForApi(response?.data?.mobileNumber ?? formattedMobile),
      );
      setMobileMasked(response?.data?.mobileMasked ?? "");
      setShowOtpInput(true);
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <LoginShell>
        <CityBackdrop aria-hidden>
          <LoginCityBackdropSvg />
        </CityBackdrop>

        <LoginCard>
          <BrandRow>
            <BrandIcon>🏠</BrandIcon>
            <div>
              <BrandName>Property 973</BrandName>
              <BrandSubtext> Real estate Marketplace</BrandSubtext>
            </div>
          </BrandRow>

          <Title>Forgot password?</Title>
          <Subtitle>
            {showOtpInput
              ? `Enter the 6-digit code sent to ${mobileMasked || submittedMobile}`
              : "Enter your mobile number to receive an OTP"}
          </Subtitle>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="mobileNumber">Mobile number</Label>
            <PhoneInput
              id="mobileNumber"
              name="mobileNumber"
              control={control}
              placeholder="Mobile number"
              variant="dark"
              disabled={showOtpInput}
              aria-invalid={Boolean(errors.mobileNumber)}
            />
            {errors.mobileNumber && (
              <ErrorText>{errors.mobileNumber.message}</ErrorText>
            )}

            {!showOtpInput && (
              <VerifyButton type="submit" disabled={isVerifyDisabled}>
                {isSubmitting ? (
                  <>
                    <Spinner aria-hidden /> Sending OTP...
                  </>
                ) : (
                  "Verify"
                )}
              </VerifyButton>
            )}
          </FormProvider>

          {showOtpInput && (
            <OtpSection>
              <OtpForm
                forgotPassword
                mobileNumber={submittedMobile}
                labelText="Enter OTP"
              />
            </OtpSection>
          )}

          <BackLinkRow>
            Remembered your password?
            <BackLinkButton
              type="button"
              onClick={() => router.push(PATH_AUTH.login)}
            >
              Back to login
            </BackLinkButton>
          </BackLinkRow>

          <DividerRow />

          <StatsRow>
            <StatBox>
              <StatValue>50K+</StatValue>
              <StatLabel>Listings</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>12K+</StatValue>
              <StatLabel>Verified agents</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>4.8/5★</StatValue>
              <StatLabel>Trust rating</StatLabel>
            </StatBox>
          </StatsRow>
        </LoginCard>
      </LoginShell>

      <Footer />
    </>
  );
};

export default ForgotPassword;
