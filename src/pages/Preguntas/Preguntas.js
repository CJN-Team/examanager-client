import React, { useState, useEffect } from "react";
import { listQuestionsAPI } from "../../api/preguntas";
import { listAsigmentApi } from "../../api/asigment";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";
import ListQuestions from "../../components/ListQuestions/ListQuestions";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import {
  Button,
  Modal,
  Container,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

export default function Preguntas(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);
  const [preguntasAPI, setPreguntas] = useState(["init"]);
  const [asignaturas, setAsignaturas] = useState(["init"]);
  const [temas, setTemas] = useState(["init"]);
  const [selectedTema, setSelectedTema] = useState("");
  const [selectedAsig, setSelectedAsig] = useState("");
  const [listState, setListState] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin}>
        <div className="encabezado">
          <h1>Preguntas</h1>
          <h6>Materia: </h6>
          <Form.Control
            as="select"
            defaultValue={selectedAsig}
            name="asignatura"
            onChange={(e) => {
              setTopics(e.target.value);
            }}
          >
            <option value="">Seleccionar materia</option>
            {asignaturas !== null &&
              asignaturas.map((x, i) => {
                return <option value={i}>{x[0]}</option>;
              })}
          </Form.Control>
          {selectedAsig !== "" && (
            <div>
              <h6>Tema: </h6>
              <Form.Control
                as="select"
                value={selectedTema}
                name="tema"
                onChange={(e) => setSelectedTema(e.target.value)}
              >
                <option value="">Seleccionar tema</option>
                {temas !== null &&
                  temas.map((x, i) => {
                    return <option value={x}>{x}</option>;
                  })}
              </Form.Control>
            </div>
          )}
          {selectedTema !== "" &&
            (loading ? (
              <h6>Cargando...</h6>
            ) : (
              <div>
                <Row>
                  <Button
                    variant="primary"
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
                  <Row>
                    <Col>
                      <Button onClick={() => onChangePage(-1)}>{"<"}</Button>
                    </Col>
                    <Col>{page}</Col>
                    <Button onClick={() => onChangePage(1)}>{">"}</Button>
                  </Row>
                )}
              </div>
            ))}
        </div>

        <Container fluid>
          <ModalPreguntas openModal={openModal} setShowModal={setShowModal} />
        </Container>

        {selectedAsig === "" ? (
          <h4>Seleccione una materia</h4>
        ) : selectedTema === "" ? (
          <h4>Seleccione un tema</h4>
        ) : loading ? (
          <Spinner animation="border" />
        ) : (
          <ListQuestions
            questList={preguntasAPI}
            listState={listState}
            setListState={setListState}
          />
        )}

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
