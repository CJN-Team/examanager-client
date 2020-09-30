import Home from "../pages/Home/Home.js";
import Asignaturas from "../pages/Asignaturas/Asignaturas";
import Departamentos from "../pages/Departamentos/Departamentos";
import Estudiantes from "../pages/Estudiantes/Estudiantes";
import Profesores from "../pages/Profesores/Profesores";
import Administradores from "../pages/Administradores/Administradores.js";
import Grupos from "../pages/Grupos/Grupos";
import Preguntas from "../pages/Preguntas/Preguntas";
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
    path: "/administradores",
    exact: true,
    page: Administradores,
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
    path: "/preguntas",
    exact: true,
    page: Preguntas,
  },
  {
    path: "*",
    page: Error404,
  },
];
