import React from "react";
import { Link } from "react-router-dom";

export default function Project(props) {
  const { image, title, desc, link, external, status } = props;

  let action;
  if (status === "dev") {
    // No live public link exists yet — showing a fake "Try it now" button
    // for something that isn't deployed would be misleading, so this is a
    // plain badge instead.
    action = (
      <span
        className="kneerose-btn-two project-badge"
        style={{ margin: "5px auto" }}
      >
        In Development
      </span>
    );
  } else if (external) {
    action = (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="kneerose-btn" style={{ margin: "5px auto" }}>
          Try it now!
        </button>
      </a>
    );
  } else {
    action = (
      <Link to={link}>
        <button className="kneerose-btn" style={{ margin: "5px auto" }}>
          Try it now!
        </button>
      </Link>
    );
  }

  return (
    <div className="project">
      <img src={image} className="project-image" alt={title}></img>
      <h1 className="project-title">{title}</h1>
      <p className="project-desc">{desc}</p>
      {action}
    </div>
  );
}
