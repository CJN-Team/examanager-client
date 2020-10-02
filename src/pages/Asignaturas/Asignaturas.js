import BasicLayout from "../../layout/basicLayout/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import CreateAsigments from "../../components/CreateAsigment/CreateAsigment.js";
import ListAsig from "../../components/ListAsig/ListAsig";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { listAsigmentApi } from "../../api/asigment";

import "./Asignaturas.scss";

export default function Asignaturas(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };  

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin}>
      <Container className="asignaturas-cont" fluid>
        <Asig
          openModal={openModal}
          setShowModal={setShowModal}
          setRefreshLogin={setRefreshLogin}
        ></Asig>
      </Container>      
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </BasicLayout>
  );
}

function Asig(props) {
  const { openModal, setShowModal, setRefreshLogin } = props;
  const [asignaturas, setAsignaturas] = useState(["Matematicas", "Español"]);

  useEffect(() => {
    listAsigmentApi().then((response) => {
      setAsignaturas(response);
    });
  }, []);

  return (
    <Col className="asignaturas">
      <div className="asignaturas__body">
        <h4>Asignaturas</h4>
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
        <ListAsig asigList={asignaturas} />
      </div>
    </Col>
  );
}
