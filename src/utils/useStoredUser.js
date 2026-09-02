"use client";

import { useSyncExternalStore } from "react";
import { AUTH_SESSION_EVENT } from "@/utils/authEvents";
import { getData } from "@/utils/storage";

/** Cached snapshot — useSyncExternalStore requires stable references between reads. */
let cachedRaw = null;
let cachedUser = null;
let cacheInitialized = false;

const invalidateUserCache = () => {
  cacheInitialized = false;
  cachedRaw = null;
  cachedUser = null;
};

const readStoredUser = () => {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem("user");

  if (cacheInitialized && raw === cachedRaw) {
    return cachedUser;
  }

  cachedRaw = raw;
  cacheInitialized = true;

  if (!raw) {
    cachedUser = null;
    return cachedUser;
  }

  try {
    const user = getData("user");
    cachedUser = user && typeof user === "object" ? user : null;
  } catch {
    cachedUser = null;
  }

  return cachedUser;
};

const subscribeNoop = () => () => {};

const subscribeAuthSession = (callback) => {
  if (typeof window === "undefined") return subscribeNoop();

  const onStoreChange = () => {
    invalidateUserCache();
    callback();
  };

  window.addEventListener(AUTH_SESSION_EVENT, onStoreChange);

  return () => {
    window.removeEventListener(AUTH_SESSION_EVENT, onStoreChange);
  };
};

const getStoredUserServer = () => null;

/**
 * Reads the persisted user from localStorage in a hydration-safe way.
 * Re-renders when auth session is updated (login / OTP verify).
 */
export const useStoredUser = () =>
  useSyncExternalStore(subscribeAuthSession, readStoredUser, getStoredUserServer);

export { AUTH_SESSION_EVENT };
