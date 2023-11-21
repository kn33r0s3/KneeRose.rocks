import React from "react";
import AuthorImage from "../../resources/author.jpeg";
export default function Bio() {
  return (
    <div>
      <div className="author-intro">
        <img
          className="author-image"
          src={AuthorImage}
          alt="author - Niroj Paudyal"
        ></img>
        <i className="author-slogan">
          "From lines of code to boundless possibilities, I'm a programmer
          driven by passion and fueled by expertise. Join me on a journey where
          imagination meets innovation, as we shape remarkable software tailored
          to exceed expectations."
        </i>
      </div>
      <div className="bio">
        <div className="xd">
          <p className="bio-title">Biography</p>
          <div className="bio-section">
            <h4>Hardworking, patient, self-assured and enthusiastic</h4>
          </div>
        </div>
        <div className="xd" style={{ width: "2%" }}>
          <span className="bio-limiter"></span>
        </div>
        <div className="xd">
          <p className="bio-title">Career Objective</p>
          <div className="bio-section">
            <h4>
              Highly committed, passionate, and qualified professional seeking a
              position as a programmer where I can put my knowledge and
              abilities to use creating, implementing, and maintaining software
              and programs in accordance with customer needs.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
