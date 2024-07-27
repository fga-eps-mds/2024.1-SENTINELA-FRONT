import theme from "../../Styles/global";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "dayjs/locale/pt-br";
import PropTypes from "prop-types";

function FieldSelect({ label, value, onChange, options }) {
  return (
    <FormControl
      fullWidth
      sx={{
        margin: ".7rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        width: "inherit",
      }}
    >
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={value}
        onChange={onChange}
        label={label}
        sx={{
          background: "#e0d4cc",
          backgroundColor: "#e0d4cc",
          "& .MuiSelect-select": {
            borderColor: theme.palette.custom.main,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.custom.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.custom.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.custom.main,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ padding: "10px", backgroundColor: "#e0e0e0" }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FieldSelect.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
  options: PropTypes.any,
};

export default FieldSelect;
