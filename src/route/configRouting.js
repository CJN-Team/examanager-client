import Administradores from "../pages/Administradores/Administradores.js";
import Asignaturas from "../pages/Asignaturas/Asignaturas.js";
import Calificaciones from "../pages/Calificaciones/Calificaciones.js";
import Departamentos from "../pages/Departamentos/Departamentos.js";
import Error404 from "../pages/Error404/Error404.js";
import Estudiantes from "../pages/Estudiantes/Estudiantes";
import Examenes from "../pages/Examenes/Examenes.js";
import Grupo from "../pages/Grupo/Grupo.js";
import Grupos from "../pages/Grupos/Grupos.js";
import Home from "../pages/Home/Home.js";
import Marketplace from "../pages/Marketplace/Marketplace.js";
import Preguntas from "../pages/Preguntas/Preguntas.js";
import Profesores from "../pages/Profesores/Profesores.js";
import Profile from "../pages/Profile/Profile.js";
import Temas from "../pages/Temas/Temas.js";
import Exam from "../pages/Exam/Exam.js";

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
    path: "/notas",
    exact: true,
    page: Calificaciones,
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
    path: "/grupos/:groupId/examenes",
    exact: true,
    page: Examenes,
  },
  {
    path: "/grupos/:groupId/examen/:examId",
    exact: true,
    page: Exam,
  },
  {
    path: "*",
    page: Error404,
  },
];
