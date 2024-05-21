import "./index.css";
import PropTypes from "prop-types";
import { ButtonGroup } from "@mui/material";

export default function SideBar({ buttons }) {
  return (
    <div className="side-bar">
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
  );
}

SideBar.propTypes = {
  buttons: PropTypes.array.isRequired,
};
