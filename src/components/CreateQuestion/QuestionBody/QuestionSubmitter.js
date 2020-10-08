import "react";
import { toast } from "react-toastify";
import { createQuestionsAPI, updateQuestionsAPI } from "../../../api/preguntas";

export function questionSubmit(formData, mode) {
  if (mode === "create") {
    createQuestionsAPI(formData)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El registro fue existoso");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {});
  } else if (mode === "edit") {
    updateQuestionsAPI(formData)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El registro fue existoso");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {});
  }
}
