import {
    AgencyTitle,
    AgentAvatar,
    AgentName,
    AgentRole,
    AgentRow,
    AgentVerified,
    CloseButton,
    ContactCard,
    ContactLabel,
    ContactPhone,
    PopupBody,
    PopupContainer,
    PopupHeader,
    PopupHint,
    PopupOverlay,
} from "./style";


const CallNowPopup = ({
    open,
    onClose,
    agentName,
    agentInitials,
    agentPhone,
    agencyName = "Property 973",
}) => {
    if (!open) return null;

    const resolvedAgentName = agentName || "Verified Agent";
    const resolvedInitials = agentInitials || "VA";
    const resolvedPhone = agentPhone || "+91 98765 43210";
    const safePhone = String(resolvedPhone).replace(/\s+/g, "");

    return (
        <PopupOverlay role="presentation" onClick={onClose}>
            <PopupContainer
                role="dialog"
                aria-modal="true"
                aria-label="Call agent popup"
                onClick={(event) => event.stopPropagation()}
            >
                <PopupHeader>
                    <AgencyTitle>{agencyName}</AgencyTitle>
                    <CloseButton type="button" onClick={onClose} aria-label="Close popup">
                        ×
                    </CloseButton>
                </PopupHeader>
                <PopupBody>
                    <PopupHint>
                        Interested in this property? Connect directly with our verified agent.
                    </PopupHint>
                    <AgentRow>
                        <AgentAvatar aria-hidden>{resolvedInitials}</AgentAvatar>
                        <div>
                            <AgentName>{resolvedAgentName}</AgentName>
                            <AgentRole>Senior Property Consultant</AgentRole>
                            <AgentVerified>Verified Agent</AgentVerified>
                        </div>
                    </AgentRow>
                    <ContactCard>
                        <ContactLabel>Contact</ContactLabel>
                        <ContactPhone>{resolvedPhone}</ContactPhone>
                    </ContactCard>
                </PopupBody>
            </PopupContainer>
        </PopupOverlay >
    );
};

export default CallNowPopup;