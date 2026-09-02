"use client";

import { useSelector } from "react-redux";

import RealEstateTab from "@/components/landingPage/realEstateTab";
import DailyRentTab from "@/components/landingPage/dailyRentTab";
import ProjectsTab from "@/components/landingPage/projectsTab";
/** Matches `MAIN_TABS` indices in `Header.tsx`: 0 realEstate, 1 projects, 2 dailyRent */
const HomeTabPanel = () => {
    const headerTabOptions = useSelector(
        (state) => state.headerApiSlice.headerTabOptions,
    );

    const components = {
        0: <RealEstateTab />,
        1: <ProjectsTab />,
        2: <DailyRentTab />,
    };

    return components[headerTabOptions] || null;
};

export default HomeTabPanel;
