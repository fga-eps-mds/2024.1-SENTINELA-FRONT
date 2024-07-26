import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import Supplier from '../Pages/Protected/CreateSupplier';
import ListSupplier from '../Pages/Protected/ListSupplier';
import ViewSupplier from '../Pages/Protected/UpdateSupplier';

const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fornecedores/criar" element={<Supplier />} />
        <Route path="/fornecedores" element={<ListSupplier />} />
        <Route path="/fornecedores/:nome" element={<ViewSupplier />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;

/*
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/listsupplier" element={<ListSupplier />} />
        <Route path="/viewsupplier" element={<ViewSupplier />} />
*/