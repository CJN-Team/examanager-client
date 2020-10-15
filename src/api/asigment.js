import { API_HOST, TOKEN } from "../utils/constants.js";

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

export function deleteAsigmentApi(subject) {
  const url = API_HOST + "/subject?name=" + subject;

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
      return { code: 404, message: "Error al eliminar asignatura" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
  });
}

export function updateAsigmentApi(name, data) {
  const url = API_HOST + "/subject?name=" + name;

  const asig = {
    "name": name,
    "topics": data,
  };

  const params = {
    method: "PUT",
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
      return { code: 404, message: "Error al actualizar asignatura" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
  });
}

export function listAsigmentApi() {
  const url = API_HOST + "/subject";

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

export function listOneAsigmentApi(name) {
  const url = API_HOST + "/subject?name=" + name;

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
      return { message: "No se pudo obtener la asignatura" };
    })
    .catch((err) => {
      return err;
    });
}
