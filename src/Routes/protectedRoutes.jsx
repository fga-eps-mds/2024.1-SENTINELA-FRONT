import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import BankAccount from '../Pages/Protected/BankAccount';
import Finance from '../Pages/Protected/Finance';
import ListBankAccount from '../Pages/Protected/ListBankAccount';

const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/finance/bankAccount" element={<BankAccount />} />
        <Route path="/finance/listBankAccount" element={<ListBankAccount />} /> 

        
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;