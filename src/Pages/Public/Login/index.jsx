import SideBar from "../../../Components/SideBar";
import "./index.css";
import LabeledTextField from "../../../Components/LabeledTextField";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import UnderlinedTextButton from "../../../Components/UnderlinedTextButton";
import SideButton from "../../../Components/SideButton";
import React, { useState, useContext } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/Card";

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    context.Login(email, senha);
    navigate("/home");
  };

  const handlePasswordRecovery = () => {
    navigate("/passwordrecovery");
  };


  const buttons = [
    <SideButton key="login" text="Login" />,
    <SideButton key="filiacao" text="Filiação" />,
    <SideButton key="sobre" text="Sobre" />,
  ];

  return (
    <div className="screen">
      <SideBar buttons={buttons} />
      <Card>
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
          <UnderlinedTextButton
            key="recupera-senha"
            text="Esqueci a senha"
            onClick={() => handlePasswordRecovery()}
          />
        </div>
        <SecondaryButton text="Filiar-me ao sindicato" maxWidth="400px" />

        <PrimaryButton text="Entrar" onClick={() => handleLogin()} maxWidth="400px" />
      </Card>
    </div>
  );
}
