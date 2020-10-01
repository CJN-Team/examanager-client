import React from 'react'
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser, faBuilding, faTasks } from "@fortawesome/free-solid-svg-icons"
import Foto from "../../assets/images/juanito.jpg"
import useAuth from "../../hooks/useAuth"

import "./LeftMenu.scss"

export default function LeftMenu(props) {
    const user = useAuth();

    console.log(user);

    return (
        <div className="left-menu">
            <Row className="perfil">
                <Col className="col1">
                    <img src={Foto} alt="fotoPerfil"></img>
                </Col>
                <Col className="col2">
                    <div>
                        <Link to={"/"+ user?._id} >Juanito</Link>
                        <h6>Perez Sánchez</h6>
                    </div>
                </Col>                
            </Row>
            <Item className="item" name="asignaturas" icon={faTasks}></Item>
            <Item className="item" name="departamentos" icon={faBuilding}></Item>
            <Item className="item" name="administradores" icon={faUser}></Item>
            <Item className="item" name="profesores" icon={faUser}></Item>
            <Item className="item" name="estudiantes" icon={faUser}></Item>
            <Item className="item" name="grupos" icon={faUsers}></Item>
        </div>
    )
}

function Item(props) {
    const { name, icon } = props;
    return (
        <Link to={"/"+name}>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon> 
            {name} 
        </Link>
    );
}
