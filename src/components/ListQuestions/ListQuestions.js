import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";
import { toast } from "react-toastify";
import BasicModal from "../BasicModal/BasicModal";
import { deleteQuestionsAPI } from "../../api/preguntas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function ListQuestions(props) {
  const { questList, showModal, setShowModal } = props;

  const editQuestion = (e) => {};
  const deleteQuestion = (e) => {
    deleteQuestionsAPI(e.id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El borrado fue existoso");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {});
  };

  if (questList == null || questList.message === "Fallo") {
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
          {questList.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{`${x.id}`}</h2>
                  </Col>
                  <Col>
                    <Button variant="info" onClick={() => editQuestion(x)}>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={() => deleteQuestion(x)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Container>
      <Container fluid>
        <BasicModal show={showModal} setShow={setShowModal}>
          <CreateQuestion />
        </BasicModal>
      </Container>
    </div>
  );
}
