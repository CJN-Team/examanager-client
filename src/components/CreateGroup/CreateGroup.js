import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import { listUsersAPI } from "../../api/usuarios";
import { createGroupAPI } from "../../api/grupos";

export default function CreateGroup(props) {
  const { groupData, listState, setListState, setShowModal } = props;

  const [formData, setFormData] = useState(groupData);

  const [teacherList, setTeacherList] = useState([
    { name: "init", id: "init" },
  ]);
  const [studentList, setStudentList] = useState([
    { name: "init", id: "init" },
  ]);

  useEffect(() => {
    listUsersAPI("Profesor").then((response) => {
      setTeacherList(response);
    });
    listUsersAPI("Estudiante").then((response) => {
      setStudentList(response);
    });
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheck = (e, est) => {
    if (est.id in formData.studentsList) {
      delete formData.studentsList[est.id];
    } else {
      formData.studentsList[est.id] = [];
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    delete formData[""];
    if (formData.id !== "") {
      if (formData.name !== "") {
        if (formData.teacher !== "") {
          if (Object.keys(formData.studentsList).length > 0) {
            createGroupAPI(formData)
              .then((response) => {
                if (response.code) {
                  toast.warning(response.message);
                } else {
                  toast.success("Creación exitosa.");
                  setListState(listState + 1);
                  setShowModal(false);
                }
              })
              .catch((err) => {
                console.log(err);
                toast.error(`Error: ${err}, intente denuevo más tarde.`);
              })
              .finally(() => {});
          } else {
            toast.warning("Debes seleccionar al menos un estudiante.");
          }
        } else {
          toast.warning("Debes seleccionar un profesor.");
        }
      } else {
        toast.warning("Debes ingresar un nombre.");
      }
    } else {
      toast.warning("Debes ingresar un ID.");
    }
  };

  return (
    <div>
      <Form onChange={onChange} onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>id</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="id"
                name="id"
                defaultValue={formData.id}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                defaultValue={formData.name}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Profesor</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={formData.teacher}
                name="teacher"
                defaultValue={formData.teacher}
                onChange={(e) =>
                  setFormData({ ...formData, teacher: e.target.value })
                }
              >
                <option value="">Seleccionar</option>
                {teacherList.map((x, i) => {
                  return (
                    <option value={x.id}>{`${x.name}  ${x.lastName}`}</option>
                  );
                })}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Form.Label>Estudiantes</Form.Label>
          </Row>
          {studentList.map((x, i) => {
            return (
              <Row>
                <Col>
                  <Form.Label>{`${x.name}  ${x.lastName}`}</Form.Label>
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    checked={x.id in formData.studentsList}
                    onChange={(e) => {
                      onCheck(e, x);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        </Form.Group>
        <center>
          <Button variant="primary" type="submit">
            Crear
          </Button>
        </center>
      </Form>
    </div>
  );
}
