import PropTypes from "prop-types";
import theme from "../../Styles/global";
import TextField from "@mui/material/TextField";

export default function FieldText({
  label,
  value,
  onChange,
  disabled,
  onBlur,
  erro,
}) {
  return (
    <TextField
      id={`field-${label.replace(/\s+/g, "-").toLowerCase()}`} // Gera um id único baseado no label
      label={label}
      value={value}
      variant="filled"
      onChange={onChange}
      disabled={disabled}
      onBlur={onBlur}
      error={erro}
      sx={{
        margin: ".7rem",
        background: "#EAE3D7",
        backgroundColor: "#EAE3D7",
        borderRadius: "5px",
        "& .MuiInput-underline:before": {
          borderBottomColor: theme.palette.main, // Cor da borda inferior antes do foco
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: theme.palette.main, // Cor da borda inferior ao passar o mouse
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.main, // Cor da borda inferior após o foco
        },
        "& .MuiInputBase-input": {
          color: theme.palette.contrastText, // Cor do texto
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.main,
          fontFamily: '"Noto Sans", sans-serif',
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.main, // Cor do rótulo quando focado
        },
        "& .MuiInputBase-input::placeholder": {
          fontFamily: '"Overpass", sans-serif', // Fonte do placeholder
        },
      }}
    />
  );
}

FieldText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func, // Added prop type for onBlur
  erro: PropTypes.bool, // Added prop type for erro
};
