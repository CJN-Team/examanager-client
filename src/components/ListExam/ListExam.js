import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye} from "@fortawesome/free-solid-svg-icons"
import { deleteExamApi } from "../../api/examenes.js"
import { toast } from "react-toastify";
import { Link } from "react-router-dom"

import "./ListExam.scss"

export default function ListExam(props) {
  const { examList, setListState, listState } = props;

  var examenes = Object.entries(examList);

  console.log(examenes)

  if (examList == null || examList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }

  const deleteExam = (subject) => {
    deleteExamApi(subject)
    .then((response) => {
      if (response.code) {
        toast.warning(response.message);
      } else {
        toast.success("Se eliminó la asignatura existosamente");
        setListState(!listState)
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error del servidor, intente más tarde");
    })
  };

  return (
    <Container fluid className="list-exam">
      <ul className="table">
        {examenes.map((x, i) => {
          return (
            <li class="list-group-item">
              <Row >
                <Col>
                  <h2>{x[0]}</h2>
                </Col>
                <Col className="button">
                  <Link to={"/examenes/"+x[0]}>
                      <FontAwesomeIcon className="btn-ver" icon={faEye}></FontAwesomeIcon> 
                  </Link>
                </Col>
                <Col className="button">
                  <Button variant="danger" onClick={() => deleteExam(x[0])}>
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
