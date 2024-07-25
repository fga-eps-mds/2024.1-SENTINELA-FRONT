import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import React, { useContext ,useState} from "react";
import { AuthProvider, useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import "./index.css";

const BankAccount = () => {
    const [nome, setNome] = useState('');

    
    const context = useContext(AuthContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/home");
      };
    const handleLogout = () => {
        context.logout();
        navigate("/");
      };

    const buttons = [
        <SideButton key="home" text="PÁGINA INICIAL" onClick={handleHome} />,
        <SideButton key="filiacao" text="CADASTROS" />,
        <SideButton key="financeiro" text="FINANCEIRO" />,
        <SideButton key="beneficios" text="BENEFÍCIOS" />,
        <h2 className="profile-status">Você está logado <br />como {nome}</h2>,
        <button className="btn-logout" onClick={handleLogout}> LOGOUT </button>
      ];
    return user && (
        <section className="container">
            <div>
            <SideBar className="side-menu" buttons={buttons} />
            </div>


        
            <div className="redirect">
                <div className="redirect buttons">
                
                </div>
                

                
            </div>

        
    </section>

);
};
export default BankAccount;