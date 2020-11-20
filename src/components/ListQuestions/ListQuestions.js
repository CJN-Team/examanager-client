import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteQuestionsAPI } from "../../api/preguntas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "../../utils/strings";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";

import "./ListQuestions.scss";

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
      <Container fluid className="list-questions">
        <ul className="table">
          {questList.map((x, i) => {
            return (
              <li class="list-group-item" key={x.id}>
                <Row>
                  <Col>
                    <h4>{`${capitalize(x.id)}`}</h4>
                  </Col>
                  <Col>
                    <textarea disabled>{capitalize(x.question)}</textarea>
                  </Col>
                  <Col className="button-row">
                    <Button variant="info" onClick={() => editQuestion(x)}>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                    </Button>
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
