import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/auth";
import SecondaryButton from "../../../Components/SecondaryButton";
import sindpolLogo from "../../../assets/sindpol-logo.png";
import sentinelaLogo from "../../../assets/sentinela-logo.png";
import "./index.css";

export default function Finance() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    user && (
      <section className="container">
        <div className="redirect">
          <div className="redirect buttons">
            <div className="imagens-service">
              <img className="logo" src={sindpolLogo} alt="Sindpol Logo" />

              <img
                className="sentinela"
                src={sentinelaLogo}
                alt="Sentinela Logo"
              />
            </div>

            <SecondaryButton text="Cadastrar de Fornecedor" onClick="#" />
            <SecondaryButton text="Listar forncedores" onClick="#" />
            <SecondaryButton
              text="cadastrar conta bancaria"
              onClick={() => navigate("bankAccount/")}
            />
            <SecondaryButton
              text="Listar contas bancarias"
              onClick={() => navigate("listBankAccount/")}
            />
          </div>
        </div>
      </section>
    )
  );
}
