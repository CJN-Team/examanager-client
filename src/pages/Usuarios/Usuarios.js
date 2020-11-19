import React, { useState, useEffect } from "react";
import { Button, Container, Col, Spinner, Row } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser.js";
import BasicModal from "../../components/BasicModal/BasicModal";
import ListUser from "../../components/ListUser/ListUser";
import FileLoad from "../../components/FileLoad/FileLoad";
import { listUsersAPI } from "../../api/usuarios";
import "./Usuarios.scss";

export default function Usuarios(props) {
  const { userType } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [usuariosAPI, setUsuarios] = useState(null);
  const [listState, setListState] = useState(1);
  const [loading, setLoading] = useState(true);

  const title = userType === "Estudiante" ? "Estudiantes" : userType + "es";
  document.title = title;

  useEffect(() => {
    listUsersAPI(userType).then((response) => {
      setUsuarios(response);
      setLoading(false);
    });
  }, [listState]);

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  return (
    <Container className="usuarios-cont" fluid>
      <Col className="usuarios">
        <div className="usuarios__body">
          <EncabezadoLista
            setShowModal={setShowModal}
            openModal={openModal}
            userType={userType}
            listState={listState}
            setListState={setListState}
            title={title}
          />
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <ListUser
              userList={usuariosAPI}
              listState={listState}
              setListState={setListState}
            />
          )}
          <Container fluid>
            <BasicModal openModal={openModal} setShowModal={setShowModal} />
          </Container>

          <BasicModal show={showModal} setShow={setShowModal}>
            {contentModal}
          </BasicModal>
        </div>
      </Col>
    </Container>
  );
}

function EncabezadoLista(props) {
  const {
    setShowModal,
    openModal,
    userType,
    listState,
    setListState,
    title,
  } = props;
  return (
    <>
      <Row>
        <h4>{title}</h4>
      </Row>
      <Row>
        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <CreateUser
                setShowModal={setShowModal}
                userData={() => initialValues(userType)}
                mode="create"
                listState={listState}
                setListState={setListState}
              />
            )
          }
        >
          Añadir
        </Button>
        <Button
          variant="info"
          onClick={() =>
            openModal(
              <FileLoad
                setShowModal={setShowModal}
                listState={listState}
                setListState={setListState}
                profile={userType}
              />
            )
          }
        >
          Cargar
        </Button>
      </Row>
    </>
  );
}

function initialValues(userType) {
  return {
    id: "",
    profile: userType,
    idType: "CC",
    name: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "user",
  };
}
