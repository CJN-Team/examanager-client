import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { questionSubmit } from "./QuestionSubmitter";
import "./QuestionBody.scss";

export default function TrueOrFalse(props) {
  const {
    formData,
    setStatusForm,
    mode,
    listState,
    setListState,
    setShowModal,
  } = props;
  const [option, setOption] = useState("Verdadero");
  const options = ["Verdadero", "Falso"];

  const handleSelect = (e) => {
    setOption(e);
  };
  const handleGoBack = () => {
    setStatusForm("basic");
  };
  const handleSubmit = () => {
    formData.options = options;
    formData.answer = [options.indexOf(option)];
    questionSubmit(formData, mode, listState, setListState, setShowModal);
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
          value={formData.options[formData.answer]}
          name="respuesta"
          onChange={(e) => handleSelect(e.target.value)}
          defaultValue={formData.options}
        >
          <option>Verdadero</option>
          <option>Falso</option>
        </Form.Control>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleSubmit}>
            {mode === "create" ? <>Crear</> : <>Guardar</>}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
