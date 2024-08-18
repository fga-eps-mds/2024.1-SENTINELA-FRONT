import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/auth";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpolLogo from "../../../../assets/sindpol-logo.png";
import sentinelaLogo from "../../../../assets/sentinela-logo.png";
import "./index.css";

export default function Finance() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleListaClick = () => {
    navigate("/finance/list");
  };
  const handleCadastroClick = () => {
    navigate("/finance/criar");
  };
  return (
    user && (
      <section className="containerFinance">
        <div className="area-card">
          <div className="card">
            <img className="logo" src={sindpolLogo} alt="Sindpol Logo" />
            <img
              className="sentinela"
              src={sentinelaLogo}
              alt="Sentinela Logo"
            />
            <SecondaryButton text="Cadastro de Fornecedores" onClick="#" />
            <SecondaryButton text="Lista de forncedores" onClick="#" />
            <SecondaryButton
              text="cadastro de conta bancária"
              onClick={handleCadastroClick}
            />
            <SecondaryButton
              text="Lista de contas bancárias"
              onClick={handleListaClick}
            />
          </div>
        </div>
      </section>
    )
  );
}
