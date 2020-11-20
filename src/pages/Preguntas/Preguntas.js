import React, { useState, useEffect } from "react";
import { listQuestionsAPI } from "../../api/preguntas";
import { listAsigmentApi } from "../../api/asigment";
import useAuth from "../../hooks/useAuth";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";
import ListQuestions from "../../components/ListQuestions/ListQuestions";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "../../utils/strings";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  Container,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

import "./Preguntas.scss";

export default function Preguntas(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [preguntasAPI, setPreguntas] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [temas, setTemas] = useState([]);
  const [selectedTema, setSelectedTema] = useState("");
  const [selectedAsig, setSelectedAsig] = useState("");
  const [listState, setListState] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  useEffect(() => {
    async function cargarAsignaturas(asigs) {
      await setAsignaturas(Object.entries(asigs));
    }

    listAsigmentApi().then((response) => {
      cargarAsignaturas(response);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    listQuestionsAPI(page, selectedTema, 1).then((response) => {
      setPreguntas(response);
      setLoading(false);
    });
  }, [listState]);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    listQuestionsAPI(1, selectedTema, 1).then((response) => {
      setPreguntas(response);
      setLoading(false);
    });
  }, [selectedTema]);

  const onChangePage = async (delta) => {
    var pageAux = page;
    setLoading(true);

    if (delta < 0) {
      if (page > 1) {
        pageAux = page + delta;
      }
    } else {
      pageAux = page + delta;
    }
    if (pageAux !== page) {
      await listQuestionsAPI(pageAux, selectedTema, 1).then((response) => {
        if (response != null && response.message !== "Fallo") {
          setPreguntas(response);
          setPage(pageAux);
        }
      });
    }
    setLoading(false);
  };

  const setTopics = async (index) => {
    if (index !== "") {
      await setSelectedAsig(asignaturas[index][0]);
      await setSelectedTema("");
      await setTemas(asignaturas[index][1]);
    } else {
      await setSelectedAsig("");
      await setSelectedTema("");
    }
  };

  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };

  if (user.profile === "Estudiante") {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="bank">
        Acceso denegado.
      </BasicLayout>
    );
  }

  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="bank">
        <Container className="preguntas-cont" fluid>
          <h4>Preguntas</h4>
          <h5>Materia: </h5>
          <Form.Control
            as="select"
            defaultValue={selectedAsig}
            className="dropdown"
            name="asignatura"
            onChange={(e) => {
              setTopics(e.target.value);
            }}
          >
            <option value="">Seleccionar materia</option>
            {asignaturas !== null &&
              asignaturas.map((x, i) => {
                return (
                  <option value={i} key={i}>
                    {capitalize(x[0])}
                  </option>
                );
              })}
          </Form.Control>
          {selectedAsig !== "" && (
            <div>
              <h5>Tema: </h5>
              <Form.Control
                as="select"
                value={selectedTema}
                className="dropdown"
                name="tema"
                onChange={(e) => setSelectedTema(e.target.value)}
              >
                <option value="">Seleccionar tema</option>
                {temas !== null &&
                  temas.map((x, i) => {
                    return (
                      <option value={x} key={i}>
                        {capitalize(x)}
                      </option>
                    );
                  })}
              </Form.Control>
            </div>
          )}

          {selectedTema !== "" &&
            (loading ? (
              <h5>Cargando...</h5>
            ) : (
              <div>
                <Row>
                  <Button
                    variant="primary"
                    className="button-add"
                    onClick={() =>
                      openModal(
                        <CreateQuestion
                          form={() => initialValues(selectedAsig, selectedTema)}
                          mode="create"
                          listState={listState}
                          setListState={setListState}
                          setShowModal={setShowModal}
                        />
                      )
                    }
                  >
                    Añadir
                  </Button>
                </Row>
                {preguntasAPI != null && preguntasAPI.message !== "Fallo" && (
                  <div className="page-selector">
                    <Button
                      className="page-sel"
                      onClick={() => onChangePage(-1)}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                    {page}
                    <Button
                      className="page-sel"
                      onClick={() => onChangePage(1)}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                  </div>
                )}
              </div>
            ))}

          <Container fluid>
            <ModalPreguntas openModal={openModal} setShowModal={setShowModal} />
          </Container>

          {selectedAsig === "" ? (
            <h5>Seleccione una materia</h5>
          ) : selectedTema === "" ? (
            <h5>Seleccione un tema</h5>
          ) : loading ? (
            <Spinner animation="border" />
          ) : (
            <ListQuestions
              questList={preguntasAPI}
              listState={listState}
              setListState={setListState}
            />
          )}
        </Container>
        <ModalPreguntas show={showModal} setShow={setShowModal}>
          {contentModal}
        </ModalPreguntas>
      </BasicLayout>
    </div>
  );
}

function ModalPreguntas(props) {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Agregar pregunta</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

function initialValues(asig, topic) {
  return {
    subject: asig,
    topic: topic,
    id: "",
    question: "",
    category: "Pregunta abierta",
    difficulty: 1,
    options: [""],
    answer: [],
  };
}
