"use client";

import { useEffect, useRef, useState } from "react";

import {
  IconChevronDownSvg,
  IconLogoutSvg,
  IconProperty973PinSvg,
} from "@/assets";
import { useLogout } from "@/utils/useLogout";
import { useIsClientMounted } from "@/utils/useIsClientMounted";
import { useStoredUser } from "@/utils/useStoredUser";
import {
  Avatar,
  ChevronIcon,
  Dropdown,
  DropdownEmail,
  DropdownName,
  DropdownUser,
  HeaderBar,
  LogoLink,
  LogoSub,
  LogoText,
  Right,
  SignOutBtn,
  SrOnly,
  UserChip,
  UserMenuWrap,
  UserName,
} from "./style";

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "PO";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const DashboardHeader = () => {
  const user = useStoredUser();
  const mounted = useIsClientMounted();
  const handleLogout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const initials = getInitials(user?.fullName);
  const displayName = user?.fullName || "Property owner";
  const email = user?.email || "";
  const chipInitials = mounted ? initials : "PO";
  const chipDisplayName = mounted ? displayName : "Property owner";
  const chipEmail = mounted ? email : "";

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    handleLogout();
  };

  return (
    <>
      <SrOnly>Property 973 logged-in header</SrOnly>
      <HeaderBar>
        <LogoLink href="/">
          <IconProperty973PinSvg aria-hidden />
          <div>
            <LogoText>Property 973</LogoText>
            <LogoSub>BAHRAIN</LogoSub>
          </div>
        </LogoLink>

        <Right>
          <UserMenuWrap ref={menuRef}>
            <UserChip
              type="button"
              aria-label="My account"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              $open={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Avatar>{chipInitials}</Avatar>
              <UserName>My account</UserName>
              <ChevronIcon aria-hidden $open={menuOpen}>
                <IconChevronDownSvg />
              </ChevronIcon>
            </UserChip>

            {menuOpen && (
              <Dropdown role="menu" aria-label="Account menu">
                <DropdownUser>
                  <DropdownName>{chipDisplayName}</DropdownName>
                  {chipEmail ? <DropdownEmail>{chipEmail}</DropdownEmail> : null}
                </DropdownUser>
                <SignOutBtn
                  type="button"
                  role="menuitem"
                  onClick={handleSignOut}
                >
                  <IconLogoutSvg aria-hidden />
                  Sign out
                </SignOutBtn>
              </Dropdown>
            )}
          </UserMenuWrap>
        </Right>
      </HeaderBar>
    </>
  );
};

export default DashboardHeader;
