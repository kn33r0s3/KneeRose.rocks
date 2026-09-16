import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Image from "../resources/logoKR.png";

function Nav() {
  const toggleRef = useRef();
  function toggle() {
    toggleRef.current.classList.toggle("nav-right-collapse");
  }
  function discard() {
    toggleRef.current.classList.remove("nav-right-collapse");
  }
  return (
    <nav className="nav">
      <Link className="nav-left" to="/home">
        <img className="nav-logo" src={Image} alt="logoKR"></img>
        <span className="nav-title">KneeRose</span>
      </Link>
      <div className="toggle-bar" onClick={toggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className="nav-right" ref={toggleRef}>
        <Link onClick={discard} className="links" to="/home">
          Home
        </Link>
        <Link onClick={discard} className="links" to="/music">
          Music
        </Link>
        <Link onClick={discard} className="links" to="/projects">
          Projects
        </Link>
        <Link onClick={discard} className="links" to="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
