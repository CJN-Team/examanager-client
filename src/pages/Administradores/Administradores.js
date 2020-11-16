import React from "react";
import Usuarios from "../Usuarios/Usuarios";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { Container } from "react-bootstrap";
import "../Usuarios/Usuarios.scss";

export default function Administradores(props) {
  const { setRefreshLogin } = props;
  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="administradores">
        <Container className="usuarios-cont" fluid>
          <Usuarios userType="Administrador" />
        </Container>
      </BasicLayout>
    </div>
  );
}
