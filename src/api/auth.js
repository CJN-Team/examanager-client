import { API_HOST, TOKEN } from "../utils/constants.js";
import jwtDecode from "jwt-decode";

export function signUpApi(data) {
  const urlI = API_HOST + "/institution";
  const urlU = API_HOST + "/user";

  const inst = {
    name: data.nameInst,
    type: data.typeInst,
    address: data.address,
    phone: data.phone,
  };

  console.log(inst);

  var user = {
    id: data.id,
    idType: data.idType,
    profile: "admin",
    name: data.userName,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    password: data.password,
  };

  const paramsI = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(inst),
  };

  return fetch(urlI, paramsI)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      return { code: 404, message: "Error al registrar institución" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function createUser(data, institutionId) {
  const urlU = API_HOST + "/user";

  var user = {
    id: data.id,
    idType: data.idType,
    profile: "Administrador",
    name: data.userName,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    password: data.password,
    institution: institutionId,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
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

export function signInApi(data) {
  const url = API_HOST + "/login";

  const user = {
    ...data,
    email: data.email.toLowerCase(),
  };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Usuario o contraseña incorrectos" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function logoutApi() {
  localStorage.removeItem(TOKEN);
}

function isExpired(token) {
  const { data } = jwtDecode(token);
  const expire = data * 1000;
  const timeout = expire - Date.now();

  if (timeout < 0) {
    return true;
  } else {
    return false;
  }
}

export function isUserLogedApi() {
  const token = getTokenApi();

  if (!token) {
    logoutApi();
    return null;
  }
  if (isExpired(token)) {
    logoutApi();
    return null;
  } else {
    return jwtDecode(token);
  }
}
