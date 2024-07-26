import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import FieldNumber from '../../../Components/FieldNumber';
import Checklist from '../../../Components/Checklist';
import PrimaryButton from '../../../Components/PrimaryButton';
import { ToggleButton, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { createUser, getRoles } from '../../../Services/userService';
import Modal from '../../../Components/Modal';
import SecondaryButton from '../../../Components/SecondaryButton';
import "../Registrations/index.css";
import { useAuth } from "../../../Context/auth";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function Register_User() {
    const navigate = useNavigate();
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [perfilSelecionado, setPerfilSelecionado] = useState('');
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const login_options = ['Ativo', 'Inativo'];

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleRegistrationClick = () => {
        navigate("/cadastros");
    };

    const handleLogout = () => {
        context.Logout();
        navigate("/");
    };

    const getUserName = () => {
        const tokenString = localStorage.getItem('@App:user');
        if (tokenString) {
            const user = JSON.parse(tokenString);
            return user?.user?.name || 'Usuário';
        }
        return 'Usuário';
    };

    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };

    const handlePerfilChange = (event) => {
        setPerfilSelecionado(event.target.value);
    };

    const handleNomeCompletoChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        setNomeCompleto(value);
    };

    const handleCloseDialog = () => {
        setShowModal(false);
        navigate("/home");
    };

    const handleSubmit = async (e) => {
        const trimmedCelular = removeMask(celular);
        const isValidNumber = /^\d+$/.test(trimmedCelular) && trimmedCelular.length >= 10;
        const isValidEmailAddress = isValidEmail(email);

        if (!isValidNumber || !isValidEmailAddress) {
            return;
        }

        const userData = {
            name: nomeCompleto,
            email: email,
            phone: celular,
            status: login === 'Ativo',
            role: perfilSelecionado,
        };

        try {
            await createUser(userData);
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao criar usuário', error);
        }
    };

    const buttons = [
        <SideButton key="home" text="Pagina Inicial" onClick={handleHomeClick} />,
        <SideButton key="cadastros" text="Cadastros" onClick={handleRegistrationClick} />,
        <SideButton key="financeiro" text="Financeiro" />,
        <SideButton key="benefícios" text="Benefícios" />,
        <h2 key="profile-status" className="profile-status">
            Você está logado <br />como {getUserName()} <AiOutlineUser className="profile-icon" />
        </h2>,
        <button key="logout" className="btn-logout" onClick={handleLogout}>
            LOGOUT <RiLogoutCircleRLine className="logout-icon" />
        </button>
    ];

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const removeMask = (celular) => celular.replace(/\D/g, '');

    useEffect(() => {
        const loadRoles = async () => {
            const roles = await getRoles();
            setRoles(roles);
        };
        loadRoles();
    }, []);

    useEffect(() => {
        setIsEmailValid(!email || isValidEmail(email));
    }, [email]);

    const modalButton = [<SecondaryButton key={'modalButtons'} text='OK' onClick={handleCloseDialog} width="338px" />];

    return (
        <section className="container">
            <SideBar className="side-menu" buttons={buttons} />
            <div className='forms-container-user'>
                <h1>Cadastro de usuário</h1>
                <h3>Dados Pessoais</h3>
                <FieldText
                    label="Nome Completo"
                    value={nomeCompleto}
                    onChange={handleNomeCompletoChange}
                />
                <div className='double-box-user'>
                    <FieldNumber
                        label="Celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        format='(##) ##### ####'
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
                {!isEmailValid && <label className='isEmailValid'>*Insira um email válido</label>}
                <h3>Perfil</h3>
                <RadioGroup value={perfilSelecionado} onChange={handlePerfilChange}>
                    {roles.map((perfil) => (
                        <FormControlLabel
                            key={perfil?.name}
                            value={perfil?._id}
                            control={<Radio />}
                            label={perfil?.name}
                        />
                    ))}
                </RadioGroup>
                <PrimaryButton
                    text='Cadastrar'
                    onClick={handleSubmit}
                />
                <Modal
                    width="338px"
                    alertTitle="Cadastro de usuário concluído"
                    show={showModal}
                    buttons={modalButton}
                />
            </div>
        </section>
    );
}