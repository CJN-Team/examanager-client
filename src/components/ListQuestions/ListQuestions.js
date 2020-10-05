import React from "react";
import { Container } from "react-bootstrap/lib/Tab";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";
import BasicModal from "../BasicModal/BasicModal";

export default function ListQuestions(props) {
  const { questList } = props;

  const editQuestion = (e) => {
    console.log("Estoy editando" + e);
  };
  const deleteQuestion = (e) => {
    console.log("Estoy eliminando " + e);
  };

  if (questList == null || questList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <div>
      <Container fluid>
        <ul>
          {questList.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{`${x}`}</h2>
                  </Col>
                  <Col>
                    <Button variant="info" onClick={editQuestion(x)}>
                      Agregar
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={deleteQuestion(x)}>
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Container>
      <Container fluid>
        <BasicModal show={showModal} setShow={setShowModal}>
          <CreateQuestion />
        </BasicModal>
      </Container>
    </div>
  );
}
