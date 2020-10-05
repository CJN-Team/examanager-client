import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, Form } from "react-bootstrap";
import "./QuestionBody.scss";

export default function SingleAnswer(props) {
  const { formData, setStatusForm } = props;
  const [inputList, setInputList] = useState([{ respuesta: "" }]);
  const [respCorrecta, setCorrecta] = useState(0);
  let respuestas = [];

  const handleInputChange = (e, index) => {
    var { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { respuesta: "" }]);
  };

  const handleGoBack = () => {
    setStatusForm("basic");
  };

  const getSeleccionada = (e) => {
    let idx = formData.respuestas.indexOf(e.target.value);
    setCorrecta(idx);
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

  inputList.forEach(function (value, i) {
    respuestas.push(value.respuesta);
  });

  formData.respuestas = respuestas;
  formData.correctas = respCorrecta;

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
                  value={x.respuesta}
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
              value={formData.respuestas[respCorrecta]}
              name="correctas"
              onChange={(e) => getSeleccionada(e)}
              defaultValue={formData.respuestas}
            >
              {respuestas.map((x, i) => {
                return <option>{x}</option>;
              })}
            </Form.Control>
          </Col>
        </Row>
      </div>
      <div>
        <Button onClick={handleSubmit}>Crear</Button>
      </div>
      <div style={{ marginTop: 20 }}>{JSON.stringify(formData)}</div>
    </div>
  );
}
