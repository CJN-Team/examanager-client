import { API_HOST, TOKEN } from "../utils/constants.js";
import jwtDecode from "jwt-decode";

export function createUserAPI(data) {
  var urlU = API_HOST + "/user";

  const user = {
    id: data.id,
    idType: data.idType,
    profile: data.profile,
    institution: data.institution,
    name: data.name,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    birthDate: data.birthDate,
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

export function listUsersAPI(userType) {
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

export function updateUserAPI(data) {
  var urlU = API_HOST + "/user?id=" + data.id;

  const user = {
    id: data.id,
    idType: data.idType,
    profile: data.profile,
    institution: data.institution,
    name: data.name,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    birthDate: data.birthDate,
    password: data.password,
  };

  const params = {
    method: "PUT",
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

export function deleteUserAPI(data) {
  const url = API_HOST + "/user?id=" + data.id;
  const params = {
    method: "DELETE",
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
