import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteGroupAPI } from "../../api/grupos";

export default function ListGroups(props) {
  const { groupList, setListState, listState } = props;

  const deleteGroup = (group) => {
    deleteGroupAPI(group.id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El borrado fue existoso");
          setListState(listState + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {});
  };

  if (groupList == null || groupList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  } else {
    return (
      <div>
        <Container fluid className="list-groups">
          <ul className="table">
            {groupList.map((x, i) => {
              return (
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <h2>{x.name}</h2>
                    </Col>
                    <Col>
                      <Button variant="primary">
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="danger" onClick={() => deleteGroup(x)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    );
  }
}
