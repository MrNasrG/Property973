"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import {
  CloseIconSvg,
  IconAddMenuListingHouseSvg,
  IconAddMenuPropertySearchSvg,
} from "@/assets";
import { setAddButtonPopUp, setHeaderTabOptions } from "@/redux/header/slice";

import {
  CloseBtn,
  OptionCard,
  OptionIcon,
  OptionSub,
  OptionsGrid,
  OptionTitle,
  Overlay,
  Panel,
  PanelHeader,
  PanelTitle,
} from "./style";
import { useRouter } from "@/i18n/navigation";

export default function AddButtonPopUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Header");
  const open = useSelector(
    (state: { headerApiSlice: { addButtonPopUp: boolean } }) =>
      state.headerApiSlice.addButtonPopUp,
  );
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleRealEstateClick = () => {
    dispatch(setHeaderTabOptions(null));
    dispatch(setAddButtonPopUp(false));
    close();
    router.push("/add-listing");
  };

  const handlePropertyRequestClick = () => {
    router.push("/searches");
    dispatch(setAddButtonPopUp(false));
    dispatch(setHeaderTabOptions(null));
    close();
  };

  const close = useCallback(() => {
    dispatch(setAddButtonPopUp(false));
  }, [dispatch]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  if (!isClient || !open) {
    return null;
  }

  const content = (
    <Overlay
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-menu-title"
        onClick={(e) => e.stopPropagation()}
      >
        <PanelHeader>
          <PanelTitle id="add-menu-title">{t("addMenuTitle")}</PanelTitle>
          <CloseBtn
            type="button"
            onClick={close}
            aria-label={t("addMenuCloseAria")}
          >
            <CloseIconSvg />
          </CloseBtn>
        </PanelHeader>

        <OptionsGrid>
          <OptionCard onClick={() => handleRealEstateClick()}>
            <OptionIcon>
              <IconAddMenuListingHouseSvg />
            </OptionIcon>
            <OptionTitle className="option-title">
              {t("addMenuListingTitle")}
            </OptionTitle>
            <OptionSub className="option-sub">
              {t("addMenuListingSub")}
            </OptionSub>
          </OptionCard>

          <OptionCard onClick={() => handlePropertyRequestClick()}>
            <OptionIcon>
              <IconAddMenuPropertySearchSvg />
            </OptionIcon>
            <OptionTitle className="option-title">
              {t("addMenuRequestTitle")}
            </OptionTitle>
            <OptionSub className="option-sub">
              {t("addMenuRequestSub")}
            </OptionSub>
          </OptionCard>
        </OptionsGrid>
      </Panel>
    </Overlay>
  );

  return createPortal(content, document.body);
}
