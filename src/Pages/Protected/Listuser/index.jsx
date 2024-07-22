import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import SideButton from "../../../Components/SideButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { getUsers } from "../../../Services/userService";
import ListItemText from '@mui/material/ListItemText';


export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Os dados recebidos não são um array.');
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
        navigate('/viewuser', { state: { user } });
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
                                <ListItemButton className="list-item" button onClick={() => handleItemClick(user)}>
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