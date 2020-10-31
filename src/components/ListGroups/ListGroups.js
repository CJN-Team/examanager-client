import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteGroupAPI } from "../../api/grupos";

import "./ListGroups.scss";

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
          <Table hover className="table" bordered={false}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groupList.map((x, i) => {
                return (
                  <tr>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>
                      <Row>
                        <Col className="button">
                          <Button variant="info">
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </Col>
                        <Col className="button">
                          <Button
                            variant="danger"
                            onClick={() => deleteGroup(x)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
