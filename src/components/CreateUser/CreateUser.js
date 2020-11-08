import React, { useState, useCallback } from "react";

import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { API_HOST } from "../../utils/constants";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";
import { useDropzone } from "react-dropzone";
import { isEmailValid } from "../../utils/validation.js";
import { values, size } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

import {
  createUserAPI,
  updateUserAPI,
  updloadImageAPI,
} from "../../api/usuarios";

import "react-datepicker/dist/react-datepicker.css";
import "./CreateUser.scss";

export default function CreateUser(props) {
  //Props
  const { setShowModal, userData, mode, listState, setListState } = props;
  //Estados
  const [formData, setFormData] = useState(userData);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    formData?.photo ? `${API_HOST}/photo?id=${formData.id}` : DefaultAvatar
  );
  const [fecha, setFecha] = useState(
    formData.birthDate === "" ? new Date() : new Date(formData.birthDate)
  );
  //Modo edición
  var editing = false;
  mode === "create" ? (editing = false) : (editing = true);

  //Callback para imagenes
  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setImageUrl(URL.createObjectURL(file));
    setImageFile(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropImage,
  });

  //Métodos
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fechaHandler = (e) => {
    setFormData({ ...formData, birthDate: e });
    setFecha(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("Complete todos los campos");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Ingrese un email válido");
      } else {
        if (editing) {
          if (imageFile) {
            await updloadImageAPI(formData.id, imageFile).catch((err) => {
              console.log(err);
              toast.error("Error del servidor al cargar imagen.");
              setListState(listState + 1);
            });
          }
          await updateUserAPI(formData)
            .then((response) => {
              if (response.code) {
                toast.warning(response.message);
              } else {
                toast.success("La actualización fue existosa");
                setListState(listState + 1);
                setShowModal(false);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error del servidor, intente más tarde");
            });
        } else {
          await createUserAPI(formData)
            .then((response) => {
              if (response.code) {
                toast.warning(response.message);
              } else {
                toast.success("El registro fue existoso");
                setListState(listState + 1);
                setShowModal(false);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error del servidor, intente más tarde");
            });
        }
        setLoading(false);
        window.location.reload();
      }
    }
  };

  return (
    <div className="login">
      {editing ? (
        <div
          className="imagen"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faCamera} className="icon" />
        </div>
      ) : null}
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>id</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="id"
                name="id"
                defaultValue={formData.id}
                disabled={editing}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Tipo de id</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={formData.idType}
                name="idType"
                onChange={(e) =>
                  setFormData({ ...formData, idType: e.target.value })
                }
                defaultValue={formData.idType}
              >
                <option>CC</option>
                <option>TI</option>
                <option>CE</option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                defaultValue={formData.name}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Apellidos</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="lastName"
                defaultValue={formData.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Correo</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Correo"
                name="email"
                defaultValue={formData.email}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Fecha de nacimiento</Form.Label>
            </Col>
            <Col>
              <DatePicker
                name="birthDate"
                selected={fecha}
                onChange={(date) => fechaHandler(date)}
              />
            </Col>
          </Row>
        </Form.Group>
        <center>
          <Button variant="primary" type="submit">
            {editing ? <>Actualizar</> : <>Crear</>}
          </Button>
          {loading && <Spinner animation="border" />}
        </center>
      </Form>
    </div>
  );
}
