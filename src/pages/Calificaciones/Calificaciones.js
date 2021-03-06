import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userAllGradesAPI } from "../../api/usuarios";
import { capitalize } from "../../utils/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import "./Calificaciones.scss";

export default function Calificaciones(props) {
  const { setRefreshLogin } = props;
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  useEffect(() => {
    async function fetchGrades() {
      await userAllGradesAPI(user.id).then((response) => {
        setGrades(response);
        setLoading(false);
      });
    }
    fetchGrades();
  }, []);

  if (loading) {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="notas">
        <Spinner animation="border" />
      </BasicLayout>
    );
  }

  if (
    grades == null ||
    Object.keys(grades).length === 0 ||
    grades.message === "Fallo"
  ) {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="notas">
        <h4>La consulta no recuperó resultados</h4>
      </BasicLayout>
    );
  } else {
    return (
      <BasicLayout setRefreshLogin={setRefreshLogin} ruta="notas">
        <div className="calificaciones-cont">
          <h4>Mis notas: </h4>
          <div className="calificaciones">
            {Object.keys(grades).map((x, i) => {
              return (
                <div key={i}>
                  <h5>{`${x.split(",")[0]} - ${capitalize(
                    x.split(",")[1]
                  )}`}</h5>
                  <table class="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>Evaluación</th>
                        <th>Nota</th>
                        <th>Estado</th>
                        <th>Ver</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(grades[x]).map((y, j) => {
                        return (
                          <tr key={j}>
                            <td>{capitalize(y)}</td>
                            <td style={getColor(grades[x][y].Grade)}>
                              {grades[x][y].Grade}
                            </td>
                            <td>
                              {grades[x][y].State ? (
                                <div className="open">Abierto</div>
                              ) : (
                                <> Cerrado </>
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/grupos/${x.split(",")[0]}/examen/${
                                  grades[x][y].ID
                                }`}
                                className="btn btn-info button-link"
                              >
                                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <ol></ol>
                </div>
              );
            })}
          </div>
        </div>
      </BasicLayout>
    );
  }
}

function getColor(grade) {
  if (grade >= 3.0) {
    if (grade >= 4.0) {
      return {
        color: "green",
      };
    } else {
      return {
        color: "#999900",
      };
    }
  } else {
    return {
      color: "red",
    };
  }
}
