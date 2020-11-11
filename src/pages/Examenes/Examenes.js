import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import CreateExam from "../../components/CreateExam/CreateExam.js";
import ListExam from "../../components/ListExam/ListExam";
import React, { useState, useEffect } from "react";
import { Container, Col, Button } from "react-bootstrap";
import { listExamApi } from "../../api/examenes";

import "./Examenes.scss";

export default function Examenes(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };  

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin}>
      <Container className="examenes-cont" fluid>
        <Exam
          openModal={openModal}
          setShowModal={setShowModal}
        ></Exam>
      </Container>      
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </BasicLayout>
  );
}

function Exam (props) {
  const { openModal, setShowModal} = props;
  const [ examenes, setExamenes] = useState([]);
  const [ listState, setListState ] = useState(1);
  const [ prueba, setPrueba ] = useState(false);

  useEffect(() => {
    listExamApi().then((response) => {
      setExamenes(response);
    });
  }, [listState]);

  return (
    <Col className="examenes">
      <div className="examenes__body">
        <h4>Examenes</h4>
        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <CreateExam
                setShowModal={setShowModal}
                setListState={setListState}
                listState={listState}
              ></CreateExam>
            )
          }
        >
          Añadir
        </Button>
        <ListExam 
          examList={examenes} 
          setListState={setListState}
          listState={listState}
        />
      </div>
    </Col>
  );
}
