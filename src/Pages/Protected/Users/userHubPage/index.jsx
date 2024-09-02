import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpol_logo from "../../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../../assets/sentinela-logo.png";
import "./index.css";
import { useContext, useEffect, useState } from "react";
import { checkAction } from "../../../../Utils/permission";
import AuthContext from "../../../../Context/auth";
import { getRoleById } from "../../../../Services/RoleService/roleService";

export default function UserHubPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userPermissions, setUserPermissions] = useState([]);
  const canAprove = checkAction(userPermissions, "users", "create");
  const canRead = checkAction(userPermissions, "users", "read");

  useEffect(() => {
    const fetchRolePermissions = async () => {
      if (user?.role) {
        try {
          const role = await getRoleById(user.role);
          setUserPermissions(role?.permissions || []);
        } catch (error) {
          console.error("Erro ao buscar permissões do papel:", error);
          setUserPermissions([]);
        }
      }
    };

    fetchRolePermissions();
  }, [user]);

  const handleListaClick = () => {
    navigate("/usuarios");
  };

  const handleListaPerfilClick = () => {
    navigate("/perfis");
  };

  const handleListaOrgaosClick = () => {
    navigate("/organ/list");
  };

  return (
    <section className="container">
      <div className="area-card">
        <div className="card">
          <img className="logo" src={sindpol_logo} alt="Sindpol Logo" />
          <img
            className="sentinela"
            src={sentinela_logo}
            alt="Sentinela Logo"
          />
          {/* <SecondaryButton text="SOLICITAÇÕES DE FILIAÇÃO" onClick={""} /> */}
          {canAprove && (
            <SecondaryButton
              text="Filiações pendentes"
              onClick={() => navigate("filiacoes-pendentes/")}
            />
          )}
          {canRead && (
            <SecondaryButton
              text="LISTA DE USUÁRIOS"
              onClick={handleListaClick}
            />
          )}
          {canRead && (
            <SecondaryButton
              text="LISTA DE PERFIL"
              onClick={handleListaPerfilClick}
            />
          )}
          {canRead && (
            <SecondaryButton
              text="LISTA DE ÓRGÃOS"
              onClick={handleListaOrgaosClick}
            />
          )}
        </div>
      </div>
    </section>
  );
}
