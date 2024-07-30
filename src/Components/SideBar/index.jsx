import "./index.css";
import PropTypes from "prop-types";
import { AiOutlineMenu } from "react-icons/ai";
import sindpol_logo from "../../assets/sindpol-logo.png";
import sentinela_logo from "../../assets/sentinela-logo.png";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
import SideButton from "../SideButton";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function SideBar({ fullHeight = true }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const buttons = [
    <SideButton key="home" text="PÁGINA INICIAL" onClick={() => {}} />,
    <SideButton key="filiacao" text="CADASTROS" onClick={() => {}} />,
    <SideButton key="financeiro" text="FINANCEIRO" onClick={() => {}} />,
    <SideButton key="beneficios" text="BENEFÍCIOS" onClick={() => {}} />,
    <h2 key="loggedStatus" className="profile-status">
      Você está logado <br />
      como teste <AiOutlineUser className="profile-icon" />
    </h2>,
    <button key="logout" className="btn-logout" onClick={() => {}}>
      {" "}
      LOGOUT <RiLogoutCircleRLine className="logout-icon" />{" "}
    </button>,
  ];

  return (
    <>
      <div className="hidden-menu">
        <AiOutlineMenu onClick={() => handleSideBar()} />
      </div>
      <div
        className={`side-bar ${isSideBarOpen ? "open" : ""}`}
        style={{ height: fullHeight ? "100vh" : "100%" }}
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
      </div>
    </>
  );
}

SideBar.propTypes = {
  fullHeight: PropTypes.bool,
};
