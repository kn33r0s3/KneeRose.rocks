import React from "react";
import { Link } from "react-router-dom";

export default function Project(props) {
  const { image, title, desc, link } = props;

  return (
    <div className="project">
      <img src={image} className="project-image" alt="meme"></img>
      <h1 className="project-title">{title}</h1>
      <p className="project-desc">{desc}</p>
      <Link to={link}>
        <button className="kneerose-btn" style={{ margin: "5px auto" }}>
          Try it now!
        </button>
      </Link>
    </div>
  );
}
