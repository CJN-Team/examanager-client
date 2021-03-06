import BasicLayout from "../../layouts/basicLayouts/BasicLayout.js";
import BasicModal from "../../components/BasicModal/BasicModal.js";
import React, { useState, useEffect } from "react";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam, faClock } from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";
import useAuth from "../../hooks/useAuth";
import { API_HOST } from "../../utils/constants.js";
import { withRouter } from "react-router-dom";
import {
  getExamApi,
  gradingExamApi,
  updateCommentApi,
} from "../../api/examenes";
import { getQuestionApi } from "../../api/preguntas";
import { toast } from "react-toastify";

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

async function searchQuestions(response) {
  var q = {};
  for (var i in response["question"]) {
    await getQuestionApi(i).then((response) => {
      q[response.id] = response;
    });
  }
  return q;
}

function Body(props) {
  const { openModal, setShowModal, examID } = props;
  const [exam, setExam] = useState({ question: {} });
  const [questions, setQuestions] = useState({});
  const [examState, setExamState] = useState(1);
  const user = useAuth();
  const profile = user.profile;

  useEffect(() => {
    getExamApi(examID).then((response) => {
      console.log(response)
      setExam(response);
      searchQuestions(response).then((v) => {
        var q = v;
        setQuestions(q);
      });
      return body();
    });
  }, [examState]);

  console.log(exam)

  const body = () => {
    if (exam.state) {
      if (!exam.finish || profile === "Profesor") {
        return (
          <Row className="body">
            <Col className="examen">
              <Examen
                openModal={openModal}
                setShowModal={setShowModal}
                exam={exam}
                q={questions}
                examState={examState}
                setExamState={setExamState}
                user={user}
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
                <h5>
                  Has finalizado el examen, pronto obtendrás los resultados
                </h5>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (exam.view) {
        return (
          <Row className="body">
            <Col className="examen">
              <Examen
                openModal={openModal}
                setShowModal={setShowModal}
                exam={exam}
                q={questions}
                examState={examState}
                setExamState={setExamState}
                user={user}
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
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              </div>
              <div className="finish-text">
                <h5>
                  El examen está cerrado, espera a que el profesor lo habilite.
                </h5>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return body();
}

function Examen(props) {
  const {
    openModal,
    setShowModal,
    exam,
    setExamState,
    q,
    examState,
    user,
  } = props;
  console.log(exam)
  const puntos = Object.entries(exam["question"]);
  const [puntosDic, setPuntosDic] = useState(exam["question"]);
  const [comment, setComment] = useState(exam.commentary===undefined ? "" : exam.commentary);
  const pictureURL = `${API_HOST}/photo?id=${user.id}`;
  const profile = user.profile;

  var editDisabled = true;
  if ((profile === "Profesor" || profile === "Administrador") && exam.finish) {
    editDisabled = false;
  }

  const [formData, setFormData] = useState({
    examid: exam.id,
    option: editDisabled ? "auto" : "manual",
    questions: {},
  });

  const preguntas = Object.entries(q);

  const tipoPregunta = (pregunta, info, number) => {
    if (pregunta === "Pregunta abierta") {
      return <Abierta number={number}></Abierta>;
    }
    if (pregunta === "Selección múltiple") {
      return <Multiple info={info} number={number}></Multiple>;
    }
    if (pregunta === "Respuesta única") {
      return <Unica info={info} number={number}></Unica>;
    }
    if (pregunta === "Verdadero o falso") {
      return <VF number={number}></VF>;
    }
  };

  const Abierta = (props) => {
    const { number } = props;

    if (typeof formData.questions === "undefined") {
      return <div></div>;
    }

    return (
      <textarea
        rows="5"
        cols="100"
        name={number}
        value={
          exam["finish"] ? puntosDic[number][1] : formData.questions.number
        }
        disabled={!exam.state}
        onChange={(e) => {
          var form = formData;
          form.questions[number] = [e.target.value];
          setFormData(form);
        }}
      ></textarea>
    );
  };

  const Multiple = (props) => {
    const { info, number } = props;

    return (
      <div>
        {info.map((x, i) => {
          return (
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id={number}
                  name={number}
                  value={parseInt(i)}
                  disabled={!exam.state}
                  checked={
                    !exam.state
                      ? puntosDic[number][1].includes(x)
                        ? true
                        : false
                      : null
                  }
                  onClick={(e) => {
                    var form = formData;
                    if (form.questions[number] == null) {
                      form.questions[number] = [parseInt(e.target.value)];
                    } else {
                      if (
                        form.questions[number].includes(
                          parseInt(e.target.value)
                        )
                      ) {
                        let pos = form.questions[number].indexOf(
                          parseInt(e.target.value)
                        );
                        let x = form.questions[number].splice(pos, 1);
                      } else {
                        form.questions[number].push(parseInt(e.target.value));
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
            value={0}
            disabled={!exam.state}
            checked={!exam.state ? (puntosDic[number][1] ? true : false) : null}
            onClick={(e) => {
              var form = formData;
              form.questions[number] = [parseInt(e.target.value)];
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
            value={1}
            disabled={!exam.state}
            checked={
              !exam.state
                ? puntosDic[number][1] === false
                  ? true
                  : false
                : null
            }
            onClick={(e) => {
              var form = formData;
              form.questions[number] = [parseInt(e.target.value)];
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
        {info.map((x, i) => {
          return (
            <div class="col-sm-10" key={x}>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name={number}
                  id={x}
                  value={parseInt(i)}
                  disabled={!exam.state}
                  checked={
                    !exam.state
                      ? puntosDic[number][1].includes(x)
                        ? true
                        : false
                      : null
                  }
                  onClick={(e) => {
                    var form = formData;
                    console.log(form);
                    form.questions[number] = [parseInt(e.target.value)];
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    gradingExamApi(formData)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se envió el examen exitosamente");
          setExamState(!examState);
          setFormData({});
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {
        setShowModal(false);
      });
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
    if (
      exam["view"] === false ||
      preguntas[i][1]["category"] === "Pregunta abierta"
    ) {
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
      return "non";
    } else {
      if (cat === "mult") {
        if (q[pos].answer.includes(res)) {
          return "corr";
        }
      } else {
        if (q[pos].answer === res) {
          return "corr";
        }
      }
    }
    return "non";
  };

  const updateExam = (e) => {
    e.preventDefault();

    var dic = {}
    for(var i in puntosDic){
      dic[i] = puntosDic[i][0]
    }

    console.log(dic)

    const data = {
      ...formData,
      questions: dic
    }

    gradingExamApi(data).then((response) => {
      if (response.code) {
        toast.warning(response.message);
      } else {
        toast.success("Se actualizó el examen exitosamente");
        setExamState(!examState);
        setFormData({});
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error del servidor, intente más tarde");
    })
    .finally(() => {
      setShowModal(false);
    });

    updateCommentApi(comment, exam.id)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Se actualizó el examen exitosamente");
          setExamState(!examState);
          setFormData({});
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {
        setShowModal(false);
        window.location.reload();
      });
  };

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
                <h6>{new Date(exam.date).toLocaleDateString("es-ES")}</h6>
                <h4>{exam.view ? "Nota: " + exam.grade : ""}</h4>
              </Col>
            </Row>

            <div>
              <h6>{exam["name"]}</h6>
              <h6>{exam.topic}</h6>
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
                    <h5>{[i + 1] + ". " + x[1]["question"] + " (25%)"}</h5>
                  </Col>
                  {exam["finish"] === true ? (
                    <Col className="puntaje">
                      <Row>
                        <h5>Puntaje:</h5>
                        {profile === "Estudiante" ? (
                          <h5>{puntos[i][1][0]}</h5>
                        ) : (
                          <Form.Control
                            type="number"
                            min="0"
                            max="5"
                            defaultValue={puntosDic[puntos[i][0]][0]}
                            name={"puntoP " + puntos[i][0]}
                            onChange={(e) => {
                              puntosDic[puntos[i][0]][0] = Math.floor(
                                e.target.value
                              );
                              setPuntosDic(puntosDic);
                            }}
                          />
                        )}
                      </Row>
                    </Col>
                  ) : (
                    <div></div>
                  )}
                </Row>
                {tipoPregunta(x[1]["category"], x[1]["options"], x[0])}
              </div>
            );
          })}
          {!exam.state ? (
              <>
                <div className="comentario">
                  <div>Comentarios</div>
                  <textarea
                    rows="5"
                    cols="100"
                    name="comment"
                    value={(profile==="Estudiante") ? exam.commentary : comment}
                    disabled={((profile==="Estudiante"))}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                {
                  profile==="Estudiante" ? <div></div> :
                  <div className="btn-cont">
                    <Button className="btn-update" onClick={(e) => updateExam(e)}>
                      Actualizar Examen
                    </Button>
                  </div>
                }                
              </>
          ) : (
            <div className="btn-cont">
              <Button
                className="btn-create"
                onClick={() => openModal(<Seguro></Seguro>)}
              >
                Enviar Examen
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

function InfoExam(props) {
  const {} = props;

  return <div>Información del examen</div>;
}
