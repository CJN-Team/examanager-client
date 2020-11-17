import { API_HOST, TOKEN } from "../utils/constants.js";
import jwtDecode from "jwt-decode";

export function createDeptAPI(data) {
  var urlU = API_HOST + "/departaments?page=1";

  const user = {
    id: data.id,
  };

  const params = {
    method: "GET",
    headers: {
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
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

export function listDeptsAPI() {
  var urlU = API_HOST + "/departaments?page=1";

  const params = {
    method: "GET",
    headers: {
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
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
