import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { withRouter } from "react-router-dom";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { getUserAPI } from "../../api/usuarios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { API_HOST } from "../../utils/constants";
import { capitalize } from "../../utils/strings";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";

import "./Profile.scss";

export default withRouter(Profile);

function Profile(props) {
  const { setRefreshLogin, match } = props;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = match["params"]["id"];
  const pictureURL = `${API_HOST}/photo?id=${id}`;
  const user = useAuth();

  useEffect(() => {
    async function fetchUser() {
      await getUserAPI(id).then((response) => {
        setUserData(response);
      });
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (user.profile !== "Administrador" && user.id !== id) {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="perfil">
        <h4>No tienes permiso.</h4>
      </BasicLayout>
    );
  }

  if (loading) {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="perfil">
        <Spinner animation="border" />
      </BasicLayout>
    );
  }

  if (userData === null || userData.code === 404) {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="perfil">
        <h5>No se ha encontrado este perfil.</h5>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin} ruta="perfil">
      <Container className="profile">
        <Row>
          <img
            src={pictureURL}
            alt="fotoPerfil"
            onError={(e) => {
              e.target.src = DefaultAvatar;
            }}
          />
        </Row>
        <Row>
          <h4>{userData.profile}</h4>
        </Row>
        <Row className="row-info">
          <div className="left">
            <Col>
              <Row>Nombre completo:</Row>
              <Row>Documento:</Row>
              <Row>Correo:</Row>
              <Row>Fecha de nacimiento:</Row>
            </Col>
          </div>

          <Col className="right">
            <Row>{`${capitalize(userData.name)} ${capitalize(
              userData.lastName
            )}`}</Row>
            <Row>
              {userData.idType}. {userData.id}
            </Row>
            <Row>{userData.email}</Row>
            <Row>
              {new Date(userData.birthDate).toLocaleDateString("es-ES")}
            </Row>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
}
