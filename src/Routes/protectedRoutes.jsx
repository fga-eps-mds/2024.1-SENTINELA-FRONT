import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login";
import Home from "../Pages/Protected/Home";
import ProfileUpdate from "../Pages/Protected/ProfileUpdate";

const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;
