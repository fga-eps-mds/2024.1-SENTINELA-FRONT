import "./index.css";
import PropTypes from "prop-types";
import { ButtonGroup } from "@mui/material";
import sindpolLogo from "../../assets/sindpol-logo.png";
import sentinelaLogo from "../../assets/sentinela-logo.png"

export default function SideBar({ buttons }) {
  return (
    <div className="side-bar">
      <img
        className="logo"
        src={sindpolLogo}
        alt="Sindpol Logo"
      />
      <img
        className="sentinela"
        src={sentinelaLogo}
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
  );
}

SideBar.propTypes = {
  buttons: PropTypes.array.isRequired,
};
