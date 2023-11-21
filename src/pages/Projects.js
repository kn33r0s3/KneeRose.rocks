import React from "react";
import Project from "../components/projects/Project";
import "../pages/Projects.css";
import Meme from "../resources/projects/meme.png";
import Meal from "../resources/projects/meal.PNG";

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
  ];
  return (
    <div className="projects">
      {projects.map((project) => {
        return (
          <Project
            image={project.image}
            title={project.title}
            desc={project.desc}
            link={project.link}
          />
        );
      })}
    </div>
  );
}
