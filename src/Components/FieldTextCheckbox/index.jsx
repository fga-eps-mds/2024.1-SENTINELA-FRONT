import PropTypes from "prop-types";
import theme from "../../Styles/global";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
//import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

export default function FieldTextCheckbox({
  label,
  value,
  onChange,
  disabled,
  checked,
  onCheckboxChange,
}) {
  return (
    <TextField
      id="filled-basic"
      label={label}
      value={value}
      variant="filled"
      onChange={onChange}
      disabled={disabled}
      sx={{
        margin: ".7rem",
        background: "#EAE3D7",
        backgroundColor: "#EAE3D7",
        borderRadius: "5px",
        "& .MuiInput-underline:before": {
          borderBottomColor: theme.palette.main,
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: theme.palette.main,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.main,
        },
        "& .MuiInputBase-input": {
          color: theme.palette.contrastText,
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.main,
          fontFamily: '"Noto Sans", sans-serif',
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.main,
        },
        "& .MuiInputBase-input::placeholder": {
          fontFamily: '"Overpass", sans-serif',
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox
              checked={checked}
              onChange={onCheckboxChange}
              sx={{ marginLeft: 1 }} // Ajusta o espaçamento dentro do campo
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

FieldTextCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};
