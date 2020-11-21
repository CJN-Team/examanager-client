import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { updateGroupAPI, userGradesAPI } from "../../api/grupos";
import { toast } from "react-toastify";
import { capitalize } from "../../utils/strings";
import { Link } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import useAuth from "../../hooks/useAuth";

import "./StudentTable.scss";

import {
  Table,
  Row,
  Col,
  Button,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";

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
      <Table hover className="table" bordered={true}>
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
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.name && capitalize(x.name)}</td>
                  <td>{x.name && capitalize(x.lastName)}</td>
                  <td>
                    {user.profile !== "Estudiante" || user.id === x.id
                      ? lista[x.id].length
                      : null}
                  </td>
                  <td>
                    <Row>
                      <Col className="button-col">
                        {user.profile === "Estudiante" ? (
                          user.id === x.id && (
                            <Button
                              variant="info"
                              onClick={() =>
                                openModal(<NotasAlumno uid={x.id} gid={id} />)
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          )
                        ) : (
                          <Button
                            variant="info"
                            onClick={() =>
                              openModal(<NotasAlumno uid={x.id} gid={id} />)
                            }
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        )}
                        {user.profile === "Administrador" && (
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
      {user.profile === "Administrador" && (
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
                <Row key={x.id}>
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
    <Container className="user-delete">
      <Row>
        <h6>¿Está seguro?</h6>
      </Row>
      <Row className="row-info">
        Eliminar al estudiante{" "}
        {`${capitalize(alumno.name)}  ${capitalize(alumno.lastName)}`} hará que
        se pierdan los exámenes que este tiene asignados en el grupo.
      </Row>
      <Row>
        <Button onClick={submit} variant="danger">
          Confirmar
        </Button>
        <Button onClick={() => setShowModal(false)} variant="info">
          Cancelar
        </Button>
      </Row>
    </Container>
  );
}

function NotasAlumno(props) {
  const { uid, gid } = props;
  const [grades, setGrades] = useState({ init: "init" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGrades() {
      await userGradesAPI(uid, gid).then((response) => {
        setGrades(response);
        setLoading(false);
      });
    }
    getGrades();
  }, []);
  if (loading) {
    return <Spinner animation="border" />;
  }
  if (typeof grades === "undefined") {
    return <h6>No tiene notas aún.</h6>;
  }
  return (
    <div>
      <h6>Notas: </h6>
      <table class="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Evaluación</th>
            <th>Nota</th>
            <th>Estado</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(grades).map((grade, index) => {
            return (
              <tr key={index}>
                <td>{capitalize(grade)}</td>
                <td style={getColor(grades[grade].Grade)}>
                  {grades[grade].Grade}
                </td>
                <td>
                  {grades[grade].State ? (
                    <div className="open">Abierto</div>
                  ) : (
                    <> Cerrado </>
                  )}
                </td>
                <td>
                  <Link
                    to={`/grupos/${gid}/examen/${grades[grade].ID}`}
                    className="btn btn-info button-link"
                  >
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getColor(grade) {
  if (grade >= 3.0) {
    if (grade >= 4.0) {
      return {
        color: "green",
      };
    } else {
      return {
        color: "#999900",
      };
    }
  } else {
    return {
      color: "red",
    };
  }
}
