"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CloseIconSvg } from "@/assets";
import { getListingCardTitle } from "@/utils/listingDisplay";
import {
  CancelBtn,
  CloseBtn,
  DeleteBtn,
  Message,
  Overlay,
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  PropertyName,
  Warning,
} from "./style";

export default function DeletePropertyModal({
  open,
  listing,
  onClose,
  onConfirm,
  isDeleting = false,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !isDeleting) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDeleting, onClose, open]);

  const handleConfirm = useCallback(async () => {
    await onConfirm?.();
  }, [onConfirm]);

  if (!isClient || !open || !listing) {
    return null;
  }

  const propertyTitle = getListingCardTitle(listing);

  return createPortal(
    <Overlay
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose?.();
        }
      }}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-property-title"
        onClick={(event) => event.stopPropagation()}
      >
        <PanelHeader>
          <PanelTitle id="delete-property-title">Delete property?</PanelTitle>
          <CloseBtn
            type="button"
            aria-label="Close delete confirmation"
            disabled={isDeleting}
            onClick={onClose}
          >
            <CloseIconSvg aria-hidden />
          </CloseBtn>
        </PanelHeader>

        <PanelBody>
          <Message>You are about to permanently delete this listing:</Message>
          <PropertyName>{propertyTitle}</PropertyName>
          <Warning>This action cannot be undone.</Warning>
        </PanelBody>

        <PanelFooter>
          <CancelBtn type="button" disabled={isDeleting} onClick={onClose}>
            Cancel
          </CancelBtn>
          <DeleteBtn type="button" disabled={isDeleting} onClick={handleConfirm}>
            {isDeleting ? "Deleting…" : "Delete property"}
          </DeleteBtn>
        </PanelFooter>
      </Panel>
    </Overlay>,
    document.body,
  );
}
