import { useEffect, useState, useContext } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { APIUsers } from "../../../Services/BaseService";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function BenefitsList() {
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
        <h2>Lista de convenios </h2>
      </section>
    )
  );
}
