import React, { useState, useEffect } from "react";
import { deleteUserAPI } from "../../api/usuarios";
import CreateUser from "../CreateUser/CreateUser";
import BasicModal from "../BasicModal/BasicModal";
import { toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ListUser.scss";

export default function ListUser(props) {
  const { userList, listState, setListState } = props;
  const [showModal, setShowModal] = useState(false);
  const [uinfo, setUinfo] = useState(userList[0]);

  const deleteUser = (u) => {
    setUinfo(u);
    deleteUserAPI(u)
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
      .finally(() => {
      });
  };

  const editUser = (u) => {
    setUinfo(u);
    setShowModal(true);
  };

  if (userList == null || userList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <div>
      <Container fluid className="list-user">
        <ul className="table">
          {userList.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{`${x.name}  ${x.lastName}`}</h2>
                  </Col>
                  <Col className="button">
                    <Button variant="info" onClick={() => editUser(x)}>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                    </Button>
                  </Col>
                  <Col className="button">
                    <Button variant="danger" onClick={() => deleteUser(x)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Container>
      <Container fluid>
        <BasicModal show={showModal} setShow={setShowModal}>
          <CreateUser
            userData={uinfo}
            mode="edit"
            setShowModal={setShowModal}
            listState={listState}
            setListState={setListState}
          />
        </BasicModal>
      </Container>
    </div>
  );
}
