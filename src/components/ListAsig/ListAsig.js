import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { deleteAsigmentApi } from "../../api/asigment.js";
import { capitalize } from "../../utils/strings";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./ListAsig.scss";

export default function ListAsig(props) {
  const { asigList, setListState, listState } = props;
  const user = useAuth();

  var asignaturas = Object.entries(asigList);

  console.log(asignaturas);

  if (asigList == null || asigList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }

  const deleteAsig = (subject) => {
    deleteAsigmentApi(subject)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se eliminó la asignatura existosamente");
          setListState(!listState);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      });
  };

  return (
    <Container fluid className="list-asig">
      <ul className="table">
        {asignaturas.map((x, i) => {
          return (
            <li class="list-group-item" key={i}>
              <Row>
                <Col>
                  <h2>{capitalize(x[0])}</h2>
                </Col>
                <Col className="button">
                  <Link
                    to={"/asignaturas/" + x[0]}
                    className="btn btn-info button-link"
                  >
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                  </Link>
                </Col>
                {user.profile === "Administrador" && (
                  <>
                    <Col className="button">
                      <Button variant="danger" onClick={() => deleteAsig(x[0])}>
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
