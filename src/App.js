import React, { useState } from "react";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css'
import { Home } from "./pages/Home";
function App() {
 

  return (
    <div className="App">
    <Router >
      <Routes>
<Route path="/home" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
