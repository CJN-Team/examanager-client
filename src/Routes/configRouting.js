import Home from "../pages/Home/Home.js";
import Asignaturas from "../pages/Asignaturas/Asignaturas";
import Departamentos from "../pages/Departamentos/Departamentos";
import Estudiantes from "../pages/Estudiantes/Estudiantes";
import Profesores from "../pages/Profesores/Profesores";
import Grupos from "../pages/Grupos/Grupos";
import Error404 from "../pages/Error404/Error404.js";

export default [
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "/asignaturas",
    exact: true,
    page: Asignaturas,
  },
  {
    path: "/departamentos",
    exact: true,
    page: Departamentos,
  },
  {
    path: "/estudiantes",
    exact: true,
    page: Estudiantes,
  },
  {
    path: "/profesores",
    exact: true,
    page: Profesores,
  },
  {
    path: "/grupos",
    exact: true,
    page: Grupos,
  },
  {
    path: "*",
    page: Error404,
  },
];
