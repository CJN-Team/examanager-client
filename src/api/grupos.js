import { API_HOST, TOKEN } from "../utils/constants.js";
import jwtDecode from "jwt-decode";

export function createGroupAPI(data) {
  var urlU = API_HOST + "/group";

  const user = {
    id: data.id,
    name: data.name,
    studentsList: data.studentsList,
    teacher: data.teacher,
    subject: data.subject,
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
      return { code: 404, message: "Error al registrar grupo" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getGroupAPI(id) {
  var urlU = API_HOST + `/group?id=${id}`;

  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
  };

  return fetch(urlU, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Error al obtener" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function updateGroupAPI(data, id) {
  var urlU = API_HOST + `/group?id=${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem(TOKEN),
    },
    body: JSON.stringify(data),
  };

  return fetch(urlU, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Error al actualizar grupo" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function listGroupsAPI(pag) {
  const url = API_HOST + `/groups?page=${pag}`;

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

export function deleteGroupAPI(id) {
  const url = API_HOST + `/group?id=${id}`;

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

export function getGroupProgressAPI(id) {
  const url = API_HOST + `/groupProgress?id=${id}`;

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

export function userGradesAPI(uid, gid) {
  const url = API_HOST + `/groupUserGrades?group=${gid}&id=${uid}`;

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
