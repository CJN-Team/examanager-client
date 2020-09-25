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
            console.log("hola");
            return response.json();
        }
        return { code: 404, message: "Error al registrar institución"}
    }).then(result => {
        console.log("hola2");
        return result;
    }).catch(err => {
        console.log("hola3");
        return err;
    })
}