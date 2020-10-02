import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye} from "@fortawesome/free-solid-svg-icons"

import "./ListAsig.scss"

export default function ListAsig(props) {
  const { asigList } = props;
  var asignaturas = Object.entries(asigList);

  console.log(asignaturas)

  if (asigList == null || asigList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <Container fluid className="list-asig">
      <ul className="table">
        {asignaturas.map((x, i) => {
          return (
            <li class="list-group-item">
              <Row >
                <Col>
                  <h2>{x[1]}</h2>
                </Col>
                <Col className="button">
                  <Button variant="info">
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> 
                  </Button>
                </Col>
                <Col className="button">
                  <Button variant="danger">
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </Button>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
