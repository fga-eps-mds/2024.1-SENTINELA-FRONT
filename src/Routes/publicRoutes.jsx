import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import ProfileUpdate from '../Pages/Protected/ProfileUpdate';
import MemberShip from '../Pages/Public/MemberShip';
const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filiacao" element={<MemberShip />} />

      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;