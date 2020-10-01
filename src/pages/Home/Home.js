import React from "react";
import BasicLayout from "../../layout/basicLayout/BasicLayout.js";

import "./Home.scss";

export default function Home(props) {
  return (
    <BasicLayout setRefreshLogin={props.setRefreshLogin}>
      <div className="home">
        <h2>Bienvenidos a Examanager</h2>
      </div>      
    </BasicLayout>
  );
}
