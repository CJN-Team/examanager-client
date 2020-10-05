import React from "react";
import Usuarios from "../Usuarios/Usuarios";
import BasicLayout from "../../layout/basicLayout/BasicLayout";
import { Container } from "react-bootstrap";
import "../Usuarios/Usuarios.scss";

export default function Estudiantes(props) {
  const { setRefreshLogin } = props;
  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin}>
        <Container className="usuarios-cont" fluid>
          <Usuarios userType="Estudiante" />
        </Container>
      </BasicLayout>
    </div>
  );
}
