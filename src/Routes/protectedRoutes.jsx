import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Protected/Home";
import ProfileUpdate from "../Pages/Protected/ProfileUpdate";
import UserCreatePage from "../Pages/Protected/Users/userCreatePage";
import UserListPage from "../Pages/Protected/Users/userListPage";
import UserHubPage from "../Pages/Protected/Users/userHubPage";
import UserUpdatePage from "../Pages/Protected/Users/userUpdatePage";
import Supplier from "../Pages/Protected/CreateSupplier";
import ListSupplier from "../Pages/Protected/ListSupplier";
import ViewSupplier from "../Pages/Protected/UpdateSupplier";
import RolesCreatePage from "../Pages/Protected/Roles/RolesCreatePage";
import RolesListPage from "../Pages/Protected/Roles/RolesListPage";
import RolesUpdatePage from "../Pages/Protected/Roles/RolesUpdatePage";
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/fornecedores/criar" element={<Supplier />} />
      <Route path="/fornecedores" element={<ListSupplier />} />
      <Route path="/fornecedores/:nome" element={<ViewSupplier />} />
      <Route path="/usuarios/criar" element={<UserCreatePage />} />
      <Route path="/usuarios/editar/:id" element={<UserUpdatePage />} />
      <Route path="/usuarios" element={<UserListPage />} />
      <Route path="/usuarios/hub" element={<UserHubPage />} />
      <Route path="/perfis" element={<RolesListPage />} />
      <Route path="/perfis/criar" element={<RolesCreatePage />} />
      <Route path="/perfis/editar/:name" element={<RolesUpdatePage />} />
      <Route path="/perfil" element={<ProfileUpdate />} />
    </Routes>
  );
};

export default ProtectedRoutes;
