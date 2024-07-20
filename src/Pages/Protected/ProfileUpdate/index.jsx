import SideBar from "../../../Components/SideBar";
import "./index.css";
import React, { useEffect, useState } from "react";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldNumber from "../../../Components/FieldNumber";
import { useAuth } from "../../../Context/auth";
import { APIUsers } from "../../../Services/BaseService";

const ProfileUpdate = () => {

    const { user } = useAuth();
    const storagedUserString = localStorage.getItem('@App:user'); // Usuario logado
    let storagedUser = {};
    storagedUser = JSON.parse(storagedUserString); // Usuario logado => JSON

    const [nome, setNome] = useState(storagedUser.user ? storagedUser.user.name : '');
    const [celular, setCelular] = useState(storagedUser.user ? storagedUser.user.phone : '');
    const [login, setLogin] = useState(storagedUser.user ? storagedUser.user.status : '');
    const [email, setEmail] = useState(storagedUser.user ? storagedUser.user.email : '');
    
  
    const buttons = [
      <SideButton key="login" text="Pagina Inicial" />,
      <SideButton key="filiacao" text="Cadastro" />, 
      <h2>Voce está logado <br />como {nome} </h2>
    ];

    return user && (
      <section className="container">    
            <SideBar buttons={buttons} />
            <div className='campos-container'>
              <h1> Visualização de usuário </h1>
              <h3> Dados pessoais </h3>        
              <div className='section-campo'>
                <FieldText 
                  label="Nome*"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className='double-box'>
                <FieldNumber 
                  label="Celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  format="(##) #####-####"
                />
                <FieldText 
                  label="Login*"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className='section-campo'>
                <FieldText 
                  label="E-mail*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
        </section>
      );
};

export default ProfileUpdate;
