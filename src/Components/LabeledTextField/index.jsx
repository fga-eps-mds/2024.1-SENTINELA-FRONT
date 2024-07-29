import PropTypes from "prop-types";
import theme from "../../Styles/global";
import TextField from "@mui/material/TextField";

export default function LabeledTextField({
  label,
  placeholder,
  type,
  value,
  onChange,
}) {
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
        maxWidth: "400px",
        width: "90%",
        fontFamily: theme.typography.fontFamilyPrimary,
        marginTop: "33px",
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
          fontFamily: theme.typography.fontFamilyPrimary,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.main, // Cor do rótulo quando focado
        },
        "& .MuiInputBase-input::placeholder": {
          fontFamily: theme.typography.fontFamilySecondary, // Fonte do placeholder
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
