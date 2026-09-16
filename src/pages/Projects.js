import React from "react";
import Project from "../components/projects/Project";
import "../pages/Projects.css";
import Meme from "../resources/projects/meme.png";
import Meal from "../resources/projects/meal.PNG";
import ForgeOSIcon from "../resources/projects/forgeos-icon.svg";
import SanipOpsIcon from "../resources/projects/sanipops-icon.svg";
import NepalPortalIcon from "../resources/projects/nepalportal-icon.svg";

export default function Projects() {
  const projects = [
    {
      image: Meme,
      title: "Meme Generator",
      desc: `Experience the thrill of unpredictable humor with a new, random meme,
        curated just for you!`,
      link: "meme-generator",
    },
    {
      image: Meal,
      title: "Meal Planner",
      desc: `Experience the thrill of unpredictable humor with a new, random meme,
        curated just for you!`,
      link: "meal-planner",
    },
    {
      image: ForgeOSIcon,
      title: "ForgeOS",
      desc: `A self-hosted FastAPI engine for local-first business operations,
        automation, and decision tracking.`,
      status: "dev",
    },
    {
      image: SanipOpsIcon,
      title: "Sanip Ops",
      desc: `Business operations & services infrastructure — the
        customer-facing layer built on top of the ForgeOS engine.`,
      status: "dev",
    },
    {
      image: NepalPortalIcon,
      title: "Nepal Utility Portal",
      desc: `Practical guides and fee calculators for common Nepal business
        registration and compliance tasks.`,
      status: "dev",
    },
  ];
  return (
    <div className="projects">
      {projects.map((project) => {
        return (
          <Project
            key={project.title}
            image={project.image}
            title={project.title}
            desc={project.desc}
            link={project.link}
            external={project.external}
            status={project.status}
          />
        );
      })}
    </div>
  );
}
