import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { createAsigmentApi } from "../../Api/Asigment";

import "./CreateAsigment.scss";

export default function SignUp(props) {
  const { setShowModal } = props;

  const [formData, setFormData] = useState(initialValues());
  const [createAsigLoading, setCreateAsigLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("Complete todos los campos");
    } else {
      setCreateAsigLoading(true);
      createAsigmentApi(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Se creó la asignatura exitosamente");
            setShowModal(false);
            setFormData(initialValues());
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error del servidor, intente más tarde");
        })
        .finally(() => {
          setCreateAsigLoading(false);
        });
    }
  };

  return (
    <div className="sign-up-form">
      <Form onSubmit={onSubmit}>
        <h6>Crea una asignatura</h6>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                defaultValue={formData.name}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Temáticas</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese la temática 1"
                value={formData.topics}
                onChange={(e) =>
                  setFormData({ ...formData, topics: [e.target.value] })
                }
                defaultValue={formData.topics}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!createAsigLoading ? (
            "Crear"
          ) : (
            <Spinner animation="border"></Spinner>
          )}
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    name: "",
    topics: [""],
  };
}
