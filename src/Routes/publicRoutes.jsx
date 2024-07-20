import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import PasswordRecovery from '../Pages/Public/PasswordRecovery';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;