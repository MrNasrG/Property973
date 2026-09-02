"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Header");

  return (
    <div
      className="flex items-center gap-1.5 rounded-md border border-neutral-200/90 bg-white px-1.5 py-0.5 text-[12px] font-medium text-neutral-700"
      role="navigation"
      aria-label={t("languageNav")}
    >
      <Link
        href={pathname}
        locale="en"
        className={
          locale === "en"
            ? "rounded px-1.5 py-0.5 text-brand"
            : "rounded px-1.5 py-0.5 text-muted transition-colors hover:text-neutral-800"
        }
        prefetch={false}
      >
        EN
      </Link>
      <span className="text-neutral-300" aria-hidden>
        |
      </span>
      <Link
        href={pathname}
        locale="ar"
        className={
          locale === "ar"
            ? "rounded px-1.5 py-0.5 text-brand"
            : "rounded px-1.5 py-0.5 text-muted transition-colors hover:text-neutral-800"
        }
        style={
          locale === "ar"
            ? undefined
            : { fontFamily: "var(--font-noto-arabic), system-ui, sans-serif" }
        }
        prefetch={false}
      >
        عربي
      </Link>
    </div>
  );
}
