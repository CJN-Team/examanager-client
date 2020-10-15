import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRounting from "./configRouting.js";
import "react-pro-sidebar/dist/css/styles.css";

export default function routing(props) {
  return (
    <Router>
      <Switch>
        {map(configRounting, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.page setRefreshLogin={props.setRefreshLogin} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
