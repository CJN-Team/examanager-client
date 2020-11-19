import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import BasicModal from "../../components/BasicModal/BasicModal";
import CreateDept from "../../components/CreateDept/CreateDept";
import ListDepts from "../../components/ListDepts/ListDepts";
import { Container, Col, Spinner, Button, Row } from "react-bootstrap";
import { listDeptsAPI } from "../../api/departamentos";

import "./Departamentos.scss";
import useAuth from "../../hooks/useAuth";

export default function Departamentos(props) {
  const { setRefreshLogin } = props;
  const [departamentos, setDepartamentos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listState, setListState] = useState(1);

  const user = useAuth();
  document.title = "Departamentos";

  useEffect(() => {
    listDeptsAPI().then((response) => {
      setDepartamentos(response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    listDeptsAPI().then((response) => {
      setDepartamentos(response);
      setLoading(false);
    });
  }, [listState]);

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin} ruta="departamentos">
      <Container className="departamentos-cont" fluid>
        <Col className="departamentos">
          <div className="departamentos__body">
            <h4>Departamentos</h4>
            <Button onClick={() => setShowModal(true)}>Añadir</Button>
            {loading ? (
              <Row>
                <Spinner animation="border" style={{ marginLeft: "20px" }} />
              </Row>
            ) : (
              <ListDepts
                listaDepts={departamentos}
                listState={listState}
                setListState={setListState}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </Col>
      </Container>

      <Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          <CreateDept
            form={() => defaultValues(user)}
            mode="create"
            listState={listState}
            setListState={setListState}
            setShowModal={setShowModal}
          />
        </BasicModal>
      </Container>
    </BasicLayout>
  );
}

function defaultValues(user) {
  return {
    name: "",
    institution: user.institution,
    teachers: [],
  };
}
