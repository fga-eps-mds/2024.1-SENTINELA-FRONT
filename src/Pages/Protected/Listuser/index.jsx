import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import SideButton from "../../../Components/SideButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { APIUsers } from "../../../Services/BaseService";
import"../Registrations/index.css";
import { useAuth } from "../../../Context/auth";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const storagedUserString = localStorage.getItem('@App:user');
                const storagedUser = JSON.parse(storagedUserString);

                const response = await APIUsers.get('users', {
                    headers: {
                        'Authorization': `Bearer ${storagedUser.token}`
                    }
                });

                const data = response.data;
                console.log('Dados recebidos:', data);
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Os dados recebidos não são um array.');
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

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

    const handleRegisterClick = () => {
        navigate('/cadastrarUsuario');
    };

    const handleItemClick = (user) => {
        console.log('ID do usuário sendo passado para a navegação:', user._id);
        navigate(`/usuario/${user.name}`, { state: { userId: user._id } });
    };
    

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="container">
             <SideBar className="side-menu" buttons={buttons} />

            <div className='forms-container'>
                <h1>Lista de Usuários</h1>
                <div className="double-box">
                    <LabeledTextField label="Pesquisar Usuário" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <PrimaryButton text="Cadastrar Usuário" onClick={handleRegisterClick} />
                </div>

                <List>
                    {filteredUsers.map((user, index) => (
                        <div key={user._id}>
                            <ListItem>
                                <ListItemButton className="list-item" onClick={() => handleItemClick(user)}>
                                    <ListItemText primary={user.name} />
                                </ListItemButton>
                            </ListItem>
                            {index < filteredUsers.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>
            </div>
        </section>
    );
}