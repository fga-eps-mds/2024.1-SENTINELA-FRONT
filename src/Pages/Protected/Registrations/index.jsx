import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import SecondaryButton from "../../../Components/SecondaryButton";

export default function Registrations() {
    const navigate = useNavigate();

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


    //Variáveis de controle e display da página
    const buttons = [
        <SideButton key="home" text="Pagina Inicial" onClick={handleHomeClick}/>,
        <SideButton key="cadastros" text="Cadastros" onClick={handleRegistrationClick}/>,
        <SideButton key="financeiro" text="Financeiro"/>,
        <SideButton key="benefícios" text="Benefícios"/>,
        // <h2 className="profile-status">Você está logado <br />como {nome} <AiOutlineUser className="profile-icon" /></h2>,
        // <button className="btn-logout" onClick={handleLogout}> LOGOUT <RiLogoutCircleRLine className="logout-icon" /> </button>
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
