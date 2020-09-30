import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "../../components/LeftMenu/LeftMenu.js";
import Navigation from "../../components/Navigation/Navigation.js";

import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { children } = props;

  return (
    <Container className="basic-layout">
      <Row className="basic-layout__navigation">
        <Navigation></Navigation>
      </Row>
      <Row className="basic-layout__body">
        <Col xs={3} className="basic-layout__menu">
          <LeftMenu></LeftMenu>
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
