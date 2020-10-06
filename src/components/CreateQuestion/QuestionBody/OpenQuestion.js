import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { questionSubmit } from "./QuestionSubmitter";
import "./QuestionBody.scss";

export default function OpenQuestion(props) {
  const { formData, setStatusForm, mode } = props;
  const handleGoBack = () => {
    setStatusForm("basic");
  };
  const handleSubmit = () => {
    toast.warning("OK");
    formData.respuestas = ["Abierta"];
    formData.correctas = [0];
    questionSubmit(formData, mode);
  };
  return (
    <div className="login">
      <Row>
        <Col>
          <Button onClick={handleGoBack}>Cancelar</Button>
        </Col>
        <Col>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </Col>
      </Row>
    </div>
  );
}
