import { API_HOST, TOKEN } from "../utils/constants.js";

export function loadLinkApi(form) {
  const url = API_HOST + "/users";

  const enlace = {
    documentLink: form.link,
    userProfile: form.profile,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(enlace),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Error al enviar enlace" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
