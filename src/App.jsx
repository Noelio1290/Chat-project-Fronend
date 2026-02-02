import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/Register/register.jsx"
import Login from "./pages/Login/login.jsx";
import Chat from "./pages/Chat/chat.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
