import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import Register_User from '../Pages/Protected/Register_User';
import Viewuser from '../Pages/Protected/Viewuser';
import ListUser from '../Pages/Protected/Listuser';
import Registrations from '../Pages/Protected/Registrations';


const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path ="/cadastrarUsuario" element={<Register_User/>}/>
        <Route path = "/usuario/:id" element={<Viewuser/>}/>
        <Route path="/listadeusuarios" element={<ListUser/>}/>
        <Route path= "/cadastros" element = {<Registrations/>} />
              </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;