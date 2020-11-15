import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { updateGroupAPI } from "../../api/grupos";
import { toast } from "react-toastify";
import BasicModal from "../BasicModal/BasicModal";
import useAuth from "../../hooks/useAuth";

export default function StudentTable(props) {
  const { alumnos, lista, id } = props;
  const [listState, setListState] = useState(0);
  const user = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setContentModal(content);
    setShowModal(true);
  };

  return (
    <>
      <Table hover className="table" bordered={false}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Examenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((x, i) => {
            if (x.id in lista) {
              return (
                <tr>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.lastName}</td>
                  <td>{lista[x.id].length}</td>
                  <td>
                    <Row>
                      <Col className="button">
                        <Button variant="info">
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                      </Col>
                      <Col className="button">
                        {user.profile !== "Estudiante" && (
                          <Button
                            variant="danger"
                            onClick={() =>
                              openModal(
                                <BorrarAlumno
                                  alumno={x}
                                  id={id}
                                  lista={lista}
                                  listState={listState}
                                  setListState={setListState}
                                  setShowModal={setShowModal}
                                />
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
      {user.profile !== "Estudiante" && (
        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <AgregarEstudiantes
                alumnos={alumnos}
                lista={lista}
                id={id}
                listState={listState}
                setListState={setListState}
                setShowModal={setShowModal}
              />
            )
          }
        >
          Agregar
        </Button>
      )}

      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function AgregarEstudiantes(props) {
  const { alumnos, lista, id, listState, setListState, setShowModal } = props;

  const [newList, setNewList] = useState([]);

  const onCheck = (e, est) => {
    if (est.id in newList) {
      delete newList[est.id];
    } else {
      newList[est.id] = [];
    }
  };

  const saveChanges = (e) => {
    e.preventDefault();
    delete newList[""];
    var nuevo = {
      studentsList: { ...lista, ...newList },
    };
    updateGroupAPI(nuevo, id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se han agregado los alumnos.");
          setListState(listState + 1);
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error: ${err}, intente denuevo más tarde.`);
      })
      .finally(() => {});
  };

  const onChange = (e) => {
    setNewList({ ...newList, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h5>Seleccione los estudiantes que desea agregar:</h5>
      <Form onSubmit={saveChanges} onChange={onChange}>
        <Form.Group>
          {alumnos.map((x, i) => {
            if (!(x.id in lista)) {
              return (
                <Row>
                  <Col>
                    <Form.Label>{`${x.name}  ${x.lastName}`}</Form.Label>
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      checked={x.id in newList}
                      onChange={(e) => {
                        onCheck(e, x);
                      }}
                    />
                  </Col>
                </Row>
              );
            }
          })}
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </Container>
  );
}

function BorrarAlumno(props) {
  const { alumno, lista, id, listState, setListState, setShowModal } = props;

  const submit = () => {
    delete lista[alumno.id];

    var nuevo = {
      studentsList: lista,
    };

    updateGroupAPI(nuevo, id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se han agregado los alumnos.");
          setListState(listState + 1);
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error: ${err}, intente denuevo más tarde.`);
      })
      .finally(() => {});
  };

  return (
    <div>
      <Row>
        <h6>Está seguro? </h6>
      </Row>
      <Row>
        Eliminar al estudiante {`${alumno.name}  ${alumno.lastName}`} hará que
        se pierdan los exámenes que este tiene asignados en el grupo
      </Row>
      <Row>
        <Button onClick={submit} variant="danger">
          Confirmar
        </Button>
        <Button onClick={() => setShowModal(false)} variant="info">
          Cancelar
        </Button>
      </Row>
    </div>
  );
}
