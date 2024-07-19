import SideBar from "../../../Components/SideBar";
import "./index.css";
import React, { useState } from "react";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import { useAuth } from "../../../Context/auth";
import axios from 'axios';

const ProfileUpdate = () => {

    const { user } = useAuth();

    const buttons = [
      <SideButton key="login" text="Pagina Inicial" />,
      <SideButton key="filiacao" text="Cadastro" />
    ];

    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');

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
                <FieldText 
                  label="Celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  
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
