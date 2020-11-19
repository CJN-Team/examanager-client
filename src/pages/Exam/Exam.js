import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import React, { useState, useEffect } from "react";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";
import useAuth from "../../hooks/useAuth";
import { API_HOST } from "../../utils/constants.js";

import "./Exam.scss";

export default function Exam(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };  

  return (
    <BasicLayout setRefreshLogin={setRefreshLogin}>
      <Container className="examenes-cont" fluid>
        <Body
          openModal={openModal}
          setShowModal={setShowModal}
        ></Body>
      </Container>      
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </BasicLayout>
  );
}

function Body (props) {
  const { openModal, setShowModal} = props;
  const [ finish, setFinish ]= useState(true);
  const [ exam, setExam ] = useState(
      {
        "teacher": "Edison Valencia",
        "open": false,
        "finish": false, //hijo
        "view": true, //padre
        "student": "Andrés López Bedoya",
        "topics": ["funciones", "gramatica"],
        "institution": "Universidad EAFIT",
        "name": "Parcial 1",
        "gud": {
            "1": 1,
            "2": 0,
            "3": 0,
            "4": 1
        },
        "questions": {
            "1": {
                "subject": "Lenguajes de programacion",
                "topic": "gramatica",
                "id": "1",
                "question": "¿Existe una funcion que me devuelva el tamaño (num de caracteres) de un string en Java?",
                "category": "unica",
                "difficulty": 1,
                "options": ["si", "no", "no sé"],
                "answer": ["si"],
            },
            "2": {
                "subject": "Lenguajes de programacion",
                "topic": "gramatica",
                "id": "2",
                "question": "Escriba una sentencia de código que devuelva el tamaño de un String en Java",
                "category": "abierta",
                "difficulty": 1,
            },
            "3": {
                "subject": "Lenguajes de programacion",
                "topic": "gramatica",
                "id": "3",
                "question": "¿Los Strings son con s mayúscula en Python?",
                "category": "vf",
                "difficulty": 1,
                "answer": [false],
            },
            "4": {
                "subject": "Lenguajes de programacion",
                "topic": "gramatica",
                "id": "4",
                "question": "¿Cuales lenguajes son interpretados?",
                "category": "multiple",
                "difficulty": 1,
                "options": ["Python", "Java", "C++", "Ruby"],
                "answer": ["mis papás"],
            },
        }
      }
  )

  useEffect(() => {
    body(finish)
  }, [finish]);

  const body = (finish) => {
    if(finish){
        return (
            <Row className="body">
              <Col className="examen">
                <Examen openModal={openModal} setShowModal={setShowModal} exam={exam} setFinish={setFinish}></Examen>
              </Col>
              <Col className="info">
                <InfoExam exam={exam}></InfoExam>
              </Col>
            </Row>
        );  
    }else {
        return (
            <div className="finish">
                <div>
                    <div className="finish-icon">
                        <FontAwesomeIcon icon={faSmileBeam}></FontAwesomeIcon>  
                    </div>  
                    <div className="finish-text">
                        <h5>Has finalizado el examen, pronto obtendrás los resultados</h5>
                    </div> 
                </div>                                             
            </div>
        );
    }
  }

  return (
    body(finish)
); 
}

function Examen (props) {
    const { openModal, setShowModal, exam, setFinish} = props;
    const preguntas = Object.entries(exam["questions"]);
    const puntos = Object.entries(exam["gud"]);
    const [formData, setFormData] = useState({});
    const user = useAuth();
    const pictureURL = `${API_HOST}/photo?id=${user.id}`;

    const tipoPregunta = (pregunta, info, number) => {
        if(pregunta === "abierta") {
            return <Abierta number={number}></Abierta>
        }
        if(pregunta === "multiple"){
            return <Multiple info={info} number={number}></Multiple>
        }
        if(pregunta === "unica"){
            return <Unica info={info} number={number}></Unica>
        }
        if(pregunta === "vf"){
            return <VF number={number}></VF>
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setShowModal(false)
        setFinish(false);
    };
    
    const Abierta = (props) => {
        const { number } = props
    
        return (
            <textarea 
                rows="5" 
                cols="100"
                name={number}
                value={formData.number}
                onChange={(e) =>
                  {
                      var form = formData;
                      form[number] = e.target.value;
                      setFormData(form)
                  }
                }
            >            
            </textarea>
        );
    }
    
    const Multiple = (props) => {
        const { info, number } = props
        
        return (
            <div>
                {info.map((x) => {
                    return (
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id={x}
                                    name={number}
                                    value={x}
                                    onClick={(e) =>
                                        {
                                            var form = formData;
                                            if (form[number] == null) {
                                                form[number] = [e.target.value];
                                            } else{
                                                if (form[number].includes(e.target.value)) {
                                                    let pos = form[number].indexOf(e.target.value)
                                                    let x = form[number].splice(pos, 1)
                                                } else {
                                                  form[number].push(e.target.value)
                                                }                                                                                              
                                            }                                            
                                            setFormData(form)
                                        }
                                    }
                                ></input>
                                <label class="form-check-label" for={x}>{x}</label>
                            </div>
                        </div>
                    );
                })}
            </div>
        );    
    }
    
    const VF = (props) => {
        const { number } = props
    
        return (
            <div class="col-sm-10">
                <div class="form-check">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name={number} 
                        id="verdadero" 
                        value="true"
                        onClick={(e) =>
                            {
                                var form = formData;
                                form[number] = e.target.value;
                                setFormData(form)
                            }
                        }
                    ></input>
                    <label class="form-check-label" for="verdadero">Verdadero</label>
                </div>
                <div class="form-check">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name={number}
                        id="falso" 
                        value="false" 
                        onClick={(e) =>
                            {
                                var form = formData;
                                form[number] = e.target.value;
                                setFormData(form)
                            }
                        }
                    ></input>
                    <label class="form-check-label" for="falso">Falso</label>
                </div>
            </div>
        );
    }
    
    const Unica = (props) => {
        const { info, number } = props
    
        return (
            <div>
                {info.map((x) => {
                    return (
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    name={number}
                                    id={x} 
                                    value={x}
                                    onClick={(e) =>
                                        {
                                            var form = formData;
                                            form[number] = e.target.value;
                                            setFormData(form)
                                        }
                                    }
                                ></input>
                                <label class="form-check-label" for={x}>{x}</label>
                            </div>
                        </div>
                    );
                })}
            </div>        
        );
    }

    const Seguro = () => {
    
        return (
            <div className="seguro">
                <div>
                    <h5>¿Estás seguro?</h5>
                </div>
                <div>
                    <Button onClick={(e) => onSubmit(e)}>
                        Confirmar
                    </Button>
                </div>                
            </div>
        );
    }

    const showResponse = (i) => {
        console.log(puntos)
        if ( exam["view"] === false || preguntas[i][1]["category"] === "abierta" ) {
          return "enunciado";
        } else {
          if (puntos[i][1] === 0){
            return "incorrecta"
          } else {
              return "correcta"
          }
        }
      };

    return (
        <div>
            <div className="encabezado">
                <Row>
                    <Col className="foto">
                        <img src={pictureURL}
                            alt="fotoPerfil"
                            onError={(e) => {
                            e.target.src = DefaultAvatar;
                            }}>
                        </img>
                    </Col>
                    <Col className="informacion">
                        <div className="inst">
                            <h4>{exam["institution"]}</h4>
                        </div>
                        <Row>
                            <Col className="left">
                                <h5>{exam["student"]}</h5>
                            </Col>
                            <Col>
                                <h6>fecha: 23/11/2020</h6>
                            </Col>
                        </Row>
                        
                        <div>
                            <h6>{exam["name"]}</h6>
                            <h6>Lenguajes de programación</h6>
                            <h6>{exam["teacher"]}</h6>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="examen-body">
                <Form onSubmit={onSubmit}>
                    {preguntas.map((x, i) => {
                        return (
                            <div className="pregunta">
                                <Row className="top">
                                    <Col className={showResponse(i)}>
                                        <h5>{[i+1] + " " + x[1]["question"] + " (25%)"}</h5>
                                    </Col>
                                    <Col className="puntaje">
                                        <h6>Puntaje: </h6>
                                    </Col>
                                </Row>
                                {tipoPregunta(x[1]["category"], x[1]["options"], i)}
                            </div>
                        );                        
                    })}                    
                    <div className="btn-cont">
                        <Button className="btn-create" onClick={
                            () => openModal(
                                <Seguro></Seguro>
                            )
                        }>
                            Enviar Examen
                        </Button>
                    </div>
                </Form>                
            </div>
        </div>
    );    
}



function InfoExam (props) {
    const {} = props;

    return (
        <div>
            Información del examen
        </div>
    );
}

