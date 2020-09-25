import React, { useState } from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation.js";
import { signInApi, setTokenApi } from "../../api/auth.js"

import "./SignIn.scss"

export default function SignUp(props) {
    const { setShowModal } = props;

    const [formData, setFormData] = useState(initialValues());
    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.warning("Complete todos los campos");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Ingrese un email válido");
            } else {
                setSignInLoading(true);
                signInApi(formData).then(response =>{
                    if(response.message){
                        toast.warning(response.message);
                    }else{
                        console.log(response.token);
                        setTokenApi(response.token);
                        setShowModal(false);
                        setFormData(initialValues());
                    }
                }).catch(() => {
                    toast.error("Error del servidor, inténtelo más tarde");
                }).finally(() => {
                    setSignInLoading(false);
                })
            }
        }
    };

    return (
        <div className="sign-in-form">            
            <Form onSubmit={onSubmit}>
                <h6>iniciar Sesión</h6>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Correo</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control
                            type="text"
                            placeholder="Correo"
                            value={formData.email}
                            onChange={ e => 
                                setFormData({...formData, email: e.target.value})
                            }
                            defaultValue={formData.email}
                        />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Contraseña</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={ e => 
                                setFormData({...formData, password: e.target.value})
                            }
                            defaultValue={formData.password}
                        />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signInLoading ? "Iniciar" : <Spinner animation="border"></Spinner> }
                </Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        email: "",
        password: ""
    };
  }
