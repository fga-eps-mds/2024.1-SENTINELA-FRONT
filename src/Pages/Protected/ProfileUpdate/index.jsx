import SideBar from "../../../Components/SideBar";
import React from "react";
import SideButton from "../../../Components/SideButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import { AuthProvider, useAuth } from "../../../Context/auth";

const ProfileUpdate = () => {

    const { user } = useAuth();

    const buttons = [
        <SideButton key="login" text="Pagina Inicial" />,
        <SideButton key="filiacao" text="Cadastro" />
      ];

      return user && (
        <div style={{ display: "flex" }}>
          <SideBar buttons={buttons} />
          <div style={{ flex: 1, padding: "20px" }}>
          <h1 style={{marginTop: "100px", marginLeft: "30px"}}>Visualização de Usuário</h1>
          <h3 style={{marginTop: "35px", marginLeft: "65px", fontSize: "20px" }}>Dados Pessoais</h3>
          </div>
        </div>
      );
};

export default ProfileUpdate;
