import styled from "styled-components";

import { Link } from "@/i18n/navigation";

const bgPrimary = "#ffffff";
const bgSecondary = "#f5f4f0";
const borderSecondary = "#e8e6e1";
const borderTertiary = "#e8e6e1";
const textPrimary = "#1a1a18";
const textSecondary = "#6b6a67";
const brandRed = "#c8102e";

export const HeaderBar = styled.header`
  background: ${bgPrimary};
  border-bottom: 0.5px solid ${borderTertiary};
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

export const LogoText = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${brandRed};
  letter-spacing: -0.3px;
`;

export const LogoSub = styled.span`
  font-size: 10px;
  color: ${textSecondary};
  font-weight: 400;
  letter-spacing: 0.5px;
  display: block;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NotifBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 0.5px solid ${borderSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  color: ${textSecondary};
  background: transparent;
  padding: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NotifDot = styled.span`
  width: 7px;
  height: 7px;
  background: ${brandRed};
  border-radius: 50%;
  position: absolute;
  top: 6px;
  right: 6px;
  border: 1.5px solid ${bgPrimary};
`;

export const UserMenuWrap = styled.div`
  position: relative;
`;

export const UserChip = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  border: 0.5px solid ${borderSecondary};
  border-radius: 99px;
  cursor: pointer;
  background: ${({ $open }) => ($open ? bgSecondary : "transparent")};
  font-family: inherit;

  &:hover {
    background: ${bgSecondary};
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: ${bgPrimary};
  border: 0.5px solid ${borderSecondary};
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(26, 26, 24, 0.08);
  padding: 6px;
  z-index: 50;
`;

export const DropdownUser = styled.div`
  padding: 8px 10px 10px;
  border-bottom: 0.5px solid ${borderSecondary};
  margin-bottom: 4px;
`;

export const DropdownName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${textPrimary};
  line-height: 1.3;
`;

export const DropdownEmail = styled.div`
  font-size: 11px;
  color: ${textSecondary};
  margin-top: 2px;
  line-height: 1.3;
  word-break: break-word;
`;

export const SignOutBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: ${textPrimary};
  cursor: pointer;
  font-family: inherit;
  text-align: left;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: ${textSecondary};
  }

  &:hover {
    background: #fcf2f3;
    color: ${brandRed};

    svg {
      color: ${brandRed};
    }
  }
`;

export const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #faeeda;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #854f0b;
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${textPrimary};
`;

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${textSecondary};
  transition: transform 0.15s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "none")};

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const SrOnly = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
