import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Protected/Home";
import ProfileUpdate from "../Pages/Protected/ProfileUpdate";
import UserCreatePage from "../Pages/Protected/Users/userCreatePage";
import UserListPage from "../Pages/Protected/Users/userListPage";
import UserHubPage from "../Pages/Protected/Users/userHubPage";
import UserUpdatePage from "../Pages/Protected/Users/userUpdatePage";

const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios/criar" element={<UserCreatePage />} />
        <Route path="/usuarios/editar/:id" element={<UserUpdatePage />} />
        <Route path="/usuarios" element={<UserListPage />} />
        <Route path="/usuarios/hub" element={<UserHubPage />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoutes;
