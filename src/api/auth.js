import { API_HOST, TOKEN } from "../Utils/Constants.js";
import jwtDecode from "jwt-decode";

export function createInstApi(data) {
  const url = API_HOST + "/institution";

  const inst = {
    name: data.nameInst,
    type: data.typeInst,
    address: data.address,
    phone: data.phone,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(inst),
  };

  return fetch(url, params)
    .then((response) => {

      console.log(response.body);

      if (response.status >= 200 && response.status < 300) {
        console.log("hola");
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

export function createUserApi(data, institutionId) {
  const url = API_HOST + "/user";
  console.log(institutionId);

  console.log("hola2");

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

  return fetch(url, params)
    .then((response) => {
      console.log(response.body);

      if (response.status >= 200 && response.status < 300) {
        console.log("hola3");
        return response.json();
      }
      return { code: 404, message: "Error al registrar usuario" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("hola4");
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
