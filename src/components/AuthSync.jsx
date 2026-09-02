"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@/redux/auth/slice";
import { getData, saveData } from "@/utils/storage";
import { getAuthToken } from "@/utils/authToken";
import { hasAuthSession } from "@/utils/authSession";
import {
  clearAuthSessionCookie,
  setAuthSessionCookie,
} from "@/utils/authCookie";

const hasValidSession = (user) => hasAuthSession(user);

const AuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let user = getData("user");
    const token = getAuthToken(user);

    if (token && user && !user.token) {
      user = { ...user, token, accessToken: user.accessToken ?? token };
      saveData("user", user);
    }

    if (hasValidSession(user)) {
      setAuthSessionCookie();
      dispatch(setUser(user));
      dispatch(setToken(getAuthToken(user)));
    } else {
      clearAuthSessionCookie();
      dispatch(setUser(null));
      dispatch(setToken(null));
    }
  }, [dispatch]);

  return null;
};

export default AuthSync;
