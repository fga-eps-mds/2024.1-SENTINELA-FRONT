import { Route, Routes } from "react-router-dom";
import PermissionProtect from "./permissionProtect";
import Home from "../Pages/Protected/Home";
import ProfileUpdate from "../Pages/Protected/ProfileUpdate";
import UserCreatePage from "../Pages/Protected/Users/userCreatePage";
import UserListPage from "../Pages/Protected/Users/userListPage";
import UserHubPage from "../Pages/Protected/Users/userHubPage";
import UserUpdatePage from "../Pages/Protected/Users/userUpdatePage";
import Supplier from "../Pages/Protected/Supplier/CreateSupplier";
import ListSupplier from "../Pages/Protected/Supplier/ListSupplier";
import ViewSupplier from "../Pages/Protected/Supplier/UpdateSupplier";
import RolesCreatePage from "../Pages/Protected/Roles/RolesCreatePage";
import RolesListPage from "../Pages/Protected/Roles/RolesListPage";
import RolesUpdatePage from "../Pages/Protected/Roles/RolesUpdatePage";
import MembershipRequest from "../Pages/Protected/MembershipRequests";
import Benefits from "../Pages/Protected/Benefit/Benefits";
import BenefitsList from "../Pages/Protected/Benefit/BenefitsList";
import BenefitsCreate from "../Pages/Protected/Benefit/BenefitsCreate";
import BenefitsUpdate from "../Pages/Protected/Benefit/BenefitsUpdate";
import ViewMembershipPage from "../Pages/Protected/Users/ViewMembershipPage";
import FinanceHubPage from "../Pages/Protected/Finance/FinanceHubPage";
import FinanceBankAccount from "../Pages/Protected/Finance/BankAccountCreate";
import FinanceUpdate from "../Pages/Protected/Finance/BankAccountUpdate";
import FinanceList from "../Pages/Protected/Finance/BankAccountList";
import OrganCreate from "../Pages/Protected/Organ/OrganCreate";
import OrganList from "../Pages/Protected/Organ/ListOrgan";
import OrganUpdate from "../Pages/Protected/Organ/OrganUpdate";
import FinancialMovements from "../Pages/Protected/FinancialMovements/FinancialCreate";
import FinancialList from "../Pages/Protected/FinancialMovements/FinancialList";
import FinancialUpdate from "../Pages/Protected/FinancialMovements/FinancialUpdate";
import ContributionHistoric from "../Pages/Protected/FinancialMovements/ContributionHistoric";
import Unauthorized from "../Pages/Protected/Unauthorized";
import GenerateFinancialReport from "../Pages/Protected/FinancialMovements/GenerateFinancialReport";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/fornecedores/criar"
        element={
          <PermissionProtect
            element={<Supplier />}
            moduleName="finance"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/fornecedores"
        element={
          <PermissionProtect
            element={<ListSupplier />}
            moduleName="finance"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route
        path="/fornecedores/:id"
        element={
          <PermissionProtect
            element={<ViewSupplier />}
            moduleName="finance"
            actions={["read", "update", "delete"]}
          />
        }
      />
      <Route
        path="/usuarios/criar"
        element={
          <PermissionProtect
            element={<UserCreatePage />}
            moduleName="users"
            actions={["create"]}
          />
        }
      />
      <Route path="/usuarios/editar/:nome" element={<UserUpdatePage />} />
      <Route
        path="/usuarios"
        element={
          <PermissionProtect
            element={<UserListPage />}
            moduleName="users"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route path="/filiados/:id" element={<ViewMembershipPage />} />
      <Route
        path="/usuarios/hub"
        element={
          <PermissionProtect
            element={<UserHubPage />}
            moduleName="users"
            actions={["read", "update", "delete"]}
          />
        }
      />
      <Route
        path="/perfis"
        element={
          <PermissionProtect
            element={<RolesListPage />}
            moduleName="users"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />

      <Route
        path="/perfis/criar"
        element={
          <PermissionProtect
            element={<RolesCreatePage />}
            moduleName="users"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/perfis/editar/:name"
        element={
          <PermissionProtect
            element={<RolesUpdatePage />}
            moduleName="users"
            actions={["read", "update", "delete"]}
          />
        }
      />
      <Route path="/perfil" element={<ProfileUpdate />} />
      <Route
        path="usuarios/hub/filiacoes-pendentes"
        element={
          <PermissionProtect
            element={<MembershipRequest />}
            moduleName="users"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/beneficios"
        element={
          <PermissionProtect
            element={<Benefits />}
            moduleName="benefits"
            actions={["read", "update", "delete", "create"]}
          />
        }
      />
      <Route
        path="/beneficios/lista"
        element={
          <PermissionProtect
            element={<BenefitsList />}
            moduleName="benefits"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route
        path="/beneficios/criar"
        element={
          <PermissionProtect
            element={<BenefitsCreate />}
            moduleName="benefits"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/beneficios/editar/:id"
        element={
          <PermissionProtect
            element={<BenefitsUpdate />}
            moduleName="benefits"
            actions={["read", "update", "delete"]}
          />
        }
      />
      <Route
        path="/finance/hub"
        element={
          <PermissionProtect
            element={<FinanceHubPage />}
            moduleName="finance"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route
        path="/finance/criar"
        element={
          <PermissionProtect
            element={<FinanceBankAccount />}
            moduleName="finance"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/finance/update/:id"
        element={
          <PermissionProtect
            element={<FinanceUpdate />}
            moduleName="finance"
            actions={["update", "delete", "read"]}
          />
        }
      />
      <Route
        path="/finance/list"
        element={
          <PermissionProtect
            element={<FinanceList />}
            moduleName="finance"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route
        path="/organ/create"
        element={
          <PermissionProtect
            element={<OrganCreate />}
            moduleName="users"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/organ/list"
        element={
          <PermissionProtect
            element={<OrganList />}
            moduleName="users"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route
        path="/organ/update/:id"
        element={
          <PermissionProtect
            element={<OrganUpdate />}
            moduleName="users"
            actions={["read", "update", "delete"]}
          />
        }
      />
      <Route
        path="/movimentacoes/criar"
        element={
          <PermissionProtect
            element={<FinancialMovements />}
            moduleName="finance"
            actions={["create"]}
          />
        }
      />
      <Route
        path="/movimentacoes/lista"
        element={
          <PermissionProtect
            element={<FinancialList />}
            moduleName="finance"
            actions={["read", "create", "update", "delete"]}
          />
        }
      />
      <Route
        path="/movimentacoes/visualizar/:id"
        element={
          <PermissionProtect
            element={<FinancialUpdate />}
            moduleName="finance"
            actions={["update", "read", "delete"]}
          />
        }
      />
      <Route
        path="/movimentacoes/contribuicoes/:name"
        element={<ContributionHistoric />}
      />
      <Route
        path="/movimentacoes/relatorio"
        element={
          <PermissionProtect
            element={<GenerateFinancialReport />}
            moduleName="finance"
            actions={["read", "create", "update"]}
          />
        }
      />
    </Routes>
  );
};

export default ProtectedRoutes;
