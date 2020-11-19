import React, { useState } from "react";
import CreateDept from "../CreateDept/CreateDept";
import BasicModal from "../BasicModal/BasicModal";
import { Row, Col, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { deleteDeptAPI } from "../../api/departamentos";
import { capitalize } from "../../utils/strings";
import { toast } from "react-toastify";

import "./ListDepts.scss";

export default function ListDepts(props) {
  const { listaDepts, listState, setListState } = props;
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "init" });

  const borrarDept = (dept) => {
    deleteDeptAPI(dept)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Borrado exitoso.");
          setListState(listState + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error: ${err}, intente denuevo más tarde.`);
      });
  };

  const editDept = async (dept) => {
    await setForm(dept);
    setShowModal(true);
  };

  if (listaDepts == null || listaDepts.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <div>
      <Container fluid className="list-depts">
        <ul className="table">
          {listaDepts.map((x, i) => {
            return (
              <li class="list-group-item" key={x.id}>
                <Row>
                  <Col>
                    <h2>{capitalize(x.name)}</h2>
                  </Col>
                  <Col className="button">
                    <Button variant="info" onClick={() => editDept(x)}>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                    </Button>
                  </Col>
                  <Col className="button">
                    <Button variant="danger" onClick={() => borrarDept(x.id)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
        <Container fluid>
          <BasicModal show={showModal} setShow={setShowModal}>
            <CreateDept
              form={form}
              mode="edit"
              listState={listState}
              setListState={setListState}
              setShowModal={setShowModal}
            />
          </BasicModal>
        </Container>
      </Container>
    </div>
  );
}
