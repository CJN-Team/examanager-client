import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col } from "react-bootstrap";
import "./QuestionBody.scss";

export default function MultipleSelection(props) {
  const { formData, setStatusForm } = props;
  const [inputList, setInputList] = useState(formData.respuestas);
  const [correctList, setCorrectList] = useState(formData.correctas);

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
    let valido = true;
    formData.respuestas.forEach(function (value, i) {
      if (value === "") {
        toast.warning(`Por favor escriba algo en la pregunta ${i + 1}.`);
        valido = false;
      }
    });
    if (valido) {
      if (formData.respuestas.length < 2) {
        toast.warning("Ingrese al menos dos opciones.");
      } else if (formData.correctas.length < 1) {
        toast.warning("Al menos una respuesta debe ser correcta.");
      } else {
        toast.success("Todo bien.");
        console.log(formData); //ENVIO A BD
      }
    }
  };

  formData.respuestas = inputList;
  formData.correctas = correctList;

  return (
    <div className="login">
      <div>
        <Button onClick={handleGoBack}>Volver</Button>
      </div>
      <h3>Ingresar respuestas</h3>
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
        <Button onClick={handleSubmit}>Crear</Button>
      </div>
      <div style={{ marginTop: 20 }}>{JSON.stringify(formData)}</div>
    </div>
  );
}
