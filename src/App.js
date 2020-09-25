import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./pages/Login/Login.js";
import Routing from "./Routes/routing.js";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/context.js";
import { isUserLogedApi } from "./api/auth.js";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(isUserLogedApi());
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {user ? <Routing></Routing> : <Login></Login>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisivilityChange
        draggable
        pauseOnHover
      ></ToastContainer>
    </AuthContext.Provider>
  );
}
