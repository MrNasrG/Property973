"use client";

import { decodeData, encodeData } from "./jwt";
import { notifyAuthSessionUpdated } from "./authEvents";

export const saveData = (key, value) => {
  if (window) {
    try {
      const encryptedData = encodeData(value);
      window.localStorage.setItem(key, encryptedData);
      if (key === "user") {
        notifyAuthSessionUpdated();
      }
    } catch (error) {
      return "";
    }
  }
};

export const getData = (key) => {
  if (typeof window !== "undefined") {
    try {
      const localEncryptedData = window.localStorage.getItem(key);
      if (localEncryptedData) {
        return decodeData(localEncryptedData);
      }
    } catch (error) {
      return "";
    }
  }
};

export const removeData = (key) => {
  if (window) {
    try {
      window.localStorage.removeItem(key);
      if (key === "user") {
        notifyAuthSessionUpdated();
      }
    } catch (error) {
      return "";
    }
  }
};

export const updateData = (key, value) => {
  if (window) {
    try {
      removeData(key);
      saveData(key, value);
    } catch (error) {
      return "";
    }
  }
};

export const removeAll = () => {
  if (window) {
    try {
      window.localStorage.clear();
    } catch (error) {
      return "";
    }
  }
};

export const setOtherUserId = (key, value) => {
  if (typeof window !== "undefined") {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error("Cannot store 'undefined' value in localStorage");
    }
  }
};

export const getOtherUserId = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeOtherUserId = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// export const updateOtherUserId = (key, newValue) => {
//   if (typeof window !== "undefined") {
//     const existingItem = localStorage.getItem(key);

//     if (existingItem !== null) {
//       if (newValue !== undefined) {
//         localStorage.setItem(key, JSON.stringify(newValue));
//       } else {
//         console.error("Cannot update to 'undefined' value.");
//       }
//     } else {
//       console.error(Key "${key}" does not exist in localStorage.);
//     }
//   }
// };
