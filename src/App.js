import React, { useState} from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from "./pages/Login/Login.js"

export default function App() {
  const [user, setUser] = useState("hola");

  return (
    <div>
      {user ?
        <Login ></Login> :
        <h1> Está logueado</h1>
      }
    </div>
  );
}
