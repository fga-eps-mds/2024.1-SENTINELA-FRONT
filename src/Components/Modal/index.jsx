import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";
import SecondaryButton from "../SecondaryButton";
import { useNavigate } from "react-router-dom";
import theme from '../../Styles/global';

export default function Modal({ show, children, text, width, alertTitle, alert, onClick }) {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Alert
          severity="success" 
          variant="filled"
          sx={{
            backgroundColor: theme.palette.custom.button,
            "& .MuiAlertTitle-root": {
              fontFamily: theme.typography.fontFamilyPrimary,
            },
            "& .MuiAlert-message": {
              fontFamily: theme.typography.fontFamilySecondary,
            },
            width:"270px",
          }}
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {alert}
        </Alert>
        <SecondaryButton text={text} onClick={onClick} width={width} />
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
  alertTitle: PropTypes.string.isRequired,
  alert: PropTypes.string,
  onClick : PropTypes.func
};