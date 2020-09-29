import { API_HOST, TOKEN } from "../Utils/Constants.js";
import jwtDecode from "jwt-decode";

export function createQuestionsAPI(data) {
  const urlU = API_HOST + "/";

  const user = {
    id: data.id,
    idType: data.idType,
    profile: data.profile,
    institution: data.institution,
    name: data.name,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    password: data.password,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(user),
  };

  return fetch(urlU, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Error al registrar usuario" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function listQuestionsAPI() {
  const url = API_HOST + "/users?profile=Estudiante&page=1";

  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Fallo" };
    })
    .catch((err) => {
      return err;
    });
}
