import Home from "../pages/Home/Home.js";
import Asignaturas from "../pages/Asignaturas/Asignaturas";
import Departamentos from "../pages/Departamentos/Departamentos";
import Estudiantes from "../pages/Estudiantes/Estudiantes";
import Profesores from "../pages/Profesores/Profesores";
import Administradores from "../pages/Administradores/Administradores.js";
import Marketplace from "../pages/Marketplace/Marketplace.js";
import Profile from "../pages/Profile/Profile.js";
import Temas from "../pages/Temas/Temas.js";
import Grupos from "../pages/Grupos/Grupos";
import Grupo from "../pages/Grupo/Grupo";
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
    path: "/marketplace",
    exact: true,
    page: Marketplace,
  },
  {
    path: "/:id",
    exact: true,
    page: Profile,
  },
  {
    path: "/asignaturas/:topics",
    exact: true,
    page: Temas,
  },
  {
    path: "/grupos/:id",
    exact: true,
    page: Grupo,
  },
  {
    path: "*",
    page: Error404,
  },
];
