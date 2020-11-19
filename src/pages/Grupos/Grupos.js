import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import BasicModal from "../../components/BasicModal/BasicModal";

import { Button, Container, Spinner, Row } from "react-bootstrap";
import CreateGroup from "../../components/CreateGroup/CreateGroup";
import ListGroups from "../../components/ListGroups/ListGroups";
import { listGroupsAPI } from "../../api/grupos";

import "./Grupos.scss";
import useAuth from "../../hooks/useAuth";

export default function Grupos(props) {
  const { setRefreshLogin } = props;

  const user = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [gruposAPI, setGrupos] = useState(null);
  const [listState, setListState] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "Grupos";

  useEffect(() => {
    setLoading(true);
    async function actualizarDatos() {
      await listGroupsAPI(page).then((response) => {
        setGrupos(response);
        setLoading(false);
      });
    }
    actualizarDatos();
  }, [listState]);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="grupos">
        <Container className="grupos-cont" fluid>
          <div className="grupos">
            <h4>Grupos</h4>
            <div className="grupos__body">
              {user.profile === "Administrador" && (
                <Button onClick={() => openModal()}>Añadir</Button>
              )}
              {loading ? (
                <Row>
                  <Spinner animation="border" style={{ marginLeft: "20px" }} />
                </Row>
              ) : (
                <ListGroups
                  groupList={gruposAPI}
                  setListState={setListState}
                  listState={listState}
                />
              )}

              <BasicModal show={showModal} setShow={setShowModal}>
                <CreateGroup
                  groupData={initialValues()}
                  listState={listState}
                  setListState={setListState}
                  setShowModal={setShowModal}
                />
              </BasicModal>
            </div>
          </div>
        </Container>
      </BasicLayout>
    </div>
  );
}

function initialValues() {
  return {
    id: "",
    name: "",
    studentsList: {},
    teacher: "",
    subject: "",
  };
}
