import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values } from "lodash";
import { toast } from "react-toastify";
import { createExamApi, generateExamsApi } from "../../api/examenes";
import { listOneAsigmentApi } from "../../api/asigment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getGroupAPI } from "../../api/grupos";

import "./CreateExam.scss";

export default function CreateExam(props) {
  const { setShowModal, setListState, listState, groupID } = props;
  const [groupData, setGroupData] = useState({});
  const [createExamLoading, setCreateExamLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues());
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      await getGroupAPI(groupID).then((response) => {
        setGroupData(response);
      });
    }
    fetchAllData();
  }, []);

  useEffect(() => {
    formData["groupId"] = groupID;
    formData["institution"] = groupData["institution"];
    formData["subjectID"] = groupData["subject"];
    async function fetchAllTopics() {
      await listOneAsigmentApi(groupData.subject).then((response) => {
        setTopics(response[groupData.subject]);
      });
    }
    fetchAllTopics();
  }, [groupData]);

  const handleInputChange = (e, index) => {
    console.log(formData)
    if (e.target.name === "difficulty") {
      formData["difficulty"][index] = parseInt(e.target.value);
      setFormData({
        ...formData,
        difficulty: formData["difficulty"],
      });
    } else {
      if (e.target.name === "mockExam") {
        setFormData({ ...formData, [e.target.name]: e.target.value === "true" ? true : false });
      } else{
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }      
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount < 7) {
      toast.warning("Complete todos los campos");
    } else {
      setCreateExamLoading(true);
      createExamApi(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            generateExamsApi(response.id)
              .then((response) => {
                console.log(response)
                if (response.code) {
                  toast.warning(response.message);
                } else {
                  toast.success("Se crearon los exámenes exitosamente");
                  setListState(!listState);
                  setShowModal(false);
                  setFormData(initialValues());
                }
              })
              .catch((err) => {
                console.log(err);
                toast.error("Error del servidor, intente más tarde");
              });
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
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            <Form.Label>Temática</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              as="select"
              name="topicQuestion"
              onChange={(e) => handleInputChange(e, 0)}
            >
              <option value={""}>Seleccione una temática</option>
              {typeof topics !== "undefined" &&
                topics.map((x, i) => {
                  return (
                    <option value={x} key={i}>
                      {x}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Row>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Examen de Prueba</Form.Label>
            </Col>
            <Col>
            <Form.Control
              type="text"
              as="select"
              name="mockExam"
              onChange={(e) => handleInputChange(e, 0)}
            >
              <option value={""}>...</option>
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </Form.Control>
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
                  type="number"
                  min={0}
                  placeholder={"preguntas con dificultad 1"}
                  name="difficulty"
                  value={formData.difficulty[0]}
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </Row>
              <Row className="row">
                <Form.Control
                  type="number"
                  min={0}
                  placeholder={"preguntas con dificultad 2"}
                  name="difficulty"
                  value={formData.difficulty[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                />
              </Row>
              <Row className="row">
                <Form.Control
                  type="number"
                  min={0}
                  value={formData.difficulty[2]}
                  placeholder={"preguntas con dificultad 3"}
                  name="difficulty"
                  onChange={(e) => handleInputChange(e, 2)}
                />
              </Row>
            </div>
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
    difficulty: [0, 0, 0],
    topicQuestion: "",
    date: new Date(),
    view: false,
    state: false,
    mockExam: "",
  };
}
