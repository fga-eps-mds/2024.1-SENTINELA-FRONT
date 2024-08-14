import { useAuth } from "../../../../Context/auth";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpol_logo from "../../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../../assets/sentinela-logo.png";
import "./index.css";

const AccessUnion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAccessFinancialReport = () => {
    navigate("/financeiro/prestacao-de-contas");
  };

  const handleAccessContributionHistory = () => {
    navigate("/financeiro/historico-de-contribuicoes");
  };

  return (
    user && (
      <section className="container">
        <div className="area-hub">
          <div className="card-finance">
            <img className="logo" src={sindpol_logo} alt="Sindpol Logo" />
            <img
              className="sentinela"
              src={sentinela_logo}
              alt="Sentinela Logo"
            />
            <div className="hub-btn">
              <SecondaryButton
                text="HISTÓRICO DE CONTRIBUIÇÕES"
                onClick={handleAccessContributionHistory}
              />
              <SecondaryButton
                text="PRESTAÇÃO DE CONTAS"
                onClick={handleAccessFinancialReport}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default AccessUnion;
