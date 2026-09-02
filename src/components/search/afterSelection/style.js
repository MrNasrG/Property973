import styled, { css, keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FiltersFormShell = styled.div`
    display: grid;
    gap: 14px;
    padding-top: 8px;
    animation: ${fadeInUp} 0.22s ease-out;
`;

export const AnimatedField = styled.div`
    animation: ${fadeInUp} 0.2s ease-out;
`;

export const FiltersHint = styled.p`
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text, #475569);
    padding: 8px 0 4px;
`;

const commonInput = css`
    width: 100%;
    min-height: 40px;
    border: 1px solid var(--color-border, #d7dee7);
    border-radius: 10px;
    background: var(--color-input-bg, #ffffff);
    color: var(--color-text, #0f172a);
    font-size: 14px;
    padding: 8px 12px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    box-sizing: border-box;
    font-family: inherit;

    &:focus {
        border-color: var(--color-primary, var(--color-brand));
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary, var(--color-brand)) 20%, transparent);
    }
`;

export const StyledTextArea = styled.textarea`
    ${commonInput}
    min-height: 96px;
    resize: vertical;
`;

export const FieldErrorText = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: #dc2626;
`;

export const ToggleRow = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 44px;
    padding: 8px 12px;
    border: 1px solid var(--color-border, #d7dee7);
    border-radius: 10px;
    background: var(--color-input-bg, #ffffff);
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:has(input:focus-visible) {
        border-color: var(--color-primary, var(--color-brand));
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary, var(--color-brand)) 20%, transparent);
    }

    &:hover {
        border-color: var(--color-primary, var(--color-brand));
    }
`;

export const ToggleLabelText = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text, #334155);
`;

export const SwitchTrack = styled.span`
    position: relative;
    flex-shrink: 0;
    width: 46px;
    height: 28px;
    border-radius: 999px;
    background: ${({ $on }) =>
        $on ? "var(--color-primary, var(--color-brand))" : "#cbd5e1"};
    transition: background 0.2s ease;
`;

export const SwitchThumb = styled.span`
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? "22px" : "3px")};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);
    transition: left 0.2s ease;
`;

export const SwitchInput = styled.input`
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
`;

/** Search filters: 3-column feature checkbox grid (matches listing search mock). */
export const FeaturesCheckboxGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px 12px;
    width: 100%;

    @media (max-width: 520px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }
`;

/** White bordered card wrapping checkbox + label. */
export const FeaturesCheckboxCard = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
    min-width: 0;
    min-height: 42px;
    padding: 8px 12px;
    border: 1px solid var(--color-border, #e3e8ea);
    border-radius: 8px;
    background: #ffffff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-muted, #475569);
    cursor: pointer;
    transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        border-color: color-mix(
            in srgb,
            var(--color-primary, var(--color-brand)) 42%,
            var(--color-border, #e3e8ea)
        );
        background: color-mix(in srgb, var(--color-primary, var(--color-brand)) 5%, #ffffff);
    }

    &:has(input:focus-visible) {
        outline: none;
        box-shadow: 0 0 0 2px
            color-mix(in srgb, var(--color-primary, var(--color-brand)) 22%, transparent);
    }

    &:has(input:checked) {
        border-color: var(--color-primary, var(--color-brand));
        background: color-mix(in srgb, var(--color-primary, var(--color-brand)) 10%, #ffffff);
        color: var(--color-text, #334155);
    }

    input {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        margin: 0;
        accent-color: var(--color-primary, var(--color-brand));
        cursor: pointer;
    }
`;

export const FeaturesCheckboxLabelText = styled.span`
    flex: 1;
    min-width: 0;
    line-height: 1.35;
`;
