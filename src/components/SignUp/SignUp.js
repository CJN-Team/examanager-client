import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createInstApi, createUserApi } from "../../api/auth.js";

import "./SignUp.scss";

export default function SignUp(props) {
  const { setShowModal } = props;

  const [formData, setFormData] = useState(initialValues());
  const [signUpLoading, setSignUpLoading] = useState(false);

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
      if (!isEmailValid(formData.email)) {
        toast.warning("Ingrese un email válido");
      } else {
        setSignUpLoading(true);
        createInstApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              createUserApi(formData, response.institutionID)
                .then((response) => {
                  if (response.code) {
                    toast.warning(response.message);
                  } else {
                    toast.success("El registro fue existoso");
                    setShowModal(false);
                    setFormData(initialValues());
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Error del servidor, intente más tarde");
                });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error del servidor, intente más tarde");
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      }
    }
  };

  return (
    <div className="sign-up-form">
      <Form onSubmit={onSubmit}>
        <h6>Crea una institución</h6>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={formData.nameInst}
                onChange={(e) =>
                  setFormData({ ...formData, nameInst: e.target.value })
                }
                defaultValue={formData.nameInst}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Tipo de institución</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={formData.typeInst}
                onChange={(e) =>
                  setFormData({ ...formData, typeInst: e.target.value })
                }
                defaultValue={formData.typeInst}
              >
                <option>Colegio</option>
                <option>Universidad</option>
                <option>Instituto Técnico o Tecnológico</option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Dirección</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                defaultValue={formData.address}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Teléfono</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de teléfono"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <h6>Información del Administrador</h6>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                defaultValue={formData.userName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Apellido</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                defaultValue={formData.lastName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Numero ID</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Numero de identificación"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                defaultValue={formData.id}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Tipo de ID</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={formData.idType}
                onChange={(e) =>
                  setFormData({ ...formData, idType: e.target.value })
                }
                defaultValue={formData.idType}
              >
                <option>CC</option>
                <option>TI</option>
                <option>CE</option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Fecha de Nacimiento</Form.Label>
            </Col>
            <Col>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date: date })}
                defaultValue={formData.date}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Correo</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Correo"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                defaultValue={formData.email}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Contraseña</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                defaultValue={formData.password}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? (
            "Registrarse"
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
    nameInst: "",
    typeInst: "Colegio",
    address: "",
    phone: "",
    id: "",
    idType: "CC",
    userName: "",
    lastName: "",
    date: "",
    email: "",
    password: "",
  };
}
