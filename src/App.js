import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import CreateUser from "./example/CreateUser"
import Navigation from "./example/Navigation"
import UserList from "./example/UserList"

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Route path="/" exact component={UserList}/>
        <Route path="/edit/:id" component={CreateUser}/>
        <Route path="/create" component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
