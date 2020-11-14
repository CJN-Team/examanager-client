import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Form } from "react-bootstrap";
import { questionSubmit } from "./QuestionSubmitter";
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
        <Button onClick={handleGoBack}>Volver</Button>
      </div>
      <Form.Label>Ingresar respuestas</Form.Label>

      {inputList.map((x, i) => {
        return (
          <div className="box">
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
                  <Col>
                    {inputList.length !== 1 && (
                      <Button onClick={() => handleRemoveClick(i)}>
                        Quitar
                      </Button>
                    )}
                  </Col>
                  <Col>
                    {inputList.length - 1 === i && (
                      <Button onClick={handleAddClick}>Agregar</Button>
                    )}
                  </Col>
                </div>
              </Col>
            </Row>
          </div>
        );
      })}

      <div>
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
                return <option>{x}</option>;
              })}
            </Form.Control>
          </Col>
        </Row>
      </div>
      <div>
        <Button onClick={handleSubmit}>
          {mode === "create" ? <>Crear</> : <>Guardar</>}
        </Button>
      </div>
    </div>
  );
}
