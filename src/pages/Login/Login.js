import React, {useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Cover from "../../assets/images/profes2-cort.jpg";
import Logo from "../../assets/images/exam_rec.png";
import "./Login.scss";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import SignUp from "../../components/SignUp/SignUp.js"


export default function Login() {
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
            <img src={Cover} ></img>
        </div>
    );
}

function FormLog (props) {
    const { openModal, setShowModal } = props;

    return (
        <Col className="formLog">
            <div className="imagen">
                <img src={Logo} alt="logo"></img>
                <Button 
                    variant="primary" 
                    onClick={() => openModal(<SignUp setShowModal={setShowModal}></SignUp>)} 
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