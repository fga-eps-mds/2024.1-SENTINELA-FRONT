import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import FieldNumber from '../../../Components/FieldNumber';
import Checklist from '../../../Components/Checklist';
import PrimaryButton from '../../../Components/PrimaryButton';
import SecondaryButton from '../../../Components/SecondaryButton';
import { ToggleButton, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 
import { getUserById, deleteUserById, patchUserById } from '../../../Services/userService';
import AuthContext from "../../../Context/auth";

const Viewuser = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userId = state?.userId;

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [perfilSelecionado, setPerfilSelecionado] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                console.log('Fetching user with ID:', userId);
                try {
                    const tokenString = localStorage.getItem('@App:user');
                    if (!tokenString) {
                        console.error('Token not found in localStorage');
                        return;
                    }
                    const token = JSON.parse(tokenString).token;
                    console.log('Using token:', token);
                    const response = await getUserById(userId, token);
                    console.log('Response from getUserById:', response);
    
                    if (response && response.data) {
                        const user = response.data;
                        console.log('User data:', user); // Log adicional para verificar os dados do usuário
                        setNomeCompleto(user.name);
                        setCelular(user.phone);
                        setLogin(user.status ? 'Ativo' : 'Inativo');
                        setEmail(user.email);
                        setPerfilSelecionado(user.role);
                        console.log('Updated States:', {
                            nomeCompleto: user.name,
                            celular: user.phone,
                            login: user.status ? 'Ativo' : 'Inativo',
                            email: user.email,
                            perfilSelecionado: user.role,
                        });
                    }
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                }
            } else {
                console.log('No userId found in state');
            }
        };
    
        fetchUser();
    }, [userId]);
    
    const handleCancel = async () => {
        if (userId) {
            try {
                const tokenString = localStorage.getItem('@App:user');
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
            try {
                const tokenString = localStorage.getItem('@App:user');
                const token = JSON.parse(tokenString).token;
                await patchUserById(userId, updatedUser, token);
                navigate('/listuser');
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
            }
        }
    };

    // Variáveis de controle e display da página
    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
        <SideButton key="financeiro" text="Financeiro" />,
        <SideButton key="benefícios" text="Benefícios" />,
    ];

    const login_options = ['Ativo', 'Inativo'];
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };

    const setoresAcesso = ['Convênio', 'Cadastro', 'Financeiro', 'Juridico'];
    const [checklistVisible, setChecklistVisible] = useState(false);
    const toggleChecklistVisibility = () => {
        setChecklistVisible(!checklistVisible);
    };

    const perfis = ['Administrativo', 'Diretoria', 'Jurídico', 'Colaborador'];
    const handlePerfilChange = (event) => {
        setPerfilSelecionado(event.target.value);
    };

    // Configuração da página
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
                {console.log('nomeCompleto:', nomeCompleto)}
    
                <div className='double-box'>
                    <FieldNumber
                        label="Celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        format='+55 (##) 9#### ####'
                    />
                    {console.log('celular:', celular)}
    
                    <FieldSelect
                        label="Login"
                        value={login}
                        onChange={handleChangeLogin}
                        options={login_options}
                    />
                    {console.log('login:', login)}
                </div>
    
                <FieldText
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {console.log('email:', email)}
    
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
                {console.log('perfilSelecionado:', perfilSelecionado)}
    
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
export default Viewuser; 