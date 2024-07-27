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

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    context.Login(email, senha);
    navigate("/home");
  };

  const buttons = [
    <SideButton itemKey="login" key="login" text="Login" />,
    <SideButton itemKey="filiacao" key="filiacao" text="Filiação" />,
    <SideButton itemKey="sobre" key="sobre" text="Sobre" />,
  ];

  return (
    <div className="screen">
      <SideBar buttons={buttons} />
      <div className="area-card">
        <div className="card">
          <img
            className="logo"
            src="src/assets/sindpol-logo.png"
            alt="Sindpol Logo"
          />
          <img
            className="sentinela"
            src="src/assets/sentinela-logo.png"
            alt="Sentinela Logo"
          />
          <LabeledTextField
            label="EMAIL"
            placeholder="Digite seu email"
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
          <div className="recupera-senha">
            <UnderlinedTextButton key="recupera-senha" text="Esqueci a senha" />
          </div>
          <SecondaryButton text="Filiar-me ao sindicato" onClick={() => {}} />

          <PrimaryButton text="Entrar" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
}
