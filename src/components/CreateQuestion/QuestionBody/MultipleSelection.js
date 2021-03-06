import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col } from "react-bootstrap";
import { questionSubmit } from "./QuestionSubmitter";
import "./QuestionBody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function MultipleSelection(props) {
  const {
    formData,
    setStatusForm,
    mode,
    listState,
    setListState,
    setShowModal,
  } = props;
  const [inputList, setInputList] = useState(formData.options);
  const [correctList, setCorrectList] = useState(formData.answer);

  const handleInputChange = (e, index) => {
    var value = e.target.value;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  const handleCorrectChange = (index) => {
    var list = [...correctList];
    if (list.includes(index)) {
      var i = list.indexOf(index);
      list.splice(i, 1);
    } else {
      list = [...list, index];
    }
    setCorrectList(list);
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

  const handleSubmit = () => {
    formData.options = inputList;
    formData.answer = correctList;
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
    <div>
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
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkCorrecta"
                    name="correcta"
                    checked={correctList.includes(i)}
                    onChange={(e) => handleCorrectChange(i)}
                  />
                  <label className="form-check-label" htmlFor="checkCorrecta">
                    Correcta
                  </label>
                </div>
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
      <div className="submit-button">
        <Button onClick={handleSubmit}>
          {mode === "create" ? <>Crear</> : <>Guardar</>}
        </Button>
      </div>
    </div>
  );
}
