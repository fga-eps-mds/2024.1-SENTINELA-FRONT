import "./index.css";
import PropTypes from "prop-types";
import { ButtonGroup } from "@mui/material";
import sindpolLogo from "../../assets/sindpol-logo.png";
import sentinelaLogo from "../../assets/sentinela-logo.png"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AuthContext from "../../Context/auth";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";

export default function SideBar({ buttons, nome }) {

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    context.Logout();
    navigate("/")
  };


  return (
    <div className="side-bar">
      <div className="imagens">
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
      </div>

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

      <div className="userInfo">
        <div className="userInfo-box">
          <h1><PersonOutlineIcon/></h1>
          <p>Você está logado como {nome}</p>
        </div>

        <div 
          className="userInfo-box-logout"
          onClick={handleLogout}
        >
          <p>LOGOUT</p>
          <h1><LogoutOutlinedIcon/></h1>
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  buttons: PropTypes.array.isRequired,
};
