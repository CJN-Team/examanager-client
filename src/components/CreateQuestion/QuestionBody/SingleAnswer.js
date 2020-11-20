import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Form } from "react-bootstrap";
import { questionSubmit } from "./QuestionSubmitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./QuestionBody.scss";

export default function SingleAnswer(props) {
  const {
    formData,
    setStatusForm,
    mode,
    listState,
    setListState,
    setShowModal,
  } = props;
  const [inputList, setInputList] = useState(formData.options);
  const [respCorrecta, setCorrecta] = useState(Math.abs(formData.answer[0]));

  const handleInputChange = (e, index) => {
    const list = [...inputList];
    list[index] = e.target.value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  const handleGoBack = () => {
    setStatusForm("basic");
  };

  const getSeleccionada = (e) => {
    let idx = formData.options.indexOf(e.target.value);
    setCorrecta(idx);
  };

  const handleSubmit = () => {
    formData.options = inputList;
    formData.answer = [respCorrecta];
    let valido = true;
    formData.options.forEach(function (value, i) {
      if (value === "") {
        toast.warning(`Por favor escriba algo en la pregunta ${i + 1}.`);
        valido = false;
      }
    });
    if (valido) {
      if (formData.options.length < 2) {
        toast.warning("Ingrese al menos dos opciones.");
      } else if (formData.answer.length < 1) {
        toast.warning("Al menos una respuesta debe ser correcta.");
      } else {
        questionSubmit(formData, mode, listState, setListState, setShowModal);
      }
    }
  };

  return (
    <div className="login">
      <div>
        <Row className="answer-submit-header">
          <Col>
            <FontAwesomeIcon
              onClick={handleGoBack}
              icon={faAngleLeft}
              size="2x"
              className="go-back"
            />
            <h5>Ingresar respuestas</h5>
          </Col>
        </Row>
      </div>

      {inputList.map((x, i) => {
        return (
          <div className="box" key={i} className="answer-list">
            <Row>
              <Col>
                <input
                  name="respuesta"
                  placeholder="Ingrese respuesta"
                  value={x}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Col>
              <Col>
                <div className="btn-box">
                  <Col className="icons">
                    {inputList.length !== 1 && (
                      <FontAwesomeIcon
                        onClick={() => handleRemoveClick(i)}
                        icon={faMinusSquare}
                        size="2x"
                        className="icon-minus"
                      />
                    )}
                    {inputList.length - 1 === i && (
                      <FontAwesomeIcon
                        onClick={handleAddClick}
                        icon={faPlusSquare}
                        size="2x"
                        className="icon-add"
                      />
                    )}
                  </Col>
                </div>
              </Col>
            </Row>
          </div>
        );
      })}

      <div className="answer-selector">
        <Row>
          <Col>
            <Form.Label>Respuesta correcta:</Form.Label>
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={formData.options[respCorrecta]}
              name="correctas"
              onChange={(e) => getSeleccionada(e)}
            >
              {inputList.map((x, i) => {
                return <option key={i}>{x}</option>;
              })}
            </Form.Control>
          </Col>
        </Row>
      </div>
      <div className="submit-button">
        <Button onClick={handleSubmit}>
          {mode === "create" ? <>Crear</> : <>Guardar</>}
        </Button>
      </div>
    </div>
  );
}
