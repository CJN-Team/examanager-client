import { API_HOST, TOKEN } from "../utils/constants.js";

export function createExamApi(data) {
  const url = API_HOST;

  const exam = {
    ...data,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(exam),
  };

  return fetch(url, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      console.log(response);
      return { code: 404, message: "Error al crear examen" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteExamApi(subject) {
  const url = API_HOST;

  const params = {
    method: "DELETE",
    headers: {
      "Content-type": "text/plain",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    }
  };

  return fetch(url, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      console.log(response);
      return { code: 404, message: "Error al eliminar examen" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
  });
}

export function listExamApi() {
  const url = API_HOST;

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
      return { message: "No se pudieron obtener las exámenes" };
    })
    .catch((err) => {
      return err;
    });
}

