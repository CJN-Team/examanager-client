import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./QuestionBody.scss";

export default function TrueOrFalse(props) {
  const { formData, setStatusForm } = props;
  const [option, setOption] = useState("Verdadero");
  const options = ["Verdadero", "Falso"];

  const handleSelect = (e) => {
    setOption(e);
  };
  const handleGoBack = () => {
    setStatusForm("basic");
  };
  const handleSubmit = () => {
    toast.warning("OK");
  };

  formData.respuestas = options;
  formData.correctas = options.indexOf(option);

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
      <div style={{ marginTop: 20 }}>{JSON.stringify(formData)}</div>
    </div>
  );
}
