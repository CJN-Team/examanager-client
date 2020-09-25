import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { map } from "lodash";
import configRounting from "./configRouting.js";
import Navigation from "../components/Navigation/Navigation";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

export default function routing() {
  return (
    <>
      <Navigation />
      <Row>
        <ProSidebar>
          <SidebarHeader>EXAMANAGER</SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem>
                Asignaturas
                <a href="/asignaturas" />
              </MenuItem>
              <MenuItem>
                Departamentos
                <a href="/departamentos" />
              </MenuItem>
              <MenuItem>
                Estudiantes
                <a href="/estudiantes" />
              </MenuItem>
              <MenuItem>
                Profesores
                <a href="/profesores" />
              </MenuItem>
              <MenuItem>
                Grupos
                <a href="/grupos" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>Si</SidebarFooter>
        </ProSidebar>
        <Router>
          <Switch>
            {map(configRounting, (route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.page />
              </Route>
            ))}
          </Switch>
        </Router>
      </Row>
    </>
  );
}
