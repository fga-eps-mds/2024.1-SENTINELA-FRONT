import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";
import SecondaryButton from "../SecondaryButton";
import { useNavigate } from "react-router-dom";
import { theme } from '../../Styles/global.js';

export default function Modal({ show, children, text, width }) {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }
  const handleSubmit = () => {
    navigate("/supplier");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Alert
          severity="success" 
          variant="filled"
          sx={{
            backgroundColor: theme.pallete.button,
            "& .MuiAlertTitle-root": {
              fontFamily: theme.typography.fontFamilyPrimary,
            },
            "& .MuiAlert-message": {
              fontFamily: theme.typography.fontFamilySecondary,
            },
            width:"270px",
          }}
        >
          <AlertTitle>Cadastro concluído</AlertTitle>
          
        </Alert>
        <SecondaryButton text={text} onClick={handleLoginPage} width={width} />
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};