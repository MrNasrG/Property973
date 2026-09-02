"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useDispatch, useSelector } from "react-redux";

import { CloseIconSvg } from "@/assets";
import PhoneInput from "@/components/phone/PhoneInput";
import {
    OWNER_FORM_SELECT_OPTIONS,
    OWNER_LISTING_KIND_OPTIONS,
    OWNER_PROPERTY_FIELDS as F,
    getOwnerFormDefaultValues,
    getVisibleOwnerPropertyFields,
} from "@/constants/propertyListingFields";
import { getPhoneValidationError, formatMobileNumberForApi } from "@/constants/phoneCountries";
import { FEATURE_CHECKBOXES } from "@/constants/searchFiltersConfig";
import {
    createListingAction,
    updateListingAction,
    uploadListingPhotosAction,
} from "@/redux/listings/action";
import { listingToFormValues } from "@/utils/listingDisplay";
import { getAuthToken } from "@/utils/authToken";
import { useStoredUser } from "@/utils/useStoredUser";
import {
    CheckboxGrid,
    CheckboxItem,
    CheckboxLabelText,
    DropdownButton,
    DropdownChevron,
    DropdownMenu,
    DropdownOption,
    DropdownWrap,
    FieldBlock,
    FieldLabel,
    FormWrap,
    PillButton,
    PillRow,
    StyledInput,
    TwoColumn,
} from "@/components/landingPage/dailyRentTab/popUpModels/filtersPopUp/CategoryFilterForm.style";

import {
    AuthNotice,
    CloseBtn,
    Drawer,
    DrawerHeader,
    DrawerSub,
    DrawerTitle,
    DrawerTitleGroup,
    FileUploadHint,
    FileUploadIcon,
    FileUploadText,
    FileUploadWrap,
    PhotoPreviewBadge,
    PhotoPreviewGrid,
    PhotoPreviewImage,
    PhotoPreviewItem,
    Footer,
    FormBody,
    GhostBtn,
    HiddenToggle,
    KindBadge,
    KindCardTop,
    KindCheckmark,
    KindHint,
    KindTitle,
    ListingKindCard,
    ListingKindGrid,
    Overlay,
    Section,
    SectionDot,
    SectionHeader,
    SectionTitle,
    SubmitBtn,
    ToggleLabel,
    ToggleLabelGroup,
    ToggleSub,
    ToggleThumb,
    ToggleTrack,
    ToggleWrap,
} from "./style";

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

function PillSelect({ label, name, options, control }) {
    return (
        <FieldBlock>
            <FieldLabel>{label}</FieldLabel>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <PillRow>
                        {options.map((option) => {
                            const value = option.value ?? option;
                            const str = String(value);
                            const selected = field.value === str;
                            const display = option.label ?? option;
                            return (
                                <PillButton
                                    key={str}
                                    type="button"
                                    $active={selected}
                                    onClick={() => field.onChange(selected ? null : str)}
                                >
                                    {display}
                                </PillButton>
                            );
                        })}
                    </PillRow>
                )}
            />
        </FieldBlock>
    );
}

function DropdownField({ label, name, options, control, placeholder = "Select", rules }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        const onPointerOutside = (event) => {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("pointerdown", onPointerOutside, true);
        return () => document.removeEventListener("pointerdown", onPointerOutside, true);
    }, []);

    const normalized = options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option,
    );

    return (
        <FieldBlock ref={rootRef}>
            <FieldLabel>{label}</FieldLabel>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState }) => {
                    const selected = normalized.find((item) => item.value === field.value);
                    return (
                        <>
                            <DropdownWrap>
                                <DropdownButton
                                    type="button"
                                    $open={open}
                                    onClick={() => setOpen((prev) => !prev)}
                                    aria-invalid={Boolean(fieldState.error)}
                                >
                                    <span>{selected?.label || placeholder}</span>
                                    <DropdownChevron $open={open}>▾</DropdownChevron>
                                </DropdownButton>
                                {open ? (
                                    <DropdownMenu>
                                        {normalized.map((option) => (
                                            <DropdownOption
                                                key={option.value}
                                                type="button"
                                                $active={field.value === option.value}
                                                onClick={() => {
                                                    field.onChange(option.value);
                                                    setOpen(false);
                                                }}
                                            >
                                                {option.label}
                                            </DropdownOption>
                                        ))}
                                    </DropdownMenu>
                                ) : null}
                            </DropdownWrap>
                            {fieldState.error ? (
                                <span style={{ color: "#dc2626", fontSize: "12px" }}>
                                    {fieldState.error.message}
                                </span>
                            ) : null}
                        </>
                    );
                }}
            />
        </FieldBlock>
    );
}

function ToggleField({ label, hint, name, control }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <ToggleWrap>
                    <ToggleLabelGroup>
                        <ToggleLabel>{label}</ToggleLabel>
                        {hint ? <ToggleSub>{hint}</ToggleSub> : null}
                    </ToggleLabelGroup>
                    <ToggleTrack $on={Boolean(field.value)}>
                        <HiddenToggle
                            type="checkbox"
                            checked={Boolean(field.value)}
                            onChange={(event) => field.onChange(event.target.checked)}
                        />
                        <ToggleThumb $on={Boolean(field.value)} />
                    </ToggleTrack>
                </ToggleWrap>
            )}
        />
    );
}

function SectionHeading({ label }) {
    return (
        <SectionHeader>
            <SectionDot />
            <SectionTitle>{label}</SectionTitle>
        </SectionHeader>
    );
}

/* ─── Main component ─────────────────────────────────────────────────────────── */

const revokePhotoPreviews = (previews) => {
    previews.forEach(({ url }) => {
        if (url) URL.revokeObjectURL(url);
    });
};

export default function AddPropertyForm({
    open,
    onClose,
    contactPhone = "",
    listing = null,
    onSuccess,
}) {
    const t = useTranslations("OwnerPropertyForm");
    const router = useRouter();
    const dispatch = useDispatch();
    const storedUser = useStoredUser();
    const reduxToken = useSelector((state) => state.authSlice?.token);
    const accessToken = getAuthToken(storedUser) ?? reduxToken;
    const isAuthenticated = Boolean(accessToken);
    const isSubmitting = useSelector((state) => state.listingsSlice?.isSubmitting);
    const [isClient, setIsClient] = useState(false);
    const [photoFiles, setPhotoFiles] = useState([]);
    const [photoPreviews, setPhotoPreviews] = useState([]);
    const photoInputRef = useRef(null);
    const photoPreviewsRef = useRef([]);
    const isEditMode = Boolean(listing?.id);

    const clearPhotoSelection = useCallback(() => {
        revokePhotoPreviews(photoPreviewsRef.current);
        photoPreviewsRef.current = [];
        setPhotoFiles([]);
        setPhotoPreviews([]);
        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    }, []);

    const handlePhotoSelection = useCallback((fileList) => {
        const files = Array.from(fileList ?? []).slice(0, 20);
        revokePhotoPreviews(photoPreviewsRef.current);
        const previews = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        photoPreviewsRef.current = previews;
        setPhotoFiles(files);
        setPhotoPreviews(previews);
    }, []);

    const defaultValues = useMemo(
        () =>
            isEditMode
                ? listingToFormValues(listing, contactPhone)
                : getOwnerFormDefaultValues(contactPhone),
        [contactPhone, isEditMode, listing],
    );

    const { control, register, handleSubmit, reset, setValue, watch, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues,
    });

    const purpose = watch(F.purpose);
    const propertyType = watch(F.propertyType);
    const listingKind = watch(F.listingKind);

    const visibleFields = useMemo(
        () => new Set(getVisibleOwnerPropertyFields(purpose, propertyType)),
        [purpose, propertyType],
    );

    useEffect(() => {
        if (!visibleFields.has(F.occupantType)) {
            setValue(F.occupantType, null, { shouldValidate: true });
        }
    }, [setValue, visibleFields]);

    const close = useCallback(() => {
        onClose?.();
    }, [onClose]);

    useEffect(() => {
        setIsClient(true);
        return () => {
            revokePhotoPreviews(photoPreviewsRef.current);
        };
    }, []);

    useEffect(() => {
        if (!open) return undefined;
        reset(
            isEditMode
                ? listingToFormValues(listing, contactPhone)
                : getOwnerFormDefaultValues(contactPhone),
        );
        clearPhotoSelection();
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [clearPhotoSelection, close, contactPhone, isEditMode, listing, open, reset]);

    const applyServerErrors = useCallback(
        (payload) => {
            clearErrors();
            if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
                payload.errors.forEach(({ field, message }) => {
                    if (field && message) {
                        setError(field, { type: "server", message });
                    }
                });
                return;
            }
            if (payload?.message) {
                setError("root", { type: "server", message: payload.message });
            }
        },
        [clearErrors, setError],
    );

    const onSubmit = async (data) => {
        const token = getAuthToken(storedUser) ?? reduxToken;
        if (!token) {
            setError("root", { type: "server", message: t("feedback.loginRequired") });
            router.push("/login");
            return;
        }

        clearErrors();
        const payload = {
            ...data,
            contactPhone: formatMobileNumberForApi(data.contactPhone),
        };

        if (isEditMode) {
            const result = await dispatch(
                updateListingAction({ id: listing.id, formData: payload }),
            );

            if (updateListingAction.rejected.match(result)) {
                applyServerErrors(
                    typeof result.payload === "object" ? result.payload : { message: result.payload },
                );
                return;
            }

            if (photoFiles.length > 0) {
                const uploadResult = await dispatch(
                    uploadListingPhotosAction({ id: listing.id, photoFiles }),
                );
                if (uploadListingPhotosAction.rejected.match(uploadResult)) {
                    applyServerErrors(
                        typeof uploadResult.payload === "object"
                            ? uploadResult.payload
                            : { message: uploadResult.payload },
                    );
                    return;
                }
            }
        } else {
            const result = await dispatch(
                createListingAction({ formData: payload, photoFiles }),
            );

            if (createListingAction.rejected.match(result)) {
                const rejectPayload =
                    typeof result.payload === "object"
                        ? result.payload
                        : { message: result.payload };
                applyServerErrors(rejectPayload);
                if (rejectPayload?.code === "AUTH_REQUIRED") {
                    router.push("/login");
                }
                return;
            }
        }

        onSuccess?.();
        close();
    };

    if (!isClient || !open) {
        return null;
    }

    const content = (
        <Overlay
            role="presentation"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    close();
                }
            }}
        >
            <Drawer
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-property-title"
                onClick={(event) => event.stopPropagation()}
            >
                {/* ── Header ── */}
                <DrawerHeader>
                    <DrawerTitleGroup>
                        <DrawerTitle id="add-property-title">
                            {isEditMode ? t("editTitle") : t("title")}
                        </DrawerTitle>
                        <DrawerSub>{t("subtitle")}</DrawerSub>
                    </DrawerTitleGroup>
                    <CloseBtn type="button" onClick={close} aria-label={t("closeAria")}>
                        <CloseIconSvg />
                    </CloseBtn>
                </DrawerHeader>

                {/* ── Scrollable form body ── */}
                <FormBody>
                    <FormWrap
                        as="form"
                        onSubmit={handleSubmit(onSubmit)}
                        id="owner-add-property-form"
                        style={{ gap: 0, paddingBottom: 0 }}
                    >
                        {!isAuthenticated ? (
                            <AuthNotice role="alert">{t("feedback.loginRequired")}</AuthNotice>
                        ) : null}
                        {errors.root ? (
                            <AuthNotice role="alert">{errors.root.message}</AuthNotice>
                        ) : null}
                        {/* 1 · Listing type */}
                        {/* <Section>
                            <SectionHeading label={t("sections.listingType")} />
                            <ListingKindGrid role="group" aria-label={t("sections.listingType")}>
                                {OWNER_LISTING_KIND_OPTIONS.map((option) => (
                                    <ListingKindCard
                                        key={option.value}
                                        type="button"
                                        $active={listingKind === option.value}
                                        onClick={() => setValue(F.listingKind, option.value)}
                                        aria-pressed={listingKind === option.value}
                                    >
                                        <KindCardTop>
                                            <KindBadge $active={listingKind === option.value}>
                                                {option.badge}
                                            </KindBadge>
                                            <KindCheckmark $active={listingKind === option.value}>
                                                ✓
                                            </KindCheckmark>
                                        </KindCardTop>
                                        <KindTitle $active={listingKind === option.value}>
                                            {option.label}
                                        </KindTitle>
                                        <KindHint>{option.hint}</KindHint>
                                    </ListingKindCard>
                                ))}
                            </ListingKindGrid>
                            <input type="hidden" {...register(F.listingKind)} />
                        </Section> */}

                        {/* 2 · Basic information */}
                        <Section>
                            <SectionHeading label={t("sections.basic")} />
                            <TwoColumn>
                                <DropdownField
                                    label={t("fields.purpose")}
                                    name={F.purpose}
                                    options={OWNER_FORM_SELECT_OPTIONS[F.purpose]}
                                    control={control}
                                />
                                <DropdownField
                                    label={t("fields.propertyType")}
                                    name={F.propertyType}
                                    options={OWNER_FORM_SELECT_OPTIONS[F.propertyType]}
                                    control={control}
                                />
                            </TwoColumn>
                        </Section>

                        {/* 3 · Location */}
                        <Section>
                            <SectionHeading label={t("sections.location")} />
                            <TwoColumn>
                                <DropdownField
                                    label={t("fields.city")}
                                    name={F.city}
                                    options={OWNER_FORM_SELECT_OPTIONS[F.city]}
                                    control={control}
                                />
                                <FieldBlock>
                                    <FieldLabel>{t("fields.district")}</FieldLabel>
                                    <StyledInput
                                        {...register(F.district, { required: true })}
                                        placeholder={t("placeholders.district")}
                                    />
                                </FieldBlock>
                            </TwoColumn>
                            <FieldBlock>
                                <FieldLabel>{t("fields.address")}</FieldLabel>
                                <StyledInput
                                    {...register(F.address)}
                                    placeholder={t("placeholders.address")}
                                />
                            </FieldBlock>
                        </Section>

                        {/* 4 · Pricing */}
                        <Section>
                            <SectionHeading label={t("sections.pricing")} />
                            <TwoColumn>
                                <FieldBlock>
                                    <FieldLabel>{t("fields.price")}</FieldLabel>
                                    <StyledInput
                                        type="number"
                                        min="0"
                                        {...register(F.price, { required: true })}
                                        placeholder={t("placeholders.price")}
                                    />
                                </FieldBlock>
                                {visibleFields.has(F.premiumPeriod) ? (
                                    <DropdownField
                                        label={t("fields.premiumPeriod")}
                                        name={F.premiumPeriod}
                                        options={OWNER_FORM_SELECT_OPTIONS[F.premiumPeriod]}
                                        control={control}
                                    />
                                ) : null}
                            </TwoColumn>
                        </Section>

                        {/* 5 · Property details */}
                        <Section>
                            <SectionHeading label={t("sections.details")} />
                            <TwoColumn>
                                <FieldBlock>
                                    <FieldLabel>{t("fields.area")}</FieldLabel>
                                    <StyledInput
                                        type="number"
                                        min="0"
                                        {...register(F.area, { required: true })}
                                        placeholder={t("placeholders.area")}
                                    />
                                </FieldBlock>
                                {visibleFields.has(F.floor) ? (
                                    <DropdownField
                                        label={t("fields.floor")}
                                        name={F.floor}
                                        options={OWNER_FORM_SELECT_OPTIONS[F.floor]}
                                        control={control}
                                    />
                                ) : null}
                            </TwoColumn>

                            {visibleFields.has(F.bedrooms) ? (
                                <PillSelect
                                    label={t("fields.bedrooms")}
                                    name={F.bedrooms}
                                    options={OWNER_FORM_SELECT_OPTIONS[F.bedrooms]}
                                    control={control}
                                />
                            ) : null}

                            {visibleFields.has(F.livingRooms) ? (
                                <PillSelect
                                    label={t("fields.livingRooms")}
                                    name={F.livingRooms}
                                    options={OWNER_FORM_SELECT_OPTIONS[F.livingRooms]}
                                    control={control}
                                />
                            ) : null}

                            {visibleFields.has(F.wc) ? (
                                <PillSelect
                                    label={t("fields.wc")}
                                    name={F.wc}
                                    options={OWNER_FORM_SELECT_OPTIONS[F.wc]}
                                    control={control}
                                />
                            ) : null}

                            <TwoColumn>
                                {visibleFields.has(F.ageLessThan) ? (
                                    <DropdownField
                                        label={t("fields.ageLessThan")}
                                        name={F.ageLessThan}
                                        options={OWNER_FORM_SELECT_OPTIONS[F.ageLessThan]}
                                        control={control}
                                    />
                                ) : null}
                                {visibleFields.has(F.occupantType) ? (
                                    <DropdownField
                                        label={t("fields.occupantType")}
                                        name={F.occupantType}
                                        options={OWNER_FORM_SELECT_OPTIONS[F.occupantType]}
                                        control={control}
                                        rules={{ required: t("validation.occupantTypeRequired") }}
                                    />
                                ) : null}
                            </TwoColumn>

                            {visibleFields.has(F.streetWidth) || visibleFields.has(F.streetDirection) ? (
                                <TwoColumn>
                                    {visibleFields.has(F.streetWidth) ? (
                                        <FieldBlock>
                                            <FieldLabel>{t("fields.streetWidth")}</FieldLabel>
                                            <StyledInput
                                                type="number"
                                                min="0"
                                                {...register(F.streetWidth)}
                                                placeholder={t("placeholders.streetWidth")}
                                            />
                                        </FieldBlock>
                                    ) : null}
                                    {visibleFields.has(F.streetDirection) ? (
                                        <DropdownField
                                            label={t("fields.streetDirection")}
                                            name={F.streetDirection}
                                            options={OWNER_FORM_SELECT_OPTIONS[F.streetDirection]}
                                            control={control}
                                        />
                                    ) : null}
                                </TwoColumn>
                            ) : null}
                        </Section>

                        {/* 6 · Features */}
                        {FEATURE_CHECKBOXES.some(({ field }) => visibleFields.has(field)) ? (
                            <Section>
                                <SectionHeading label={t("sections.features")} />
                                <CheckboxGrid>
                                    {FEATURE_CHECKBOXES.filter(({ field }) => visibleFields.has(field)).map(
                                        ({ field, label }) => (
                                            <CheckboxItem key={field}>
                                                <input type="checkbox" {...register(field)} />
                                                <CheckboxLabelText>{label}</CheckboxLabelText>
                                            </CheckboxItem>
                                        ),
                                    )}
                                </CheckboxGrid>
                            </Section>
                        ) : null}

                        {/* 7 · Description & photos */}
                        <Section>
                            <SectionHeading label={t("sections.media")} />
                            <FieldBlock>
                                <FieldLabel>{t("fields.description")}</FieldLabel>
                                <StyledInput
                                    as="textarea"
                                    rows={4}
                                    {...register(F.description, { required: true })}
                                    placeholder={t("placeholders.description")}
                                    style={{ resize: "vertical", minHeight: 96 }}
                                />
                            </FieldBlock>
                            <FieldBlock>
                                <FieldLabel>{t("fields.photos")}</FieldLabel>
                                <FileUploadWrap htmlFor="property-photos-input">
                                    <FileUploadIcon>📷</FileUploadIcon>
                                    <FileUploadText>
                                        {photoFiles.length > 0
                                            ? `${photoFiles.length} photo${photoFiles.length !== 1 ? "s" : ""} selected`
                                            : t("hints.photos")}
                                    </FileUploadText>
                                    <FileUploadHint>JPG, PNG, WEBP · Max 20 images</FileUploadHint>
                                    <input
                                        id="property-photos-input"
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/*"
                                        multiple
                                        onChange={(e) => {
                                            handlePhotoSelection(e.target.files);
                                        }}
                                    />
                                </FileUploadWrap>
                                {photoPreviews.length > 0 ? (
                                    <PhotoPreviewGrid aria-label={t("fields.photos")}>
                                        {photoPreviews.map((preview, index) => (
                                            <PhotoPreviewItem key={`${preview.name}-${index}`}>
                                                <PhotoPreviewImage
                                                    src={preview.url}
                                                    alt={preview.name || `Photo ${index + 1}`}
                                                />
                                                {index === 0 ? (
                                                    <PhotoPreviewBadge>{t("hints.coverPhoto")}</PhotoPreviewBadge>
                                                ) : null}
                                            </PhotoPreviewItem>
                                        ))}
                                    </PhotoPreviewGrid>
                                ) : null}
                            </FieldBlock>
                        </Section>

                        {/* 8 · Contact & preferences */}
                        <Section>
                            <SectionHeading label={t("sections.contact")} />
                            <FieldBlock>
                                <FieldLabel>{t("fields.contactPhone")}</FieldLabel>
                                <PhoneInput
                                    name={F.contactPhone}
                                    control={control}
                                    placeholder={t("placeholders.contactPhone")}
                                    variant="light"
                                    rules={{
                                        required: t("validation.contactPhoneRequired"),
                                        validate: (value) => {
                                            const error = getPhoneValidationError(value);
                                            return error || true;
                                        },
                                    }}
                                    aria-invalid={Boolean(errors[F.contactPhone])}
                                />
                                {errors[F.contactPhone] ? (
                                    <span style={{ color: "#dc2626", fontSize: "12px" }}>
                                        {errors[F.contactPhone].message}
                                    </span>
                                ) : null}
                            </FieldBlock>
                            <ToggleField
                                label={t("fields.allowInquiries")}
                                hint="Buyers and tenants can message you directly"
                                name={F.allowInquiries}
                                control={control}
                            />
                            <ToggleField
                                label={t("fields.aqarPartnersAssistance")}
                                hint="Let our agents help you with the listing"
                                name={F.aqarPartnersAssistance}
                                control={control}
                            />
                        </Section>
                    </FormWrap>
                </FormBody>

                {/* ── Sticky footer ── */}
                <Footer>
                    <GhostBtn type="button" onClick={close} disabled={isSubmitting}>
                        {t("actions.cancel")}
                    </GhostBtn>
                    <SubmitBtn
                        type="submit"
                        form="owner-add-property-form"
                        disabled={isSubmitting || !isAuthenticated}
                    >
                        {isSubmitting
                            ? t("actions.submitting")
                            : isEditMode
                              ? t("actions.update")
                              : t("actions.submit")}
                    </SubmitBtn>
                </Footer>
            </Drawer>
        </Overlay>
    );

    return createPortal(content, document.body);
}
