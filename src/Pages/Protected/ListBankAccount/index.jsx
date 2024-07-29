import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButtom from "../../../Components/PrimaryButton"
import SecondaryButton from "../../../Components/SecondaryButton"
import FieldText from "../../../Components/FieldText";
import "./index.css"
import { listBankAccount } from "../../../Services/bankAccountService";
import ListComponent from "../../../Components/ListComponent";

export default function ListBankAccount() {
    
    const [nome, setNome] = useState('');
    const [busca, setBusca] = useState('');
    const [dataMap, setDataMap] = useState(null);
    const { id } = useParams();  // Pega o ID da URL

    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleHome = () => {
        navigate("/home");
    };

    
      const handleSearch = async () => {
        try {
            // Chama listBankAccount e aguarda a resposta
            const result = await listBankAccount(busca);
            setDataMap(result);
        } catch (error) {
            console.error("Erro ao realizar a pesquisa:", error);
            alert("Ocorreu um erro ao realizar a pesquisa.");
        }
    }

    useEffect(() => {
        if (dataMap) {
            console.log(dataMap);
        }
    }, [dataMap]);

    const handleNavigateWithId = (id) => {
        navigate(`/finance/listBankAccount/${id}`);
      };

    const buttons = [
        <SideButton key="home" text="PÁGINA INICIAL" onClick={handleHome} />,
        <SideButton key="filiacao" text="CADASTROS" />,
        <SideButton key="financeiro" text="FINANCEIRO" onClick={() => navigate("/finance/")}/>,
        <SideButton key="beneficios" text="BENEFÍCIOS" />,
    ];

   
    
    return user && (
    <section className="listContainer">
        <div>
            <SideBar className="side-menu" buttons={buttons} nome = {user.nome}/>
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
            {dataMap && dataMap.name ? (
            <div className="result">
              <div>
                <ListComponent 
                    label = {dataMap.name}
                    onClick={() => handleNavigateWithId(dataMap._id)}
                />
                
                
              </div>
            </div>
          ) : (
            <div>Nenhum resultado encontrado.</div>
          )}

        </div>

    
    </section>
);
};

