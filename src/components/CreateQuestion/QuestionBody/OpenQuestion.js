import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { questionSubmit } from "./QuestionSubmitter";
import "./QuestionBody.scss";

export default function OpenQuestion(props) {
  const {
    formData,
    setStatusForm,
    mode,
    listState,
    setListState,
    setShowModal,
  } = props;
  const handleGoBack = () => {
    setStatusForm("basic");
  };
  const handleSubmit = () => {
    formData.options = ["Abierta"];
    formData.answer = [0];
    questionSubmit(formData, mode, listState, setListState, setShowModal);
  };
  return (
    <div className="login">
      <Row>
        <Col>
          <Button onClick={handleGoBack}>Cancelar</Button>
        </Col>
        <Col>
          <Button onClick={handleSubmit}>
            {mode === "create" ? <>Crear</> : <>Guardar</>}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
