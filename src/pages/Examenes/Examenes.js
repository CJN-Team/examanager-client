import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import CreateExam from "../../components/CreateExam/CreateExam.js";
import ListExam from "../../components/ListExam/ListExam";
import { withRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Button } from "react-bootstrap";
import { listExamsApi } from "../../api/examenes";

import "./Examenes.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default withRouter(Examenes);

function Examenes(props) {
  const { setRefreshLogin, match } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const groupId = match["params"]["groupId"];
  const url = match["url"];

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
          groupID={groupId}
          url={url}
        ></Exam>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </BasicLayout>
  );
}

function Exam(props) {
  const { openModal, setShowModal, groupID, url } = props;
  const [examenes, setExamenes] = useState({ 1: {} });
  const [listState, setListState] = useState(1);

  useEffect(() => {
    listExamsApi(groupID).then((response) => {
      setExamenes(response);
    });
  }, [listState]);

  return (
    <Col className="examenes">
      <div className="examenes__body">
        <div className="title">
          <Link to={`/grupos/${groupID}`} className="go-back">
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
          <h4>Examenes</h4>
        </div>

        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <CreateExam
                setShowModal={setShowModal}
                setListState={setListState}
                listState={listState}
                groupID={groupID}
              ></CreateExam>
            )
          }
        >
          Generar exámenes
        </Button>
        <ListExam
          examList={examenes}
          setListState={setListState}
          listState={listState}
          url={url}
        />
      </div>
    </Col>
  );
}
