"use client";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  ErrorText,
  Label,
} from "@/app/[locale]/(login)/login/style";
import {
  OtpDigitInput,
  OtpRow,
} from "@/app/[locale]/(login)/otp/style";
import {
  Spinner,
  VerifyButton,
} from "@/components/auth/forgotPassword/style";
import { useRouter } from "@/i18n/navigation";
import {
  verifyForgotOtpAction,
  verifyOtpAction,
} from "@/redux/auth/action";
import { formatMobileNumberForApi } from "@/constants/phoneCountries";
import { setResetToken } from "@/redux/auth/slice";
import { PATH_AUTH } from "@/routes/path";

const OTP_LENGTH = 6;

const OtpForm = ({
  forgotPassword = false,
  mobileNumber = "",
  labelText = "Verification code",
  submitLabel = "Verify OTP",
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRefs = useRef([]);

  const [digits, setDigits] = useState(() => Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const focusDigit = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index, event) => {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      focusDigit(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      focusDigit(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) {
      focusDigit(index - 1);
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusDigit(index + 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    setDigits((prev) => {
      const next = [...prev];
      pasted.split("").forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });
    setError("");
    focusDigit(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otp = digits.join("");

    if (otp.length !== OTP_LENGTH) {
      setError(`Enter all ${OTP_LENGTH} digits`);
      return;
    }

    setIsVerifying(true);
    const formattedMobile = formatMobileNumberForApi(mobileNumber);

    try {
      if (forgotPassword) {
        const response = await dispatch(
          verifyForgotOtpAction({ otp, mobileNumber: formattedMobile }),
        ).unwrap();

        const token =
          response?.resetToken ?? response?.data?.resetToken ?? null;

        if (!token) {
          console.error(
            "Verify OTP response missing resetToken:",
            response,
          );
          setError("Reset token missing from server. Please try again.");
          toast.error("Reset token missing from server. Please try again.");
          return;
        }

        dispatch(setResetToken(token));
        setError("");
        router.push(PATH_AUTH.resetPassword);
      } else {
        const response = await dispatch(
          verifyOtpAction({ otp, mobileNumber: formattedMobile }),
        ).unwrap();

        if (response?.success === true) {
          setError("");
          router.push(PATH_AUTH.myProfile);
        }
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.error("Verify OTP error:", err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Label htmlFor="otp-0">{labelText}</Label>
      <OtpRow>
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <OtpDigitInput
            key={index}
            id={index === 0 ? "otp-0" : undefined}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            value={digits[index]}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            aria-invalid={Boolean(error)}
          />
        ))}
      </OtpRow>
      {error && <ErrorText>{error}</ErrorText>}

      <VerifyButton type="submit" disabled={isVerifying}>
        {isVerifying ? (
          <>
            <Spinner aria-hidden /> Verifying...
          </>
        ) : (
          submitLabel
        )}
      </VerifyButton>
    </form>
  );
};

export default OtpForm;
