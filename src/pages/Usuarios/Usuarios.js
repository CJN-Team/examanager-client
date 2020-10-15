import React, { useState, useEffect } from "react";
import { Button, Container, Col } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser.js";
import BasicModal from "../../components/BasicModal/BasicModal";
import ListUser from "../../components/ListUser/ListUser";
import { listUsersAPI } from "../../api/usuarios";
import "./Usuarios.scss";

export default function Usuarios(props) {
  const { userType } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [usuariosAPI, setUsuarios] = useState(["init"]);
  const [listState, setListState] = useState(1);

  useEffect(() => {
    listUsersAPI(userType).then((response) => {
      setUsuarios(response);
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
          />
          <ListUser userList={usuariosAPI} listState={listState} setListState={setListState} />
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
  const { setShowModal, openModal, userType, listState, setListState } = props;
  return (
    <>
      <h4>{userType === "Estudiante" ? "Estudiantes" : userType + "es"}</h4>
      <Button
        variant="primary"
        onClick={() =>
          openModal(
            <CreateUser
              setShowModal={setShowModal}
              userData={() => initialValues(userType, "EAFIT")}
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
        onClick={() => openModal(<Yes setShowModal={setShowModal} />)}
      >
        Cargar
      </Button>
    </>
  );
}

function Yes(props) {
  return <h2>Not yet Implemented</h2>;
}

function initialValues(userType, institution) {
  return {
    id: "",
    profile: userType,
    idType: "CC",
    name: "",
    lastName: "",
    birthDate: "",
    email: "",
    institution: institution,
    password: "user",
  };
}
