import { API_HOST, TOKEN } from "../utils/constants.js";
import jwtDecode from "jwt-decode";

export function createDeptAPI(data) {
  var urlU = API_HOST + "/departamentos";

  const user = {
    id: data.id,
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

export function listDeptsAPI(userType) {
  const url = API_HOST + `/users?profile=${userType}&page=1`;

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
