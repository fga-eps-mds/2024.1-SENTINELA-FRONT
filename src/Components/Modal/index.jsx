import "./index.css";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";
import theme from "../../Styles/global";

export default function Modal({ show, children, alertTitle, maxWidth, alert }) {
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
            backgroundColor: theme.palette.button,
            "& .MuiAlertTitle-root": {
              fontFamily: theme.typography.fontFamilyPrimary,
            },
            "& .MuiAlert-message": {
              fontFamily: theme.typography.fontFamilySecondary,
            },
            width: "100%",
            maxWidth: { maxWidth }, // Ajusta para 100% da largura do modal
          }}
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {alert}
        </Alert>

        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  alertTitle: PropTypes.string.isRequired,
  alert: PropTypes.string,
  maxWidth: PropTypes.string,
};
