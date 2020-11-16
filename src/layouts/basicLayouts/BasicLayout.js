import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "../../components/LeftMenu/LeftMenu.js";
import Navigation from "../../components/Navigation/Navigation.js";

import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { children, setRefreshLogin, ruta } = props;

  return (
    <Container className="basic-layout">
      <Row className="basic-layout__navigation">
        <Navigation setRefreshLogin={setRefreshLogin} ruta={ruta}></Navigation>
      </Row>
      <Row className="basic-layout__body">
        <Col className="basic-layout__menu">
          <LeftMenu ruta={ruta}></LeftMenu>
        </Col>
        <Col className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
