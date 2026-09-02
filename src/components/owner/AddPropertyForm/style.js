import styled from "styled-components";

const border = "1px solid #e2e8f0";
const borderSubtle = "1px solid #f1f5f9";
const radiusXl = "16px";
const radiusLg = "12px";
const radiusMd = "8px";
const radiusSm = "6px";
const brand = "var(--color-brand, #ce1126)";
const brandSoft = "var(--color-brand-soft, #fcf2f3)";
const brandSoftStrong = "var(--color-brand-soft-strong, #f5e0e3)";

/* ─── Shell ──────────────────────────────────────────────────────────────────── */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(15, 23, 42, 0.42);
  display: grid;
  place-items: center;
  padding: 16px;
  backdrop-filter: blur(2px);
`;

export const Drawer = styled.div`
  width: min(680px, 100%);
  max-height: min(92vh, 860px);
  background: #ffffff;
  border-radius: ${radiusXl};
  border: ${border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.06),
    0 20px 40px -4px rgba(15, 23, 42, 0.14);
`;

/* ─── Header ─────────────────────────────────────────────────────────────────── */
export const DrawerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px 16px;
  border-bottom: ${border};
  flex-shrink: 0;
  background: #fff;
`;

export const DrawerTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const DrawerTitle = styled.h2`
  margin: 0;
  display: inline-block;
  width: fit-content;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-brand, #ce1126);
  letter-spacing: -0.025em;
  padding: 6px 12px;
  border-radius: ${radiusMd};
  background: var(--color-brand-soft, #fcf2f3);
  box-shadow: inset 0 0 0 1px var(--color-brand-soft-strong, #f5e0e3);
`;

export const DrawerSub = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #64748b;
  line-height: 1.4;
`;

export const CloseBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-top: 1px;
  border: none;
  border-radius: ${radiusMd};
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  &:focus-visible {
    outline: 2px solid ${brand};
    outline-offset: 2px;
  }

  svg {
    display: block;
    width: 18px;
    height: 18px;
  }
`;

/* ─── Scrollable body ────────────────────────────────────────────────────────── */
export const FormBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 0;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 99px;
  }
`;

/* ─── Sections ───────────────────────────────────────────────────────────────── */
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 14px;

  & + & {
    border-top: ${borderSubtle};
    padding-top: 8px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-brand, #ce1126);
  flex-shrink: 0;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  display: inline-block;
  width: fit-content;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--color-brand, #ce1126);
  padding: 4px 10px;
  border-radius: ${radiusSm};
  background: var(--color-brand-soft, #fcf2f3);
  box-shadow: inset 0 0 0 1px var(--color-brand-soft-strong, #f5e0e3);
`;

/* ─── Listing-kind selector ──────────────────────────────────────────────────── */
export const ListingKindGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const ListingKindCard = styled.button`
  text-align: left;
  padding: 14px;
  border-radius: ${radiusLg};
  border: ${({ $active }) =>
    $active ? `1.5px solid ${brand}` : "1px solid #e2e8f0"};
  background: ${({ $active }) => ($active ? brandSoft : "#ffffff")};
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  position: relative;
  box-shadow: ${({ $active }) =>
    $active ? `inset 0 0 0 1px ${brandSoftStrong}` : "none"};

  &:hover {
    border-color: ${({ $active }) => ($active ? brand : "#94a3b8")};
    background: ${({ $active }) => ($active ? brandSoft : "#f8fafc")};
  }
`;

export const KindCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const KindBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  letter-spacing: 0.02em;
  background: ${({ $active }) => ($active ? brand : "#f1f5f9")};
  color: ${({ $active }) => ($active ? "#fff" : "#64748b")};
  transition: background 0.15s ease, color 0.15s ease;
`;

export const KindCheckmark = styled.span`
  display: ${({ $active }) => ($active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${brand};
  color: #fff;
  font-size: 10px;
  flex-shrink: 0;
`;

export const KindTitle = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? brand : "#0f172a")};
  line-height: 1.3;
  margin-bottom: 4px;
`;

export const KindHint = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.45;
`;

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px;
  border-top: ${border};
  flex-shrink: 0;
  background: #f8fafc;
`;

export const GhostBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 18px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: ${radiusMd};
  border: ${border};
  background: #fff;
  color: #475569;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

export const AuthNotice = styled.div`
  margin: 0 0 12px;
  padding: 12px 14px;
  border-radius: ${radiusMd};
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 0.8125rem;
  line-height: 1.45;
`;

export const SubmitBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${radiusMd};
  border: none;
  background: ${brand};
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: -0.01em;
  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover {
    background: var(--color-brand-foreground, #8a0a1c);
    opacity: 1;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

/* ─── Toggle ─────────────────────────────────────────────────────────────────── */
export const ToggleWrap = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: ${radiusMd};
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${brand};
    background: ${brandSoft};
  }
`;

export const ToggleLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ToggleLabel = styled.span`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #0f172a;
`;

export const ToggleSub = styled.span`
  font-size: 0.75rem;
  color: #64748b;
`;

export const ToggleTrack = styled.span`
  position: relative;
  width: 38px;
  height: 22px;
  border-radius: 999px;
  background: ${({ $on }) => ($on ? brand : "#cbd5e1")};
  flex-shrink: 0;
  transition: background 0.15s ease;
`;

export const ToggleThumb = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ $on }) => ($on ? "19px" : "3px")};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.2);
  transition: left 0.15s ease;
`;

export const HiddenToggle = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

/* ─── File upload ────────────────────────────────────────────────────────────── */
export const FileUploadWrap = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px;
  border: 1.5px dashed #cbd5e1;
  border-radius: ${radiusLg};
  background: #f8fafc;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${brand};
    background: ${brandSoft};
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const FileUploadIcon = styled.div`
  font-size: 1.5rem;
  line-height: 1;
  color: ${brand};
`;

export const FileUploadText = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0f172a;
`;

export const FileUploadHint = styled.span`
  font-size: 0.75rem;
  color: #64748b;
`;

export const PhotoPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 10px;
  margin-top: 12px;
`;

export const PhotoPreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${radiusMd};
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
`;

export const PhotoPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const PhotoPreviewBadge = styled.span`
  position: absolute;
  left: 6px;
  bottom: 6px;
  max-width: calc(100% - 12px);
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.72);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
