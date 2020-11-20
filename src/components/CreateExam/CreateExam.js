import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { createExamApi } from "../../api/examenes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./CreateExam.scss";

export default function CreateExam(props) {
  const { setShowModal, setListState, listState } = props;

  const [formData, setFormData] = useState(initialValues());
  const [inputList, setInputList] = useState(formData.topics);
  const [createExamLoading, setCreateExamLoading] = useState(false);

  const handleAddClick = () => {
    const newItem = [""];
    setInputList(inputList.concat(newItem));
  };

  const handleInputChange = (e, index) => {
    if (e.target.name === "topics") {
      formData["topics"][index] = e.target.value;
      setFormData({
        ...formData, topics: formData["topics"],
      });
    } else {
        if (e.target.name === "dificulty"){
            formData["dificulty"][index] = e.target.value;
            setFormData({
                ...formData, dificulty: formData["dificulty"],
            });  
        } else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }      
    }
    console.log(formData)
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log(inputList);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("Complete todos los campos");
    } else {
      setCreateExamLoading(true);
      createExamApi(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Se creó el examen exitosamente");
            setListState(!listState)
            setShowModal(false);
            setFormData(initialValues());
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error del servidor, intente más tarde");
        })
        .finally(() => {
          setCreateExamLoading(false);
        });
    }
  };

  const fechaHandler = (e) => {
      console.log("hola")
    setFormData({ ...formData, date: e });
  };

  return (
    <div className="create-exam-form">
      <Form onSubmit={onSubmit}>
        <h6>Crea un Examen</h6>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="name"
                onChange={(e) => handleInputChange(e, 0)}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <Col>
            <Form.Label>Dificultad</Form.Label>
          </Col>
          <Col className="varios">
                <div className="box">
                  <Row className="row">
                      <Form.Control
                        type="text"
                        placeholder={"preguntas con dificultad 1"}
                        name="dificulty"
                        onChange={(e) => handleInputChange(e, 1)}
                      />
                  </Row>
                  <Row className="row">
                      <Form.Control
                        type="text"
                        placeholder={"preguntas con dificultad 2"}
                        name="dificulty"
                        onChange={(e) => handleInputChange(e, 2)}
                      />
                  </Row>
                  <Row className="row">
                      <Form.Control
                        type="text"
                        placeholder={"preguntas con dificultad 3"}
                        name="dificulty"
                        onChange={(e) => handleInputChange(e, 3)}
                      />
                  </Row>
                </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Temáticas</Form.Label>
          </Col>
          <Col className="varios">
            {inputList.map((x, i) => {
              return (
                <div className="box">
                  <Row className="row">
                    <Col className="item">
                      <Form.Control
                        type="text"
                        placeholder={"Ingrese temática " + (i + 1)}
                        name="topics"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Col>
                    <Col className="item-button">
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <Button
                            class="btn btn"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
            <Button onClick={handleAddClick}>Añadir tema</Button>
          </Col>
        </Row>
        <Row className="fecha">
            <Col>
              <Form.Label>Fecha de examen</Form.Label>
            </Col>
            <Col>
              <DatePicker
                name="birthDate"
                selected={formData.date}
                onChange={(date) => fechaHandler(date)}
              />
            </Col>
          </Row>
        <div className="btn-cont">
          <Button type="submit" className="btn-create">
            {!createExamLoading ? (
              "Generar"
            ) : (
              <Spinner animation="border"></Spinner>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
  
}



function initialValues() {
  return {
    name: "",
    questions: 0,
    dificulty: {
        "1": 0,
        "2": 0,
        "3": 0
    },
    topics: [""],
    date: new Date()
  };
}
