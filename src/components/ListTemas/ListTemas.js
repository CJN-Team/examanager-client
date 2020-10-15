import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit} from "@fortawesome/free-solid-svg-icons"
import { updateAsigmentApi } from "../../api/asigment.js"
import { toast } from "react-toastify";

import "./ListTemas.scss"

export default function ListTemas(props) {
  const { name, temasList, setListState, listState } = props;

  var temas = Object.entries(temasList);
  var listaTemas = temas[0][1]

  const deleteTopic = (pos) => {
    var data = [...listaTemas];
    data.splice(pos, 1);

    updateAsigmentApi(name, data)
    .then((response) => {
      if (response.code) {
        toast.warning(response.message);
      } else {
        toast.success("Se eliminó el tema existosamente");
        setListState(!listState)
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error del servidor, intente más tarde");
    })
  };

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
        {listaTemas.map( (x, i) => {
          return (
            <li class="list-group-item">
              <Row >
                <Col>
                  <h2>{x}</h2>
                </Col>
                <Col className="button">
                  <Button variant="danger">
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTopic(i)}></FontAwesomeIcon>
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
