import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Add_Tasks from "./components/Tasks/Add_Tasks";
import Share from "./components/Share";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/tasks" element={<Add_Tasks />} />
        <Route path="/share" element={<Share />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
