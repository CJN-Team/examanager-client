import { API_HOST } from "../utils/constants.js"

export function signUpApi(data) {
    const urlI = API_HOST + "/institution";
    const urlU = API_HOST + "/user";

    const inst = {
        "name": data.nameInst,
        "type": data.typeInst,
        "address": data.address,
        "phone": data.phone
    };

    console.log(inst);

    const user = {
        "_id": data.id,
        "idType": data.idType,
        "profile": "Administrador",
        "name": data.userName,
        "lastName": data.lastName,
        "email": data.email.toLowerCase(),
        "password": data.password
    };

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(inst)
    }

    return fetch(urlI, params).then(response =>{
        console.log(response.status);
        if(response.status >=200 && response.status < 300){
            return response.json();
        }
        return { code: 404, message: "Error al registrar institución"}
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function signInApi(data){
    const url = API_HOST + "/login";

    const user = {
        ...data,
        email: data.email.toLowerCase()
    };

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    };

    return fetch(url, params).then(response => {
        if(response.status >=200 && response.status < 300){
            return response.json()
        }
        return {message: "Usuario o contraseña incorrectos"}
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })

}