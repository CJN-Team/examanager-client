import React, { useState, useEffect } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser";
import { listStudentsAPI } from "../../api/usuarios";

export default function Estudiantes() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [estudiantesAPI, setEstudiantes] = useState(["init"]);

  useEffect(() => {
    listStudentsAPI().then((response) => {
      setEstudiantes(response);
    });
  }, []);

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
          {estudiantesAPI.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{x.name + x.lastName}</h2>
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
  return <h2>Not yet implemented</h2>;
}
