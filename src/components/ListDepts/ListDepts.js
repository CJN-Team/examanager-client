import React from "react";

export default function ListDepts(props) {
  const { listaDepts } = props;
  if (listaDepts == null || listaDepts.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <div>
      {JSON.stringify(listaDepts)}
      {listaDepts.map((x, i) => {
        return <div>{x.name}</div>;
      })}
    </div>
  );
}
