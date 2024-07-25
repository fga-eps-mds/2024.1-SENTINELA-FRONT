import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import FieldNumber from '../../../Components/FieldNumber';
import PrimaryButton from '../../../Components/PrimaryButton';
import SecondaryButton from '../../../Components/SecondaryButton';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'; 
import { getUserById, deleteUserById, patchUserById, getRoles } from '../../../Services/userService';
import "./index.css";
import Modal from '../../../Components/Modal';
import"../Registrations/index.css";
import { useAuth } from "../../../Context/auth";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

const ViewUser = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userId = state?.userId;
   

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [perfilSelecionado, setPerfilSelecionado] = useState('');
    const [roles, setRoles] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeletedModal, setShowDeletedModal] = useState(false);

    const handleNomeCompletoChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        setNomeCompleto(value);
    };

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const roles = await getRoles(); 
                setRoles(roles);
            } catch (error) {
                console.error('Erro ao carregar roles:', error); 
            }
        };
        loadRoles();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const tokenString = localStorage.getItem('@App:user');
                    if (!tokenString) {
                        console.error('Token não encontrado no localStorage');
                        return;
                    }
                    const token = JSON.parse(tokenString).token;
                    const user = await getUserById(userId, token);

                    if (user) {
                        setNomeCompleto(user.name || '');
                        setCelular(user.phone || '');
                        setLogin(user.status ? 'Ativo' : 'Inativo');
                        setEmail(user.email || '');
                        setPerfilSelecionado(user.role || '');
                    } else {
                    }
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                }
            } 
        };
    
        fetchUser();
    }, [userId]);

    const handleDelete = async () => {
        setShowDeleteModal(false);
        if (userId) {
            try {
                await deleteUserById(userId);
                setShowDeletedModal(true);
                
            } catch (error) {
                console.error('Erro ao deletar usuário:', error);
            }
        }
    };

    const handleSave = async () => {
        setShowSaveModal(false);
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
                handleSaveCloseDialog ();
            } catch (error) {
                console.error(`Erro ao atualizar usuário com ID ${userId}:`, error);
            }
        }
    };

    const handleListaClick = () => {
        navigate("/listadeusuarios");
    };

    const handleCadastroClick = () => {
        navigate("/cadastrarUsuario");
    };

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

    const userName = getUserName();

    const buttons = [
        <SideButton key="home" text="Pagina Inicial" onClick={handleHomeClick} />,
        <SideButton key="cadastros" text="Cadastros" onClick={handleRegistrationClick} />,
        <SideButton key="financeiro" text="Financeiro" />,
        <SideButton key="benefícios" text="Benefícios" />,
        <h2 key="profile-status" className="profile-status">
            Você está logado <br />como {userName} <AiOutlineUser className="profile-icon" />
        </h2>,
        <button key="logout" className="btn-logout" onClick={handleLogout}>
            LOGOUT <RiLogoutCircleRLine className="logout-icon" />
        </button>
    ];

    const loginOptions = ['Ativo', 'Inativo'];
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };

    const handlePerfilChange = (event) => {
        setPerfilSelecionado(event.target.value);
    };

    const handleSaveModal = () => {
        setShowSaveModal(true);
    };

    const handleDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleSaveCloseDialog = () => {
        setShowSaveModal(false);
        navigate("/listadeusuarios");
    };

    const handleDeleteCloseDialog = () => {
        setShowDeleteModal(false);
    };

    const handleDeletedCloseDialog = () => {
        setShowDeletedModal(false);
        navigate('/listadeusuarios');
        
    };


    const modalSaveButton = [<SecondaryButton key={'saveButtons'} text='OK' onClick={() => handleSave()} width="338px" />];
    const modalDeleteButton = [
        <SecondaryButton key={'deleteButtons'} text='EXCLUIR USUÁRIO' onClick={() => handleDelete()} width="338px" />,
        <SecondaryButton key={'modalButtons'} text='CANCELAR E MANTER O CADASTRO' onClick={() => handleDeleteCloseDialog()} width="338px" />
    ];

    return (
        <section className="container">
             <SideBar className="side-menu" buttons={buttons} />

            <div className='forms-container'>
                <h1>Visualização de usuário</h1>

                <h3>Dados Pessoais</h3>
                <FieldText
                    label="Nome Completo"
                    value={nomeCompleto}
                    onChange={handleNomeCompletoChange}
                />

                <div className='double-box'>
                    <FieldNumber
                        label="Celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        format=' (##) ##### ####'
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
                    {roles.map((perfil) => (
                        <FormControlLabel
                            key={perfil?.name}
                            value={perfil?._id}
                            control={<Radio />}
                            label={perfil?.name}
                        />
                    ))}
                </RadioGroup>

                <div className='double-buttons'>
                    <SecondaryButton
                        text='Deletar'
                        onClick={handleDeleteModal}
                    />
                    <PrimaryButton
                        text='Salvar'
                        onClick={handleSaveModal}
                    />
                </div>

                <Modal
                    alertTitle="Alterações Salvas"
                    show={showSaveModal}
                    buttons={modalSaveButton}
                />

                <Modal
                    alertTitle="Deseja deletar o usuário do sistema?"
                    show={showDeleteModal}
                    buttons={modalDeleteButton}
                />
                <Modal
                    alertTitle="Usuario Deletado"
                    show={showDeletedModal}
                    buttons={<SecondaryButton key={'okButtons'} text='OK' onClick={() => handleDeletedCloseDialog()} width="338px" />}
                />
            </div>
        </section>
    );
};

export default ViewUser;