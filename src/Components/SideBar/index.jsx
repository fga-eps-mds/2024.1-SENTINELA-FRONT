import "./index.css";
import PropTypes from "prop-types";
import { AiOutlineMenu } from "react-icons/ai";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
import SideButton from "../SideButton";

export default function SideBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const buttons = [
    <SideButton key="login" text="Login" />,
    <SideButton key="filiacao" text="Filiação" />,
    <SideButton key="sobre" text="Sobre" />,
  ];

  return (
    <>
      <div className="hidden-menu">
        <AiOutlineMenu onClick={() => handleSideBar()} />
      </div>
      <div className={`side-bar ${isSideBarOpen ? "open" : ""}`}>
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
  buttons: PropTypes.array.isRequired,
};