import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { withRouter } from "react-router-dom";
import { getGroupAPI } from "../../api/grupos";
import { getUserAPI, listUsersAPI } from "../../api/usuarios";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

export default withRouter(Grupo);

function Grupo(props) {
  const { setRefreshLogin, match } = props;

  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const [groupData, setGroupData] = useState(exampleInit);
  const [profesor, setProfesor] = useState("init");
  const [listaProfesores, setListaProfesores] = useState([]);
  const [listaAlumnos, setListaAlumnos] = useState([{ id: "init" }]);
  const [changingTeacher, setChangingTeacher] = useState(false);

  const grupo = match["params"]["id"];

  useEffect(() => {
    listUsersAPI("Profesor").then((response) => {
      setListaProfesores(response);
    });
    listUsersAPI("Estudiante").then((response) => {
      setListaAlumnos(response);
    });
    setProfesor(groupData.teacher);
  }, [groupData]);

  useEffect(() => {
    getGroupAPI(grupo).then((response) => {
      setGroupData(response);
    });
  }, []);

  const updateTeacher = () => {
    if (changingTeacher) {
      setGroupData({ ...groupData, teacher: profesor });
    }
    setChangingTeacher(!changingTeacher);
  };

  document.title = groupData.name;

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin}>
      <Form>
        <Row>
          <Form.Label>{groupData.name}</Form.Label>
        </Row>
        <Row>
          <Col>
            <h5>Docente: </h5>
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={profesor}
              defaultValue={profesor}
              disabled={!changingTeacher}
              onChange={(e) => {
                setProfesor(e.target.value);
              }}
            >
              {listaProfesores.map((x, i) => {
                return (
                  <option value={x.id}>{`${x.name}  ${x.lastName}`}</option>
                );
              })}
            </Form.Control>
          </Col>
          <Col>
            <Button variant="info" onClick={updateTeacher}>
              {changingTeacher ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faPen} />
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      <h5>Progreso: 0/0</h5>
      <h5>Estudiantes:</h5>
      <TablaEstudiantes alumnos={listaAlumnos} lista={groupData.studentsList} />
      <div>{JSON.stringify(groupData)}</div>
    </BasicLayout>
  );
}

function TablaEstudiantes(props) {
  const { alumnos, lista } = props;
  return (
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
                      <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
}

function exampleInit() {
  return {
    id: "init",
    name: "init",
    studentsList: { init: ["init"] },
    teacher: "init",
  };
}
