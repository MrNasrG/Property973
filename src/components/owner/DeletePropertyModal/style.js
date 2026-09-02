import styled from "styled-components";

const border = "0.5px solid #e8e6e1";
const radiusLg = "12px";
const radiusMd = "8px";
const brand = "var(--color-brand, #ce1126)";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1400;
  background: rgba(26, 26, 24, 0.45);
  display: grid;
  place-items: center;
  padding: 20px 16px;
`;

export const Panel = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: ${border};
  border-radius: ${radiusLg};
  box-shadow: 0 14px 38px rgba(26, 26, 24, 0.14);
  overflow: hidden;
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 14px;
  border-bottom: ${border};
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #1a1a18;
`;

export const CloseBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${radiusMd};
  background: transparent;
  color: #6b6a67;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f5f4f0;
    color: #1a1a18;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PanelBody = styled.div`
  padding: 18px;
`;

export const Message = styled.p`
  margin: 0 0 10px;
  font-size: 14px;
  color: #6b6a67;
  line-height: 1.5;
`;

export const PropertyName = styled.p`
  margin: 0 0 10px;
  padding: 10px 12px;
  border-radius: ${radiusMd};
  background: #f5f4f0;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a18;
  line-height: 1.4;
  word-break: break-word;
`;

export const Warning = styled.p`
  margin: 0;
  font-size: 13px;
  color: #a32d2d;
  line-height: 1.45;
`;

export const PanelFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 18px 16px;
  border-top: ${border};
  background: #faf9f7;
`;

export const CancelBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: ${radiusMd};
  border: ${border};
  background: #fff;
  color: #1a1a18;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #f5f4f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteBtn = styled.button.attrs({
  suppressHydrationWarning: true,
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: ${radiusMd};
  border: 0.5px solid ${brand};
  background: ${brand};
  color: #fff;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    opacity: 0.92;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
