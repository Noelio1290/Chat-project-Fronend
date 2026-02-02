import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/Register/register.jsx"
import Login from "./pages/Login/login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
