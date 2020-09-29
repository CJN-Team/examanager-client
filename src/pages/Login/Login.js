import React, {useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Cover from "../../Assets/Images/profes2-cort.jpg";
import Logo from "../../Assets/Images/exam_rec.png";
import "./Login.scss";
import BasicModal from "../../Components/BasicModal/BasicModal.js";
import SignUp from "../../Components/SignUp/SignUp.js"
import SignIn from "../../Components/SignIn/SignIn.js"


export default function Login(props) {
    const { setRefreshLogin } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    }

    return (
        <>
        <Container className="login" fluid>
            <Row>
                <Image></Image>
                <FormLog
                    openModal={openModal}
                    setShowModal={setShowModal}
                    setRefreshLogin={setRefreshLogin}
                ></FormLog>
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal} >
            {contentModal}
        </BasicModal>
        </>
    )
}

function Image () {
    return (
        <div className="image">
            <img src={Cover} alt="fondo"></img>
        </div>
    );
}

function FormLog (props) {
    const { openModal, setShowModal, setRefreshLogin } = props;

    return (
        <Col className="formLog">
            <div className="imagen">
                <img src={Logo} alt="logo"></img>
                <Button 
                    variant="primary" 
                    onClick={() => openModal(<SignIn setShowModal={setShowModal} setRefreshLogin={setRefreshLogin}></SignIn>)} 
                >
                    Iniciar Sesión
                </Button>
                <h5>¿No tienes una cuenta?</h5>
                <Button 
                    variant="outline-primary" 
                    onClick={() => openModal(<SignUp setShowModal={setShowModal}></SignUp>)} 
                >
                    Regístrate
                </Button>
            </div>
        </Col>
    );
}