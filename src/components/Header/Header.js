"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import {
  IconBuildingSvg,
  IconMapFoldedSvg,
  IconUserFramedSvg,
} from "@/assets";
import AddButtonPopUp from "@/components/Header/AddButtonPopUp/AddButtonPopUp";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useRouter } from "@/i18n/navigation";
import { setAddButtonPopUp, setHeaderTabOptions } from "@/redux/header/slice";

const MAIN_TABS = [
  { index: 0, labelKey: "realEstate", Icon: IconBuildingSvg },
  // { index: 1, labelKey: "projects", Icon: IconChartSvg },
  // { index: 2, labelKey: "dailyRent", Icon: IconCalendarSvg },
];

const RIGHT = [
  // { key: "map", path: "/map", labelKey: "mapSearch", Icon: IconMapFoldedSvg },
  { key: "add", openAddPopup: true, labelKey: "addListing" },
  { key: "login", path: "/login", Icon: IconUserFramedSvg, framedIcon: true },
];

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Header");
  const activeTab = useSelector(
    (state) => state.headerApiSlice.headerTabOptions,
  );
  const fontUi =
    "font-[family-name:var(--font-inter),ui-sans-serif,system-ui,sans-serif]";

  return (
    <header
      className={`sticky top-0 z-40 overflow-x-hidden border-b border-neutral-200/80 bg-white text-[15px] font-medium leading-none tracking-[-0.01em] text-neutral-800 dark:bg-white ${fontUi}`}
    >
      <div className="relative mx-auto flex h-[52px] w-full min-w-0 max-w-[1280px] items-center px-[7px] min-[641px]:px-[32px] lg:px-[110px]">
        <div className="flex min-w-0 flex-1 justify-start">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              dispatch(setHeaderTabOptions(0));
              router.push("/");
            }}
            className="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/25"
          >
            <Image
              src="/property973-logo.png"
              alt="Property 973"
              width={360}
              height={110}
              className="h-11 w-auto shrink-0"
              priority
            />
          </button>
        </div>

        <nav
          className="absolute left-1/2 z-30 hidden max-w-[min(520px,calc(100%-15rem))] -translate-x-1/2 items-center gap-3 md:flex md:gap-4 lg:max-w-none lg:gap-9"
          aria-label={t("navMain")}
        >
          {MAIN_TABS.map(({ index, labelKey, Icon }) => {
            const active = activeTab === index;
            return (
              <button
                key={index}
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  dispatch(setHeaderTabOptions(index));
                  router.push("/");
                }}
                className={[
                  "flex shrink-0 items-center gap-1.5 border-b-2 pb-1 text-[12px] transition-colors sm:gap-2 sm:text-[13px] lg:text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm",
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:border-brand/40 hover:text-brand",
                ].join(" ")}
              >
                <Icon className="shrink-0" />
                <span className="leading-tight">{t(labelKey)}</span>
              </button>
            );
          })}
        </nav>

        <div className="relative z-20 hidden min-w-0 flex-1 items-center justify-end gap-2 text-[12px] font-medium md:flex md:gap-3 lg:gap-5 lg:text-[14px]">
          <LanguageSwitcher />
          {RIGHT.map((item) => {
            const Icon = item.Icon;
            const isLogin = item.path === "/login";
            return (
              <button
                key={item.key}
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  if (item.openAddPopup) {
                    dispatch(setAddButtonPopUp(true));
                  } else if (item.path) {
                    router.push(item.path);
                    dispatch(setHeaderTabOptions(null));
                  }
                }}
                className="group flex items-center gap-1.5 rounded-md text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25"
                aria-label={isLogin ? t("login") : undefined}
              >
                {Icon ? (
                  item.framedIcon ? (
                    <span className="inline-flex rounded border border-neutral-300/90 p-[3px] text-muted transition-colors group-hover:border-brand/45 group-hover:text-brand">
                      <Icon className="shrink-0" />
                    </span>
                  ) : (
                    <Icon className="shrink-0" />
                  )
                ) : null}
                {item.labelKey ? (
                  <span className="leading-tight">{t(item.labelKey)}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => router.push("/map")}
            className="group rounded p-1.5 text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25"
            aria-label={t("ariaMapSearch")}
          >
            <IconMapFoldedSvg className="h-[1.15rem] w-[1.15rem] shrink-0" />
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => dispatch(setAddButtonPopUp(true))}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand text-xl leading-none text-white transition-[filter,box-shadow] hover:brightness-105 hover:shadow-[0_4px_16px_rgba(206,17,38,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 active:brightness-95"
            aria-label={t("ariaAddListing")}
          >
            +
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              router.push("/login");
              dispatch(setHeaderTabOptions(null));
            }}
            className="group rounded p-1.5 text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25"
            aria-label={t("login")}
          >
            <span className="inline-flex rounded border border-neutral-300/90 p-[2px] text-muted transition-colors group-hover:border-brand/45 group-hover:text-brand">
              <IconUserFramedSvg className="h-[1.15rem] w-[1.15rem] shrink-0" />
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-neutral-200/70 md:hidden">
        <nav
          className="mx-auto flex w-full min-w-0 max-w-[1280px] items-center px-[7px]"
          aria-label={t("navMobile")}
        >
          {MAIN_TABS.map(({ index, labelKey, Icon }) => {
            const active = activeTab === index;
            return (
              <button
                key={index}
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  dispatch(setHeaderTabOptions(index));
                  router.push("/");
                }}
                className={[
                  "flex flex-1 items-center justify-center gap-2 border-b-[3px] px-1 py-3 text-[0.95rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-inset",
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-[#3f3f46] hover:border-brand/45 hover:text-brand",
                ].join(" ")}
              >
                <Icon className="shrink-0" />
                <span className="leading-tight">{t(labelKey)}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <AddButtonPopUp />
    </header>
  );
}
