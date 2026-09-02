"use client";

import { useSyncExternalStore } from "react";

import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import OtpForm from "@/components/auth/OtpForm";
import Footer from "@/components/footer/index";
import Header from "@/components/Header/Header";
import { useRouter } from "@/i18n/navigation";
import { PATH_AUTH } from "@/routes/path";

import {
  BackLinkButton,
  BackLinkRow,
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  LoginCard,
  LoginShell,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
} from "./style";

const PENDING_MOBILE_KEY = "authPendingMobile";

const subscribeNoop = () => () => {};
const getPendingMobile = () =>
  sessionStorage.getItem(PENDING_MOBILE_KEY) || "";
const getPendingMobileServer = () => "";

const OtpPage = () => {
  const router = useRouter();
  const mobileNumber = useSyncExternalStore(
    subscribeNoop,
    getPendingMobile,
    getPendingMobileServer,
  );

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

          <Title>Verify your number</Title>
          <Subtitle>
            {mobileNumber
              ? `Enter the 6-digit code sent to ${mobileNumber}`
              : "Enter the 6-digit verification code"}
          </Subtitle>

          <OtpForm mobileNumber={mobileNumber} />

          <BackLinkRow>
            Wrong number?
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

export default OtpPage;
