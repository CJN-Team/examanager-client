import React from "react";
import BasicLayout from "../../layouts/basicLayouts/BasicLayout";

export default function Marketplace(props) {
  const { setRefreshLogin } = props;
  return (
    <BasicLayout setRefreshLogin={setRefreshLogin} ruta="store">
      <h2>Próximamente...</h2>
    </BasicLayout>
  );
}
