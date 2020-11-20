import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteGroupAPI } from "../../api/grupos";
import BasicModal from "../BasicModal/BasicModal";
import useAuth from "../../hooks/useAuth";

import "./ListGroups.scss";
import { capitalize } from "../../utils/strings";

export default function ListGroups(props) {
  const { groupList, setListState, listState } = props;
  const [showModal, setShowModal] = useState(false);
  const [group, setGroup] = useState(null);
  const user = useAuth();

  const openDeleteModal = (id, name) => {
    setGroup({ id: id, name: name });
    setShowModal(true);
  };

  if (
    groupList == null ||
    groupList.message === "Fallo" ||
    Object.keys(groupList).length == 0
  ) {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  } else {
    return (
      <div>
        <Container fluid className="list-groups">
          <Table hover className="table" bordered={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groupList.map((x, i) => {
                if (user.id in x.studentsList || user.profile !== "Estudiante")
                  return (
                    <tr key={i}>
                      <td>{x.id}</td>
                      <td>{capitalize(x.name)}</td>
                      <td>
                        <Row>
                          <Col className="button">
                            <Link
                              to={"/grupos/" + x.id}
                              className="btn btn-info link"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            {user.profile === "Administrador" && (
                              <Button
                                variant="danger"
                                onClick={() => openDeleteModal(x.id, x.name)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            )}
                          </Col>
                          <Col className="button"></Col>
                        </Row>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </Table>
          <BasicModal show={showModal} setShow={setShowModal}>
            <DeleteGroup
              groupData={group}
              listState={listState}
              setListState={setListState}
              setShow={setShowModal}
            />
          </BasicModal>
        </Container>
      </div>
    );
  }
}

function DeleteGroup(props) {
  const { groupData, setListState, listState, setShow } = props;

  const deleteGroup = () => {
    console.log("Nico marica.");
    deleteGroupAPI(groupData.id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El borrado fue existoso");
          setListState(listState + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {});
  };

  return (
    <div>
      <Container className="group-delete">
        <Row>
          ¿Desea borrar el grupo{" "}
          <div style={{ color: "red", marginLeft: "5px" }}>
            {` ${groupData.id} - ${capitalize(groupData.name)}`}
          </div>
          ?
        </Row>
        <Row className="row-info">Esta acción no se puede revertir.</Row>
        <Row>
          <Col>
            <Button variant="danger" onClick={() => deleteGroup()}>
              Aceptar
            </Button>
          </Col>
          <Col>
            <Button onClick={() => setShow(false)}>Cancelar</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
