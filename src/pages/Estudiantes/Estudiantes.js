import React, { useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser";

export default function Estudiantes() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);

  const estudiantes = ["PEPE", "NICO", "JOHN"];

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  return (
    <div>
      <h1>Estudiantes</h1>
      <Button
        variant="primary"
        onClick={() =>
          openModal(
            <CreateUser
              setShowModal={setShowModal}
              userType="Estudiante"
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
        <ul class="list-group">
          {estudiantes.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{x}</h2>
                  </Col>
                  <Col>
                    <Button variant="danger">Borrar</Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Container>

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
  return <h2>popo</h2>;
}
