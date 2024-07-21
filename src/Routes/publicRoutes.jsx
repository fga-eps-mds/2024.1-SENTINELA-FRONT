import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import MemberShip from '../Pages/Public/MemberShip';
import Caduser from '../Pages/Protected/Caduser';
import Viewuser from '../Pages/Protected/Viewuser';
import Cadastros from '../Pages/Protected/Cadastros';
import ListUser from '../Pages/Protected/Listuser';
const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filiacao" element={<MemberShip />} />
        <Route path ="/caduser" element={<Caduser/>}/>
        <Route path = "/viewuser" element={<Viewuser/>}/>
        <Route path="/cadastros" element={<Cadastros/>}/>
        <Route path="/listauser" element={<ListUser/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;