import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { updateAsigmentApi } from "../../api/asigment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./UpdateAsigment.scss";

export default function UpdateAsigment(props) {
  const { temas, setShowModal, setListState, listState } = props;

  const [formData, setFormData] = useState(initialValues(temas));
  const [inputList, setInputList] = useState(formData.topics);
  const [updateAsigLoading, setUpdateAsigLoading] = useState(false);

  const handleAddClick = () => {
    const newItem = [""];
    setInputList(inputList.concat(newItem));
  };

  const handleInputChange = (e, index) => {
    console.log(formData)
    if (e.target.name === "topics") {
      console.log(e.target.value);
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
    var list = [...inputList];
    list.splice(index, 1);
    console.log(list)
    setInputList(list);
    console.log(inputList)
    
    formData["topics"] = list
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
      setUpdateAsigLoading(true);
      updateAsigmentApi(formData["name"], formData["topics"])
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Se actualizó la asignatura exitosamente");
            setListState(!listState);
            setShowModal(false);
            setFormData(initialValues(formData));
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error del servidor, intente más tarde");
        })
        .finally(() => {
          setUpdateAsigLoading(false);
        });
    }
  };

  return (
    <div className="update-asigment-form">
      <Form onSubmit={onSubmit}>
        <h6>Editar Asignatura</h6>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="name"
                value={formData["name"]}
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
                <div className="box" key={i}>
                  <Row className="row">
                    <Col className="item">
                      <Form.Control
                        type="text"
                        name="topics"
                        defaultValue={inputList[i]}
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
          <Button type="submit" className="btn-update">
            {!updateAsigLoading ? (
              "Actualizar"
            ) : (
              <Spinner animation="border"></Spinner>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues(temas) {
  let claves = Object.keys(temas);
  return {
    name: claves[0],
    topics: temas[claves[0]],
  };
}
