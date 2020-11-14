import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteQuestionsAPI } from "../../api/preguntas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";

export default function ListQuestions(props) {
  const { questList, listState, setListState } = props;
  const [showModal, setShowModal] = useState(false);
  const [qinfo, setqInfo] = useState(null);

  const editQuestion = (e) => {
    setqInfo(e);
    setShowModal(true);
  };
  const deleteQuestion = (e) => {
    deleteQuestionsAPI(e.id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El borrado fue existoso");
          setListState(listState + 1);
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
        <Modal
          className="basic-modal"
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>Editar pregunta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateQuestion
              form={qinfo}
              mode="edit"
              listState={listState}
              setListState={setListState}
              setShowModal={setShowModal}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
