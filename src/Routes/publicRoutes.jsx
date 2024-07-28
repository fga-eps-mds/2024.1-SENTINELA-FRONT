import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login";
import Home from "../Pages/Protected/Home";
import MemberShip from "../Pages/Public/MemberShip";

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
