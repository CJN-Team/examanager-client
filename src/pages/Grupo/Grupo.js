import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { withRouter } from "react-router-dom";
import { getGroupAPI, updateGroupAPI } from "../../api/grupos";
import { listUsersAPI } from "../../api/usuarios";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentTable from "../../components/StudentTable/StudentTable";
import { toast } from "react-toastify";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

export default withRouter(Grupo);

function Grupo(props) {
  const { setRefreshLogin, match } = props;
  const [groupData, setGroupData] = useState(exampleInit);
  const [profesor, setProfesor] = useState("init");
  const [listaProfesores, setListaProfesores] = useState([]);
  const [listaAlumnos, setListaAlumnos] = useState([{ id: "init" }]);
  const [changingTeacher, setChangingTeacher] = useState(false);

  const grupo = match["params"]["id"];
  const user = useAuth();

  useEffect(() => {
    getGroupAPI(grupo).then((response) => {
      setGroupData(response);
    });
  }, []);

  useEffect(() => {
    document.title = groupData.name;
    listUsersAPI("Profesor").then((response) => {
      setListaProfesores(response);
    });
    listUsersAPI("Estudiante").then((response) => {
      setListaAlumnos(response);
    });
    setProfesor(groupData.teacher);
  }, [groupData]);

  const updateTeacher = () => {
    if (changingTeacher) {
      setGroupData({ ...groupData, teacher: profesor });
      sendTeacherUpdate();
    }
    setChangingTeacher(!changingTeacher);
  };

  const sendTeacherUpdate = () => {
    const change = {
      teacher: profesor,
    };

    updateGroupAPI(change, groupData.id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se ha actualizado el profesor.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error: ${err}, intente denuevo más tarde.`);
      })
      .finally(() => {});
  };

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin}>
      <Form>
        <Row>
          <Form.Label>{groupData.name}</Form.Label>
        </Row>
        <Row>
          <Col>
            <h5>Asignatura: {groupData.subject}</h5>
          </Col>
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
            {user.profile === "Administrador" && (
              <Button variant="info" onClick={updateTeacher}>
                {changingTeacher ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faPen} />
                )}
              </Button>
            )}
          </Col>
        </Row>
      </Form>

      <h5>Progreso: 0/0</h5>
      <h5>Estudiantes:</h5>
      <StudentTable
        alumnos={listaAlumnos}
        lista={groupData.studentsList}
        id={groupData.id}
      />
    </BasicLayout>
  );
}

function exampleInit() {
  return {
    id: "init",
    name: "init",
    studentsList: { init: ["init"] },
    teacher: "init",
    subject: "init",
  };
}
