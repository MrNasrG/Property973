import styled from "styled-components";

export const FilterEmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2.5rem 1.5rem;
    margin: 1rem 0 0;
    border: 1.5px dashed #d8e0e2;
    border-radius: 10px;
    background: #eef2f3;
    box-sizing: border-box;
    width: 100%;
`;

export const FilterEmptyIconWrap = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-brand-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    flex-shrink: 0;

    svg {
        width: 26px;
        height: 26px;
        color: var(--color-brand);
    }
`;

export const FilterEmptyTitle = styled.h2`
    font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: #111827;
    margin: 0 0 8px;
`;

export const FilterEmptyDescription = styled.p`
    font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 1.25rem;
    max-width: 360px;
    line-height: 1.6;
`;

export const FilterEmptyStrong = styled.strong`
    font-weight: 500;
    color: #111827;
`;

export const FilterEmptySteps = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;

export const FilterEmptyStepPill = styled.span`
    font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 12px;
    padding: 5px 14px;
    border-radius: 999px;
    background: #ffffff;
    border: 0.5px solid #d8e0e2;
    color: #6b7280;
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

export const FilterEmptyStepNum = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    line-height: 1;
`;
