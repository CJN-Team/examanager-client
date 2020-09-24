import React, { useState } from "react";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Row,
  Col,
  Form,
  Button,
  Spinner,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import "./CreateUser.scss";

export default function CreateUser() {
  const [formData, setFormData] = useState(initialValues());
  const [idTypeSelector, setIdTypeSelector] = useState("Seleccione tipo de ID");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    console.log(e);
    setIdTypeSelector(e);
    setFormData({ ...formData, idType: e });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("Complete todos los campos");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Ingrese un email válido");
      } else {
        toast.success("OK");
        //setShowModal(false);
      }
    }
  };
  return (
    <div className="create-user">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <h3>ID</h3>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="ID"
                name="id"
                defaultValue={formData.id}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Tipo de ID</h3>
            </Col>
            <Col>
              <DropdownButton
                alignRight
                title={idTypeSelector}
                id="dropdown-menu-align-right"
                name="idType"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="CC">
                  Cédula de ciudadanía
                </Dropdown.Item>
                <Dropdown.Item eventKey="TI">
                  Tarjeta de identidad
                </Dropdown.Item>
                <Dropdown.Item eventKey="CE">
                  Cédula de extranjería
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <h3>Nombre</h3>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={formData.nombre}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Apellidos</h3>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                defaultValue={formData.apellidos}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Correo</h3>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Correo"
                name="email"
                defaultValue={formData.email}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Fecha de nacimiento</h3>
            </Col>
            <Col>
              <DatePicker
                selected={formData.fechaNacimiento}
                name="fechaNacimiento"
                onChange={(date) =>
                  setFormData({ ...formData, fechaNacimiento: date })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    id: "",
    idType: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    email: "",
  };
}
