import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import SecondaryButton from "../../../Components/SecondaryButton";

export default function Cadastros() {
    const navigate = useNavigate();

    const handleCadastroClick = () => {
        navigate("/listauser");
    };

    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
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
                </div>
            </div>
        </section>
    );
}
