"use client";

import { projectCardDemoListings } from "@/constants/options";

import ProjectsFilterOption from "./projectsFilterOption";
import ProjectTabCardComponent from "./projectTabCardComponent";
import { CardGrid, CardSection } from "./projectTabCardComponent/style";

const ProjectsTab = () => {
    return (
        <>
            <ProjectsFilterOption />
            <CardSection>
                <CardGrid>
                    {projectCardDemoListings.map((listing) => (
                        <ProjectTabCardComponent key={listing.id} listing={listing} />
                    ))}
                </CardGrid>
            </CardSection>
        </>
    );
};

export default ProjectsTab;