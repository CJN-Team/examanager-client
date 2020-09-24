import React, {useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Cover from "../../assets/images/profes2-cort.jpg";
import Logo from "../../assets/images/exam_rec.png";
import "./Login.scss";
import BasicModal from "../../components/BasicModal/BasicModal.js";


export default function Login() {
    const [showModal, setShowModal] = useState(true);
    const [contentModal, setContentModal] = useState(null);

    return (
        <>
        <Container className="login" fluid>
            <Row>
                <Image></Image>
                <FormLog></FormLog>
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal} >
            <div><h2>Modal content</h2></div>
        </BasicModal>
        </>
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