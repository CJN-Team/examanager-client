import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Asignaturas.scss";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import CreateAsigments from "../../components/CreateAsigment/CreateAsigment.js";

export default function Asignaturas(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  return (
    <>
      <Container className="login" fluid>
        <Asig
          openModal={openModal}
          setShowModal={setShowModal}
          setRefreshLogin={setRefreshLogin}
        ></Asig>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function Asig(props) {
  const { openModal, setShowModal, setRefreshLogin } = props;

  return (
    <Col className="asig">
      <div className="imagen">
        <h3>Asignaturas</h3>
        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <CreateAsigments
                setShowModal={setShowModal}
                setRefreshLogin={setRefreshLogin}
              ></CreateAsigments>
            )
          }
        >
          Añadir
        </Button>
      </div>
    </Col>
  );
}
