import React, { useState, useEffect } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser";
import { listTeachersAPI } from "../../api/usuarios";

export default function Profesores() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [profesoresAPI, setProfesores] = useState(["init"]);

  useEffect(() => {
    listTeachersAPI().then((response) => {
      setProfesores(response);
    });
  }, []);

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  return (
    <div>
      <EncabezadoLista setShowModal={setShowModal} openModal={openModal} />
      <ListarUsuarios profesoresAPI={profesoresAPI} />
      <Container fluid>
        <ModalUsuarios openModal={openModal} setShowModal={setShowModal} />
      </Container>

      <ModalUsuarios show={showModal} setShow={setShowModal}>
        {contentModal}
      </ModalUsuarios>
    </div>
  );
}

function EncabezadoLista(props) {
  const { setShowModal, openModal } = props;
  return (
    <>
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
    </>
  );
}

function ListarUsuarios(props) {
  const { profesoresAPI } = props;
  if (profesoresAPI != null) {
    return (
      <Container fluid>
        <ul class="list-group">
          {profesoresAPI.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{x.name}</h2>
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
    );
  } else {
    return <h3>La consulta no recuperó resultados</h3>;
  }
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
  return <h2>Not yet Implemented</h2>;
}
