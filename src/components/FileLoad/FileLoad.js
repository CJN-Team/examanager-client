import React, { useState } from "react";
import { loadLinkApi } from "../../api/files";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import "./FileLoad.scss";

export default function FileLoad(props) {
  const { setShowModal, listState, setListState, profile } = props;
  const [formData, setFormData] = useState(initialValues(profile));
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.link !== "") {
      if (validURL(formData.link)) {
        setLoading(true);

        loadLinkApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("La subida fue exitosa");
              setListState(listState + 1);
              setShowModal(false);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error del servidor, intente más tarde");
          });
        setLoading(false);
      }
    }
  };

  if (!loading) {
    return (
      <Container className="file-load">
        <h5>Cargar documento</h5>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Row className="url">
              <Col>
                <Form.Label>URL del documento:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  className="url_input"
                  type="text"
                  placeholder="Link"
                  name="link"
                  defaultValue={formData.link}
                  onChange={(e) => {
                    setFormData({ ...formData, link: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <div className="btn-cont">
            <Button className="btn" variant="primary" type="submit">
              Cargar
            </Button>
          </div>
        </Form>
      </Container>
    );
  } else {
    return (
      <Container className="txt-cont">
        <Row>Cargando</Row>
        <Row>
          <Spinner animation="border" variant="info" />
        </Row>
      </Container>
    );
  }
}

function initialValues(profile) {
  return {
    link: "",
    profile: profile,
  };
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
