"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import { IconEyeClosedSvg, IconEyeOpenSvg } from "@/assets";
import Footer from "@/components/footer/index";
import Header from "@/components/Header/Header";
import { FormProvider } from "@/components/hook-form";
import { useRouter } from "@/i18n/navigation";
import { resetPasswordAction } from "@/redux/auth/action";
import { PATH_AUTH } from "@/routes/path";
import { resetPasswordSchema } from "@/schemas/authSchema";

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
  Input,
  Label,
  LoginCard,
  LoginShell,
  PasswordFieldWrapper,
  PasswordToggleButton,
  Spinner,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
  VerifyButton,
} from "./style";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const resetToken = useSelector((state) => state.authSlice.resetToken);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    if (!resetToken) {
      router.replace(PATH_AUTH.forgotPassword);
    }
  }, [resetToken, router]);

  const onSubmit = async ({ password, confirmPassword }) => {
    console.log("resetToken check========>", resetToken);
    if (!resetToken) {
      console.log("resetToken========>");
      toast.error("Reset token missing. Please restart the flow.");
      // router.replace(PATH_AUTH.forgotPassword);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await dispatch(
        resetPasswordAction({ resetToken, password, confirmPassword }),
      ).unwrap();
      console.log("response", response);

      if (response?.success === true) {
        toast.success("Password reset successfully. Please log in.");
        router.push(PATH_AUTH.login);
      } else {
        toast.error("Password reset failed. Please try again.");
      }
      router.push(PATH_AUTH.login);
    } catch (error) {
      console.error("Reset password error:", error);
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

          <Title>Reset your password</Title>
          <Subtitle>Choose a new password for your account</Subtitle>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="password">New password</Label>
            <PasswordFieldWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                {...register("password")}
                aria-invalid={Boolean(errors.password)}
              />
              <PasswordToggleButton
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeClosedSvg /> : <IconEyeOpenSvg />}
              </PasswordToggleButton>
            </PasswordFieldWrapper>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}

            <Label htmlFor="confirmPassword">Confirm password</Label>
            <PasswordFieldWrapper>
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                {...register("confirmPassword")}
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              <PasswordToggleButton
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <IconEyeClosedSvg /> : <IconEyeOpenSvg />}
              </PasswordToggleButton>
            </PasswordFieldWrapper>
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword.message}</ErrorText>
            )}

            <VerifyButton type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner aria-hidden /> Resetting...
                </>
              ) : (
                "Reset password"
              )}
            </VerifyButton>
          </FormProvider>

          <BackLinkRow>
            Changed your mind?
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

export default ResetPassword;
