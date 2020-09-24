import React from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Cover from "../../assets/images/profes2-cort.jpg";
import Logo from "../../assets/images/exam_rec.png";
import "./Login.scss";
import FormLogin from "../../components/FormLogin/FormLogin.js";


export default function Login() {
    return (
        <Container className="login" fluid>
            <Row>
                <Image></Image>
                <FormLog></FormLog>
            </Row>
        </Container>
    )
}

function Image () {
    return (
        <div className="image">
            <img src={Cover} ></img>
        </div>
    );
}

function FormLog () {
    return (
        <Col className="formLog">
            <div className="imagen">
                <img src={Logo}></img>
                <FormLogin></FormLogin>
                <Button variant="primary">
                    Iniciar Sesión
                </Button>
                <h5>¿No tienes una cuenta?</h5>
                <Button variant="outline-primary">
                    Regístrate
                </Button>
            </div>
        </Col>
    );
}