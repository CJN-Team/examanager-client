import React, { useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser";

export default function Profesores() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  return (
    <div>
      <h1>Profesores</h1>
      <Button
        variant="primary"
        onClick={() =>
          openModal(
            <CreateUser
              setShowModal={setShowModal}
              userType="Profesor"
              institution="None"
            />
          )
        }
      >
        Añadir
      </Button>
      <Button
        variant="info"
        onClick={() => openModal(<Yes setShowModal={setShowModal} />)}
      >
        Cargar archivo
      </Button>

      <Container fluid>
        <ModalUsuarios openModal={openModal} setShowModal={setShowModal} />
      </Container>

      <ModalUsuarios show={showModal} setShow={setShowModal}>
        {contentModal}
      </ModalUsuarios>
    </div>
  );
}

function ModalUsuarios(props) {
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
        <Modal.Title>Agregar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

function Yes(props) {
  return <h2>popo but sensei</h2>;
}
