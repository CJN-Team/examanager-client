import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col } from "react-bootstrap";
import "./QuestionBody.scss";

export default function MultipleSelection(props) {
  const { formData, setStatusForm } = props;
  const [inputList, setInputList] = useState([
    { respuesta: "", correcta: "false" },
  ]);

  const handleInputChange = (e, index) => {
    var { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (name === "correcta") {
      list[index][name] === "false"
        ? (list[index][name] = "true")
        : (list[index][name] = "false");
    }
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { respuesta: "", correcta: "false" }]);
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

  let respuestas = [];
  let correctas = [];

  inputList.forEach(function (value, i) {
    respuestas.push(value.respuesta);
    if (value.correcta === "true") {
      correctas.push(i);
    }
  });

  formData.respuestas = respuestas;
  formData.correctas = correctas;
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
                  value={x.respuesta}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkCorrecta"
                    name="correcta"
                    value={x.correcta}
                    onChange={(e) => handleInputChange(e, i)}
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
