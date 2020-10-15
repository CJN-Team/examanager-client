import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import CreateAsigments from "../../components/CreateAsigment/CreateAsigment.js";
import ListAsig from "../../components/ListAsig/ListAsig";
import React, { useState, useEffect } from "react";
import { Container, Col, Button } from "react-bootstrap";
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
        ></Asig>
      </Container>      
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </BasicLayout>
  );
}

function Asig(props) {
  const { openModal, setShowModal} = props;
  const [ asignaturas, setAsignaturas] = useState([]);
  const [ listState, setListState ] = useState(1)

  useEffect(() => {
    listAsigmentApi().then((response) => {
      setAsignaturas(response);
    });
  }, [listState]);

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
                setListState={setListState}
                listState={listState}
              ></CreateAsigments>
            )
          }
        >
          Añadir
        </Button>
        <ListAsig 
          asigList={asignaturas} 
          setListState={setListState}
          listState={listState}
        />
      </div>
    </Col>
  );
}
