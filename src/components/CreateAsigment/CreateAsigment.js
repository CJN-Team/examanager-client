import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { createAsigmentApi, listAsigmentApi } from "../../api/asigment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./CreateAsigment.scss";

export default function CreateAsigment(props) {
  const { setShowModal, setListState, listState } = props;

  const [formData, setFormData] = useState(initialValues());
  const [inputList, setInputList] = useState(formData.topics);
  const [createAsigLoading, setCreateAsigLoading] = useState(false);

  const handleAddClick = () => {
    const newItem = [""];
    setInputList(inputList.concat(newItem));
  };

  const handleInputChange = (e, index) => {
    if (e.target.name === "topics") {
      formData["topics"][index] = e.target.value;
      setFormData({
        name: formData["name"],
        topics: formData["topics"],
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
      setCreateAsigLoading(true);
      createAsigmentApi(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Se creó la asignatura exitosamente");
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
          setCreateAsigLoading(false);
        });
    }
  };

  return (
    <div className="create-asigment-form">
      <Form onSubmit={onSubmit}>
        <h6>Crea una asignatura</h6>
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
            <Form.Label>Temáticas</Form.Label>
          </Col>
          <Col className="topics">
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
        <div className="btn-cont">
          <Button type="submit" className="btn-create">
            {!createAsigLoading ? (
              "Crear"
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
    topics: [""],
  };
}
