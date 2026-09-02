"use client";

import { useTranslations } from "next-intl";

import {
  ChevronWrap,
  ListSectionTitle,
  ListingHint,
  ListingOption,
  ListingRight,
  ListingStack,
  ListingTextBlock,
  ListingTitle,
  PageShell,
  PageTitle,
  RoleCard,
  RoleIconWrap,
  RoleLabel,
  RoleRow,
  StatusPill,
  StepBadge,
} from "./AddListingFlow.style";
import { useDispatch, useSelector } from "react-redux";
import { setListingKind, setRole } from "@/redux/addlisting/slice";
import {
  IconBriefcaseSvg,
  IconChevronRightSvg,
  IconHouseLineSvg,
  IconOwnerRoleSvg,
} from "@/assets";
import { useRouter } from "next/navigation";

const ROLES = [
  { id: "broker", icon: <IconBriefcaseSvg /> },
  { id: "owner", icon: <IconOwnerRoleSvg /> },
  { id: "host", icon: <IconHouseLineSvg /> },
];

export default function AddListingFlow() {
  const t = useTranslations("Pages");
  const dispatch = useDispatch();
  const router = useRouter();
  const addListingState = useSelector((state) => state.addListingApiSlice);
  const role = addListingState.role;
  const listingKind = addListingState.listingKind;

  return (
    <PageShell>
      <PageTitle>{t("addListingTitle")}</PageTitle>

      <RoleRow role="group" aria-label={t("addListingFlow.roleGroupLabel")}>
        {ROLES.map(({ id, icon }) => (
          <RoleCard
            key={id}
            type="button"
            $active={role === id}
            onClick={() => { dispatch(setRole(id)); dispatch(setListingKind((id == "broker" || id == "owner") ? "licensed" : "dailyMonthly")) }}
            aria-pressed={role === id}
          >
            <RoleIconWrap>{icon}</RoleIconWrap>
            <RoleLabel>{id}</RoleLabel>
          </RoleCard>
        ))}
      </RoleRow>
      {role !== "null" && (
        <>
          <ListSectionTitle>{t("addListingFlow.listTypeHeading")}</ListSectionTitle>

          <ListingStack>
            {(role === "broker" || role === "owner") && (
              <ListingOption
                type="button"
                $active={listingKind === "licensed"}
                onClick={() => (dispatch(setListingKind("licensed")), router.push("/login"))}
                aria-pressed={listingKind === "licensed"}
              >
                <StepBadge>1</StepBadge>
                <ListingTextBlock>
                  <ListingHint>{t("addListingFlow.option1.hint")}</ListingHint>
                  <ListingTitle>{t("addListingFlow.option1.title")}</ListingTitle>
                </ListingTextBlock>
                <ListingRight>
                  <StatusPill>{t("addListingFlow.option1.badge")}</StatusPill>
                  <ChevronWrap>
                    <IconChevronRightSvg />
                  </ChevronWrap>
                </ListingRight>
              </ListingOption>
            )}
            {role === "owner" && (
              <ListingOption
                type="button"
                $active={listingKind === "marketing"}
                onClick={() => (dispatch(setListingKind("marketing")), router.push("/login"))}
                aria-pressed={listingKind === "marketing"}
              >
                <StepBadge>2</StepBadge>
                <ListingTextBlock>
                  <ListingHint>{t("addListingFlow.option2.hint")}</ListingHint>
                  <ListingTitle>{t("addListingFlow.option2.title")}</ListingTitle>
                </ListingTextBlock>
                <ListingRight>
                  <StatusPill>{t("addListingFlow.option2.badge")}</StatusPill>
                  <ChevronWrap>
                    <IconChevronRightSvg />
                  </ChevronWrap>
                </ListingRight>
              </ListingOption>
            )}
            {role === "host" && (
              <ListingOption
                type="button"
                $active={listingKind === "dailyMonthly"}
                onClick={() => (dispatch(setListingKind("dailyMonthly")), router.push("/login"))}
                aria-pressed={listingKind === "dailyMonthly"}
              >
                <StepBadge>1</StepBadge>
                <ListingTextBlock>
                  <ListingTitle>Unit for daily/monthly rental</ListingTitle>
                  <ListingHint>
                    Allows users to book and pay directly through Property 973
                  </ListingHint>
                </ListingTextBlock>
                <ListingRight>
                  <ChevronWrap>
                    <IconChevronRightSvg />
                  </ChevronWrap>
                </ListingRight>
              </ListingOption>
            )}
          </ListingStack>
        </>
      )}
    </PageShell>
  );
}
