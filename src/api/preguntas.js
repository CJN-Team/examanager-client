import { API_HOST, TOKEN } from "../utils/constants.js";
import jwtDecode from "jwt-decode";

export function createQuestionsAPI(data) {
  const urlQ = API_HOST + "/questions";

  const pregunta = {
    id: data.id,
    topic: data.topic,
    subject: data.subject,
    question: data.question,
    category: data.category,
    options: data.options,
    answer: data.answer,
    difficulty: data.difficulty * 1,
  };

  const params = {
    method: "POST",
    headers: {
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(pregunta),
  };

  return fetch(urlQ, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Error al registrar pregunta" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function listQuestionsAPI(pag, cat, spec) {
  const url =
    API_HOST + `/questions?page=${pag}&category=${cat}&specific=${spec}`;

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

export function updateQuestionsAPI(data) {
  const urlQ = API_HOST + `/questions?id=${data.id}`;

  const pregunta = {
    topic: data.topic,
    subject: data.subject,
    question: data.question,
    category: data.category,
    options: data.options,
    answer: data.answer,
    difficulty: data.difficulty * 1,
  };

  const params = {
    method: "PUT",
    headers: {
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(pregunta),
  };

  return fetch(urlQ, params)
    .then((response) => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Error al registrar pregunta" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteQuestionsAPI(id) {
  const url = API_HOST + `/questions?id=${id}`;

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
