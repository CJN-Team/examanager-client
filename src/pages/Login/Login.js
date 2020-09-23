import React from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Cover from "../../assets/images/profes2-cort.jpg";
import "./Login.scss";
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
            <h1> hola 2</h1>
        </Col>
    );
}