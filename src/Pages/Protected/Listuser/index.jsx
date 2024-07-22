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
import { getUsers } from "../../../Services/userService";
import AuthContext from "../../../Context/auth";
import { APIUsers } from "../../../Services/BaseService";

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

    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
    ];

    const handleRegisterClick = () => {
        navigate('/caduser');
    };

    const handleItemClick = (user) => {
        console.log('ID do usuário sendo passado para a navegação:', user._id);
        navigate('/viewuser', { state: { userId: user._id } });
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="container">
            <div className="bar-container">
                <SideBar buttons={buttons} />
            </div>

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