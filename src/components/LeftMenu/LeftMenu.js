import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "../../utils/strings";
import {
  faUsers,
  faUser,
  faBuilding,
  faTasks,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";
import useAuth from "../../hooks/useAuth";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const ruta = props.ruta;
  const user = useAuth();
  const pictureURL = `${API_HOST}/photo?id=${user.id}`;

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
            <Link to={"/perfil/" + user?.id} class="non">
              {capitalize(user.name)}
            </Link>
            <h6>{capitalize(user.lastName)}</h6>
            {user.profile}
          </div>
        </Col>
      </Row>
      <Item
        className="item"
        name="asignaturas"
        icon={faTasks}
        value="Asignaturas"
        ruta={ruta}
      ></Item>

      {user.profile === "Administrador" && (
        <>
          <Item
            className="item"
            name="departamentos"
            icon={faBuilding}
            value="Departamentos"
            ruta={ruta}
          ></Item>
          <Item
            className="item"
            name="administradores"
            icon={faUser}
            value="Administradores"
            ruta={ruta}
          ></Item>
          <Item
            className="item"
            name="profesores"
            icon={faUser}
            value="Profesores"
            ruta={ruta}
          ></Item>
          <Item
            className="item"
            name="estudiantes"
            icon={faUser}
            value="Estudiantes"
            ruta={ruta}
          ></Item>
        </>
      )}

      <Item
        className="item"
        name="grupos"
        icon={faUsers}
        value="Grupos"
        ruta={ruta}
      ></Item>
      {user.profile === "Estudiante" && (
        <Item
          className="item"
          name="notas"
          icon={faFileAlt}
          value="Mis notas"
          ruta={ruta}
        ></Item>
      )}
    </div>
  );
}

function Item(props) {
  const { name, icon, value, ruta } = props;

  const active = (pageName) => {
    if (pageName == ruta) {
      return "actualPage";
    } else {
      return "non";
    }
  };

  return (
    <Link to={"/" + name} class={active(name)}>
      <FontAwesomeIcon icon={icon} className="icon"></FontAwesomeIcon>
      {value}
    </Link>
  );
}
