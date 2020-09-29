import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CreateUser from "../../components/CreateUser/CreateUser";
import BasicModal from "../../components/BasicModal/BasicModal";
import ListUser from "../../components/ListUser/ListUser";
import { listUsersAPI } from "../../api/usuarios";

export default function Usuarios(props) {
  const { userType } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [usuariosAPI, setUsuarios] = useState(["init"]);

  useEffect(() => {
    listUsersAPI(userType).then((response) => {
      setUsuarios(response);
    });
  }, []);

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  return (
    <div>
      <EncabezadoLista
        setShowModal={setShowModal}
        openModal={openModal}
        userType={userType}
      />
      <ListUser userList={usuariosAPI} />
      <Container fluid>
        <BasicModal openModal={openModal} setShowModal={setShowModal} />
      </Container>

      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}

function EncabezadoLista(props) {
  const { setShowModal, openModal, userType } = props;
  return (
    <>
      <h1>{userType}</h1>
      <Button
        variant="primary"
        onClick={() =>
          openModal(
            <CreateUser
              setShowModal={setShowModal}
              userData={() => initialValues(userType, "EAFIT")}
              mode="create"
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

function Yes(props) {
  return <h2>Not yet Implemented</h2>;
}

function initialValues(userType, institution) {
  return {
    id: "",
    profile: userType,
    idType: "",
    name: "",
    lastName: "",
    birthDate: "",
    email: "",
    institution: institution,
    password: "user",
  };
}
