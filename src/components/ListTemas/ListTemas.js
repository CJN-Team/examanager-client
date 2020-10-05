import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit} from "@fortawesome/free-solid-svg-icons"
//import { deleteAsigmentApi } from "../../api/asigment.js"
import { toast } from "react-toastify";

import "./ListTemas.scss"

export default function ListTemas(props) {
  const { temasList, setListState, listState } = props;

  var temas = Object.entries(temasList);

  console.log(temas)

  if (temasList == null || temasList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }

  return (
    <Container fluid className="list-temas">
      <ul className="table">
        {temas.map((x, i) => {
          return (
            <li class="list-group-item">
              <Row >
                <Col>
                  <h2>{x}</h2>
                </Col>
                <Col className="button">
                  <Button variant="info" >
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> 
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
