import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt, faUniversity, faStore } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../assets/images/exam_rec.png"

import "./Navigation.scss"

export default function Navigation() {
  return (
    <div className="navigation">
      <img src={Logo} alt="logo"></img>
      <div className="icons">
        <Link to="/">
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> 
        </Link>
        <Link to="/preguntas">
            <FontAwesomeIcon icon={faUniversity}></FontAwesomeIcon> 
        </Link>
        <Link to="/marketplace">
            <FontAwesomeIcon icon={faStore}></FontAwesomeIcon> 
        </Link>
        <Link to="/">
            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> 
        </Link>
      </div>      
    </div>
  );
}
