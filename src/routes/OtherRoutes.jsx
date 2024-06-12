import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../Pages/Login';
import Home from '../Pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />
  }
]);

const OtherRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default OtherRoutes;