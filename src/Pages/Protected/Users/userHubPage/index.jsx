import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpol_logo from "../../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../../assets/sentinela-logo.png";
import "./index.css";

export default function UserHubPage() {
  const navigate = useNavigate();

  const handleListaClick = () => {
    navigate("/usuarios");
  };

  const handleCadastroClick = () => {
    navigate("/usuarios/criar");
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
          <SecondaryButton
            text="CADASTRO DE USUÁRIOS"
            onClick={handleCadastroClick}
          />
          <SecondaryButton
            text="LISTA DE USUÁRIOS"
            onClick={handleListaClick}
          />
        </div>
      </div>
    </section>
  );
}
