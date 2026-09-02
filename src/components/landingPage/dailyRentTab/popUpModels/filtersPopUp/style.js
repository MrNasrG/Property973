import styled from "styled-components";

export const FiltersOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1250;
  background: rgba(15, 23, 42, 0.36);
  display: grid;
  place-items: center;
  padding: 20px;
`;

/** Fixed compact height: stays the same on category list and detail form (form scrolls inside). */
const FILTERS_DRAWER_HEIGHT = "min(76vh, 504px)";

export const FiltersDrawer = styled.div`
  width: 100%;
  max-width: 460px;
  height: ${FILTERS_DRAWER_HEIGHT};
  max-height: ${FILTERS_DRAWER_HEIGHT};
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.16);
  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 14px;
  border-bottom: 1px solid #e8ecf0;
`;

export const HeaderLeft = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
`;

export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
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

export const Viewport = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

export const Track = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  min-height: 0;
  transform: ${({ $showForm }) => ($showForm ? "translateX(-50%)" : "translateX(0)")};
  transition: transform 0.28s ease;
`;

export const Panel = styled.div`
  width: 50%;
  height: 100%;
  flex: 0 0 50%;
  box-sizing: border-box;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 14px 16px 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const CategoryButton = styled.button`
  width: 100%;
  min-height: 108px;
  border: 1px solid ${({ $active }) => ($active ? "var(--color-brand)" : "#e2e8f0")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "var(--color-brand-soft)" : "#ffffff")};
  padding: 14px 10px 12px;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 10px;
  text-align: center;
  color: ${({ $active }) => ($active ? "var(--color-brand)" : "#6b7280")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
    color: var(--color-brand);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
`;

export const CategoryIcon = styled.span`
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const CategoryLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: currentColor;
`;

export const FormSection = styled.section`
  display: grid;
  gap: 14px;
`;

export const FormHeading = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: #475569;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #d7dee7;
  border-radius: 10px;
  min-height: 40px;
  padding: 8px 12px;
  font-size: 14px;
  color: #0f172a;
  outline: none;

  &:focus {
    border-color: var(--color-brand);
    box-shadow: 0 0 0 2px rgba(206, 17, 38, 0.14);
  }
`;

export const Select = styled.select`
  width: 100%;
  border: 1px solid #d7dee7;
  border-radius: 10px;
  min-height: 40px;
  padding: 8px 12px;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  outline: none;

  &:focus {
    border-color: var(--color-brand);
    box-shadow: 0 0 0 2px rgba(206, 17, 38, 0.14);
  }
`;
