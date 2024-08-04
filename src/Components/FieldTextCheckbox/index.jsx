import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import theme from "../../Styles/global";

export default function FieldTextCheckbox({
  label,
  checked,
  onCheckboxChange,
  disabled,
}) {
  return (
    <TextField
      id="filled-basic"
      label={label}
      variant="filled"
      disabled={disabled}
      sx={{
        margin: ".7rem",
        background: "#EAE3D7",
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
          width: 500,
          padding: 2,
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
              sx={{ marginLeft: 100 }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

FieldTextCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
