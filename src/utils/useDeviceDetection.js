/* eslint-disable consistent-return */
"use client";
import { useState, useEffect, useRef } from "react";

export const useDeviceDetect = () => {
    const checkForDevice = (isDevice) => {
        if (typeof window !== "undefined") {
            const windowWidth = window.innerWidth;
            if (isDevice === "mobile") {
                return windowWidth < 768;
            } else if (isDevice === "tablet") {
                return windowWidth >= 768 && windowWidth <= 1024;
            }
        }
        return false;
    };

    const [isMobile, setIsMobile] = useState(checkForDevice("mobile"));
    const [isTablet, setIsTablet] = useState(checkForDevice("tablet"));

    const isMobileRef = useRef(isMobile);
    const isTabletRef = useRef(isTablet);

    useEffect(() => {
        isMobileRef.current = isMobile;
        isTabletRef.current = isTablet;
    }, [isMobile, isTablet]);

    useEffect(() => {
        const updateDeviceType = () => {
            const checkIsMobile = checkForDevice("mobile");
            const checkIsTablet = checkForDevice("tablet");

            if (checkIsMobile !== isMobileRef.current) {
                setIsMobile(checkIsMobile);
            } else if (checkIsTablet !== isTablet.current) {
                setIsTablet(checkIsTablet);
            }
        };

        updateDeviceType();

        if (typeof window !== "undefined") {
            window.addEventListener("resize", updateDeviceType);
            window.addEventListener("orientationchange", updateDeviceType);
            window.addEventListener("load", updateDeviceType);
            window.addEventListener("reload", updateDeviceType);

            return () => {
                window.removeEventListener("resize", updateDeviceType);
                window.removeEventListener("orientationchange", updateDeviceType);
                window.removeEventListener("load", updateDeviceType);
                window.removeEventListener("reload", updateDeviceType);
            };
        }
    }, [isMobile, isTablet]);

    return {
        isMobile,
        isTablet,
    };
};
