import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { questionSubmit } from "./QuestionSubmitter";
import "./QuestionBody.scss";

export default function TrueOrFalse(props) {
  const { formData, setStatusForm, mode } = props;
  const [option, setOption] = useState("Verdadero");
  const options = ["Verdadero", "Falso"];

  const handleSelect = (e) => {
    setOption(e);
  };
  const handleGoBack = () => {
    setStatusForm("basic");
  };
  const handleSubmit = () => {
    formData.respuestas = options;
    formData.correctas = [options.indexOf(option)];
    toast.warning("OK");
    questionSubmit(formData, mode);
  };

  return (
    <div className="login">
      <Row>
        <Col>
          <Button onClick={handleGoBack}>Cancelar</Button>
        </Col>
      </Row>
      <Row>
        <Form.Control
          as="select"
          value={formData.respuestas[formData.correctas]}
          name="respuesta"
          onChange={(e) => handleSelect(e.target.value)}
          defaultValue={formData.respuestas}
        >
          <option>Verdadero</option>
          <option>Falso</option>
        </Form.Control>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </Col>
      </Row>
    </div>
  );
}
