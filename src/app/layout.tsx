import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/property973-logo.png",
    shortcut: "/property973-logo.png",
    apple: "/property973-logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
