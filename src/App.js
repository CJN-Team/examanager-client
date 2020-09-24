import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from "./pages/Login/Login.js"
import Routing from "./routes/routing.js"

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ?
        <Routing></Routing> :        
        <Login ></Login>
      }
    </div>
  );
}
