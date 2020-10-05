import React, { useState, useEffect } from 'react'
import BasicLayout from "../../layout/basicLayout/BasicLayout.js";
import ListTemas from "../../components/ListTemas/ListTemas.js";
import { Container, Row, Col, Button } from "react-bootstrap";
//import { listAsigmentApi } from "../../api/asigment";

import "./Temas.scss"

export default function Temas(props) {
    const { setRefreshLogin } = props;    

    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}>
        <Container className="temas-cont" fluid>
            <TemasCont></TemasCont>
        </Container>      
        </BasicLayout>
    );
}

function TemasCont() {
  const [temas, setTemas] = useState(["funciones", "trigonometría", "geometría"]);
  const [ listState, setListState ] = useState(1)

  useEffect(() => {
    //listAsigmentApi().then((response) => {
      //setAsignaturas(response);
    //});
  }, [listState]);

  return (
    <Col className="temas">
      <div className="temas__body">
        <h4 className="title">Temas</h4>
        <ListTemas
          temasList={temas} 
          setListState={setListState}
          listState={listState}
        />
      </div>
    </Col>
  );
}
