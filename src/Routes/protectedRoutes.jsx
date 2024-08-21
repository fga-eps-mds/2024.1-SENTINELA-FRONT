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
import MembershipRequest from "../Pages/Protected/MembershipRequests";
import Benefits from "../Pages/Protected/Benefit/Benefits";
import BenefitsList from "../Pages/Protected/Benefit/BenefitsList";
import BenefitsCreate from "../Pages/Protected/Benefit/BenefitsCreate";
import BenefitsUpdate from "../Pages/Protected/Benefit/BenefitsUpdate";
import FinanceHubPage from "../Pages/Protected/Finance/FinanceHubPage";
import FinanceBankAccount from "../Pages/Protected/Finance/BankAccountCreate";
import FinanceUpdate from "../Pages/Protected/Finance/BankAccountUpdate";
import FinanceList from "../Pages/Protected/Finance/BankAccountList";
import ListOrgan from "../Pages/Protected/Organ";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/fornecedores/criar" element={<Supplier />} />
      <Route path="/fornecedores" element={<ListSupplier />} />
      <Route path="/fornecedores/:id" element={<ViewSupplier />} />
      <Route path="/usuarios/criar" element={<UserCreatePage />} />
      <Route path="/usuarios/editar/:nome" element={<UserUpdatePage />} />
      <Route path="/usuarios" element={<UserListPage />} />
      <Route path="/usuarios/hub" element={<UserHubPage />} />
      <Route path="/perfis" element={<RolesListPage />} />
      <Route path="/perfis/criar" element={<RolesCreatePage />} />
      <Route path="/perfis/editar/:name" element={<RolesUpdatePage />} />
      <Route path="/perfil" element={<ProfileUpdate />} />
      <Route
        path="usuarios/hub/membershipRequests"
        element={<MembershipRequest />}
      />
      <Route path="/beneficios" element={<Benefits />} />
      <Route path="/beneficios/lista" element={<BenefitsList />} />
      <Route path="/beneficios/criar" element={<BenefitsCreate />} />
      <Route path="/beneficios/editar/:id" element={<BenefitsUpdate />} />
      <Route path="/finance/hub" element={<FinanceHubPage />} />
      <Route path="/finance/criar" element={<FinanceBankAccount />} />
      <Route path="/finance/update/:id" element={<FinanceUpdate />} />
      <Route path="/finance/list" element={<FinanceList />} />
      <Route path="/organ" element={<ListOrgan />} />
    </Routes>
  );
};

export default ProtectedRoutes;
