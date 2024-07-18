import SideBar from "../../../Components/SideBar";
import React from "react";
import SideButton from "../../../Components/SideButton";

const ProfileUpdate = () => {

    const buttons = [
        <SideButton key="login" text="Pagina Inicial" />,
        <SideButton key="filiacao" text="Cadastro" />
      ];

    return(
        <SideBar buttons={buttons}/>

    );
};

export default ProfileUpdate;