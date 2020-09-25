import React, { useState, useEffect } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser";
import { listQuestionsAPI } from "../../api/preguntas";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";

export default function Preguntas() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [preguntasAPI, setpreguntas] = useState(["init", "test"]);

  /*
  useEffect(() => {
    listQuestionsAPI().then((response) => {
      setpreguntas(response);
    });
  }, []);*/

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
            <CreateQuestion
              setShowModal={setShowModal}
              userType="Profesor"
              institution="None"
            />
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

function Yes(props) {
  return <h2>Not yet Implemented</h2>;
}
