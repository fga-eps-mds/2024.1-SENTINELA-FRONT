import SideBar from "../../../Components/SideBar";
import SecondaryButton from "../../../Components/SecondaryButton";
import SideButton from "../../../Components/SideButton";
import React from "react";


export default function Cadastros() {
  

  const buttons = [
    <SideButton key="home" text="Pagina Inicial" />,
    <SideButton key="cadastros" text="Cadastros" />,
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
          
          <SecondaryButton text="SOLICITAÇÕES DE FILIAÇÃO" />
          <SecondaryButton text="CADASTRO DE USUÁRIOS" />
        </div>
      </div>
    </div>
  );
}
