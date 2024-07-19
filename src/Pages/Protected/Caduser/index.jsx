import React, { useState } from 'react';

import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localização desejada para o dayjs
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importa o adaptador Dayjs
import FieldText from "../../../Components/FieldText"
import DataSelect from "../../../Components/DataSelect"
import FieldSelect from "../../../Components/FieldSelect"
import FieldNumber from '../../../Components/FieldNumber';

import { useFetcher } from 'react-router-dom';

const Caduser = () =>{
    const [nomeCompleto, setnomeCompleto] = useState('')
    const [celular,setCelular] = useState('')
    const [login, setLogin] = useState('')
    const [email,setEmail] = useState('')

    const buttons = [
        <SideButton key="login" text="Login" />,
        <SideButton key="caduser" text="Cadastros" />,
      ];
    const login_options = ['Ativo', 'Inativo'];
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
      };
    
return( 
    <section className="container">

        <div className="bar-container">
            <SideBar buttons={buttons} />
        </div>

        <div className='forms-container'>
        <h1>Visualização de usuário</h1>

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
            
           
            </div>

    </section>
    );
};

export default Caduser;