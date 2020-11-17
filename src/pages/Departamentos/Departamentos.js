import React from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import ListDepts from "../../components/ListDepts/ListDepts";
import { Container, Col } from "react-bootstrap";

import "./Departamentos.scss";

export default function Departamentos(props) {
  const { setRefreshLogin } = props;
  document.title = "Departamentos";

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin} ruta="departamentos">
      <Container className="departamentos-cont" fluid>
        <Col className="departamentos">
          <div className="departamentos__body">
            <h4>Departamentos</h4>
            <ListDepts />
          </div>
        </Col>
      </Container>
    </BasicLayout>
  );
}
