import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import BasicModal from "../../components/BasicModal/BasicModal";
import CreateDept from "../../components/CreateDept/CreateDept";
import ListDepts from "../../components/ListDepts/ListDepts";
import { Container, Col, Spinner, Button } from "react-bootstrap";
import { CreateDeptAPI, listDeptsAPI } from "../../api/departamentos";

import "./Departamentos.scss";

export default function Departamentos(props) {
  const { setRefreshLogin } = props;
  const [departamentos, setDepartamentos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  document.title = "Departamentos";

  useEffect(() => {
    listDeptsAPI().then((response) => {
      setDepartamentos(response);
      setLoading(false);
    });
  }, []);

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin} ruta="departamentos">
      <Container className="departamentos-cont" fluid>
        <Col className="departamentos">
          <div className="departamentos__body">
            <h4>Departamentos</h4>
            <Button onClick={() => setShowModal(true)}>Añadir</Button>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <ListDepts listaDepts={departamentos} />
            )}
          </div>
        </Col>
      </Container>

      <Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          <CreateDept />
        </BasicModal>
      </Container>
    </BasicLayout>
  );
}
