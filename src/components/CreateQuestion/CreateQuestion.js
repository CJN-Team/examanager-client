import React, { useState } from "react";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import MultipleSelection from "./QuestionBody/MultipleSelection";
import OpenQuestion from "./QuestionBody/OpenQuestion";
import SingleAnswer from "./QuestionBody/SingleAnswer";
import TrueOrFalse from "./QuestionBody/TrueOrFalse";

import {
  Row,
  Col,
  Form,
  Button,
  Spinner,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

//import "./CreateQuestion.scss";

export default function CreateQuestion() {
  const [statusForm, setStatusForm] = useState("basic");
  const [formData, setFormData] = useState(initialValues());
  const [questionType, setQuestionTypeSelector] = useState(
    "Seleccione tipo de pregunta"
  );
  const [difficulty, setDifficulty] = useState("Seleccione dificultad");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectType = (e) => {
    setQuestionTypeSelector(e);
    setFormData({ ...formData, categoria: e });
  };
  const handleSelectDifficulty = (e) => {
    setDifficulty(e);
    setFormData({ ...formData, dificultad: e });
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
                <h3>Pregunta</h3>
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
                <h3>Tipo de pregunta</h3>
              </Col>
              <Col>
                <DropdownButton
                  alignRight
                  title={questionType}
                  id="dropdown-menu-align-right"
                  name="categoria"
                  onSelect={handleSelectType}
                >
                  <Dropdown.Item eventKey="Pregunta abierta">
                    Pregunta abierta
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Selección múltiple">
                    Selección múltiple
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Respuesta única">
                    Respuesta única
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Verdadero o falso">
                    Verdadero o falso
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Dificultad</h3>
              </Col>
              <Col>
                <DropdownButton
                  alignRight
                  title={difficulty}
                  id="dropdown-menu-align-right"
                  name="dificultad"
                  onSelect={handleSelectDifficulty}
                >
                  <Dropdown.Item eventKey="Básico">Básico</Dropdown.Item>
                  <Dropdown.Item eventKey="Intermedio">
                    Intermedio
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Avanzado">Avanzado</Dropdown.Item>
                </DropdownButton>
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
      return <OpenQuestion formData={formData} setStatusForm={setStatusForm} />;
    } else if (formData.categoria === "Selección múltiple") {
      return (
        <MultipleSelection formData={formData} setStatusForm={setStatusForm} />
      );
    } else if (formData.categoria === "Respuesta única") {
      return <SingleAnswer formData={formData} setStatusForm={setStatusForm} />;
    } else if (formData.categoria === "Verdadero o falso") {
      return <TrueOrFalse formData={formData} setStatusForm={setStatusForm} />;
    }
  }
}

function initialValues() {
  return {
    pregunta: "",
    categoria: "",
    dificultad: "",
  };
}
