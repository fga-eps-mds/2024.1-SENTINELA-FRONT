import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";
import SecondaryButton from "../SecondaryButton";
import { useNavigate } from "react-router-dom";

export default function Modal({ show, children, text, width }) {
  const navigate = useNavigate();
  if (!show) {
    return null;
  }
  const handleLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Alert
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: "#AE883C",
            "& .MuiAlertTitle-root": {
              fontFamily: "Noto Sans, sans-serif",
            },
            "& .MuiAlert-message": {
              fontFamily: "Overpass, sans-serif",
            },
            width:"270px",
          }}
        >
          <AlertTitle>Solicitação enviada</AlertTitle>
          Você deve receber um e-mail em breve com mais informações.
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
