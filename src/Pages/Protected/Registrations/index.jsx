import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import { useAuth } from "../../../Context/auth";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./index.css";

export default function Registrations() {
    const navigate = useNavigate();
    const context = useAuth();

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

    // Variáveis de controle e display da página
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

    return (
        <section className="container">
            <div className="bar-container">
                <SideBar buttons={buttons} />
            </div>
            
            <div className="area-card">
                <div className="card">
                    <img
                        className="logo"
                        src="src/assets/sindpol-logo.png"
                        alt="Sindpol Logo"
                    />
                    <img
                        className="sentinela"
                        src="src/assets/sentinela-logo.png"
                        alt="Sentinela Logo"
                    />
                    
                    <SecondaryButton text="SOLICITAÇÃO DE FILIAÇÃO" onClick={''} />
                    <SecondaryButton text="CADASTRO DE USUÁRIOS" onClick={handleCadastroClick} />
                    <SecondaryButton text="LISTA DE USUÁRIOS" onClick={handleListaClick} />
                </div>
            </div>
        </section>
    );
}
