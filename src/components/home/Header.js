import React from "react";
import HeaderImage from "../../resources/image-gold.jpg";
import Resume from "../../resources/resume.pdf";
import Bio from "./Bio";
export default function Header() {
  return (
    <div className="home-header">
      <div className="over-image-container">
        <img className="header-image" src={HeaderImage} alt="home header"></img>
        <div className="over-image">
          <h1 className="header-title">Niroj Paudyal</h1>
          <p className="header-quote"></p>
          <div className="buttons">
            <a href="https://github.com/kn33r0s3">
              <button className="kneerose-btn">
                GitHub{" "}
                <i
                  className="fa-brands fa-github"
                  style={{ color: "black", fontSize: "1em" }}
                ></i>
              </button>
            </a>
            <a href={Resume}>
              <button className="kneerose-btn-two">
                Resume{" "}
                <i
                  className="fa-solid fa-cloud-arrow-down"
                  style={{ color: "black", fontSize: "1em" }}
                ></i>
              </button>
            </a>
          </div>
        </div>
      </div>
      <Bio />
    </div>
  );
}
