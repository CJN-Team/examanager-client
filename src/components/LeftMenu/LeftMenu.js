import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faBuilding,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";
import useAuth from "../../hooks/useAuth";

import "./LeftMenu.scss";

export default function LeftMenu() {
  const user = useAuth();
  const pictureURL = `${API_HOST}/photo?id=${user.id}`;

  console.log(user);

  return (
    <div className="left-menu">
      <Row className="perfil">
        <Col className="col1">
          <img
            src={pictureURL}
            alt="fotoPerfil"
            onError={(e) => {
              e.target.src = DefaultAvatar;
            }}
          />
        </Col>
        <Col className="col2">
          <div>
            <Link to={"/" + user?.id}>{user.name}</Link>
            <h6>{user.lastName}</h6>
          </div>
        </Col>
      </Row>
      <Item
        className="item"
        name="asignaturas"
        icon={faTasks}
        value="Asignaturas"
      ></Item>
      <Item
        className="item"
        name="departamentos"
        icon={faBuilding}
        value="Departamentos"
      ></Item>
      {user.profile === "Administrador" && (
        <>
          <Item
            className="item"
            name="administradores"
            icon={faUser}
            value="Administradores"
          ></Item>
          <Item
            className="item"
            name="profesores"
            icon={faUser}
            value="Profesores"
          ></Item>
          <Item
            className="item"
            name="estudiantes"
            icon={faUser}
            value="Estudiantes"
          ></Item>
        </>
      )}

      <Item className="item" name="grupos" icon={faUsers} value="Grupos"></Item>
    </div>
  );
}

function Item(props) {
  const { name, icon, value } = props;
  return (
    <Link to={"/" + name}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      {value}
    </Link>
  );
}
