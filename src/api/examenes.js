import { API_HOST, TOKEN } from "../utils/constants.js";

export function createExamApi(data) {
  const url = API_HOST + "/exam";

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

export function updateExamApi(data, id) {
  const url = API_HOST + "/exam?id=" + id;

  const exam = {
    ...data,
  };

  const params = {
    method: "PUT",
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
      return { code: 404, message: "Error al actualizar examen" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteExamApi(id) {
  const url = API_HOST + "/exam?id=" + id;

  const params = {
    method: "DELETE",
    headers: {
      "Content-type": "text/plain",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
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

export function listExamsApi(gropuId) {
  const url = API_HOST + "/exam?page=1&groupid=" + gropuId;

  console.log(url);

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
      return { message: "No se pudieron obtener los exámenes" };
    })
    .catch((err) => {
      return err;
    });
}

export function getExamApi(examId) {
  const url = API_HOST + "/generatedexam?id=" + examId;

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
      return { message: "No se pudo obtener la información del examen" };
    })
    .catch((err) => {
      return err;
    });
}

export function generateExamPdfAPI(id) {
  const url = API_HOST + `/exampdf?id=${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.status;
      }
      return { message: "No se ha podido generar el PDF" };
    })
    .catch((err) => {
      return err;
    });
}

export function generateExamsApi(id) {
  const url = API_HOST + `/examgenerator?id=${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.status;
      }
      return { message: "No se han podido generar los examenes" };
    })
    .catch((err) => {
      return err;
    });
}

export function gradingExamApi(data) {
  const url = API_HOST + "/generatedexam";
  
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
  console.log(params)

  return fetch(url, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      console.log(response);
      return { code: 404, message: "Error al calificar examen" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function updateCommentApi(data, id) {
  const url = API_HOST + `/generatedexam?id=${id}`;

  const exam = {
    commentary: data
  };

  const params = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(exam)
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.status;
      }
      return { message: "No se actualizó el comentario del examen" };
    })
    .catch((err) => {
      return err;
    });
}



