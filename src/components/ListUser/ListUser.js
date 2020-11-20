import React, { useState, useEffect } from "react";
import { deleteUserAPI, updateUserPasswordAPI } from "../../api/usuarios";
import CreateUser from "../CreateUser/CreateUser";
import BasicModal from "../BasicModal/BasicModal";
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faKey } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "../../utils/strings";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import "./ListUser.scss";

export default function ListUser(props) {
  const { userList, listState, setListState } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setContentModal(content);
    setShowModal(true);
  };

  if (
    userList == null ||
    userList.message === "Fallo" ||
    Object.keys(userList).length == 0
  ) {
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
              <li class="list-group-item" key={x.id}>
                <Row>
                  <Col>
                    <ProfilePicture user={x} />
                  </Col>
                  <Col>
                    <h2>{`${capitalize(x.name)}  ${capitalize(
                      x.lastName
                    )}`}</h2>
                  </Col>
                  <Col className="button">
                    <Button
                      variant="info"
                      onClick={() =>
                        openModal(
                          <CreateUser
                            userData={x}
                            mode="edit"
                            setShowModal={setShowModal}
                            listState={listState}
                            setListState={setListState}
                          />
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  </Col>
                  <Col className="button">
                    <Button
                      variant="primary"
                      onClick={() =>
                        openModal(
                          <UpdatePasswordUser
                            uid={x.id}
                            username={`${capitalize(x.name)} ${capitalize(
                              x.lastName
                            )}`}
                            setShowModal={setShowModal}
                            listState={listState}
                            setListState={setListState}
                          />
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faKey} />
                    </Button>
                  </Col>
                  <Col className="button">
                    <Button
                      variant="danger"
                      onClick={() =>
                        openModal(
                          <DeleteUser
                            uid={x.id}
                            username={`${capitalize(x.name)} ${capitalize(
                              x.lastName
                            )}`}
                            setShowModal={setShowModal}
                            listState={listState}
                            setListState={setListState}
                          />
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
          {contentModal}
        </BasicModal>
      </Container>
    </div>
  );
}

function DeleteUser(props) {
  const { uid, username, setShowModal, listState, setListState } = props;

  const deleteUser = () => {
    deleteUserAPI(uid)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El borrado fue existoso");
          setListState(listState + 1);
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      });
  };

  return (
    <div>
      <Container className="delete-user">
        <Row>
          <h5>¿Está seguro?</h5>
        </Row>
        <Row>
          Eliminar al usuario <div className="name">{username}</div> no se puede
          deshacer.
        </Row>
        <Row>
          <Col>
            <Button variant="danger" onClick={() => deleteUser()}>
              Aceptar
            </Button>
          </Col>
          <Col>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function UpdatePasswordUser(props) {
  const { uid, username, setShowModal, listState, setListState } = props;
  const [pass, setPass] = useState("");

  const submitNewPass = () => {
    if (pass !== "") {
      updateUserPasswordAPI(uid, pass)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Actualización exitosa");
            setListState(listState + 1);
            setShowModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error del servidor, intente más tarde");
        });
    } else {
      toast.warning("Ingrese una contraseña");
    }
  };

  return (
    <div className="update-user">
      <Form.Label>Ingrese una nueva contraseña para {username}:</Form.Label>

      <Form.Control
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Row className="centered-button">
        <Button onClick={() => submitNewPass()}>Guardar</Button>
      </Row>
    </div>
  );
}
