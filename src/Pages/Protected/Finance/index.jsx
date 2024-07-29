import React, { useContext ,useState} from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import sindpolLogo from "../../../assets/sindpol-logo.png";
import sentinelaLogo from "../../../assets/sentinela-logo.png"
import "./index.css";


export default function Finance() {

    const [nome, setNome] = useState('');

    
    const context = useContext(AuthContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const handleHome = () => {
        navigate("/home");
      };

    const buttons = [
      <SideButton key="home" text="PÁGINA INICIAL" onClick={() => navigate("/home/")} />,
      <SideButton key="filiacao" text="CADASTROS" />,
      <SideButton key="financeiro" text="FINANCEIRO" onClick={() => navigate("/finance/")}/>,
      <SideButton key="beneficios" text="BENEFÍCIOS" />,
    ];
    
    return user && (
        <section className="container">
            <div>
              <SideBar className="side-menu" buttons={buttons} />
            </div>
       
            <div className="redirect">

                <div className="redirect buttons">
                  <img
                    className="logo"
                    src={sindpolLogo}
                    alt="Sindpol Logo"
                  />

                  <img
                    className="sentinela"
                    src= {sentinelaLogo}
                    alt="Sentinela Logo"
                  />

                  <SecondaryButton text="Cadastrar de Fornecedor" onClick='#' />
                  <SecondaryButton text="Listar forncedores" onClick='#' />
                  <SecondaryButton text="cadastrar conta bancaria" onClick={() => navigate("bankAccount/")}  />
                  <SecondaryButton text="Listar contas bancarias" onClick={() => navigate("listBankAccount/")} />
                </div>
                

                
            </div>

        
    </section>

);
};
