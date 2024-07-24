import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
import Supplier from '../Pages/Public/Supplier';
import ViewSupplier from '../Pages/Public/ViewSupplier';
import ListSupplier from '../Pages/Public/ListSupplier';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/listsupplier" element={<ListSupplier />} />
        <Route path="/viewsupplier" element={<ViewSupplier />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;

/*
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/listsupplier" element={<ListSupplier />} />
        <Route path="/viewsupplier" element={<ViewSupplier />} />
*/