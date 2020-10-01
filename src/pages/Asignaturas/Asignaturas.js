import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Asignaturas.scss";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import CreateAsigments from "../../components/CreateAsigment/CreateAsigment.js";
import ListAsig from "../../components/ListAsig/ListAsig";
import { listAsigmentApi } from "../../api/asigment";

export default function Asignaturas(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [asignaturasAPI, setAsignaturas] = useState(["init"]);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  useEffect(() => {
    listAsigmentApi().then((response) => {
      setAsignaturas(response);
    });
  }, []);

  return (
    <>
      <Container className="login" fluid>
        <Asig
          openModal={openModal}
          setShowModal={setShowModal}
          setRefreshLogin={setRefreshLogin}
        ></Asig>
      </Container>
      <ListAsig asigList={asignaturasAPI} />
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
