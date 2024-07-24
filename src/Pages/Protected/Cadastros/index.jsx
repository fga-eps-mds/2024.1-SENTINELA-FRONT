import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
export default function Cadastros() {
    const navigate = useNavigate();

    const handleListaClick = () => {
        navigate("/listauser");
    };

    const handleCadastroClick = () => {
        navigate("/caduser");
    };

    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
        <SideButton key="financeiro" text="Financeiro" />,
        <SideButton key="benefícios" text="Benefícios" />,
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
