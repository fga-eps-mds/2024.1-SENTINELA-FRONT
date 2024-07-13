import React from "react";
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import LabeledTextField from "../../../Components/LabeledTextField";



const MemberShip = () => {
    const buttons = [
        <SideButton key="login" text="Login" />,
        <SideButton key="filiacao" text="Filiação" />,
        <SideButton key="sobre" text="Sobre" />,
    ];
  return (
    
    <section className="container"> 

        
        <SideBar buttons={buttons} />
        
        <div>
            <h1>Formulário de Filiação</h1>
            
            <div className="section-form">
                <h3> Dados Pessoais </h3>

            </div>   
            
            <div className="section-form">
                <h3> Dados de contato</h3>

            </div>

            <div className="section-form">
                <h3> Endereço</h3>

            </div>

            <div className="section-form">
                <h3> Dados de contratação</h3>

            </div>
        </div>


    </section>
  );
};

export default MemberShip;