import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { listUsersAPI } from "../../api/usuarios";
import { createDeptAPI, editDeptAPI } from "../../api/departamentos";
import { toast } from "react-toastify";

import "./CreateDept.scss";

export default function CreateDept(props) {
  const { form, mode, listState, setListState, setShowModal } = props;
  const [formData, setFormData] = useState(form);
  const [loading, setLoading] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [teacherList, setTeacherList] = useState([
    { name: "init", id: "init" },
  ]);

  useEffect(() => {
    (async () => {
      await listUsersAPI("Profesor").then((response) => {
        setTeacherList(response);
      });
      setLoadingTeachers(false);
    })();
  }, []);

  const onCheckTeacher = (teacher) => {
    var selected = formData.teachers;
    var index = selected.indexOf(teacher);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(teacher);
    }
    setFormData({ ...formData, teachers: selected });
  };

  const onSubmit = async () => {
    setLoading(true);
    if (formData.name !== "") {
      if (formData.teachers.length > 0) {
        if (mode === "edit") {
          await editDeptAPI(formData)
            .then((response) => {
              if (response.code) {
                toast.warning(response.message);
              } else {
                toast.success("Actualización exitosa.");
                setListState(listState + 1);
                setShowModal(false);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              toast.error(`Error: ${err}, intente denuevo más tarde.`);
            });
        } else {
          await createDeptAPI(formData)
            .then((response) => {
              if (response.code) {
                toast.warning(response.message);
              } else {
                toast.success("Creación exitosa.");
                setListState(listState + 1);
                setShowModal(false);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              toast.error(`Error: ${err}, intente denuevo más tarde.`);
            });
        }
      } else {
        toast.warning("Seleccione al menos un profesor.");
      }
    } else {
      toast.warning("Debe ingresar un nombre.");
    }
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                defaultValue={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Profesores:</Form.Label>
            </Col>
          </Row>
          {loadingTeachers ? (
            <Spinner animation="border" className="spin" />
          ) : (
            teacherList.map((x, i) => {
              return (
                <Row className="list" key={x.id}>
                  <Col>
                    <Form.Label>{`${x.name} ${x.lastName}`}</Form.Label>
                  </Col>
                  <Col>
                    <Form.Check
                      checked={formData.teachers.includes(x.id)}
                      onChange={() => onCheckTeacher(x.id)}
                    />
                  </Col>
                </Row>
              );
            })
          )}
        </Form.Group>
        <Button onClick={onSubmit} className="accept-button">
          {loading ? <Spinner animation="border" /> : <>Aceptar</>}
        </Button>
      </Form>
    </div>
  );
}
