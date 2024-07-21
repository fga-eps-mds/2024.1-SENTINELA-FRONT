import PropTypes from "prop-types";
import { theme } from "../../Styles/global";
import TextField from "@mui/material/TextField";


export default function LabeledTextField ({ label, placeholder, type, value, onChange }) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      variant="standard"
      focused
      type={type}
      value={value}
      onChange={onChange}
      sx={{
        width: "400px",
        fontFamily: "Noto Sans",
        marginTop: "33px",
        "& .MuiInput-underline:before": {
          borderBottomColor: theme.palette.custom.main, // Cor da borda inferior antes do foco
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: theme.palette.custom.main, // Cor da borda inferior ao passar o mouse
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.custom.main, // Cor da borda inferior após o foco
        },
        "& .MuiInputBase-input": {
          color: theme.palette.custom.contrastText, // Cor do texto
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.custom.main,
          fontFamily: '"Noto Sans", sans-serif',
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.custom.main, // Cor do rótulo quando focado
        },
        "& .MuiInputBase-input::placeholder": {
          fontFamily: '"Overpass", sans-serif', // Fonte do placeholder
        },
      }}
    />
  );
}

LabeledTextField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
