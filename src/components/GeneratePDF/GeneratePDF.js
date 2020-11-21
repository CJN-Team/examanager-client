import React from "react";
import { generateExamPdfAPI } from "../../api/examenes";

export default function GeneratePDF(props) {
  const { examID, setShowModal } = props;

  return <div>{examID}</div>;
}
