import SideBar from "../../../Components/SideBar";
import "./index.css";
import React, { useState } from "react";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import { useAuth } from "../../../Context/auth";

const ProfileUpdate = () => {

    const { user } = useAuth();

    const [nome, setNome] = useState('Admin');
    const [celular, setCelular] = useState('4002-8922')
    const [login, setLogin] = useState('Ativo')

    const buttons = [
        <SideButton key="login" text="Pagina Inicial" />,
        <SideButton key="filiacao" text="Cadastro" />
      ];

      return user && (
        <section className="container">
          <SideBar buttons={buttons} />
            <div className='campos-container'>
              <h1> Visualização de Usuário </h1>
              <h3> Dados Pessoais </h3>
              <div className='section-campo'>
                <FieldText 
                  label="Nome*"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
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
                />
              </div>
            </div>
        </section>
      );
};

export default ProfileUpdate;
