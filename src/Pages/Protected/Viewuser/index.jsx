import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import FieldNumber from '../../../Components/FieldNumber';
import PrimaryButton from '../../../Components/PrimaryButton';
import SecondaryButton from '../../../Components/SecondaryButton';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'; 
import { getUserById, deleteUserById, patchUserById } from '../../../Services/userService';
import AuthContext from "../../../Context/auth";
import "./index.css";


const ViewUser = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userId = state?.userId;
    console.log(userId);

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [perfilSelecionado, setPerfilSelecionado] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                console.log(`Tentando buscar usuário com ID: ${userId}`);
                try {
                    const tokenString = localStorage.getItem('@App:user');
                    if (!tokenString) {
                        console.error('Token não encontrado no localStorage');
                        return;
                    }
                    const token = JSON.parse(tokenString).token;
                    const user = await getUserById(userId, token);

                    if (user) {
                        console.log('Usuário encontrado:', user);
                        setNomeCompleto(user.name || '');
                        setCelular(user.phone || '');
                        setLogin(user.status ? 'Ativo' : 'Inativo');
                        setEmail(user.email || '');
                        setPerfilSelecionado(user.role || '');
                    } else {
                        console.log('Nenhum usuário encontrado com o ID fornecido');
                    }
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                }
            } else {
                console.log('Nenhum userId encontrado no estado');
            }
        };
    
        fetchUser();
    }, [userId]);


    useEffect (()=>{
        const loadRoles = async () => {
            const roles = await getRoles()
            setRoles(roles);
        }  
        loadRoles();




     }, [])


    const handleCancel = async () => {
        if (userId) {
            try {
                const tokenString = localStorage.getItem('@App:token');
                const token = JSON.parse(tokenString).token;
                await deleteUserById(userId, token);
                navigate('/listuser');
            } catch (error) {
                console.error('Erro ao deletar usuário:', error);
            }
        }
    };

    const handleSave = async () => {
        if (userId) {
            const updatedUser = {
                name: nomeCompleto,
                email: email,
                phone: celular,
                status: login === 'Ativo',
                role: perfilSelecionado,
            };
            
            const tokenString = localStorage.getItem('@App:user');
            if (!tokenString) {
                console.error('Token não encontrado no localStorage');
                return;
            }
            const token = JSON.parse(tokenString).token;
    
            try {
                await patchUserById(userId, updatedUser, token);
                navigate('/listuser');
            } catch (error) {
                console.error(`Erro ao atualizar usuário com ID ${userId}:`, error);
            }
        }
    };



    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
    ];

    const loginOptions = ['Ativo', 'Inativo'];
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };

    const perfis = ['Administrativo', 'Diretoria', 'Jurídico', 'Colaborador'];
    const handlePerfilChange = (event) => {
        setPerfilSelecionado(event.target.value);
    };

    return (
        <section className="container">
            <div className="bar-container">
                <SideBar buttons={buttons} />
            </div>
    
            <div className='forms-container'>
                <h1>Visualização de usuário</h1>
    
                <h3>Dados Pessoais</h3>
                <FieldText
                    label="Nome Completo"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
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
                        options={loginOptions}
                    />
                </div>
    
                <FieldText
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
    
                <h3>Perfil</h3>
    
                <RadioGroup value={perfilSelecionado} onChange={handlePerfilChange}>
                    {perfis.map((perfil) => (
                        <FormControlLabel
                            key={perfil}
                            value={perfil}
                            control={<Radio />}
                            label={perfil}
                        />
                    ))}
                </RadioGroup>
    
                <div className='double-buttons'>
                    <SecondaryButton
                        text='Deletar'
                        onClick={handleCancel}
                    />
                    <PrimaryButton
                        text='Salvar'
                        onClick={handleSave}
                    />
                </div>
            </div>
        </section>
    );
};

export default ViewUser;
