import React, { useState, useEffect } from "react";
import { generateExamPdfAPI } from "../../api/examenes";
import { Container, Row, Button, Spinner } from "react-bootstrap";
import { API_HOST } from "../../utils/constants";

import "./GeneratePDF.scss";

export default function GeneratePDF(props) {
  const { examID, setShowModal } = props;
  const [message, setMessage] = useState("Generando el PDF...");
  const [loading, setLoading] = useState(true);
  const url = `${API_HOST}/exampdf?id=${examID}`;
  const generatePdf = async () => {
    await generateExamPdfAPI(examID).then((response) => {
      if (response === 202) {
        setMessage("Descargando");
        open();
      } else {
        setLoading(false);
        setMessage("Ha ocurrido un error.");
      }
    });
  };

  function open() {
    const win = window.open(url, "_blank");
    if (win != null) {
      win.focus();
      setLoading(false);
      setMessage("Se ha abierto el archivo en una nueva pestaña.");
    } else {
      setMessage("No se ha podido abrir la dirección solicitada.");
    }
  }

  useEffect(() => {
    generatePdf();
  }, []);

  return (
    <div>
      <Container className="pdf-gen">
        <Row>{message}</Row>
        <Row>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Button onClick={() => setShowModal(false)}>Cerrar</Button>
          )}
        </Row>
      </Container>
    </div>
  );
}
