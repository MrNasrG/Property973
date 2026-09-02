import styled from "styled-components";

import { Link } from "@/i18n/navigation";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1300;
  background: rgba(15, 23, 42, 0.36);
  display: grid;
  place-items: center;
  padding: 20px 16px;
`;

export const Panel = styled.div`
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.16);
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 14px;
  border-bottom: 1px solid #e8ecf0;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.25;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

export const CloseBtn = styled.button`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin: -4px -4px -4px 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  svg {
    display: block;
    width: 18px;
    height: 18px;
  }
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 14px 16px 16px;
`;

export const OptionCard = styled.button`
  min-height: 128px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  padding: 14px 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    border: 2px solid var(--color-brand);
    background: var(--color-brand-soft);
    box-shadow: 0 0 0 2px rgba(206, 17, 38, 0.14);
  }

  &:focus-visible .option-title,
  &:hover .option-title {
    color: var(--color-brand);
  }

  &:focus-visible .option-sub,
  &:hover .option-sub {
    color: #64748b;
  }
`;

export const OptionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 10px;
`;

export const OptionTitle = styled.span`
  display: block;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.25;
  color: #0f172a;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
`;

export const OptionSub = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.3;
  color: #64748b;
  transition: color 0.2s ease;
`;
