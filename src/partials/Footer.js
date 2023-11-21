import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <span className="footer-title">
            <span style={{ fontSize: "1.5em", margin: "auto", color: "white" }}>
              &copy;
            </span>
            KneeRose
          </span>
          <div className="footer-links">
            <Link className="f-links" to="/home">
              Home
            </Link>
            <Link className="f-links" to="/music">
              Music
            </Link>
            <Link className="f-links" to="/projects">
              Projects
            </Link>
            <Link className="f-links" to="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="footer-socials">
          <a href="https://www.instagram.com/knee_raws/" className="f-social">
            <i className="fa-brands fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/niraz.paudyal/"
            className="f-social"
          >
            <i className="fa-brands fa-facebook"></i>
            <span>facebook</span>
          </a>
          <a href="https://twitter.com/kn33r0s3" className="f-social">
            <i className="fa-brands fa-twitter"></i>
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}
