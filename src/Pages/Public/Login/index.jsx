import SideBar from "../../../Components/SideBar";
import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import UnderlinedTextButton from "../../../Components/UnderlinedTextButton";
import SideButton from "../../../Components/SideButton";
import React, { useContext } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogin = () => {
    context.Login();
    navigate("/home")
  };

  const buttons = [
    <SideButton key="login" text="Login" />,
    <SideButton key="filiacao" text="Filiação" />,
    <SideButton key="sobre" text="Sobre" />,
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
            label="MATRÍCULA"
            placeholder="Digite sua matrícula"
          />
          <LabeledTextField
            label="SENHA"
            placeholder="Digite sua senha"
            type="password"
            />
          <div className="recupera-senha">
            <UnderlinedTextButton key="recupera-senha" text="Esqueci a senha" />
          </div>
          <SecondaryButton text="Filiar-me ao sindicato" />

          <PrimaryButton text="Entrar" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
}
