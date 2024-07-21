import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index";
import SideBar from "../../../Components/SideBar";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import SecondaryButton from "../../../Components/SecondaryButton";
import SideButton from "../../../Components/SideButton";

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

    return (
        <section className="container">
            <div className="bar-container">
                <SideBar buttons={buttons} />
            </div>

            <div className='forms-container'>
                <div className="double-box">
                    <h1>Lista de Usuários</h1>
                    <PrimaryButton text="Cadastrar Usuário" onClick={handleRegisterClick}/>
                </div>

                <div>
                    <LabeledTextField label="Pesquisar Usuário" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <SecondaryButton text="Pesquisar"/>
                </div>
            </div>
        </section>
    );
}
