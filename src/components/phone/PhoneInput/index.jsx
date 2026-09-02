"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import { IconChevronDownSvg } from "@/assets";
import {
  buildFullPhoneNumber,
  DEFAULT_PHONE_COUNTRY_CODE,
  formatMobileNumberForApi,
  getCountryByCode,
  getDefaultPhoneCountry,
  parsePhoneNumber,
  PHONE_COUNTRIES,
} from "@/constants/phoneCountries";

import {
  CountryDialCode,
  CountryList,
  CountryMenu,
  CountryName,
  CountryOption,
  CountryPickerWrap,
  CountrySearch,
  CountryTrigger,
  EmptyCountryResults,
  NationalInput,
  PhoneFieldWrap,
} from "./style";

function CountryPicker({ country, disabled, onChange, variant }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const searchRef = useRef(null);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return PHONE_COUNTRIES;

    return PHONE_COUNTRIES.filter((item) => {
      const haystack = `${item.name} ${item.code} ${item.dialCode}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("pointerdown", onPointerOutside, true);
    return () => document.removeEventListener("pointerdown", onPointerOutside, true);
  }, [open]);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    }
  }, [open]);

  const handleSelect = (nextCountry) => {
    onChange(nextCountry);
    setOpen(false);
    setQuery("");
  };

  return (
    <CountryPickerWrap ref={rootRef}>
      <CountryTrigger
        $variant={variant}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code ${country.dialCode}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {country.dialCode}
        <IconChevronDownSvg aria-hidden />
      </CountryTrigger>

      {open ? (
        <CountryMenu $variant={variant} role="listbox" aria-label="Country codes">
          <CountrySearch
            ref={searchRef}
            $variant={variant}
            value={query}
            placeholder="Search country"
            aria-label="Search country"
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setOpen(true)}
          />
          <CountryList>
            {filteredCountries.length ? (
              filteredCountries.map((item) => (
                <CountryOption
                  key={item.code}
                  $active={item.code === country.code}
                  $variant={variant}
                >
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(item)}
                  >
                    <CountryName>{item.name}</CountryName>
                    <CountryDialCode>{item.dialCode}</CountryDialCode>
                  </button>
                </CountryOption>
              ))
            ) : (
              <EmptyCountryResults $variant={variant}>No countries found</EmptyCountryResults>
            )}
          </CountryList>
        </CountryMenu>
      ) : null}
    </CountryPickerWrap>
  );
}

CountryPicker.propTypes = {
  country: PropTypes.shape({
    code: PropTypes.string.isRequired,
    dialCode: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["dark", "light"]).isRequired,
};

function PhoneInputField({
  field,
  defaultCountryCode,
  disabled,
  id,
  placeholder,
  variant,
  ariaInvalid,
}) {
  const fallbackCountry =
    getCountryByCode(defaultCountryCode) ?? getDefaultPhoneCountry();

  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
    const parsed = parsePhoneNumber(field.value, defaultCountryCode);
    return parsed?.country?.code ?? defaultCountryCode;
  });

  const parsed = field.value
    ? parsePhoneNumber(field.value, selectedCountryCode)
    : null;

  const country =
    parsed?.country ??
    getCountryByCode(selectedCountryCode) ??
    fallbackCountry;

  const nationalNumber = parsed?.nationalNumber ?? "";

  const updateValue = (nextCountry, nextNationalNumber) => {
    const digits = String(nextNationalNumber).replace(/\D/g, "").slice(0, nextCountry.maxLength);
    field.onChange(buildFullPhoneNumber(nextCountry, digits));
  };

  const handleCountryChange = (nextCountry) => {
    setSelectedCountryCode(nextCountry.code);
    updateValue(nextCountry, nationalNumber);
  };

  const handleBlur = () => {
    const formatted = formatMobileNumberForApi(field.value, selectedCountryCode);
    if (formatted && formatted !== field.value) {
      field.onChange(formatted);
    }
    field.onBlur();
  };

  return (
    <PhoneFieldWrap $variant={variant}>
      <CountryPicker
        country={country}
        disabled={disabled}
        variant={variant}
        onChange={handleCountryChange}
      />
      <NationalInput
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder={placeholder}
        disabled={disabled}
        value={nationalNumber}
        aria-invalid={ariaInvalid}
        onChange={(event) => updateValue(country, event.target.value)}
        onBlur={handleBlur}
      />
    </PhoneFieldWrap>
  );
}

PhoneInputField.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  defaultCountryCode: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(["dark", "light"]).isRequired,
  ariaInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default function PhoneInput({
  name,
  control,
  defaultCountryCode = DEFAULT_PHONE_COUNTRY_CODE,
  disabled = false,
  id,
  placeholder = "Mobile number",
  rules,
  variant = "dark",
  "aria-invalid": ariaInvalid,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <PhoneInputField
          field={field}
          defaultCountryCode={defaultCountryCode}
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          variant={variant}
          ariaInvalid={ariaInvalid}
        />
      )}
    />
  );
}

PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultCountryCode: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  variant: PropTypes.oneOf(["dark", "light"]),
  "aria-invalid": PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
