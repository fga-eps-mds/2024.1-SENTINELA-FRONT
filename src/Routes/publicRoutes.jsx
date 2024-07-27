import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login";
import Home from "../Pages/Protected/Home";

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
