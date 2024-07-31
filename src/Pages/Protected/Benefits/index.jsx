import { useEffect, useState, useContext } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { APIUsers } from "../../../Services/BaseService";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import SecondaryButton from "../../../Components/SecondaryButton";
import sindpol_logo from "../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../assets/sentinela-logo.png";

import "./index.css";

const Benefits = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useAuth();
  const storagedUserString = localStorage.getItem("@App:user");
  const storagedUser = JSON.parse(storagedUserString);

  const [nome, setNome] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await APIUsers.get(`users/${storagedUser.user._id}`, {
          headers: { Authorization: `Bearer ${storagedUser.token}` },
        });
        setNome(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  });

  const handleRegister = () => {
    navigate("/usuarios/hub");
  };

  const handleBenefits = () => {
    navigate("/beneficios");
  };

  const handleBenefitsList = () => {
    navigate("/beneficios/lista");
  };

  const handleLogout = () => {
    context.Logout();
    navigate("/");
  };

  const buttons = [
    <SideButton key="home" text="PÁGINA INICIAL" />,
    <SideButton key="filiacao" text="CADASTROS " onClick={handleRegister} />,
    <SideButton key="financeiro" text="FINANCEIRO" />,
    <SideButton key="beneficios" text="BENEFÍCIOS" onClick={handleBenefits} />,
    <h2 key="loggedStatus" className="profile-status">
      Você está logado <br />
      como {nome} <AiOutlineUser className="profile-icon" />
    </h2>,
    <button key="logout" className="btn-logout" onClick={handleLogout}>
      {" "}
      LOGOUT <RiLogoutCircleRLine className="logout-icon" />{" "}
    </button>,
  ];

  return (
    user && (
      <section className="container">
        <SideBar className="side-menu" buttons={buttons} />
        <div className="area-hub">
          <div className="card-benefits">
            <img className="logo" src={sindpol_logo} alt="Sindpol Logo" />
            <img
              className="sentinela"
              src={sentinela_logo}
              alt="Sentinela Logo"
            />
            <SecondaryButton
              className="btn-register"
              text="CADASTRO DE CONVENIO"
              onClick={""}
            />
            <SecondaryButton
              className="btn-list"
              text="LISTA DE CONVENIO"
              onClick={handleBenefitsList}
            />
          </div>
        </div>
      </section>
    )
  );
};

export default Benefits;
