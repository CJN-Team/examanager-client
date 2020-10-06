import React, { useState } from "react";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { Row, Col, Form, Button } from "react-bootstrap";
import MultipleSelection from "./QuestionBody/MultipleSelection";
import OpenQuestion from "./QuestionBody/OpenQuestion";
import SingleAnswer from "./QuestionBody/SingleAnswer";
import TrueOrFalse from "./QuestionBody/TrueOrFalse";

export default function CreateQuestion(props) {
  const { form, mode } = props;
  const [statusForm, setStatusForm] = useState("basic");
  const [formData, setFormData] = useState(form);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      toast.success("OK");
      setStatusForm("advanced");
    }
  };

  if (statusForm === "basic") {
    return (
      <div className="login">
        <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>ID</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text-area"
                  placeholder="Id"
                  name="id"
                  defaultValue={formData.id}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Pregunta</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text-area"
                  placeholder="Pregunta"
                  name="pregunta"
                  defaultValue={formData.pregunta}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Tipo de pregunta</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  value={formData.categoria}
                  name="categoria"
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  defaultValue={formData.categoria}
                >
                  <option>Pregunta abierta</option>
                  <option>Selección múltiple</option>
                  <option>Respuesta única</option>
                  <option>Verdadero o falso</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Dificultad</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  value={formData.dificultad}
                  name="dificultad"
                  onChange={(e) =>
                    setFormData({ ...formData, dificultad: e.target.value })
                  }
                  defaultValue={formData.dificultad}
                >
                  <option>Básico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Siguiente
          </Button>
        </Form>
      </div>
    );
  } else if (statusForm === "advanced") {
    if (formData.categoria === "Pregunta abierta") {
      return (
        <OpenQuestion
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
        />
      );
    } else if (formData.categoria === "Selección múltiple") {
      return (
        <MultipleSelection
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
        />
      );
    } else if (formData.categoria === "Respuesta única") {
      return (
        <SingleAnswer
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
        />
      );
    } else if (formData.categoria === "Verdadero o falso") {
      return (
        <TrueOrFalse
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
        />
      );
    }
  }
}
