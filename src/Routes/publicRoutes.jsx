import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login";
import MemberShip from "../Pages/Public/MemberShip";
import PasswordRecovery from "../Pages/Public/PasswordRecovery";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/filiacao" element={<MemberShip />} />
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
