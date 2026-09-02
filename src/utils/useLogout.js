"use client";

import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "@/i18n/navigation";
import { ROOT } from "@/routes/path";
import { setHeaderTabOptions } from "@/redux/header/slice";
import { setToken, setUser } from "@/redux/auth/slice";
import { setUserData } from "@/redux/dashboard/slice";
import { clearAuthSessionCookie } from "@/utils/authCookie";
import { removeData } from "@/utils/storage";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useCallback(() => {
    removeData("user");
    clearAuthSessionCookie();
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setUserData(null));
    dispatch(setHeaderTabOptions(0));
    router.replace(ROOT);
  }, [dispatch, router]);
};
