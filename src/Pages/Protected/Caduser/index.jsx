import React, { useState } from 'react';

import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText"
import FieldSelect from "../../../Components/FieldSelect"
import FieldNumber from '../../../Components/FieldNumber';
import Checklist from '../../../Components/Lista'

import { useFetcher } from 'react-router-dom';


const Caduser = () =>{
    const [nomeCompleto, setnomeCompleto] = useState('')
    const [celular,setCelular] = useState('')
    const [login, setLogin] = useState('')
    const [email,setEmail] = useState('')
    const [acessos, setAcessos] = useState([])

    const setoresAcesso =[
        'Convênio',
        'Cadastro',
        'Financeiro',
        'Juridico'
    ]
   
    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
      ];
    const login_options = ['Ativo', 'Inativo'];
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };
    console.log({acessos});
return( 
    <section className="container">

        <div className="bar-container">
            <SideBar buttons={buttons} />
        </div>

        <div className='forms-container'>
        <h1>Cadastro de usuário</h1>

            <h3> Dados Pessoais</h3>
            <FieldText 
                label="Nome Completo"
                value={nomeCompleto}
                onChange={(e) => setnomeCompleto(e.target.value)}
            />

            <div className='double-box'>
                <FieldNumber 
                    label="Celular"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    format='+55 (##) 9#### ####'

                />

                <FieldSelect 
                    label="Login"
                    value={login}
                    onChange={handleChangeLogin}
                    options={login_options}
                />
            </div>    
            <FieldText 
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <Checklist
                items = {setoresAcesso}
                value={acessos}
                onChange={setAcessos}
            />
           
            </div>
            
    </section>
    );
};

export default Caduser;