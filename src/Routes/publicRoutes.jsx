import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Public/Login';
import Home from '../Pages/Protected/Home';
//import Supplier from '../Pages/Protected/Supplier';
//import ViewSupplier from '../Pages/Protected/ViewSupplier';
//import ListSupplier from '../Pages/Protected/ListSupplier';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
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