import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./Pages/Login/Login.js";
import Routing from "./Routes/Routing.js";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./Utils/Context.js";
import { isUserLogedApi } from "./Api/Auth.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshLogin, setRefreshLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshLogin(false);
    setLoadUser(true);
  }, [refreshLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? <Routing></Routing> : <Login setRefreshLogin={setRefreshLogin}></Login>}
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
