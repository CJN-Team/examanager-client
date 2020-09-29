import Home from "../Pages/Home/Home.js";
import Asignaturas from "../Pages/Asignaturas/Asignaturas";
import Departamentos from "../Pages/Departamentos/Departamentos";
import Estudiantes from "../Pages/Estudiantes/Estudiantes";
import Profesores from "../Pages/Profesores/Profesores";
import Administradores from "../Pages/Administradores/Administradores.js";
import Grupos from "../Pages/Grupos/Grupos";
import Preguntas from "../Pages/Preguntas/Preguntas";
import Error404 from "../Pages/Error404/Error404.js";

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
