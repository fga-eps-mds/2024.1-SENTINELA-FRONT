import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/auth";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpolLogo from "../../../../assets/sindpol-logo.png";
import sentinelaLogo from "../../../../assets/sentinela-logo.png";
import "./index.css";

export default function Finance() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFornecedoresListaClick = () => {
    navigate("/fornecedores");
  };

  const handleListaClick = () => {
    navigate("/finance/list");
  };

  const handleMovimentacoesClick = () => {
    navigate("/movimentacoes/lista");
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
            <SecondaryButton
              text="Lista de Fornecedores"
              onClick={handleFornecedoresListaClick}
            />
            <SecondaryButton
              text="Lista de Contas Bancárias"
              onClick={handleListaClick}
            />
            <SecondaryButton
              text="Lista de Movimentações Financeiras"
              onClick={handleMovimentacoesClick}
            />
          </div>
        </div>
      </section>
    )
  );
}
