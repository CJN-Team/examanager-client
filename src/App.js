import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
import Login from "./pages/Login/Login.js"
import Routing from "./routes/routing.js"
import { ToastContainer } from "react-toastify"

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ?
        <Routing></Routing> :        
        <Login ></Login>
      }
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
    </div>
  );
}
