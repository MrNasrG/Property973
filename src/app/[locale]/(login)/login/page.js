"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import { IconEyeClosedSvg, IconEyeOpenSvg } from "@/assets";
import { FormProvider } from "@/components/hook-form";
import PhoneInput from "@/components/phone/PhoneInput";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/index";
import { useRouter } from "@/i18n/navigation";
import { PATH_AUTH } from "@/routes/path";
import {
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  ErrorText,
  ForgotPasswordButton,
  ForgotPasswordRow,
  Input,
  Label,
  LoginCard,
  LoginShell,
  ModeToggleButton,
  ModeToggleRow,
  PasswordFieldWrapper,
  PasswordToggleButton,
  PrimaryButton,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
} from "./style";
import { loginAction, registerAction } from "@/redux/auth/action";
import { formatMobileNumberForApi } from "@/constants/phoneCountries";
import { useDispatch } from "react-redux";

const AUTH_COPY = {
  login: {
    title: "Log in or create account",
    subtitle: "Welcome back - sign in to continue",
    submitLabel: "Log in",
    togglePrompt: "Don't have an account?",
    toggleAction: "Create account",
  },
  register: {
    title: "Create your account",
    subtitle: "Join Property 973 - sign up to get started",
    submitLabel: "Send OTP",
    togglePrompt: "Already have an account?",
    toggleAction: "Log in",
  },
};

const AuthFormFields = ({
  register,
  control,
  errors,
  isLogin,
  formMode,
  onForgotPassword,
  showPassword,
  onTogglePassword,
}) => (
  <>
    {!isLogin && (
      <>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
          aria-invalid={Boolean(errors.fullName)}
        />
        {errors.fullName && <ErrorText>{errors.fullName.message}</ErrorText>}

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      </>
    )}

    <Label htmlFor="mobileNumber">Mobile number</Label>
    <PhoneInput
      key={formMode}
      id="mobileNumber"
      name="mobileNumber"
      control={control}
      placeholder="Mobile number"
      variant="dark"
      aria-invalid={Boolean(errors.mobileNumber)}
    />
    {errors.mobileNumber && <ErrorText>{errors.mobileNumber.message}</ErrorText>}

    <Label htmlFor="password">Password</Label>
    <PasswordFieldWrapper>
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        {...register("password")}
        aria-invalid={Boolean(errors.password)}
      />
      <PasswordToggleButton
        onClick={onTogglePassword}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
      >
        {showPassword ? <IconEyeClosedSvg /> : <IconEyeOpenSvg />}
      </PasswordToggleButton>
    </PasswordFieldWrapper>
    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

    {isLogin && (
      <ForgotPasswordRow>
        <ForgotPasswordButton type="button" onClick={onForgotPassword}>
          Forgot password?
        </ForgotPasswordButton>
      </ForgotPasswordRow>
    )}
  </>
);

const PENDING_MOBILE_KEY = "authPendingMobile";

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";
  const copy = AUTH_COPY[mode];
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
    },
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setShowPassword(false);
    reset({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
    });
  };

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleForgotPassword = useCallback(() => {
    router.push(PATH_AUTH.forgotPassword);
  }, [router]);

  const onSubmit = async (data) => {
    const mobileNumber = formatMobileNumberForApi(data.mobileNumber);
    sessionStorage.setItem(PENDING_MOBILE_KEY, mobileNumber);

    try {
      if (isLogin) {
        await dispatch(
          loginAction({
            password: data.password,
            mobileNumber,
          }),
        ).unwrap();
      } else {
        await dispatch(
          registerAction({
            password: data.password,
            fullName: data.fullName,
            email: data.email,
            mobileNumber,
          }),
        ).unwrap();
      }

      router.push(PATH_AUTH.otp);
    } catch (error) {
      console.error(error);
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

          <Title>{copy.title}</Title>
          <Subtitle>{copy.subtitle}</Subtitle>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <AuthFormFields
              register={register}
              control={control}
              errors={errors}
              isLogin={isLogin}
              formMode={mode}
              onForgotPassword={handleForgotPassword}
              showPassword={showPassword}
              onTogglePassword={handleTogglePassword}
            />
            <PrimaryButton type="submit">{copy.submitLabel}</PrimaryButton>
          </FormProvider>

          <ModeToggleRow>
            {copy.togglePrompt}
            <ModeToggleButton
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
            >
              {copy.toggleAction}
            </ModeToggleButton>
          </ModeToggleRow>

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

export default LoginPage;
