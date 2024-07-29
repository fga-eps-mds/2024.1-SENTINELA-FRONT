import SideBar from "../../../Components/SideBar";
import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import UnderlinedTextButton from "../../../Components/UnderlinedTextButton";
import SideButton from "../../../Components/SideButton";
import { useState, useContext } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/Card";

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(""); // Adiciona um estado para mensagens de erro

  const handleLogin = () => {
    if (!email || !senha) {
      // Verifica se os campos estão preenchidos
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Limpa mensagens de erro
    setError("");

    context.Login(email, senha);
    navigate("/home");
  };

  const handlePasswordRecovery = () => {
    navigate("/passwordrecovery");
  };

  const buttons = [
    <SideButton itemKey="login" key="login" text="Login" />,
    <SideButton itemKey="filiacao" key="filiacao" text="Filiação" />,
  ];

  return (
    <div className="screen">
      <SideBar buttons={buttons} />
      <Card>
        <LabeledTextField
          label="EMAIL"
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabeledTextField
          label="SENHA"
          placeholder="Digite sua senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Exibe a mensagem de erro */}
        <div className="recupera-senha">
          <UnderlinedTextButton
            key="recupera-senha"
            text="Esqueci a senha"
            onClick={() => handlePasswordRecovery()}
          />
        </div>
        <SecondaryButton text="Filiar-me ao sindicato" maxWidth="400px" />
        <PrimaryButton
          text="Entrar"
          onClick={() => handleLogin()}
          maxWidth="400px"
        />
      </Card>
    </div>
  );
}
