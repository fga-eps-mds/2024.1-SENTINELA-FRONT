import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Components/SecondaryButton";
import SideBar from "../../../../Components/SideBar";
import SideButton from "../../../../Components/SideButton";
import { useAuth } from "../../../../Context/auth";
import sindpol_logo from "../../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../../assets/sentinela-logo.png";
import "./index.css";

export default function UserHubPage() {
  const navigate = useNavigate();
  const context = useAuth();

  const handleListaClick = () => {
    navigate("/usuarios");
  };

  const handleCadastroClick = () => {
    navigate("/usuarios/criar");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleRegistrationClick = () => {
    navigate("/usuarios/hub");
  };

  const handleLogout = () => {
    context.Logout();
    navigate("/");
  };

  const getUserName = () => {
    const tokenString = localStorage.getItem("@App:user");
    if (tokenString) {
      const user = JSON.parse(tokenString);
      return user?.user?.name || "Usuário";
    }
    return "Usuário";
  };

  const userName = getUserName();

  const buttons = [
    <SideButton key="home" text="Pagina Inicial" onClick={handleHomeClick} />,
    <SideButton
      key="cadastros"
      text="Cadastros"
      onClick={handleRegistrationClick}
    />,
    <SideButton key="financeiro" text="Financeiro" />,
    <SideButton key="benefícios" text="Benefícios" />,
    <h2 key="profile-status" className="profile-status">
      Você está logado <br />
      como {userName} <AiOutlineUser className="profile-icon" />
    </h2>,
    <button key="logout" className="btn-logout" onClick={handleLogout}>
      LOGOUT <RiLogoutCircleRLine className="logout-icon" />
    </button>,
  ];

  return (
    <section className="container">
      <SideBar className="side-menu" buttons={buttons} />

      <div className="area-card">
        <div className="card">
          <img className="logo" src={sindpol_logo} alt="Sindpol Logo" />
          <img
            className="sentinela"
            src={sentinela_logo}
            alt="Sentinela Logo"
          />

          <SecondaryButton text="SOLICITAÇÃO DE FILIAÇÃO" onClick={""} />
          <SecondaryButton
            text="CADASTRO DE USUÁRIOS"
            onClick={handleCadastroClick}
          />
          <SecondaryButton
            text="LISTA DE USUÁRIOS"
            onClick={handleListaClick}
          />
        </div>
      </div>
    </section>
  );
}
