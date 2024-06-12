import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from "./Pages/Signup";
import Header from './Compnoents/Header';

function App() {
  return (
    <BrowserRouter>
     <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
