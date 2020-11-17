import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { listUsersAPI } from "../../api/usuarios";

export default function CreateDept(props) {
  const [teacherList, setTeacherList] = useState([
    { name: "init", id: "init" },
  ]);

  useEffect(() => {
    listUsersAPI("Profesor").then((response) => {
      setTeacherList(response);
    });
  }, []);

  return (
    <div>
      {JSON.stringify(teacherList)}
      <Form></Form>
    </div>
  );
}
