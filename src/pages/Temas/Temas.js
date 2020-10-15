import React, { useState, useEffect } from 'react'
import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import ListTemas from "../../components/ListTemas/ListTemas.js";
import UpdateAsigment from "../../components/UpdateAsigment/UpdateAsigment.js"
import { withRouter } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap";
import { listOneAsigmentApi } from "../../api/asigment"

import "./Temas.scss"

export default withRouter(Temas);

function Temas(props) {
  const { setRefreshLogin, match } = props; 
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);   
  const tema = match["params"]["topics"]

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };  

  return (
      <BasicLayout setRefreshLogin={setRefreshLogin}>
      <Container className="temas-cont" fluid>
          <TemasCont 
            name={tema}
            openModal={openModal}
            setShowModal={setShowModal}
          ></TemasCont>
      </Container>  
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>    
      </BasicLayout>
  );
}

function TemasCont(props) {
  const { name, openModal, setShowModal } = props;
  const [ temas, setTemas ] = useState([["",[]]]);
  const [ listState, setListState ] = useState(1)

  useEffect(() => {
    listOneAsigmentApi(name).then((response) => {
      setTemas(response);
    });
  }, [listState]);

  return (
    <Col className="temas">
      <div className="temas__body">
        <h4 className="title">Temas</h4>
        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <UpdateAsigment
                temas={temas}
                setShowModal={setShowModal}
                setListState={setListState}
                listState={listState}
              ></UpdateAsigment>
            )
          }
        >
          Editar
        </Button>
        <ListTemas
          name={name}
          temasList={temas} 
          setListState={setListState}
          listState={listState}
        />
      </div>
    </Col>
  );
}
