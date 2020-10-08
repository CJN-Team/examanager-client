import React, { useState, useEffect } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { listQuestionsAPI } from "../../api/preguntas";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";
import ListQuestions from "../../components/ListQuestions/ListQuestions";

export default function Preguntas() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [preguntasAPI, setpreguntas] = useState(["init"]);

  useEffect(() => {
    listQuestionsAPI(1, "Inglés", 1).then((response) => {
      setpreguntas(response);
      console.log(preguntasAPI);
    });
  }, []);

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  return (
    <div>
      <EncabezadoLista setShowModal={setShowModal} openModal={openModal} />
      <Container fluid>
        <ModalPreguntas openModal={openModal} setShowModal={setShowModal} />
      </Container>
      <ListQuestions
        questList={preguntasAPI}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <ModalPreguntas show={showModal} setShow={setShowModal}>
        {contentModal}
      </ModalPreguntas>
    </div>
  );
}

function EncabezadoLista(props) {
  const { setShowModal, openModal } = props;
  return (
    <>
      <h1>Preguntas</h1>
      <Button
        variant="primary"
        onClick={() =>
          openModal(
            <CreateQuestion form={() => initialValues()} mode="create" />
          )
        }
      >
        Añadir
      </Button>
    </>
  );
}

function ModalPreguntas(props) {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Agregar pregunta</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

function initialValues() {
  return {
    subject: "Idiomas",
    topic: "Inglés",
    id: "",
    question: "",
    category: "Pregunta abierta",
    difficulty: 1,
    options: [""],
    answer: [],
  };
}
