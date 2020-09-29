import React, { useState } from "react";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import { createUserAPI, updateUserAPI } from "../../api/usuarios";
import "react-datepicker/dist/react-datepicker.css";

import {
  Row,
  Col,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import "./CreateUser.scss";

export default function CreateUser(props) {
  const { setShowModal, userData, mode } = props;
  const [formData, setFormData] = useState(userData);
  const [idTypeSelector, setidTypeSelector] = useState("Seleccione tipo de id");

  var editing = false;
  console.log(formData);
  console.log(
    "mi nacimiento: " +
      formData.birthDate +
      " de tipo " +
      formData.birthDate.type
  );

  mode === "create" ? (editing = false) : (editing = true);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    console.log(e);
    setidTypeSelector(e);
    setFormData({ ...formData, idType: e });
  };

  const onSubmit = (e) => {
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
        console.log(formData);
        toast.success("OK");
        if (editing) {
          updateUserAPI(formData)
            .then((response) => {
              if (response.code) {
                toast.warning(response.message);
              } else {
                toast.success("La actualización fue existosa");
                setShowModal(false);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error del servidor, intente más tarde");
            })
            .finally(() => {
              //window.location.reload();
            });
        } else {
          createUserAPI(formData)
            .then((response) => {
              if (response.code) {
                toast.warning(response.message);
              } else {
                toast.success("El registro fue existoso");
                setShowModal(false);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error del servidor, intente más tarde");
            })
            .finally(() => {
              //window.location.reload();
            });
        }
      }
    }
  };
  return (
    <div className="login">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <h3>id</h3>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="id"
                name="id"
                defaultValue={formData.id}
                disabled={editing}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Tipo de id</h3>
            </Col>
            <Col>
              <DropdownButton
                alignRight
                title={idTypeSelector}
                id="dropdown-menu-align-right"
                name="idType"
                onSelect={handleSelect}
                disabled={editing}
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
                name="name"
                defaultValue={formData.name}
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
                name="lastName"
                defaultValue={formData.lastName}
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
                name="birthDate"
                //selected={moment(formData.birthDate, "DD-MM-YYYY")}
                onChange={(date) =>
                  setFormData({ ...formData, birthDate: date })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <center>
          <h6>{JSON.stringify(formData.birthDate)}</h6>
          <Button variant="primary" type="submit">
            Crear
          </Button>
        </center>
      </Form>
    </div>
  );
}
