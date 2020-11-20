import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { withRouter } from "react-router-dom";
import { listUsersAPI } from "../../api/usuarios";
import { Row, Col, Button, Form, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentTable from "../../components/StudentTable/StudentTable";
import { toast } from "react-toastify";
import BasicModal from "../../components/BasicModal/BasicModal";
import useAuth from "../../hooks/useAuth";
import { capitalize } from "../../utils/strings";
import {
  getGroupAPI,
  updateGroupAPI,
  getGroupProgressAPI,
} from "../../api/grupos";
import {
  faCheck,
  faPen,
  faTimes,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./Grupo.scss";

export default withRouter(Grupo);

function Grupo(props) {
  const { setRefreshLogin, match } = props;
  const [groupData, setGroupData] = useState(exampleInit);
  const [showModal, setShowModal] = useState(false);
  const [profesor, setProfesor] = useState("cargando...");
  const [listaProfesores, setListaProfesores] = useState([]);
  const [listaAlumnos, setListaAlumnos] = useState([{ id: "cargando..." }]);
  const [changingTeacher, setChangingTeacher] = useState(false);
  const [progreso, setProgreso] = useState(null);

  const [loading, setLoading] = useState(true);

  const grupo = match["params"]["id"];
  const user = useAuth();

  useEffect(() => {
    getGroupAPI(grupo).then((response) => {
      setGroupData(response);
    });
    getGroupProgressAPI(grupo).then((response) => {
      setProgreso(response);
    });
  }, []);

  useEffect(() => {
    async function actualizarDatos() {
      document.title = capitalize(groupData.name);
      await listUsersAPI("Profesor").then((response) => {
        setListaProfesores(response);
      });
      await listUsersAPI("Estudiante").then((response) => {
        setListaAlumnos(response);
      });
      await setProfesor(groupData.teacher);
      await setLoading(false);
    }
    actualizarDatos();
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

  if (loading) {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="grupos">
        <Spinner animation="border" />
      </BasicLayout>
    );
  }

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin} ruta="grupos">
      <Form className="grupo-cont">
        <Row>
          <h4>{capitalize(groupData.name)}</h4>
        </Row>
        <Row>
          <Col>
            <h5>Asignatura: {capitalize(groupData.subject)}</h5>
          </Col>
        </Row>
        <Row className="teacher-row">
          <Col>
            <h5>Docente: </h5>
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={profesor}
              className="teacher-select"
              disabled={!changingTeacher}
              onChange={(e) => {
                setProfesor(e.target.value);
              }}
            >
              {listaProfesores.map((x, i) => {
                return (
                  <option value={x.id} key={x.id}>{`${capitalize(
                    x.name
                  )}  ${capitalize(x.lastName)}`}</option>
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

      <div className="progress">
        <h5>Progreso: </h5>
        <h5 onClick={() => setShowModal(true)} className="progress-num">
          {progressToString(progreso)}{" "}
          <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
        </h5>
      </div>
      <h5>Estudiantes: </h5>
      <StudentTable
        alumnos={listaAlumnos}
        lista={groupData.studentsList}
        id={groupData.id}
      />
      <Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          <ProgressDetail progreso={progreso} />
        </BasicModal>
      </Container>
    </BasicLayout>
  );
}

function ProgressDetail(props) {
  const { progreso } = props;
  return (
    <table class="table" className="progress-table">
      <thead className="progress-head">
        <tr>
          <th>Tema</th>
          <th>Visto</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(progreso).map((x, index) => {
          return (
            <tr className="progress-row" key={index}>
              <td>{capitalize(x)}</td>
              <td className="progress-icon">
                {progreso[x] ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function progressToString(progreso) {
  if (progreso === null) {
    return "0 de 0";
  }
  var cont = 0;
  for (var key in progreso) {
    if (progreso[key] == true) {
      cont += 1;
    }
  }
  return `${cont} de ${Object.keys(progreso).length}`;
}

function exampleInit() {
  return {
    id: "init",
    name: "Cargando...",
    studentsList: { init: ["init"] },
    teacher: "init",
    subject: "init",
  };
}
