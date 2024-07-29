import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login";
import Home from "../Pages/Protected/Home";
import UserCreatePage from "../Pages/Protected/Users/userCreatePage";
import UserListPage from "../Pages/Protected/Users/userListPage";
import UserHubPage from "../Pages/Protected/Users/userHubPage";
import UserUpdatePage from "../Pages/Protected/Users/userUpdatePage";
import ChangePassword from "../Pages/Public/ChangePassword";

const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios/criar" element={<UserCreatePage />} />
        <Route path="/usuarios/editar/:id" element={<UserUpdatePage />} />
        <Route path="/usuarios" element={<UserListPage />} />
        <Route path="/usuarios/hub" element={<UserHubPage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;
