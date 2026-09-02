import styled from "styled-components";

export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(10, 15, 24, 0.6);
  backdrop-filter: blur(2px);
`;

export const PopupContainer = styled.div`
  width: 100%;
  max-width: 380px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: linear-gradient(180deg, #2f3135 0%, #222427 100%);
  color: #ffffff;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4);
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 18px 18px 8px;
`;

export const AgencyTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #ff8a96;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #ffffff;
  }
`;

export const PopupBody = styled.div`
  padding: 0 18px 18px;
`;

export const PopupHint = styled.p`
  margin: 0;
  font-size: 23px;
  line-height: 1.35;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
`;

export const AgentRow = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AgentAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #6d1520;
  color: #ffc8ce;
  font-size: 18px;
  font-weight: 700;
`;

export const AgentName = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;

export const AgentRole = styled.p`
  margin: 2px 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.78);
`;

export const AgentVerified = styled.span`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  background: #8a1522;
  color: #ffe8ea;
`;

export const ContactCard = styled.div`
  margin-top: 16px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(18, 22, 27, 0.75) 0%, rgba(18, 22, 27, 0.55) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px 14px 10px;
`;

export const ContactLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
`;

export const ContactPhone = styled.a`
  margin-top: 6px;
  display: inline-block;
  color: #ff9aa8;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
`;
