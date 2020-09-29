import { API_HOST, TOKEN } from "../Utils/Constants.js";

export function createAsigmentApi(data) {
  const url = API_HOST + "/subject";

  const asig = {
    ...data,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(asig),
  };

  return fetch(url, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      console.log(response);
      return { code: 404, message: "Error al crear asignatura" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function listAsigmentApi() {
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
      return { message: "No se pudieron obtener las asignaturas" };
    })
    .catch((err) => {
      return err;
    });
}
