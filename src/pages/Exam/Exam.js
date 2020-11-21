import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import React, { useState, useEffect } from "react";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";
import useAuth from "../../hooks/useAuth";
import { API_HOST } from "../../utils/constants.js";
import { withRouter } from "react-router-dom";
import { getExamApi } from "../../api/examenes"
import { getQuestionApi } from "../../api/preguntas"

import "./Exam.scss";

export default withRouter(Exam);

function Exam(props) {
  const { setRefreshLogin, match } = props;
  const examId = match["params"]["examId"];
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
          examID={examId}
        ></Body>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </BasicLayout>
  );
}

function Body(props) {
  const { openModal, setShowModal, examID } = props;
  const [exam, setExam] = useState({"question": []});
  const [ questions, setQuestions ] = useState({})
  const [ examState, setExamState ] = useState(1);

  useEffect(() => {
    getExamApi(examID).then((response) => {
      var e = response
      e["view"] = false
      e["state"] = false
      e["finish"] = false
      console.log(e)
      setExam(e);
      var q = {}
      for(var i in response["question"]){
        getQuestionApi(response["question"][i]).then((response) => {
          q[i] = response;
        });
      }
      setQuestions(q)

      return body(exam.finish)
    });
  }, []);

  const body = (finish) => {
    if (!finish) {
      return (
        <Row className="body">
          <Col className="examen">
            <Examen
              openModal={openModal}
              setShowModal={setShowModal}
              exam={exam}
              q={questions}
            ></Examen>
          </Col>
          <Col className="info">
            <InfoExam exam={exam}></InfoExam>
          </Col>
        </Row>        
      );
    } else {
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
  };

  return body(exam.finish);
}

function Examen(props) {
  const { openModal, setShowModal, exam, setFinish, q } = props;
  const puntos = Object.entries(exam["question"]);
  const [ puntosDic, setPuntosDic ] = useState(exam["question"])
  const [ comment, setComment ] = useState("")
  const [formData, setFormData] = useState({});
  const user = useAuth();
  const pictureURL = `${API_HOST}/photo?id=${user.id}`;
  const profile = "Profesor"

  var editDisabled = true

  if (profile === "Profesor" && exam["finish"]) {
      editDisabled = false
  }

  const dicPreguntas = () => {
    var questions = {}

    for( var i in exam["questions"]) {
        questions[i] = q[i]
    }
    return questions
  }

  const preguntas = Object.entries(dicPreguntas());

  const tipoPregunta = (pregunta, info, number) => {
    if (pregunta === "abierta") {
      return <Abierta number={number}></Abierta>;
    }
    if (pregunta === "multiple") {
      return <Multiple info={info} number={number}></Multiple>;
    }
    if (pregunta === "unica") {
      return <Unica info={info} number={number}></Unica>;
    }
    if (pregunta === "vf") {
      return <VF number={number}></VF>;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowModal(false);
    setFinish(false);
  };

  const Abierta = (props) => {
    const { number } = props;

    return (
      <textarea
        rows="5"
        cols="100"
        name={number}
        value={ exam["finish"] ? puntosDic[number][1] : formData.number}
        disabled={exam["finish"]}
        onChange={(e) => {
          var form = formData;
          form[number] = e.target.value;
          setFormData(form);
        }}
      ></textarea>
    );
  };

  const Multiple = (props) => {
    const { info, number } = props;

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
                  disabled={exam["finish"]}
                  checked={(exam["finish"] && puntosDic[number][1].includes(x))}
                  onClick={(e) => {
                    var form = formData;
                    if (form[number] == null) {
                      form[number] = [e.target.value];
                    } else {
                      if (form[number].includes(e.target.value)) {
                        let pos = form[number].indexOf(e.target.value);
                        let x = form[number].splice(pos, 1);
                      } else {
                        form[number].push(e.target.value);
                      }
                    }
                    setFormData(form);
                  }}
                ></input>
                <label className={correct(number, x, "mult")} for={x}>
                  {x}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const VF = (props) => {
    const { number } = props;

    return (
      <div class="col-sm-10">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name={number}
            id="verdadero"
            value="true"
            disabled={exam["finish"]}
            checked={(exam["finish"] && puntosDic[number][1] )}
            onClick={(e) => {
              var form = formData;
              form[number] = e.target.value;
              setFormData(form);
            }}
          ></input>
          <label className={correct(number, true, "vf")} for="verdadero">
            Verdadero
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name={number}
            id="falso"
            value="false"
            disabled={exam["finish"]}
            checked={(exam["finish"] && puntosDic[number][1]===false)}
            onClick={(e) => {
              var form = formData;
              form[number] = e.target.value;
              setFormData(form);
            }}
          ></input>
          <label className={correct(number, false, "vf")} for="falso">
            Falso
          </label>
        </div>
      </div>
    );
  };

  const Unica = (props) => {
    const { info, number } = props;

    return (
      <div>
        {info.map((x) => {
          return (
            <div class="col-sm-10" key={x}>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name={number}
                  id={x}
                  value={x}
                  disabled={exam["finish"]}
                  checked={(exam["finish"] && puntosDic[number][1].includes(x))}
                  onClick={(e) => {
                    var form = formData;
                    form[number] = e.target.value;
                    setFormData(form);
                  }}
                ></input>
                <label className={correct(number, x, "unica")} for={x}>
                  {x}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const Seguro = () => {
    return (
      <div className="seguro">
        <div>
          <h5>¿Estás seguro?</h5>
        </div>
        <div>
          <Button onClick={(e) => onSubmit(e)}>Confirmar</Button>
        </div>
      </div>
    );
  };

  const showResponse = (i) => {
    if (exam["view"] === false || preguntas[i][1]["category"] === "abierta") {
      return "enunciado";
    } else {
      if (puntos[i][1][0] === 0) {
        return "incorrecta";
      } else {
        return "correcta";
      }
    }
  };

  const correct = (pos, res, cat) => {
      if (exam["view" === false]) {
          return "non"
      } else {
          if ( cat === "mult") {
              console.log(puntosDic[pos][2])
            if (puntosDic[pos][2].includes(res)) {
                return "corr"
            }
          } else{
            if (puntosDic[pos][2] === res) {
                return "corr"
            }
          }
        }
        return "non"
  }

  return (
    <div>
      <div className="encabezado">
        <Row>
          <Col className="foto">
            <img
              src={pictureURL}
              alt="fotoPerfil"
              onError={(e) => {
                e.target.src = DefaultAvatar;
              }}
            ></img>
          </Col>
          <Col className="informacion">
            <div className="inst">
              <h4>{exam["institutionname"]}</h4>
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
                    <h5>{[i + 1] + " " + x[1]["question"] + " (25%)"}</h5>
                  </Col>
                  { 
                    exam["finish"] === true ? 
                    <Col className="puntaje">
                        <Row>
                            <h5>Puntaje:</h5>
                            {
                                editDisabled ? <h5>{puntos[i][1][0]}</h5> : 
                                <Form.Control
                                    type="number"
                                    value={puntosDic[puntos[i][0]][0]}
                                    name={"puntoP "+puntos[i][0]}
                                    onChange={(e) => {
                                        var form = puntosDic
                                        console.log(puntos[i][0])
                                        form[puntos[i][0]][0] = e.target.value !== "" ? parseInt(e.target.value) : 0
                                        setPuntosDic(form)
                                        console.log(puntosDic)
                                    }}
                                />
                            }                            
                        </Row>                    
                    </Col>
                     : 
                    <div></div>
                  }                  
                </Row>
                {tipoPregunta(x[1]["category"], x[1]["options"], x[0])}
              </div>
            );
          })}
            {
                exam["finish"] ? 
                    profile === "Profesor" ?
                    <>
                    <div className="comentario">
                        <div>Comentarios</div>
                        <textarea
                            rows="5"
                            cols="100"
                            name="comment"
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="btn-cont">
                        <Button
                        className="btn-update"
                        onClick={() => openModal(<Seguro></Seguro>)}
                        >
                        Actualizar Examen
                        </Button>
                    </div>
                    </>
                    :
                    <div></div>
                :
                <div className="btn-cont">
                    <Button
                    className="btn-create"
                    onClick={() => openModal(<Seguro></Seguro>)}
                    >
                    Enviar Examen
                    </Button>
                </div>
            }            
        </Form>
      </div>
    </div>
  );
}

function InfoExam(props) {
  const {} = props;

  return <div>Información del examen</div>;
}
