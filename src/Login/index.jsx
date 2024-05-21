import SideBar from "../Components/SideBar";
import "./index.css";
import {
  LabeledTextField,
  PrimaryButton,
  SecondaryButton,
  UnderlinedTextButton,
  SideButton,
} from "../styles/global";

export default function Login() {
  const buttons = [
    <SideButton key="login" text="Login"/>,
    <SideButton key="filiacao" text="Filiação"/>,
    <SideButton key="sobre" text="Sobre"/>,
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
          <LabeledTextField label="SENHA" placeholder="Digite sua senha" />
          <div className="recupera-senha">
            <UnderlinedTextButton key="recupera-senha" text="Esqueci a senha" />
          </div>
          <SecondaryButton text="Filiar-me ao sindicato" />

          <PrimaryButton text="Entrar" />
        </div>
      </div>
    </div>
  );
}
