import "./index.css";
import PropTypes from "prop-types";
import { AiOutlineMenu } from "react-icons/ai";
import sindpol_logo from "../../assets/sindpol-logo.png";
import sentinela_logo from "../../assets/sentinela-logo.png";
import { ButtonGroup } from "@mui/material";
import { useContext, useState } from "react";
import SideButton from "../SideButton";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AuthContext, { useAuth } from "../../Context/auth";

export default function SideBar({ fullHeight = true }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { user } = useAuth();

  const buttons = [
    <SideButton
      hidden={user ? "flex" : "none"}
      key="home"
      text="PÁGINA INICIAL"
      onClick={() => {
        navigate("/home");
      }}
    />,
    <SideButton
      hidden={user ? "flex" : "none"}
      key="filiacao"
      text="CADASTROS"
      onClick={() => {
        navigate("/usuarios/hub");
      }}
    />,
    <SideButton
      hidden={user ? "flex" : "none"}
      key="financeiro"
      text="FINANCEIRO"
      onClick={() => {
        navigate("/finance/hub");
      }}
    />,
    <SideButton
      hidden={user ? "flex" : "none"}
      key="beneficios"
      text="BENEFÍCIOS"
      onClick={() => {
        navigate("/beneficios");
      }}
    />,
    <SideButton
      hidden={user ? "none" : "flex"}
      key="login"
      text="LOGIN"
      onClick={() => {
        navigate("/");
      }}
    />,
    <SideButton
      hidden={user ? "none" : "flex"}
      key="filiacão"
      text="FILIAÇÃO"
      onClick={() => {
        navigate("/filiacao");
      }}
    />,
  ];

  return (
    <>
      <div className="hidden-menu">
        <AiOutlineMenu onClick={() => handleSideBar()} />
      </div>
      <div
        className={`side-bar ${isSideBarOpen ? "open" : ""}`}
        style={{
          height: fullHeight ? "100vh" : "100%",
        }}
      >
        <img className="logo" src={sindpol_logo} alt="Sindpol Logo" />
        <img className="sentinela" src={sentinela_logo} alt="Sentinela Logo" />
        <div className="menu-lateral">
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="text"
            sx={{
              width: "380px",
              "& .MuiButton-root": {
                color: "#3D160D", // Cor do texto dos botões
                borderColor: "#3D160D", // Cor da borda dos botões
              },
            }}
          >
            {buttons}
          </ButtonGroup>
        </div>
        <div
          style={{
            display: user ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            gap: "1rem",
          }}
        >
          <AiOutlineUser
            style={{
              fontSize: "50px",
            }}
          />
          <h2
            style={{
              fontWeight: "600",
              fontSize: "medium",
              textAlign: "center",
            }}
          >
            Você está logado como {user?.name}
          </h2>
          <ButtonGroup>
            <button
              key="logout"
              className="btn-logout"
              onClick={() => {
                context.Logout();
                navigate("/");
              }}
            >
              LOGOUT <RiLogoutCircleRLine className="logout-icon" />
            </button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  fullHeight: PropTypes.bool,
};
