import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { deleteExamApi } from "../../api/examenes.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import { toast } from "react-toastify";
import React, { useState } from "react";
import UpdateExam from "../UpdateExam/UpdateExam.js";
import GeneratePDF from "../GeneratePDF/GeneratePDF";

import "./ListExam.scss";

export default function ListExam(props) {
  const { examList, setListState, listState, url } = props;
  const [contentModal, setContentModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  var examenes = Object.entries(examList);

  if (examList == null || examList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  const deleteExam = (subject) => {
    deleteExamApi(subject)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se eliminó el examen existosamente");
          setListState(!listState);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      });
  };

  return (
    <>
      <Container fluid className="list-exam">
        <ul className="table">
          {examenes.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{x[1]["name"]}</h2>
                  </Col>
                  <Col className="button">
                    <Button
                      onClick={() =>
                        openModal(
                          <UpdateExam
                            setShowModal={setShowModal}
                            exam={x[1]["id"]}
                            listState={listState}
                            setListState={setListState}
                          ></UpdateExam>
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </Button>
                  </Col>
                  <Col className="button">
                    <Button
                      variant="info"
                      onClick={() =>
                        openModal(
                          <GeneratePDF
                            examID={x[1]["id"]}
                            setShowModal={setShowModal}
                          />
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faFileAlt} />
                    </Button>
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
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}
