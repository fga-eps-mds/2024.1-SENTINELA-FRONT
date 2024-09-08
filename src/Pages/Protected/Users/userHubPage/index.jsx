// src/pages/UserHubPage/UserHubPage.js

import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpol_logo from "../../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../../assets/sentinela-logo.png";
import "./index.css";
import { usePermissions, checkAction } from "../../../../Utils/permission";

export default function UserHubPage() {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const canAprove = checkAction(permissions, "users", "create");

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
          {canAprove && (
            <SecondaryButton
              text="Filiações pendentes"
              onClick={() => navigate("filiacoes-pendentes/")}
            />
          )}
          <>
            <SecondaryButton
              text="LISTA DE USUÁRIOS"
              onClick={handleListaClick}
            />
            <SecondaryButton
              text="LISTA DE PERFIL"
              onClick={handleListaPerfilClick}
            />
            <SecondaryButton
              text="LISTA DE ÓRGÃOS"
              onClick={handleListaOrgaosClick}
            />
          </>
        </div>
      </div>
    </section>
  );
}
