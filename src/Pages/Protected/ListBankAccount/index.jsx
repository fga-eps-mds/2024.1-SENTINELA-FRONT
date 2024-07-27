import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButtom from "../../../Components/PrimaryButton"
import SecondaryButton from "../../../Components/SecondaryButton"
import FieldText from "../../../Components/FieldText";
import "./index.css"

export default function ListBankAccount() {
    
    const [nome, setNome] = useState('');
    const [busca, setBusca] = useState('');

    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleHome = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        context.logout();
        navigate("/");
      };

    const handleSearch = () => {
        alert("Uma pesquisa")
    }

    const buttons = [
        <SideButton key="home" text="PÁGINA INICIAL" onClick={handleHome} />,
        <SideButton key="filiacao" text="CADASTROS" />,
        <SideButton key="financeiro" text="FINANCEIRO" onClick={() => navigate("/finance/")}/>,
        <SideButton key="beneficios" text="BENEFÍCIOS" />,
        <h2 className="profile-status">Você está logado <br />como {nome}</h2>,
        <button className="btn-logout" onClick={handleLogout}> LOGOUT </button>
    ];

    
    return user && (
    <section className="listContainer">
        <div>
            <SideBar className="side-menu" buttons={buttons} />
        </div>

        <div className="listContainer list">
            <div className="header">
                <h1>Lista de Contas Bancárias</h1>
                <PrimaryButtom text="Cadastrar contas bancárias" onClick={() => navigate("/finance/bankAccount")}/>
            </div>

            <div className="search">
                <FieldText
                    label="Pesquisar Conta"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />

                <div>
                    <SecondaryButton 
                        text="Pesquisar"
                        onClick={handleSearch}
                    />
                </div>
                
            </div>
        </div>

    
    </section>
);
};

