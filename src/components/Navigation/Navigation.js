import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/images/exam_rec.png";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import {
  faHome,
  faSignOutAlt,
  faUniversity,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

import "./Navigation.scss";

export default function Navigation(props) {
  const user = useAuth();

  const logout = () => {
    logoutApi();
    props.setRefreshLogin(true);
  };

  return (
    <div className="navigation">
      <img src={Logo} alt="logo"></img>
      <div className="icons">
        <Link to="/">
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
        </Link>
        {user.profile !== "Estudiante" && (
          <Link to="/preguntas">
            <FontAwesomeIcon icon={faUniversity}></FontAwesomeIcon>
          </Link>
        )}
        {user.profile === "Administrador" && (
          <Link to="/marketplace">
            <FontAwesomeIcon icon={faStore}></FontAwesomeIcon>
          </Link>
        )}

        <Link to="" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
        </Link>
      </div>
    </div>
  );
}
