import React from 'react'
import { Modal } from 'react-bootstrap'
import Logo from "../../assets/images/exam_rec.png";

import "./BasicModal.scss"

export default function FormLogin (props) {

    const { show, setShow, children} = props;

    return (
        <Modal
            className="basic-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <img src={Logo}></img>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}
