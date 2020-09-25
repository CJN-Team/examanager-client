import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./QuestionBody.scss";

export default function OpenQuestion(props) {
  const { formData, setStatusForm } = props;
  const handleGoBack = () => {
    setStatusForm("basic");
  };
  const handleSubmit = () => {
    toast.warning("OK");
  };
  return (
    <div className="question-body">
      <Row>
        <Col>
          <Button onClick={handleGoBack}>Cancelar</Button>
        </Col>
        <Col>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>{JSON.stringify(formData)}</div>
    </div>
  );
}
