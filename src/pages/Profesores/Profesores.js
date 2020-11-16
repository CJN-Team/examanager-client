import React from "react";
import Usuarios from "../Usuarios/Usuarios";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { Container } from "react-bootstrap";
import "../Usuarios/Usuarios.scss";

export default function Profesores(props) {
  const { setRefreshLogin } = props;
  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="profesores">
        <Container className="usuarios-cont" fluid>
          <Usuarios userType="Profesor" />
        </Container>
      </BasicLayout>
    </div>
  );
}
