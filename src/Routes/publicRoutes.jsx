import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login";
import MemberShip from "../Pages/Public/MemberShip";
import Filiacao from "../Pages/Public/Membership-componed";
import PasswordRecovery from "../Pages/Public/PasswordRecovery";
import ChangePasswordPage from "../Pages/Public/ChangePasswordPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/filiacao" element={<MemberShip />} />
      {/* ROTA DA PÁGINA COMPONENTIZADA */}
      <Route path="/membership" element={<Filiacao />} />
      <Route path="/recuperar-senha" element={<PasswordRecovery />} />
      <Route path="/trocar-senha/:token" element={<ChangePasswordPage />} />
    </Routes>
  );
};

export default PublicRoutes;
