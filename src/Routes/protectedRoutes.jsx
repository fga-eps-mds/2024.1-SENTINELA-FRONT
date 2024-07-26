import React from 'react';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import RegisterUser from '../Pages/Protected/RegisterUser';
import ListUser from '../Pages/Protected/Listuser';
import Registrations from '../Pages/Protected/Registrations';
import UpdateUser from '../Pages/Protected/UpdateUser';

const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path ="/cadastros/novoCadastro" element={<RegisterUser/>}/>
        <Route path = "/cadastros/usuarios/:id" element={<UpdateUser/>}/>
        <Route path="/cadastros/usuarios" element={<ListUser/>}/>
        <Route path= "/cadastros" element = {<Registrations/>} />
              </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;