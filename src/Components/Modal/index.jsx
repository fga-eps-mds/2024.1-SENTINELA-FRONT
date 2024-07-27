import "./index.css";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";
import theme from "../../Styles/global";

export default function Modal({ show, children, alertTitle, buttons , alert, width}) {
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
            width: "100%", // Ajusta para 100% da largura do modal
            maxWidth: width, // Largura máxima do modal
          }}
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {alert}
        </Alert>
          {children}

        <div className="modal-buttons">{buttons}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  alertTitle: PropTypes.string.isRequired,
  buttons: PropTypes.any,
};