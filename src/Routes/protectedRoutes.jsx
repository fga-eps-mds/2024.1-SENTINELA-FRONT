import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import Caduser from '../Pages/Protected/Caduser';
import Viewuser from '../Pages/Protected/Viewuser';
const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path ="/caduser" element={<Caduser/>}/>
        <Route path = "/viewuser" element={<Viewuser/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;