"use client";

import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export const showOtpSuccessAlert = (otp) =>
  Swal.fire({
    title: "OTP sent",
    text: `Your OTP is: ${otp}, save this otp it will be used to verify your account`,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "var(--color-brand)",
  });

const OtpSuccessAlert = ({ otp, onConfirm }) => {
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (otp == null || hasShownRef.current) return;

    hasShownRef.current = true;

    showOtpSuccessAlert(otp).then(() => {
      onConfirm?.();
    });
  }, [otp, onConfirm]);

  return null;
};

export default OtpSuccessAlert;
