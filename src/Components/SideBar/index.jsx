import ButtonGroup from "@mui/material/ButtonGroup";
import "./index.css";
import PropTypes from 'prop-types';

export default function SideBar( { buttons }) {

  return (
    <div className="side-bar">
      <img
        className="logo"
        src="src/assets/sindpol-logo.png"
        alt="Sindpol Logo"
      />
      <p className="sentinela">SENTINELA</p>
      <div className="menu-lateral">
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        sx={{
          "& .MuiButton-root": {
            color: "#3D160D", // Cor do texto dos botões
            borderColor: "#3D160D", // Cor da borda dos botões
          },
        }}
      >
        { buttons }
      </ButtonGroup>
      </div>
    </div>
  );
}

SideBar.propTypes = {
    buttons: PropTypes.array.isRequired,
  };
  