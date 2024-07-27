import React, { useContext } from "react";
import { AuthProvider, useAuth } from "../../../Context/auth";
import AuthContext from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import { useNavigate } from "react-router-dom";
import "./index.css"

const Home = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

    const { user } = useAuth();

    const handleLogout = () => {
      context.Logout();
      navigate("/")
    };

    const buttons = [
      <SideButton key="home" text="PÁGINA INICIAL" onClick={() => navigate("/home/")} />,
      <SideButton key="filiacao" text="CADASTROS" />,
      <SideButton key="financeiro" text="FINANCEIRO" onClick={() => navigate("/finance/")}/>,
      <SideButton key="beneficios" text="BENEFÍCIOS" />,
  ];

    return user && (
      <div className="homepage">
        <div>
          <SideBar className="side-menu" buttons={buttons} />
        </div>

        <div>
        <h1>Home</h1>
            Bem vindo {user.nomeCompleto}
            <button text="Entrar" onClick={handleLogout} > SAIR </button>
        </div>

      </div>
    );
  };

export default Home;