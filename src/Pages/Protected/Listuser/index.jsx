import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import SideButton from "../../../Components/SideButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function ListUser() {
    const personas = ["Douglas Silva", "Ana Alves", "Arthur", "Luana", "Gabriel", "João Barros", "Luisa"];
    
    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
    ];

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/caduser');
    };

    const handleItemClick = (persona) => {
        navigate('/viewuser', { state: { persona } });
    };

    const filteredPersonas = personas.filter(persona =>
        persona.toLowerCase().includes(search.toLowerCase())
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
                    {filteredPersonas.map((persona, index) => (
                        <div key={index}>
                            <ListItem className="list-item" button onClick={() => handleItemClick(persona)}>
                                <ListItemText primary={persona} />
                            </ListItem>
                            {index < filteredPersonas.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>
            </div>
        </section>
    );
}
