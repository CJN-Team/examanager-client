import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function ListAsig(props) {
  const { asigList } = props;
  var asignaturas = Object.entries(asigList);

  if (asigList == null || asigList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <div>
      <Container fluid>
        <ul>
          {asignaturas.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{`${x[0]}`}</h2>
                  </Col>
                  <Col>
                    <Button variant="info">Algo</Button>
                  </Col>
                  <Col>
                    <Button variant="danger">Algo</Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
