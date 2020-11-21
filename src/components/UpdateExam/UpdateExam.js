import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { updateExamApi } from "../../api/examenes";


import "./UpdateExam.scss";

export default function UpdateExam(props) {
  const { exam, setShowModal, listState, setListState } = props;

  const [formData, setFormData] = useState(initialValues());
  const [updateExamLoading, setUpdateExamLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdateExamLoading(true);
    updateExamApi(formData, exam)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se actualizó el examen exitosamente");
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
        setUpdateExamLoading(false);
      });
  };

  return (
    <div className="update-exam-form">
      <Form onSubmit={onSubmit}>
        <h6>Editar Examen</h6>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Estado</Form.Label>
            </Col>
            <Col>
              <Form.Control
                  as="select"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({...formData, state: (e.target.value === 'true') ? true : false})
                  }
                  defaultValue={formData.state}
                >
                  <option value={true}>Abierto</option>
                  <option value={false}>Cerrado</option>
                </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <Col>
            <Form.Label>Ver resultados</Form.Label>
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={formData.view}
              onChange={(e) =>
                setFormData({...formData, view: (e.target.value === 'true') ? true : false})
              }
              defaultValue={formData.view}
            >
              <option value={true}>Habilitado</option>
              <option value={false}>Deshabilitado</option>
            </Form.Control>
          </Col>
        </Row>
        <div className="btn-cont">
          <Button type="submit" className="btn-update">
            {!updateExamLoading ? (
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

function initialValues() {
  return {
    state: false,
    view: false,
  };
}
