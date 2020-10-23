import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";
import { Container } from "react-bootstrap";
import ListGroups from "../../components/ListGroups/ListGroups";
import { listGroupsAPI } from "../../api/grupos";
import "../Usuarios/Usuarios.scss";

export default function Grupos(props) {
  const { setRefreshLogin } = props;

  const [gruposAPI, setGrupos] = useState(["init"]);
  const [listState, setListState] = useState(1);
  const [page, setPage] = useState(1);

  document.title = "Grupos";

  useEffect(() => {
    listGroupsAPI(page).then((response) => {
      setGrupos(response);
    });
  }, [listState]);

  return (
    <div>
      <BasicLayout setRefreshLogin={setRefreshLogin}>
        <Container className="grupos-cont" fluid>
          <div>Grupos</div>
          <ListGroups
            groupList={gruposAPI}
            setListState={setListState}
            listState={listState}
          />
        </Container>
      </BasicLayout>
    </div>
  );
}
