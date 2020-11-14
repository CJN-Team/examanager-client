import React, { useState, useEffect } from "react";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import MultipleSelection from "./QuestionBody/MultipleSelection";
import OpenQuestion from "./QuestionBody/OpenQuestion";
import SingleAnswer from "./QuestionBody/SingleAnswer";
import TrueOrFalse from "./QuestionBody/TrueOrFalse";

export default function CreateQuestion(props) {
  const { form, mode, listState, setListState, setShowModal } = props;
  const [statusForm, setStatusForm] = useState("basic");
  const [formData, setFormData] = useState(form);

  var editing = false;
  mode === "create" ? (editing = false) : (editing = true);

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
                  disabled={editing}
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
                  name="question"
                  defaultValue={formData.question}
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
                  value={formData.category}
                  name="category"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  defaultValue={formData.category}
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
                  value={formData.difficulty}
                  name="difficulty"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value,
                    })
                  }
                  defaultValue={formData.difficulty}
                >
                  <option value={1}>Básico</option>
                  <option value={2}>Intermedio</option>
                  <option value={3}>Avanzado</option>
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
    if (formData.category === "Pregunta abierta") {
      return (
        <OpenQuestion
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
          listState={listState}
          setListState={setListState}
          setShowModal={setShowModal}
        />
      );
    } else if (formData.category === "Selección múltiple") {
      return (
        <MultipleSelection
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
          listState={listState}
          setListState={setListState}
          setShowModal={setShowModal}
        />
      );
    } else if (formData.category === "Respuesta única") {
      return (
        <SingleAnswer
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
          listState={listState}
          setListState={setListState}
          setShowModal={setShowModal}
        />
      );
    } else if (formData.category === "Verdadero o falso") {
      return (
        <TrueOrFalse
          formData={formData}
          setStatusForm={setStatusForm}
          mode={mode}
          listState={listState}
          setListState={setListState}
          setShowModal={setShowModal}
        />
      );
    }
  }
}
