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
import FinancialMovements from "../Pages/Protected/FinancialMovements/FinancialCreate";
import FinancialList from "../Pages/Protected/FinancialMovements/FinancialList";
import FinancialUpdate from "../Pages/Protected/FinancialMovements/FinancialUpdate";

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
      <Route path="/perfil" element={<ProfileUpdate />} />
      <Route path="/movimentacoes/criar" element={<FinancialMovements />} />
      <Route path="/movimentacoes/lista" element={<FinancialList />} />
      <Route
        path="/movimentacoes/visualizar/:id"
        element={<FinancialUpdate />}
      />
    </Routes>
  );
};

export default ProtectedRoutes;
